'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import SimpleHeader from '../../../../components/layout/SimpleHeader';
import SimpleFooter from '../../../../components/layout/SimpleFooter';
import { api } from '../../../../lib/api-client';
import { Post, Comment } from '../../../../lib/types/api';
import { CommentSection } from '../../../../components/features/community/CommentSection';
import { LikeButton } from '../../../../components/features/community/LikeButton';
import { MarkdownViewer } from '@/app/components/ui/MarkdownViewer';

export default function PostDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { data: session, status } = useSession();
    const slug = params.slug as string;
    const postId = params.post_id as string;

    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPostData = useCallback(async () => {
        setIsLoading(true);
        try {
            const postRes = await api.get<Post>(`/api/posts/${postId}`);

            if (postRes && postRes.success && postRes.data) {
                setPost(postRes.data);
            } else {
                setError('Failed to load post data');
            }
        } catch (err: any) {
            // Handle 401 (Login Required) gracefully by redirecting to login
            if (err.message?.includes('Login required') || err.message?.includes('401')) {
                router.replace(`/login?error=SessionExpired&callbackUrl=/boards/${slug}/posts/${postId}`);
                return;
            }
            setError(err.message || 'Failed to load post');
        } finally {
            setIsLoading(false);
        }
    }, [postId, slug, router]);

    useEffect(() => {
        // REMOVED: Forced client-side redirect. 
        // Access is now controlled by the backend and middleware config.

        if (postId) {
            fetchPostData();

            // Handle view count increment (Unique per session)
            const viewKey = `viewed_post_${postId}`;
            if (!sessionStorage.getItem(viewKey)) {
                api.post(`/api/posts/${postId}/view`, {}).then(() => {
                    sessionStorage.setItem(viewKey, 'true');
                }).catch(err => console.error(err));
            }
        }
    }, [postId, fetchPostData]);

    const handleDeletePost = async () => {
        if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
        try {
            const token = (session as any)?.accessToken;
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const res = await api.delete(`/api/posts/${postId}`, { headers });
            if (res.success) {
                router.push(`/boards/${slug}`);
            }
        } catch (err: any) {
            console.error("Delete failed", err);
            alert(`삭제 실패: ${err.message}`);
        }
    };

    if (isLoading) return <div className="min-h-screen animate-pulse bg-white dark:bg-black bw:bg-white" />;
    if (error || !post) return <div className="p-20 text-center font-black text-red-500">{error || 'Post not found'}</div>;

    const isOfficialBoard = slug === 'blog' || slug === 'research';
    const canManage = isOfficialBoard
        ? !!session?.user?.isAdmin  // Official boards: Only Admins can manage
        : (session?.user?.id === post.user_id || session?.user?.isAdmin); // Others: Owner or Admin

    return (
        <div className="min-h-screen bg-white font-sans text-black dark:bg-[#111] dark:text-white bw:bg-white bw:text-black">
            <SimpleHeader redirectOnLogout={slug === 'CL_Project_QnA' ? '/' : undefined} />
            <main className="relative pt-32 pb-24">
                <div className="mx-auto max-w-[900px] px-4">
                    {/* Post Header */}
                    <div className="mb-8">
                        <Link
                            href={slug === 'blog' ? '/blog' : slug === 'research' ? '/research' : `/boards/${slug}`}
                            className="mb-6 inline-flex items-center gap-2 text-sm font-black uppercase text-gray-400 hover:text-black dark:hover:text-white bw:hover:text-black"
                        >
                            <span className="material-symbols-outlined notranslate">arrow_back</span>
                            Back to {slug === 'research' ? 'Lab' : slug}
                        </Link>
                        <h1 className="mb-4 text-4xl font-black leading-tight md:text-5xl">{post.title}</h1>
                        <div className="flex items-center justify-between border-b-4 border-black pb-6 dark:border-white/10 bw:border-black">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full border-2 border-black bg-[#FFD600] dark:border-white/20 bw:border-black"></div>
                                <div>
                                    <p className="font-black">{post.author?.nickname || 'Anonymous'}</p>
                                    <p className="text-xs font-bold text-gray-400">
                                        {format(new Date(post.created_at), 'PPP', { locale: ko })} · 조회 {post.view_count}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {canManage && (
                                    <>
                                        <Link href={`/boards/${slug}/posts/${postId}/edit`} className="rounded-lg border-2 border-black bg-white p-2 hover:bg-gray-50 dark:bg-black dark:border-white/20 dark:hover:bg-white/5 bw:border-black bw:bg-white bw:hover:bg-gray-100">
                                            <span className="material-symbols-outlined notranslate text-gray-500">edit</span>
                                        </Link>
                                        <button onClick={handleDeletePost} className="rounded-lg border-2 border-black bg-white p-2 hover:bg-red-50 dark:bg-black dark:border-white/20 dark:hover:bg-red-900/20 bw:border-black bw:bg-white bw:hover:bg-red-50">
                                            <span className="material-symbols-outlined notranslate text-red-500">delete</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-12">
                        <MarkdownViewer content={post.content} />
                    </div>

                    {/* File Attachment */}
                    {post.file_url && (
                        <div className="mb-12 rounded-2xl border-2 border-black bg-gray-50 p-6 dark:bg-white/5 dark:border-white/10 bw:border-black bw:bg-gray-50">
                            <h4 className="mb-2 text-xs font-black uppercase text-gray-400">Attached File</h4>
                            <a
                                href={post.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-black text-[#FFD600] hover:underline"
                            >
                                <span className="material-symbols-outlined notranslate">attachment</span>
                                {post.file_url.split('/').pop()?.split('-').slice(1).join('-') || 'Download Attachment'}
                            </a>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mb-16 flex justify-center gap-6">
                        <LikeButton
                            postId={post.id}
                            initialLiked={post.liked}
                            initialLikeCount={post.like_count}
                        />
                    </div>

                    {/* Comments Section */}
                    <CommentSection postId={post.id} />
                </div>
            </main>
            <SimpleFooter />
        </div>
    );
}
