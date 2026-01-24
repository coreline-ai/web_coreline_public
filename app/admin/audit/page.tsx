'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SimpleHeader from '../../components/layout/SimpleHeader';
import SimpleFooter from '../../components/layout/SimpleFooter';
import Link from 'next/link';

interface AuditLog {
    id: number;
    user_id: string;
    action: string;
    target_id: string;
    target_type: string;
    ip_address: string;
    details: string;
    created_at: string;
}

interface PaginationData {
    current_page: number;
    total_pages: number;
    total_items: number;
}

export default function AuditLogsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    // Authorization Check
    useEffect(() => {
        if (status === 'authenticated' && !session?.user?.isAdmin) {
            router.push('/');
        } else if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, session, router]);

    // Data Fetching
    const fetchLogs = async (pageNum: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/audit-logs?page=${pageNum}&limit=20`, {
                headers: {
                    'Authorization': `Bearer ${session?.accessToken}`,
                },
            });
            const data = await res.json();
            if (data.success) {
                setLogs(data.data.items);
                setPagination(data.data.pagination);
            }
        } catch (error) {
            console.error('Failed to fetch logs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.isAdmin) {
            fetchLogs(page);
        }
    }, [page, session]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (pagination?.total_pages || 1)) {
            setPage(newPage);
        }
    };

    if (status === 'loading' || (status === 'authenticated' && !session?.user?.isAdmin)) {
        return <div className="min-h-screen bg-black" />; // Loading or unauthorized
    }

    return (
        <div className="min-h-screen bg-white font-sans text-black dark:bg-[#111] dark:text-white bw:bg-white bw:text-black">
            <SimpleHeader />
            <main className="mx-auto max-w-[1200px] px-4 pt-32 pb-24">
                {/* Header */}
                <div className="mb-12 flex items-center justify-between">
                    <div className="border-l-[6px] border-[#FFD600] pl-6">
                        <Link href="/admin" className="mb-2 block text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white">
                            ← Back to Console
                        </Link>
                        <h1 className="text-4xl font-black tracking-tight">Audit Logs</h1>
                        <p className="mt-2 text-lg font-bold text-gray-500">
                            시스템 보안 및 중요 활동 기록
                        </p>
                    </div>
                </div>

                {/* Filters (Placeholder) */}
                <div className="mb-8 rounded-2xl border-2 border-black bg-gray-50 p-6 dark:border-white/20 dark:bg-white/5 bw:border-black bw:bg-gray-50">
                    <div className="flex flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder="Search by Action"
                            className="rounded-xl border-2 border-gray-200 px-4 py-2 font-bold focus:border-black focus:outline-none dark:border-gray-700 dark:bg-black dark:focus:border-[#FFD600] bw:border-gray-200 bw:focus:border-black"
                            disabled
                        />
                        <button className="rounded-xl bg-black px-6 py-2 font-bold text-white dark:bg-white dark:text-black bw:bg-black bw:text-white" disabled>
                            Filter (Coming Soon)
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-[2rem] border-4 border-black bg-white shadow-[8px_8px_0px_0px_black] dark:border-white/20 dark:bg-[#111] dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_black]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="border-b-4 border-black bg-gray-100 dark:border-white/20 dark:bg-black bw:border-black bw:bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left font-black uppercase text-gray-500 dark:text-gray-400">Timestamp</th>
                                    <th className="px-6 py-4 text-left font-black uppercase text-gray-500 dark:text-gray-400">Action</th>
                                    <th className="px-6 py-4 text-left font-black uppercase text-gray-500 dark:text-gray-400">User ID</th>
                                    <th className="px-6 py-4 text-left font-black uppercase text-gray-500 dark:text-gray-400">IP Address</th>
                                    <th className="px-6 py-4 text-left font-black uppercase text-gray-500 dark:text-gray-400">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center font-bold text-gray-400">
                                            Loading logs...
                                        </td>
                                    </tr>
                                ) : logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center font-bold text-gray-400">
                                            No audit logs found.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map((log) => (
                                        <tr key={log.id} className="border-b-2 border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/5 bw:border-gray-100 bw:hover:bg-gray-50">
                                            <td className="px-6 py-4 font-mono text-sm font-bold text-gray-600 dark:text-gray-300">
                                                {new Date(log.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`rounded-lg border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_0px_black] dark:border-white/20 dark:shadow-none bw:border-black bw:shadow-[2px_2px_0px_0px_black] ${log.action.includes('LOGIN') ? 'bg-blue-100 dark:bg-blue-900/30' :
                                                        log.action.includes('DELETE') ? 'bg-red-100 dark:bg-red-900/30' :
                                                            log.action.includes('UPDATE') ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                                                                'bg-gray-100 dark:bg-gray-800'
                                                    }`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                                {log.user_id ? log.user_id.substring(0, 8) + '...' : 'System/Anon'}
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                                {log.ip_address || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[300px] truncate">
                                                {log.details || '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.total_pages > 1 && (
                        <div className="flex items-center justify-between border-t-4 border-black bg-white p-6 dark:border-white/20 dark:bg-[#111] bw:border-black bw:bg-white">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className="flex items-center gap-2 rounded-xl border-2 border-black bg-gray-100 px-4 py-2 font-bold disabled:opacity-50 dark:border-white/20 dark:bg-white/10 bw:border-black bw:bg-gray-100"
                            >
                                <span className="material-symbols-outlined notranslate">arrow_back</span>
                                Prev
                            </button>
                            <span className="font-black">
                                Page {page} of {pagination.total_pages}
                            </span>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === pagination.total_pages}
                                className="flex items-center gap-2 rounded-xl border-2 border-black bg-gray-100 px-4 py-2 font-bold disabled:opacity-50 dark:border-white/20 dark:bg-white/10 bw:border-black bw:bg-gray-100"
                            >
                                Next
                                <span className="material-symbols-outlined notranslate">arrow_forward</span>
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <SimpleFooter />
        </div>
    );
}
