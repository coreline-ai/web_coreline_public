'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SimpleHeader from '../../../components/layout/SimpleHeader';
import SimpleFooter from '../../../components/layout/SimpleFooter';
import { api } from '../../../lib/api-client';
import { BoardCategory, ApiResponse } from '../../../lib/types/api';
import { FileUpload } from '@/app/components/ui/FileUpload';

export default function NewPostPage() {
    const router = useRouter();
    const params = useParams();
    const { data: session, status } = useSession();
    const slug = params.slug as string;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [isNotice, setIsNotice] = useState(false);
    const [categories, setCategories] = useState<BoardCategory[]>([]);

    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get<any>(`/api/boards/${slug}`);
                if (res.success && res.data) {
                    setCategories(res.data.categories);
                }
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };
        if (slug) fetchCategories();
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryId) {
            setError('Please select a category');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // File upload is handled by FileUpload component now
            const fileUrl = uploadedFileUrl;

            const res = await api.post<any>('/api/posts', {
                board_slug: slug,
                category_id: categoryId,
                title,
                content,
                is_notice: isNotice,
                file_url: fileUrl || undefined
            });

            if (res && res.success && res.data) {
                alert('게시글이 성공적으로 등록되었습니다.');
                router.push(`/boards/${slug}/posts/${res.data.id}`);
            } else {
                setError(res?.error || 'Failed to create post');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    if (status === 'loading') return null;

    return (
        <div className="min-h-screen bg-white font-sans text-black dark:bg-[#111] dark:text-white bw:bg-white bw:text-black">
            <SimpleHeader redirectOnLogout={slug === 'CL_Project_QnA' ? '/' : undefined} />
            <main className="relative pt-32 pb-24">
                <div className="mx-auto max-w-[1000px] px-4">
                    <div className="mb-12 border-l-[6px] border-[#FFD600] pl-6">
                        <h1 className="mb-4 text-4xl font-black tracking-tight">새 게시글 작성</h1>
                        <p className="text-lg font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">
                            {slug.toUpperCase()} 보드에 새로운 생각을 공유하세요.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="overflow-hidden rounded-[2rem] border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_black] dark:border-white/20 dark:bg-black dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_black]">
                            {error && (
                                <div className="mb-6 rounded-xl border-2 border-red-500 bg-red-50 p-4 text-xs font-bold text-red-500 dark:bg-red-500/10 bw:bg-red-50">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-xs font-black uppercase text-gray-400">카테고리</label>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => setCategoryId(cat.id)}
                                                    className={`rounded-xl border-2 border-black px-4 py-2 font-bold transition-all ${categoryId === cat.id
                                                        ? 'bg-[#FFD600] text-black hover:bg-white dark:text-black bw:bg-[#FFD600] bw:text-black'
                                                        : 'bg-white text-black hover:bg-white active:bg-gray-200 dark:bg-black dark:text-white dark:border-white/20 dark:hover:bg-white/10 bw:bg-white bw:text-black hover:text-black'}`}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {session?.user?.isAdmin && (
                                        <div className="flex items-center gap-3 pt-6">
                                            <input
                                                type="checkbox"
                                                id="isNotice"
                                                checked={isNotice}
                                                onChange={(e) => setIsNotice(e.target.checked)}
                                                className="h-5 w-5 rounded border-2 border-black accent-black"
                                            />
                                            <label htmlFor="isNotice" className="text-sm font-black uppercase">공지사항으로 등록</label>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-black uppercase text-gray-400">제목</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        placeholder="글 제목을 입력하세요"
                                        className="w-full rounded-xl border-2 border-black bg-gray-50 p-4 text-lg font-black text-black placeholder-gray-300 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white bw:border-black bw:bg-gray-50 bw:text-black"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-black uppercase text-gray-400">내용</label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        rows={12}
                                        placeholder="여러분의 생각을 자유롭게 적어주세요..."
                                        className="w-full rounded-xl border-2 border-black bg-gray-50 p-4 font-bold text-black placeholder-gray-300 focus:outline-none dark:border-white/20 dark:bg-black dark:text-white bw:border-black bw:bg-gray-50 bw:text-black"
                                    />
                                </div>

                                <FileUpload
                                    onUploadComplete={(url, name) => {
                                        setUploadedFileUrl(url);
                                        setUploadedFileName(name);
                                    }}
                                    onError={(msg) => setError(msg)}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="rounded-xl border-2 border-black bg-white px-8 py-3 text-sm font-black uppercase shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:shadow-none dark:bg-transparent dark:border-white/20 dark:text-white bw:bg-white bw:border-black bw:text-black"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="rounded-xl border-2 border-black bg-[#FFD600] px-12 py-3 text-sm font-black uppercase shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50 dark:shadow-none dark:text-black bw:bg-black bw:text-white"
                            >
                                {isLoading ? '등록 중...' : '게시글 등록하기'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <SimpleFooter />
        </div>
    );
}
