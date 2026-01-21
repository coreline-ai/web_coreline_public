'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SimpleHeader from '../../../../../components/SimpleHeader';
import SimpleFooter from '../../../../../components/SimpleFooter';
import { api } from '../../../../../lib/api-client';
import { BoardCategory, Post } from '../../../../../lib/types/api';

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const { data: session, status } = useSession();
    const slug = params.slug as string;
    const postId = params.post_id as string;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<BoardCategory[]>([]);

    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            try {
                // Fetch post detail and categories in parallel
                const [postRes, boardRes] = await Promise.all([
                    api.get<Post>(`/api/posts/${postId}`),
                    api.get<any>(`/api/boards/${slug}`)
                ]);

                if (postRes.success && postRes.data) {
                    const post = postRes.data;
                    setTitle(post.title);
                    setContent(post.content);
                    setCategoryId(post.category_id);

                    // Check if owner
                    if (status === 'authenticated' && session?.user?.id !== post.user_id && !session?.user?.isAdmin) {
                        alert('권한이 없습니다.');
                        router.push(`/boards/${slug}/posts/${postId}`);
                        return;
                    }
                }

                if (boardRes.success && boardRes.data) {
                    setCategories(boardRes.data.categories);
                }
            } catch (err: any) {
                setError(err.message || '데이터를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        if (postId && slug && status === 'authenticated') {
            loadInitialData();
        }
    }, [postId, slug, status, session, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryId) {
            setError('카테고리를 선택해주세요.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            let fileUrl = undefined;

            if (file) {
                const signedRes = await api.post<any>('/api/files/signed-url', {
                    filename: file.name,
                    content_type: file.type
                });

                if (signedRes.success && signedRes.data) {
                    const { upload_url, fields, file_url: uploadedFileUrl } = signedRes.data;

                    const formData = new FormData();
                    Object.entries(fields).forEach(([key, value]) => {
                        formData.append(key, value as string);
                    });
                    formData.append('file', file);

                    const uploadReq = await fetch(upload_url, {
                        method: 'POST',
                        body: formData
                    });

                    if (uploadReq.ok) {
                        fileUrl = uploadedFileUrl;
                    } else {
                        throw new Error('File upload failed');
                    }
                }
            }

            const res = await api.patch<Post>(`/api/posts/${postId}`, {
                title,
                content,
                category_id: categoryId,
                file_url: fileUrl
            });

            if (res.success) {
                router.push(`/boards/${slug}/posts/${postId}`);
            } else {
                setError(res.error || '수정에 실패했습니다.');
            }
        } catch (err: any) {
            setError(err.message || '오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || status === 'loading') {
        return <div className="min-h-screen animate-pulse bg-white dark:bg-black bw:bg-white" />;
    }

    return (
        <div className="min-h-screen bg-white font-sans text-black dark:bg-[#111] dark:text-white bw:bg-white bw:text-black">
            <SimpleHeader />
            <main className="relative pt-32 pb-24">
                <div className="mx-auto max-w-[1000px] px-4">
                    <div className="mb-12 border-l-[6px] border-[#FFD600] pl-6">
                        <h1 className="mb-4 text-4xl font-black tracking-tight">게시글 수정</h1>
                        <p className="text-lg font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">
                            기존 게시글의 내용을 수정합니다.
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
                                <div>
                                    <label className="mb-2 block text-xs font-black uppercase text-gray-400">카테고리</label>
                                    <select
                                        value={categoryId || ''}
                                        onChange={(e) => setCategoryId(Number(e.target.value))}
                                        required
                                        className="w-full rounded-xl border-2 border-black bg-gray-50 p-3 font-bold text-black focus:outline-none dark:border-white/20 dark:bg-black dark:text-white bw:border-black bw:bg-gray-50 bw:text-black"
                                    >
                                        <option value="" disabled>카테고리 선택</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
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

                                <div className="rounded-xl border-2 border-dashed border-black/20 p-6 dark:border-white/10 bw:border-black/20">
                                    <label className="mb-4 block text-xs font-black uppercase text-gray-400">첨부 파일 (선택 시 교체됨)</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        className="text-sm font-bold text-gray-500 file:mr-4 file:rounded-xl file:border-0 file:bg-black file:px-4 file:py-2 file:text-xs file:font-black file:uppercase file:text-white dark:file:bg-white dark:file:text-black bw:file:bg-black bw:file:text-white"
                                    />
                                    {file && (
                                        <p className="mt-2 text-xs font-bold text-[#FFD600]">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="rounded-xl border-2 border-black bg-white px-8 py-3 text-sm font-black uppercase shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:bg-transparent dark:border-white/20 dark:text-white bw:bg-white bw:border-black bw:text-black"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-xl border-2 border-black bg-[#FFD600] px-12 py-3 text-sm font-black uppercase shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50 dark:text-black bw:bg-black bw:text-white"
                            >
                                {isSubmitting ? '수정 중...' : '수정 완료'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <SimpleFooter />
        </div>
    );
}
