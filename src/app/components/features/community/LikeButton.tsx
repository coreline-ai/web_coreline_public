"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/app/lib/api-client";

interface LikeButtonProps {
    postId: number;
    initialLiked?: boolean;
    initialLikeCount: number;
}

export function LikeButton({ postId, initialLiked = false, initialLikeCount }: LikeButtonProps) {
    const { data: session } = useSession();
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialLikeCount);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleLike = async () => {
        if (!session) {
            alert("Please login to like users posts");
            return;
        }
        if (isLoading) return;

        // Optimistic UI
        const previousLiked = liked;
        const previousCount = count;
        setLiked(!liked);
        setCount(liked ? count - 1 : count + 1);
        setIsLoading(true);

        try {
            const res = await api.post<{ liked: boolean; like_count: number }>(`/api/posts/${postId}/like`, {});
            if (res.success && res.data) {
                setLiked(res.data.liked);
                setCount(res.data.like_count);
            } else {
                throw new Error(res.error || "Failed to toggle like");
            }
        } catch (error) {
            // Revert on error
            setLiked(previousLiked);
            setCount(previousCount);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggleLike}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${liked
                    ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                }`}
        >
            <span className={`material-symbols-outlined ${liked ? "fill-current" : ""}`}>favorite</span>
            <span className="font-medium text-sm">{count}</span>
        </button>
    );
}
