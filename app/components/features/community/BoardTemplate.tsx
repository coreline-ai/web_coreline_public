'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import SimpleHeader from '../../layout/SimpleHeader';
import SimpleFooter from '../../layout/SimpleFooter';
import { api } from '../../../lib/api-client';
import { Post, Board, BoardCategory } from '../../../lib/types/api';
import { useRequest } from '../../../lib/use-request';

interface BoardTemplateProps {
    slug: string;
    title: string;
    description: string;
    highlightedWord: string;
}

export default function BoardTemplate({
    slug,
    title,
    description,
    highlightedWord
}: BoardTemplateProps) {
    const { data: session } = useSession();
    const [page, setPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState(''); // Separate input state for form
    const [isMobile, setIsMobile] = useState(false);

    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (activeCategory) params.set('category_id', activeCategory.toString());
    if (searchQuery) params.set('keyword', searchQuery);

    const { data: res, error, isLoading } = useRequest<any>(`/api/boards/${slug}?${params.toString()}`);

    const board = res?.data?.board;
    const categories: BoardCategory[] = res?.data?.categories || [];
    const notices: Post[] = res?.data?.notices || [];
    const posts: Post[] = res?.data?.posts || [];
    const pagination = res?.data?.pagination || { current_page: 1, total_pages: 1, total_items: 0 };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.total_pages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleCategoryChange = (catId: number | null) => {
        setActiveCategory(catId);
        setPage(1); // Reset page on filter change
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        setPage(1);
    };

    // Helper functions remain the same
    const getVisiblePages = () => {
        const pages = [];
        const total = pagination.total_pages;
        const current = pagination.current_page;
        const delta = isMobile ? 1 : 2;

        if (total <= (isMobile ? 5 : 7)) {
            for (let i = 1; i <= total; i++) pages.push(i);
        } else {
            pages.push(1);
            const start = Math.max(2, current - delta);
            const end = Math.min(total - 1, current + delta);
            if (start > 2) pages.push('...');
            for (let i = start; i <= end; i++) pages.push(i);
            if (end < total - 1) pages.push('...');
            if (total > 1) pages.push(total);
        }
        return pages;
    };

    const formatDate = (dateStr: string) => {
        try {
            return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: ko });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-black selection:bg-[#FFD600] selection:text-black dark:bg-[#111] dark:text-white bw:bg-white bw:text-black">
            <SimpleHeader />

            <main className="relative pt-32 pb-24">
                <div className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-[0.1] bw:opacity-10"></div>

                <div className="relative z-10 mx-auto max-w-[1200px] px-4">
                    <div className="mb-16 border-l-[6px] border-[#FFD600] pl-6">
                        <h1 className="mb-4 text-5xl font-black tracking-tight md:text-6xl text-black dark:text-white bw:text-black">
                            {title} <span className="bg-[#FFD600] px-2 text-black">{highlightedWord}</span>
                        </h1>
                        <p className="max-w-2xl text-lg font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">
                            {description}
                        </p>
                    </div>

                    <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={() => handleCategoryChange(null)}
                                className={`h-11 rounded-xl border-2 border-black px-6 font-black transition-all ${activeCategory === null
                                    ? 'bg-black text-white dark:bg-white dark:text-black bw:bg-black bw:text-white'
                                    : 'bg-white text-black hover:bg-gray-50 dark:bg-black dark:text-white dark:hover:bg-white/5 bw:bg-white bw:text-black bw:hover:bg-gray-100'
                                    }`}
                            >
                                전체
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat.id)}
                                    className={`h-11 rounded-xl border-2 border-black px-6 font-black transition-all ${activeCategory === cat.id
                                        ? 'bg-black text-white dark:bg-white dark:text-black bw:bg-black bw:text-white'
                                        : 'bg-white text-black hover:bg-gray-50 dark:bg-black dark:text-white dark:hover:bg-white/5 bw:bg-white bw:text-black bw:hover:bg-gray-100'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSearch} className="relative w-full md:w-[400px]">
                            <span className="material-symbols-outlined notranslate absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 bw:text-black/40">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="게시글 검색..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="h-12 w-full rounded-2xl border-2 border-black bg-white pl-12 pr-4 font-bold text-black focus:outline-none dark:bg-black dark:text-white dark:border-white/20 bw:border-black bw:bg-white bw:text-black"
                            />
                        </form>
                    </div>

                    <div className="relative z-10 rounded-[2rem] border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:border-white/10 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <div className="overflow-hidden rounded-[calc(2rem-2px)]">
                            <div className="hidden md:grid grid-cols-[60px_1fr_120px_120px_100px] border-b-2 border-black bg-black px-6 py-4 text-[11px] font-black tracking-widest text-white uppercase dark:border-white/10 bw:border-black">
                                <div className="text-center">번호</div>
                                <div>제목</div>
                                <div className="text-center">작성자</div>
                                <div className="text-center">날짜</div>
                                <div className="text-center">조회수</div>
                            </div>

                            <div className="divide-y divide-gray-100 dark:divide-white/5 bw:divide-gray-200">
                                {isLoading ? (
                                    <div className="p-12 text-center text-gray-500 font-bold">로딩 중...</div>
                                ) : error ? (
                                    <div className="p-12 text-center text-red-500 font-bold">
                                        {error instanceof Error ? error.message : String(error)}
                                    </div>
                                ) : notices.length === 0 && posts.length === 0 ? (
                                    <div className="p-12 text-center text-gray-500 font-bold">해당하는 게시글이 없습니다.</div>
                                ) : (
                                    <>
                                        {[...notices, ...posts].map((post) => (
                                            <div
                                                key={post.id}
                                                className={`group flex flex-col gap-4 p-6 md:grid md:grid-cols-[60px_1fr_120px_120px_100px] md:items-center md:gap-0 md:px-6 md:py-5 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${post.is_notice ? 'bg-[#FEFCE8] dark:bg-yellow-900/10 bw:bg-yellow-50' : ''}`}
                                            >
                                                {/* Mobile Head */}
                                                <div className="flex items-center justify-between md:hidden">
                                                    <div className="flex items-center gap-2">
                                                        {post.is_notice && <span className="rounded-md border border-black bg-[#FFD600] px-2 py-0.5 text-[10px] font-black text-black">공지</span>}
                                                        <span className="text-xs font-bold text-gray-400">
                                                            {categories.find(c => c.id === post.category_id)?.name || 'General'}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-400">{formatDate(post.created_at)}</span>
                                                </div>

                                                {/* ID */}
                                                <div className="hidden text-center font-mono text-sm font-bold text-gray-400 group-hover:text-black md:block dark:group-hover:text-white bw:group-hover:text-black">
                                                    {post.is_notice ? <span className="material-symbols-outlined notranslate text-xl text-yellow-600">campaign</span> : post.id}
                                                </div>

                                                {/* Title */}
                                                <div className="flex items-center gap-3">
                                                    {post.is_notice && <span className="hidden rounded-lg border border-black bg-[#FFD600] px-2 py-0.5 text-[10px] font-black text-black md:inline-block">공지</span>}
                                                    <Link href={`/boards/${slug}/posts/${post.id}`} className="text-lg font-black leading-tight text-black group-hover:underline md:text-base md:font-bold dark:text-white bw:text-black">
                                                        {post.title}
                                                    </Link>
                                                    {post.file_url && <span className="material-symbols-outlined notranslate text-lg text-gray-400">attach_file</span>}
                                                </div>

                                                {/* Desktop/Mobile Detail */}
                                                <div className="flex items-center justify-between border-t border-gray-100 pt-3 md:hidden dark:border-white/5 bw:border-gray-200">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-gray-600 dark:text-gray-400 bw:text-gray-600">{post.author?.nickname || 'Anonymous'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                                                        <span className="material-symbols-outlined notranslate text-[14px]">visibility</span>
                                                        {post.view_count}
                                                    </div>
                                                </div>

                                                <div className="hidden items-center justify-center gap-2 md:flex">
                                                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400 bw:text-gray-600">{post.author?.nickname || 'Anonymous'}</span>
                                                </div>
                                                <div className="hidden text-center text-sm font-bold text-gray-400 md:block">
                                                    {formatDate(post.created_at)}
                                                </div>
                                                <div className="hidden justify-center md:flex">
                                                    <span className="rounded bg-gray-50 px-2 py-1 text-xs font-black text-black dark:bg-white/5 dark:text-white/60 bw:bg-gray-100 bw:text-black">
                                                        {post.view_count}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-8 md:flex-row md:justify-between">
                        <div className="flex w-full items-center justify-between gap-2 rounded-2xl border-2 border-black bg-white p-2 md:w-auto dark:bg-black dark:border-white/20 bw:border-black bw:bg-white">
                            <button
                                onClick={() => handlePageChange(pagination.current_page - 1)}
                                disabled={pagination.current_page === 1}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-white/10 bw:hover:bg-gray-100"
                            >
                                <span className="material-symbols-outlined notranslate">chevron_left</span>
                            </button>

                            <div className="flex flex-1 items-center justify-center gap-1">
                                {getVisiblePages().map((page, i) => (
                                    <button
                                        key={i}
                                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                                        disabled={page === '...'}
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all font-bold ${pagination.current_page === page
                                            ? 'bg-black text-white dark:bg-white dark:text-black bw:bg-black bw:text-white'
                                            : page === '...'
                                                ? 'cursor-default text-gray-400'
                                                : 'hover:bg-gray-100 dark:hover:bg-white/10 bw:hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(pagination.current_page + 1)}
                                disabled={pagination.current_page === pagination.total_pages}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-white/10 bw:hover:bg-gray-100"
                            >
                                <span className="material-symbols-outlined notranslate">chevron_right</span>
                            </button>
                        </div>

                        <Link
                            href={session ? `/boards/${slug}/new` : "/login"}
                            className="flex w-auto items-center justify-center gap-3 rounded-xl border-2 border-black bg-[#FFD600] px-6 py-3 font-black text-black neo-shadow transition-all hover:-translate-y-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:px-8 md:py-4"
                        >
                            <span className="material-symbols-outlined notranslate">edit_note</span>
                            포스트 추가하기
                        </Link>
                    </div>
                </div>
            </main>

            <SimpleFooter />
        </div>
    );
}
