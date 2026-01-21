"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import { useRequest } from "@/app/lib/use-request";
import { Comment, ApiResponse } from "@/app/lib/types/api";
import { api } from "@/app/lib/api-client";

interface CommentSectionProps {
    postId: number;
}

export function CommentSection({ postId }: CommentSectionProps) {
    const { data: session } = useSession();
    // useRequest returns { data: ApiResponse<Comment[]>, ... } or directly data pending on implementation. 
    // Checking api-client, useRequest is wrapper over SWR. The `fetcher` usually returns `response.json()`.
    // My api-client request returns `body` which is `ApiResponse<T>`.
    // So `data` here is `ApiResponse<Comment[]>`.
    const { data: response, isLoading, mutate } = useRequest<Comment[]>(`/api/posts/${postId}/comments`);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const comments = response?.success && response.data ? response.data : [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !session) return;

        setIsSubmitting(true);
        try {
            // Send only content as per backend schema (post_id is in URL)
            const res = await api.post<Comment>(`/api/posts/${postId}/comments`, { content });
            if (res.success) {
                setContent("");
                mutate(); // Refresh comments
            } else {
                throw new Error(res.error || "Unknown error");
            }
        } catch (error: any) {
            console.error(error);
            alert(`Failed to create comment: ${error.message || error}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (commentId: number) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;
        try {
            const res = await api.delete(`/api/comments/${commentId}`);
            if (res.success) {
                mutate();
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete comment");
        }
    };

    return (
        <div className="mt-12 border-t pt-8">
            <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>

            {/* Comment Form */}
            {session ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="relative">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write a comment..."
                            className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-[100px] resize-none text-black dark:bg-[#111] dark:border-white/20 dark:text-white dark:placeholder-gray-500 bw:bg-gray-50 bw:text-black bw:border-black"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || !content.trim()}
                            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#FFD600] dark:text-black dark:hover:bg-[#FFD600]/80 bw:bg-black bw:text-white"
                        >
                            <span className="material-symbols-outlined text-[18px]">send</span>
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 mb-8 border border-gray-200">
                    Please <a href="/login" className="text-black underline font-medium">login</a> to leave a comment.
                </div>
            )}

            {/* Comment List */}
            <div className="space-y-6">
                {isLoading ? (
                    <div className="text-center py-4 text-gray-500">Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No comments yet. Be the first to share your thoughts!</div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 group">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                <span className="material-symbols-outlined text-gray-500">person</span>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm">{comment.author?.nickname || "User"}</span>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-400">
                                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="text-sm font-medium whitespace-pre-wrap text-black dark:text-gray-200 bw:text-black">{comment.content}</p>
                            </div>
                            {/* Delete Button (Only for author or admin) */}
                            {(session?.user?.id === comment.user_id || session?.user?.isAdmin) && (
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-2"
                                    title="Delete comment"
                                >
                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
