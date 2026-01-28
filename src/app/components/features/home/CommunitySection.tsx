import React, { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useRequest } from '../../../lib/use-request';
import { Post } from '../../../lib/types/api';

const slugs: Record<string, string> = {
    news: 'news',
    blog: 'blog',
    lab: 'research'
};

const iconPool = ['breaking_news', 'code_blocks', 'science', 'psychology', 'hub', 'rocket_launch', 'memory', 'auto_awesome', 'terminal', 'analytics', 'architecture', 'database'];

// External API Types
interface ExternalNewsItem {
    id: string;
    title: string;
    url: string;
    source: string;
    summary: string;
    topic: string;
    why_it_matters: string;
}

interface ExternalApiResponse {
    date: string;
    top_news: ExternalNewsItem[];
    generated_at: string;
}

// Unified Display Type
interface DisplayPost {
    id: string | number;
    title: string;
    content: string;
    categoryName: string;
    linkUrl: string;
    isExternal: boolean;
    iconIndex: number; // to keep icon consistent
    analysis?: string; // New field for 'why_it_matters'
}

// Module-level variable to persist state during SPA navigation (client-side only)
// This resets on page reload, but persists when navigating between pages.
let globalActiveTab: 'news' | 'blog' | 'lab' = 'news';

export default function CommunitySection() {
    const [activeTab, setActiveTabState] = useState<'news' | 'blog' | 'lab'>(globalActiveTab);

    // Wrapper to update both local state and global variable
    const setActiveTab = (tab: 'news' | 'blog' | 'lab') => {
        globalActiveTab = tab;
        setActiveTabState(tab);
    };

    const slug = slugs[activeTab];

    // 1. Internal Fetch
    // NOW: News is external, Blog & Lab are internal.
    const shouldFetchInternal = activeTab !== 'news';
    const { data: internalRes, isLoading: internalLoading } = useRequest<any>(
        shouldFetchInternal ? `/api/boards/${slug}?page=1` : ''
    );

    // 2. External Fetch (for AI News)
    // Use local proxy to avoid CORS
    const externalApiUrl = '/api/proxy/ai-news?limit=8';
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data: externalData, isLoading: externalLoading } = useSWR<ExternalApiResponse>(
        activeTab === 'news' ? externalApiUrl : null,
        fetcher
    );

    const isLoading = activeTab === 'news' ? externalLoading : internalLoading;

    console.log('[CommunitySection] State:', { activeTab, shouldFetchInternal, internalRes, externalData });

    // 3. Normalize Data
    let displayPosts: DisplayPost[] = [];

    // Debug logging for normalized posts
    const setDisplayPosts = (posts: DisplayPost[]) => {
        console.log('[CommunitySection] setDisplayPosts:', posts);
        displayPosts = posts;
    };

    if (activeTab === 'news' && externalData?.top_news) {
        setDisplayPosts(externalData.top_news.map((item, idx) => ({
            id: item.id,
            title: item.title,
            content: item.summary,
            categoryName: item.topic || item.source,
            linkUrl: item.url,
            isExternal: true,
            iconIndex: idx,
            analysis: item.why_it_matters // Map analysis content
        })));
    } else if (shouldFetchInternal && internalRes?.data?.posts) {
        console.log('[CommunitySection] internal posts found:', internalRes.data.posts);
        setDisplayPosts(internalRes.data.posts.slice(0, 8).map((post: Post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            categoryName: post.category?.name || 'General',
            linkUrl: `/boards/${slug}/posts/${post.id}`,
            isExternal: false,
            iconIndex: typeof post.id === 'number' ? post.id : 0,
            analysis: post.summary
        })));
    } else {
        console.log('[CommunitySection] No data matched conditions');
    }

    // Helper to get random icon (consistent per post ID or index)
    const getIcon = (idx: number) => iconPool[idx % iconPool.length];

    return (
        <section className="border-b border-black bg-white px-4 py-24 dark:border-white/10 dark:bg-black bw:border-black bw:bg-white">
            <div className="mx-auto max-w-[1200px]">
                {/* Header */}
                <div className="mb-16">
                    <div className="mb-4 inline-flex items-center rounded-full border border-black bg-white px-4 py-1.5 text-xs font-black tracking-widest text-black uppercase neo-shadow dark:border-white dark:bg-black dark:text-white dark:shadow-none bw:border-black bw:bg-white bw:text-black bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                        LIVE UPDATES
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl dark:text-white bw:text-black">
                        인사이트 & <span className="bg-[#FFD600] text-black px-2">AI 연구소</span>
                    </h2>
                </div>

                {/* Toolbar / Sort */}
                <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-wrap">
                        {/* Topic Filters */}
                        <button
                            onClick={() => setActiveTab('news')}
                            className={`h-12 w-fit whitespace-nowrap rounded-xl px-6 font-bold transition-transform hover:-translate-y-1 ${activeTab === 'news'
                                ? 'bg-black text-white dark:bg-white dark:text-black bw:bg-black bw:text-white'
                                : 'border border-black bg-white text-black dark:border-white dark:bg-black dark:text-white bw:border-black bw:bg-white bw:text-black'
                                }`}
                        >
                            AI 오늘 최신뉴스
                        </button>
                        <button
                            onClick={() => setActiveTab('blog')}
                            className={`h-12 w-fit whitespace-nowrap rounded-xl px-6 font-bold transition-transform hover:-translate-y-1 ${activeTab === 'blog'
                                ? 'bg-black text-white dark:bg-white dark:text-black bw:bg-black bw:text-white'
                                : 'border border-black bg-white text-black dark:border-white dark:bg-black dark:text-white bw:border-black bw:bg-white bw:text-black'
                                }`}
                        >
                            기술 블로그
                        </button>
                        <button
                            onClick={() => setActiveTab('lab')}
                            className={`h-12 w-fit whitespace-nowrap rounded-xl px-6 font-bold transition-transform hover:-translate-y-1 ${activeTab === 'lab'
                                ? 'bg-black text-white dark:bg-white dark:text-black bw:bg-black bw:text-white'
                                : 'border border-black bg-white text-black dark:border-white dark:bg-black dark:text-white bw:border-black bw:bg-white bw:text-black'
                                }`}
                        >
                            CI AI 연구소
                        </button>
                    </div>

                    <Link
                        href="/login"
                        className="flex h-12 items-center gap-2 rounded-xl border border-black bg-[#FFD600] px-6 font-black text-black neo-shadow transition-transform hover:-translate-y-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                        <span className="material-symbols-outlined notranslate">add</span>
                        포스트 추가하기
                    </Link>
                </div>

                {/* Grid: 4x2 Layout */}
                {isLoading ? (
                    <div className="flex h-64 items-center justify-center font-bold text-gray-500">로딩 중...</div>
                ) : displayPosts.length === 0 ? (
                    <div className="flex h-64 items-center justify-center font-bold text-gray-500">게시글이 없습니다.</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {displayPosts.map((post) => {
                            const CardContent = (
                                <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-black bg-white p-6 neo-shadow transition-all hover:-translate-y-2 hover:neo-shadow-lg dark:border-white/10 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                    <div>
                                        <div className="mb-6 flex items-start justify-between">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-black bg-white neo-shadow transition-all group-hover:scale-110 group-hover:bg-[#FFD600] dark:border-white dark:bg-black dark:text-white dark:shadow-none dark:group-hover:text-black bw:border-black bw:bg-white bw:text-black bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bw:group-hover:text-black">
                                                <span className="material-symbols-outlined notranslate text-3xl">{getIcon(post.iconIndex)}</span>
                                            </div>
                                            <span className="rounded border border-black px-2 py-0.5 text-[10px] font-black uppercase text-black bg-gray-100 dark:bg-[#FFD600] bw:bg-gray-200">
                                                {post.categoryName}
                                            </span>
                                        </div>
                                        <h3 className="mb-3 text-lg font-black text-black leading-tight line-clamp-2 dark:text-white bw:text-black">{post.title}</h3>
                                        <p className="mb-8 text-sm font-bold leading-relaxed text-gray-500 line-clamp-3 dark:text-gray-400 bw:text-gray-500">
                                            {(post.content || '').slice(0, 100)}...
                                        </p>
                                    </div>

                                    {/* Analysis Section (Replaces Read Source) */}
                                    {post.analysis && (
                                        <div className="mt-auto border-l-4 border-[#FFD600] bg-gray-900 p-4 dark:bg-white/5">
                                            <h4 className="mb-1 text-[10px] font-black tracking-widest text-[#FFD600] uppercase">ANALYSIS</h4>
                                            <p className="text-xs font-bold leading-relaxed text-gray-300">
                                                {post.analysis}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );

                            return post.isExternal ? (
                                <a key={post.id} href={post.linkUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                                    {CardContent}
                                </a>
                            ) : (
                                <Link key={post.id} href={post.linkUrl} className="block h-full">
                                    {CardContent}
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* More Button */}
                <div className="mt-16 flex justify-center">
                    <Link
                        href={activeTab === 'news' ? 'https://ai-news-5min-dashboard.netlify.app/' : (activeTab === 'blog' ? '/blog' : '/research')}
                        target={activeTab === 'news' ? '_blank' : undefined}
                        rel={activeTab === 'news' ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-3 rounded-xl border border-black bg-white px-8 py-4 font-black text-black neo-shadow transition-all hover:-translate-y-1 hover:bg-[#FFD600] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none dark:border-white dark:bg-black dark:text-white dark:hover:bg-[#FFD600] dark:hover:text-black bw:border-black bw:bg-white bw:text-black bw:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bw:hover:bg-gray-100"
                    >
                        {activeTab === 'news' ? '전체 AI 최신뉴스 보기' : '더보기'}
                        <span className="material-symbols-outlined notranslate transition-transform group-hover:translate-x-1">
                            {activeTab === 'news' ? 'open_in_new' : 'arrow_forward'}
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
