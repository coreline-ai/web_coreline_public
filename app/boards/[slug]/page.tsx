'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import SimpleHeader from '../../components/layout/SimpleHeader';
import SimpleFooter from '../../components/layout/SimpleFooter';
import { api } from '../../lib/api-client';
import { BoardCategory, Post } from '../../lib/types/api';

interface BoardData {
    board: {
        id: number;
        name: string;
        slug: string;
        description: string;
        access_level: string;
    };
    categories: BoardCategory[];
    notices: any[]; // type as Post[]
    posts: any[]; // type as Post[]
    pagination: {
        current_page: number;
        total_pages: number;
        total_items: number;
    };
}

export default function BoardDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session } = useSession();
    const slug = params.slug as string;
    const page = Number(searchParams.get('page')) || 1;
    const categoryId = searchParams.get('category') ? Number(searchParams.get('category')) : null;

    const [data, setData] = useState<BoardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const fetchBoardData = useCallback(async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams();
            query.append('page', page.toString());
            if (categoryId) query.append('category_id', categoryId.toString());

            const res = await api.get<BoardData>(`/api/boards/${slug}?${query.toString()}`);
            if (res.success && res.data) {
                setData(res.data);
            } else {
                setError(res.error || 'Failed to load board');
            }
        } catch (err: any) {
            setError(err.message || 'Error loading board');
        } finally {
            setIsLoading(false);
        }
    }, [slug, page, categoryId]);

    useEffect(() => {
        if (slug) fetchBoardData();
    }, [slug, fetchBoardData]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val) {
            router.push(`/boards/${slug}?category=${val}`);
        } else {
            router.push(`/boards/${slug}`);
        }
    };

    if (isLoading) return <div className="min-h-screen animate-pulse bg-white dark:bg-black bw:bg-white" />;
    if (error) return <div className="p-20 text-center font-black text-red-500">{error}</div>;
    if (!data) return null;

    return (
        <div className="min-h-screen bg-white font-sans text-black dark:bg-[#111] dark:text-white bw:bg-white bw:text-black">
            <SimpleHeader redirectOnLogout={data.board.access_level === 'AUTHENTICATED' ? '/' : undefined} />
            <main className="relative pt-32 pb-24">
                <div className="mx-auto max-w-[1000px] px-4">
                    {/* Header */}
                    <div className="mb-12 border-l-[6px] border-[#FFD600] pl-6">
                        <h1 className="mb-4 text-4xl font-black tracking-tight">{data.board.name}</h1>
                        <p className="text-lg font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">
                            {data.board.description}
                        </p>
                    </div>

                    {/* Toolbar */}
                    <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={() => router.push(`/boards/${slug}`)}
                                className={`rounded-xl border-2 border-black px-4 py-2 font-bold transition-all ${!categoryId
                                    ? 'bg-[#FFD600] text-black hover:bg-white dark:text-black bw:bg-[#FFD600] bw:text-black'
                                    : 'bg-white text-black hover:bg-white dark:bg-black dark:text-white dark:border-white/20 dark:hover:bg-white/10 bw:bg-white bw:text-black hover:text-black'}`}
                            >
                                ALL
                            </button>
                            {data.categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => router.push(`/boards/${slug}?category=${cat.id}`)}
                                    className={`rounded-xl border-2 border-black px-4 py-2 font-bold transition-all ${categoryId === cat.id
                                        ? 'bg-[#FFD600] text-black hover:bg-white dark:text-black bw:bg-[#FFD600] bw:text-black'
                                        : 'bg-white text-black hover:bg-white dark:bg-black dark:text-white dark:border-white/20 dark:hover:bg-white/10 bw:bg-white bw:text-black hover:text-black'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            {/* View Toggle */}
                            <div className="flex rounded-xl border-2 border-black bg-white p-1 dark:border-white/20 dark:bg-black bw:border-black bw:bg-white">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${viewMode === 'grid'
                                        ? 'bg-black text-white dark:bg-white dark:text-black bw:bg-black bw:text-white'
                                        : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                                    title="Grid View"
                                >
                                    <span className="material-symbols-outlined notranslate text-[20px]">grid_view</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${viewMode === 'list'
                                        ? 'bg-black text-white dark:bg-white dark:text-black bw:bg-black bw:text-white'
                                        : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                                    title="List View"
                                >
                                    <span className="material-symbols-outlined notranslate text-[20px]">view_list</span>
                                </button>
                            </div>
                        </div>

                        {(data.board.access_level !== 'ADMIN' || (session as any)?.user?.isAdmin) && (
                            <Link
                                href={`/boards/${slug}/new`}
                                className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#FFD600] px-6 py-2 text-sm font-black uppercase text-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:shadow-none bw:bg-black bw:text-white"
                            >
                                <span className="material-symbols-outlined notranslate text-lg">edit</span>
                                Write Post
                            </Link>
                        )}
                    </div>

                    {/* Notices */}
                    {data.notices.length > 0 && (
                        <div className="mb-8 space-y-4">
                            {data.notices.map((post: any) => (
                                <Link
                                    key={post.id}
                                    href={`/boards/${slug}/posts/${post.id}`}
                                    className="block rounded-xl border-2 border-dashed border-[#FFD600] bg-yellow-50/50 p-6 transition-colors hover:bg-yellow-50 dark:bg-yellow-900/10 dark:hover:bg-yellow-900/20 bw:bg-white bw:border-black"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="rounded bg-[#FFD600] px-2 py-0.5 text-[10px] font-black uppercase text-black">NOTICE</span>
                                        {post.category && (
                                            <span className="text-xs font-bold text-gray-500">{post.category.name}</span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-black">{post.title}</h3>
                                    <div className="mt-2 text-xs font-bold text-gray-400">
                                        {post.author?.nickname || 'Admin'} · {format(new Date(post.created_at), 'PPP', { locale: ko })}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Posts Grid/List */}
                    <div className={viewMode === 'grid' ? "grid gap-4" : "space-y-4"}>
                        {data.posts.length === 0 ? (
                            <div className="rounded-xl border-2 border-black bg-gray-50 p-12 text-center text-gray-500 dark:border-white/20 dark:bg-black bw:border-black bw:bg-gray-50">
                                <p className="font-bold">아직 게시글이 없습니다. 첫 번째 글을 작성해보세요!</p>
                            </div>
                        ) : (
                            viewMode === 'grid' ? (
                                // GRID VIEW (Existing)
                                data.posts.map((post: any) => (
                                    <Link
                                        key={post.id}
                                        href={`/boards/${slug}/posts/${post.id}`}
                                        className="group block rounded-xl border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-white/20 dark:bg-black dark:shadow-none dark:hover:bg-white/5 bw:border-black bw:bg-white bw:shadow-[4px_4px_0px_0px_black]"
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {post.category && (
                                                    <span className="rounded bg-black px-2 py-0.5 text-[10px] font-black uppercase text-white dark:bg-white dark:text-black bw:bg-black bw:text-white">
                                                        {post.category.name}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs font-bold text-gray-400">
                                                {format(new Date(post.created_at), 'PPP', { locale: ko })}
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-xl font-black group-hover:underline">{post.title}</h3>
                                        <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                                            <span>{post.author?.nickname || 'Anonymous'}</span>
                                            <div className="flex gap-3">
                                                <span className="flex items-center gap-1">
                                                    <i className="material-symbols-outlined text-[14px]">visibility</i>
                                                    {post.view_count}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i className="material-symbols-outlined text-[14px]">favorite</i>
                                                    {post.like_count}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                // LIST VIEW (New Table-style)
                                <div className="rounded-2xl border-2 border-black bg-white overflow-hidden dark:bg-black dark:border-white/20 bw:border-black">
                                    <div className="hidden md:grid grid-cols-[60px_1fr_120px_120px_100px] border-b-2 border-black bg-black px-6 py-4 text-[11px] font-black tracking-widest text-white uppercase dark:border-white/10 bw:border-black">
                                        <div className="text-center">No</div>
                                        <div>Title</div>
                                        <div className="text-center">Author</div>
                                        <div className="text-center">Date</div>
                                        <div className="text-center">Views</div>
                                    </div>
                                    <div className="divide-y divide-gray-100 dark:divide-white/5 bw:divide-black">
                                        {data.posts.map((post: any) => (
                                            <div key={post.id} className="group flex flex-col gap-4 p-6 md:grid md:grid-cols-[60px_1fr_120px_120px_100px] md:items-center md:gap-0 md:px-6 md:py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <div className="hidden md:block text-center font-mono text-sm font-bold text-gray-400">{post.id}</div>

                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 md:hidden">
                                                        {post.category && (
                                                            <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-500 dark:bg-white/10 dark:text-gray-300">
                                                                {post.category.name}
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-gray-400">{format(new Date(post.created_at), 'yyyy.MM.dd')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {post.category && (
                                                            <span className="hidden md:inline-block rounded bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-500 dark:bg-white/10 dark:text-gray-300">
                                                                {post.category.name}
                                                            </span>
                                                        )}
                                                        <Link href={`/boards/${slug}/posts/${post.id}`} className="font-bold text-lg md:text-base group-hover:underline">
                                                            {post.title}
                                                        </Link>
                                                        {post.file_url && (
                                                            <span className="material-symbols-outlined notranslate text-[16px] text-gray-400">attach_file</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between md:justify-center md:text-sm font-bold text-gray-500">
                                                    <span className="md:hidden text-xs">작성자</span>
                                                    <span>{post.author?.nickname || 'Anonymous'}</span>
                                                </div>

                                                <div className="hidden md:block text-center text-sm font-bold text-gray-400">
                                                    {format(new Date(post.created_at), 'yyyy.MM.dd')}
                                                </div>

                                                <div className="flex items-center justify-end md:justify-center gap-4 text-gray-400 text-xs md:text-sm font-bold">
                                                    <div className="flex items-center gap-1">
                                                        <span className="material-symbols-outlined notranslate text-[16px] md:hidden">visibility</span>
                                                        {post.view_count}
                                                    </div>
                                                    <div className="flex items-center gap-1 md:hidden">
                                                        <span className="material-symbols-outlined notranslate text-[16px]">favorite</span>
                                                        {post.like_count}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    {/* Pagination */}
                    {data.pagination.total_pages > 1 && (
                        <div className="mt-12 flex justify-center gap-2">
                            {Array.from({ length: data.pagination.total_pages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => router.push(`/boards/${slug}?page=${p}`)}
                                    className={`h-10 w-10 rounded-lg border-2 border-black font-black transition-all hover:bg-gray-100 disabled:opacity-50 dark:border-white/20 dark:hover:bg-white/10 bw:border-black bw:hover:bg-gray-100 ${p === page
                                        ? 'bg-black text-white dark:bg-white dark:text-black bw:bg-black bw:text-white'
                                        : 'bg-white text-black dark:bg-black dark:text-white bw:bg-white bw:text-black'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <SimpleFooter />
        </div>
    );
}
