'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SimpleHeader from '../SimpleHeader';
import SimpleFooter from '../SimpleFooter';

interface Post {
    id: number;
    title: string;
    author: string;
    date: string;
    views: string;
    isAnnouncement?: boolean;
    category?: string;
    hasImage?: boolean;
    hasAttachment?: boolean;
}

interface BoardTemplateProps {
    title: string;
    highlightedWord: string;
    description: string;
    posts: Post[];
    categories: string[];
}

export default function BoardTemplate({
    title,
    highlightedWord,
    description,
    posts,
    categories
}: BoardTemplateProps) {
    const [activeCategory, setActiveCategory] = useState('전체');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const itemsPerPage = 5;

    // Handle window resizesafely
    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Filter posts
    const filteredPosts = posts.filter((post) => {
        const matchesCategory = activeCategory === '전체' || post.category === activeCategory;
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Calculate visible pages for Smart Pagination
    const getVisiblePages = () => {
        const pages = [];
        const delta = isMobile ? 1 : 2; // Show fewer neighbors on mobile

        if (totalPages <= (isMobile ? 5 : 7)) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            const start = Math.max(2, currentPage - delta);
            const end = Math.min(totalPages - 1, currentPage + delta);

            if (start > 2) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push('...');
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-white font-sans text-black selection:bg-[#FFD600] selection:text-black dark:bg-[#111] dark:text-white">
            <SimpleHeader />

            <main className="relative pt-32 pb-24">
                {/* Dot Pattern Background */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.1]"
                    style={{
                        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                ></div>

                <div className="relative z-10 mx-auto max-w-[1200px] px-4">
                    {/* Header Section */}
                    <div className="mb-16 border-l-[6px] border-[#FFD600] pl-6">
                        <h1 className="mb-4 text-5xl font-black tracking-tight md:text-6xl">
                            {title} <span className="bg-[#FFD600] px-2 text-black">{highlightedWord}</span>
                        </h1>
                        <p className="max-w-2xl text-lg font-bold text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                    </div>

                    {/* Toolbar: Filters & Search */}
                    <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={() => { setActiveCategory('전체'); setCurrentPage(1); }}
                                className={`h-11 rounded-xl border-2 border-black px-6 font-black transition-all ${activeCategory === '전체'
                                    ? 'bg-black text-white dark:bg-white dark:text-black'
                                    : 'bg-white text-black hover:bg-gray-50 dark:bg-black dark:text-white dark:hover:bg-white/5'
                                    }`}
                            >
                                전체
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                                    className={`h-11 rounded-xl border-2 border-black px-6 font-black transition-all ${activeCategory === cat
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'bg-white text-black hover:bg-gray-50 dark:bg-black dark:text-white dark:hover:bg-white/5'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-[400px]">
                            <span className="material-symbols-outlined notranslate absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="게시글 검색..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="h-12 w-full rounded-2xl border-2 border-black bg-white pl-12 pr-4 font-bold text-black focus:outline-none dark:bg-black dark:text-white dark:border-white/20"
                            />
                        </div>
                    </div>

                    {/* Board Table */}
                    <div className="overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white/10 dark:bg-[#111] dark:shadow-none">

                        {/* Table Header - Hide on Mobile */}
                        <div className="hidden md:grid grid-cols-[60px_1fr_120px_120px_100px] border-b-2 border-black bg-black px-6 py-4 text-[11px] font-black tracking-widest text-white uppercase dark:border-white/10">
                            <div className="text-center">번호</div>
                            <div>제목</div>
                            <div className="text-center">작성자</div>
                            <div className="text-center">날짜</div>
                            <div className="text-center">조회수</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-100 dark:divide-white/5">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className={`group flex flex-col gap-4 p-6 md:grid md:grid-cols-[60px_1fr_120px_120px_100px] md:items-center md:gap-0 md:px-6 md:py-5 transition-colors hover:bg-gray-50 dark:hover:bg-white/5 ${post.isAnnouncement ? 'bg-[#FEFCE8] dark:bg-yellow-900/10' : ''}`}
                                    >
                                        {/* Mobile: Top Row with Badge/Category */}
                                        <div className="flex items-center justify-between md:hidden">
                                            <div className="flex items-center gap-2">
                                                {post.isAnnouncement && (
                                                    <span className="rounded-md border border-black bg-[#FFD600] px-2 py-0.5 text-[10px] font-black text-black">
                                                        공지
                                                    </span>
                                                )}
                                                <span className="text-xs font-bold text-gray-400">
                                                    {post.category || 'General'}
                                                </span>
                                            </div>
                                            <span className="text-xs font-bold text-gray-400">{post.date}</span>
                                        </div>

                                        {/* ID Column */}
                                        <div className="hidden text-center font-mono text-sm font-bold text-gray-400 group-hover:text-black md:block dark:group-hover:text-white">
                                            {post.isAnnouncement ? (
                                                <span className="material-symbols-outlined notranslate text-xl text-yellow-600">campaign</span>
                                            ) : (
                                                post.id
                                            )}
                                        </div>

                                        {/* Title Column */}
                                        <div className="flex items-center gap-3">
                                            {/* Desktop Badge */}
                                            {post.isAnnouncement && (
                                                <span className="hidden rounded-lg border border-black bg-[#FFD600] px-2 py-0.5 text-[10px] font-black text-black md:inline-block">
                                                    공지
                                                </span>
                                            )}
                                            <Link href={`#`} className="text-lg font-black leading-tight text-black group-hover:underline md:text-base md:font-bold dark:text-white">
                                                {post.title}
                                            </Link>
                                            {post.hasImage && (
                                                <span className="material-symbols-outlined notranslate text-lg text-gray-400">image</span>
                                            )}
                                            {post.hasAttachment && (
                                                <span className="material-symbols-outlined notranslate text-lg text-gray-400">attach_file</span>
                                            )}
                                        </div>

                                        {/* Mobile: Bottom Row with Author/Views */}
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-3 md:hidden dark:border-white/5">
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 w-5 rounded-full border border-black/10 bg-blue-100 dark:bg-blue-900/30"></div>
                                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{post.author}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined notranslate text-[14px]">visibility</span>
                                                    {post.views}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Desktop Columns */}
                                        <div className="hidden items-center justify-center gap-2 md:flex">
                                            <div className="h-6 w-6 rounded-full border border-black/10 bg-blue-100 dark:bg-blue-900/30"></div>
                                            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{post.author}</span>
                                        </div>
                                        <div className="hidden text-center text-sm font-bold text-gray-400 md:block">
                                            {post.date}
                                        </div>
                                        <div className="hidden justify-center md:flex">
                                            <span className="rounded bg-gray-50 px-2 py-1 text-xs font-black text-black dark:bg-white/5 dark:text-white/60">
                                                {post.views}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-gray-500 font-bold">
                                    해당하는 게시글이 없습니다.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination & Write Button */}
                    <div className="mt-12 flex flex-col items-center gap-8 md:flex-row md:justify-between">
                        <div className="flex w-full items-center justify-between gap-2 rounded-2xl border-2 border-black bg-white p-2 md:w-auto dark:bg-black dark:border-white/20">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-white/10"
                            >
                                <span className="material-symbols-outlined notranslate">chevron_left</span>
                            </button>

                            <div className="flex flex-1 items-center justify-center gap-1">
                                {getVisiblePages().map((page, i) => (
                                    <button
                                        key={i}
                                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                                        disabled={page === '...'}
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all font-bold ${currentPage === page
                                            ? 'bg-black text-white dark:bg-white dark:text-black'
                                            : page === '...'
                                                ? 'cursor-default text-gray-400'
                                                : 'hover:bg-gray-100 dark:hover:bg-white/10'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-white/10"
                            >
                                <span className="material-symbols-outlined notranslate">chevron_right</span>
                            </button>
                        </div>

                        <Link
                            href="/login"
                            className="flex w-auto items-center justify-center gap-3 rounded-xl border-2 border-black bg-[#FFD600] px-6 py-3 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:px-8 md:py-4"
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
