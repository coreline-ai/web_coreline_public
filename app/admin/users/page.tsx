'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SimpleHeader from '../../components/layout/SimpleHeader';
import SimpleFooter from '../../components/layout/SimpleFooter';
import { api } from '../../lib/api-client';
import { User, ApiResponse } from '../../lib/types/api';
import { format } from 'date-fns';

export default function AdminUsersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async (page = 1) => {
        setIsLoading(true);
        try {
            const res = await api.get<any>(`/api/admin/users?page=${page}`);
            if (res.success && res.data) {
                setUsers(res.data.items);
                setPagination(res.data.pagination);
            } else {
                setError(res.error || 'Failed to fetch users');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.isAdmin) {
            fetchUsers();
        } else if (status === 'authenticated' && !session?.user?.isAdmin) {
            router.push('/');
        } else if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, session, router]);

    const handleToggleAdmin = async (user: User) => {
        try {
            const res = await api.patch<User>(`/api/admin/users/${user.id}`, {
                is_admin: !user.is_admin
            });
            if (res.success) {
                setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_admin: !u.is_admin } : u));
            }
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const handleToggleBan = async (user: User) => {
        if (!confirm(`정말 ${user.nickname}님을 ${user.is_banned ? '차단 해제' : '차단'}하시겠습니까?`)) return;
        try {
            const res = await api.patch<User>(`/api/admin/users/${user.id}`, {
                is_banned: !user.is_banned
            });
            if (res.success) {
                setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_banned: !u.is_banned } : u));
            }
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    if (status === 'loading' || !session?.user?.isAdmin) {
        return <div className="min-h-screen bg-white dark:bg-black animate-pulse bw:bg-white" />;
    }

    return (
        <div className="min-h-screen bg-white font-sans text-black dark:bg-[#111] dark:text-white bw:bg-white bw:text-black">
            <SimpleHeader />
            <main className="relative pt-32 pb-24">
                <div className="mx-auto max-w-[1200px] px-4">
                    <div className="mb-12 flex items-center justify-between">
                        <div className="border-l-[6px] border-[#FFD600] pl-6">
                            <h1 className="mb-2 text-4xl font-black tracking-tight">User Management</h1>
                            <p className="font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">시스템 전체 가입자 목록입니다.</p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[2rem] border-4 border-black bg-white shadow-[8px_8px_0px_0px_black] dark:border-white/20 dark:bg-black dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_black]">
                        <table className="w-full border-collapse text-left">
                            <thead className="bg-[#FFD600] text-black">
                                <tr>
                                    <th className="p-4 font-black uppercase text-xs">Nickname (Email)</th>
                                    <th className="p-4 font-black uppercase text-xs">Created At</th>
                                    <th className="p-4 font-black uppercase text-xs">Login Count</th>
                                    <th className="p-4 font-black uppercase text-xs text-center">Status</th>
                                    <th className="p-4 font-black uppercase text-xs text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-black dark:divide-white/10 bw:divide-black">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors bw:hover:bg-gray-50">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-black">{user.nickname}</span>
                                                <span className="text-[10px] text-gray-400 font-bold">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-bold opacity-70">
                                            {format(new Date(user.created_at), 'yyyy.MM.dd')}
                                        </td>
                                        <td className="p-4 text-center font-black">
                                            {user.login_count}
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                {user.is_admin && (
                                                    <span className="bg-black px-2 py-0.5 text-[10px] text-white rounded font-black dark:bg-white dark:text-black bw:bg-black bw:text-white">ADMIN</span>
                                                )}
                                                {user.is_banned && (
                                                    <span className="bg-red-500 px-2 py-0.5 text-[10px] text-white rounded font-black">BANNED</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2 text-[10px] font-black uppercase">
                                                <button
                                                    onClick={() => handleToggleAdmin(user)}
                                                    className="rounded border-2 border-black bg-white px-3 py-1 hover:bg-gray-100 dark:bg-transparent dark:border-white/20 bw:border-black bw:bg-white bw:hover:bg-gray-100"
                                                >
                                                    {user.is_admin ? 'Demote' : 'Make Admin'}
                                                </button>
                                                <button
                                                    onClick={() => handleToggleBan(user)}
                                                    className={`rounded border-2 border-black px-3 py-1 text-white shadow-[2px_2px_0px_0px_black] ${user.is_banned ? 'bg-green-500' : 'bg-red-500'} active:shadow-none`}
                                                >
                                                    {user.is_banned ? 'Unban' : 'Ban User'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {isLoading && (
                            <div className="p-12 text-center animate-pulse">Loading users...</div>
                        )}
                        {!isLoading && users.length === 0 && (
                            <div className="p-12 text-center font-black text-gray-400">사용자가 없습니다.</div>
                        )}
                    </div>

                    {/* Simple Pagination */}
                    {pagination.total_pages > 1 && (
                        <div className="mt-8 flex justify-center gap-4">
                            <button
                                disabled={pagination.current_page === 1}
                                onClick={() => fetchUsers(pagination.current_page - 1)}
                                className="h-10 w-10 border-2 border-black flex items-center justify-center font-black disabled:opacity-30"
                            >
                                <span className="material-symbols-outlined notranslate">chevron_left</span>
                            </button>
                            <span className="flex items-center px-4 font-black">{pagination.current_page} / {pagination.total_pages}</span>
                            <button
                                disabled={pagination.current_page === pagination.total_pages}
                                onClick={() => fetchUsers(pagination.current_page + 1)}
                                className="h-10 w-10 border-2 border-black flex items-center justify-center font-black disabled:opacity-30"
                            >
                                <span className="material-symbols-outlined notranslate">chevron_right</span>
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <SimpleFooter />
        </div>
    );
}
