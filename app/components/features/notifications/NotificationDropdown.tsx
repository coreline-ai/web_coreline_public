"use client";

import { useState } from "react";
import { useRequest } from "@/app/lib/use-request";
import { api } from "@/app/lib/api-client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { mutate } from "swr";

interface Notification {
    id: number;
    user_id: string;
    actor_id: string;
    post_id?: number;
    comment_id?: number;
    type: string;
    is_read: boolean;
    created_at: string;
    actor: {
        nickname: string;
        email: string;
    };
    post?: {
        title: string;
        slug: string; // Assuming we need this for linking
    };
}

export function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: response, isLoading } = useRequest<Notification[]>('/api/notifications');

    const notifications = (response?.success && response.data) ? response.data : [];
    const unreadCount = notifications.filter(n => !n.is_read).length;

    const handleMarkAsRead = async (id: number) => {
        try {
            const res = await api.post(`/api/notifications/${id}/read`, {});
            if (res.success) {
                mutate('/api/notifications');
            }
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            // We might need a mark-all-read endpoint, but for now loop or just visual
            // Let's implement individual for MVP or loop
            // Actually, usually opening the dropdown marks them as read or clicking.
            // Let's leave it manual for now.
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-white dark:border-black">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-[8px_8px_0px_0px_black] border-4 border-black overflow-hidden z-50 dark:bg-black dark:border-white/20 dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_black]">
                        <div className="flex items-center justify-between p-4 border-b-2 border-black bg-[#FFD600] dark:border-white/20 dark:bg-white/10 bw:border-black bw:bg-[#FFD600]">
                            <h3 className="font-black text-black dark:text-white bw:text-black">Notifications</h3>
                            {unreadCount > 0 && (
                                <span className="text-xs font-black cursor-pointer hover:underline text-black/70 dark:text-white/70">Mark all read</span>
                            )}
                        </div>

                        <div className="max-h-96 overflow-y-auto bg-white dark:bg-black bw:bg-white">
                            {isLoading ? (
                                <div className="p-4 text-center text-gray-400 text-sm font-bold">Loading...</div>
                            ) : notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-400 text-sm font-bold">
                                    <span className="material-symbols-outlined text-4xl mb-2 opacity-20">notifications_off</span>
                                    <p>No notifications yet</p>
                                </div>
                            ) : (
                                <div>
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${!notification.is_read ? 'bg-yellow-50 dark:bg-yellow-500/10' : ''}`}
                                            onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
                                        >
                                            <div className="flex gap-3">
                                                <div className="h-8 w-8 rounded-full border-2 border-black bg-white text-black flex items-center justify-center flex-shrink-0 dark:border-white/50 dark:bg-black dark:text-white bw:border-black bw:bg-white bw:text-black">
                                                    <span className="material-symbols-outlined text-sm font-bold">person</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-black dark:text-white bw:text-black">
                                                        <span className="font-black">{notification.actor.nickname}</span>
                                                        {notification.type === 'COMMENT' && " commented on your post"}
                                                        {notification.type === 'LIKE' && " liked your post"}
                                                        {notification.type === 'REPLY' && " replied to your comment"}
                                                    </p>
                                                    {notification.post && (
                                                        <Link
                                                            href={`/boards/${notification.post.slug || 'blog'}/posts/${notification.post_id}`}
                                                            className="text-xs font-black text-gray-500 mt-1 block hover:text-[#FFD600] dark:text-gray-400 dark:hover:text-[#FFD600] truncate"
                                                        >
                                                            "{notification.post.title}"
                                                        </Link>
                                                    )}
                                                    <span className="text-[10px] text-gray-400 font-bold mt-2 block">
                                                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
