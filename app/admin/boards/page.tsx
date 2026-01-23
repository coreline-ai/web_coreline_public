'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SimpleHeader from '../../components/layout/SimpleHeader';
import SimpleFooter from '../../components/layout/SimpleFooter';
import { api } from '../../lib/api-client';
import { Board } from '../../lib/types/api';

interface BoardFormData {
    name: string;
    slug: string;
    description: string;
    access_level: 'PUBLIC' | 'ADMIN' | 'AUTHENTICATED';
}

export default function AdminBoardsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [boards, setBoards] = useState<Board[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBoard, setEditingBoard] = useState<Board | null>(null);
    const [formData, setFormData] = useState<BoardFormData & { categories: string }>({
        name: '',
        slug: '',
        description: '',
        access_level: 'PUBLIC',
        categories: ''
    });

    const fetchBoards = async () => {
        setIsLoading(true);
        try {
            const res = await api.get<any>('/api/boards');
            if (res.success && res.data) {
                setBoards(res.data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch boards');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.isAdmin) {
            fetchBoards();
        } else if (status === 'authenticated' && !session?.user?.isAdmin) {
            router.push('/');
        } else if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, session, router]);

    const handleOpenCreateModal = () => {
        setEditingBoard(null);
        setFormData({
            name: '',
            slug: '',
            description: '',
            access_level: 'PUBLIC',
            categories: ''
        });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (board: Board) => {
        setEditingBoard(board);
        setFormData({
            name: board.name,
            slug: board.slug,
            description: board.description || '',
            access_level: board.access_level as any,
            categories: '' // Edit categories not supported in this simple modal yet, can use separate page
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingBoard) {
                // UPDATE
                const res = await api.put<Board>(`/api/boards/${editingBoard.slug}`, {
                    name: formData.name,
                    description: formData.description,
                    access_level: formData.access_level
                });
                if (res.success && res.data) {
                    setBoards(boards.map(b => b.id === editingBoard.id ? res.data! : b));
                    setIsModalOpen(false);
                    alert('게시판이 수정되었습니다.');
                }
            } else {
                // CREATE
                const payload = {
                    ...formData,
                    categories: formData.categories.split(',').map(c => c.trim()).filter(c => c.length > 0)
                };
                const res = await api.post<Board>('/api/boards', payload);
                if (res.success && res.data) {
                    setBoards([res.data!, ...boards]); // Add new to top
                    setIsModalOpen(false);
                    alert('게시판이 생성되었습니다.');
                }
            }
        } catch (err: any) {
            alert(err.message || 'Error processing board');
        }
    };

    const handleDeleteBoard = async (slug: string) => {
        if (!confirm('정말 이 게시판을 삭제하시겠습니까? 포함된 모든 글이 삭제될 수 있습니다.')) return;
        try {
            const res = await api.delete(`/api/boards/${slug}`);
            if (res.success) {
                setBoards(boards.filter(b => b.slug !== slug));
            }
        } catch (err) {
            console.error("Failed to delete board", err);
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
                            <h1 className="mb-2 text-4xl font-black tracking-tight">Board Management</h1>
                            <p className="font-bold text-gray-500 dark:text-gray-400 bw:text-gray-500">
                                전체 게시판 목록을 관리합니다.
                            </p>
                        </div>
                        <button
                            onClick={handleOpenCreateModal}
                            className="flex items-center gap-2 rounded-xl border-2 border-black bg-[#FFD600] px-6 py-3 font-black text-black shadow-[4px_4px_0px_0px_black] transition-all hover:-translate-y-1 active:shadow-none"
                        >
                            <span className="material-symbols-outlined notranslate">add</span>
                            새 게시판 생성
                        </button>
                    </div>

                    <div className="overflow-hidden rounded-[2rem] border-4 border-black bg-white shadow-[8px_8px_0px_0px_black] dark:border-white/20 dark:bg-black dark:shadow-none bw:border-black bw:bg-white bw:shadow-[8px_8px_0px_0px_black]">
                        <table className="w-full border-collapse text-left">
                            <thead className="bg-[#FFD600] text-black">
                                <tr>
                                    <th className="p-4 font-black uppercase text-xs">Name</th>
                                    <th className="p-4 font-black uppercase text-xs">Slug</th>
                                    <th className="p-4 font-black uppercase text-xs">Description</th>
                                    <th className="p-4 font-black uppercase text-xs text-center">Access</th>
                                    <th className="p-4 font-black uppercase text-xs text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-black dark:divide-white/10 bw:divide-black">
                                {boards.map((board) => (
                                    <tr key={board.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-black">
                                            <a href={`/boards/${board.slug}`} className="hover:underline flex items-center gap-2 group-hover:text-blue-600">
                                                {board.name}
                                                <span className="material-symbols-outlined notranslate text-[14px] text-gray-400">open_in_new</span>
                                            </a>
                                        </td>
                                        <td className="p-4 font-mono text-sm">{board.slug}</td>
                                        <td className="p-4 text-sm text-gray-500 truncate max-w-[200px] font-bold">{board.description}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2 py-1 rounded text-[10px] font-black ${board.access_level === 'ADMIN' ? 'bg-red-100 text-red-600' :
                                                board.access_level === 'AUTHENTICATED' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-green-100 text-green-600'
                                                }`}>
                                                {board.access_level}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenEditModal(board)}
                                                    className="rounded border-2 border-black bg-white p-2 hover:bg-yellow-50 dark:bg-black dark:border-white/20 dark:hover:bg-yellow-900/20 bw:border-black bw:bg-white"
                                                    title="Edit Board"
                                                >
                                                    <span className="material-symbols-outlined notranslate text-black dark:text-white text-lg">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBoard(board.slug)}
                                                    className="rounded border-2 border-black bg-white p-2 hover:bg-red-50 dark:bg-black dark:border-white/20 dark:hover:bg-red-900/20 bw:border-black bw:bg-white"
                                                    title="Delete Board"
                                                >
                                                    <span className="material-symbols-outlined notranslate text-red-500 text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {isLoading && <div className="p-12 text-center animate-pulse font-bold">Loading boards...</div>}
                        {!isLoading && boards.length === 0 && <div className="p-12 text-center text-gray-500 font-bold">게시판이 없습니다.</div>}
                    </div>
                </div>
            </main>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-[2rem] border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_black] dark:bg-[#111] dark:border-white/20 dark:shadow-none bw:bg-white bw:border-black">
                        <h2 className="mb-6 text-2xl font-black">{editingBoard ? 'Edit Board' : 'Create New Board'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-xs font-black uppercase text-gray-400">Board Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-xl border-2 border-black p-3 font-bold focus:outline-none dark:bg-black dark:border-white/20 dark:text-white"
                                    placeholder="e.g. Tech Blog"
                                />
                            </div>

                            {/* Slug - Read Only in Edit because URL change is dangerous */}
                            <div>
                                <label className="mb-1 block text-xs font-black uppercase text-gray-400">
                                    Slug (URL Path) {editingBoard && <span className="text-red-500 ml-1">(Cannot be changed)</span>}
                                </label>
                                <input
                                    type="text"
                                    required
                                    readOnly={!!editingBoard}
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    className={`w-full rounded-xl border-2 border-black p-3 font-bold focus:outline-none dark:bg-black dark:border-white/20 dark:text-white ${editingBoard ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-900' : ''}`}
                                    placeholder="e.g. blog"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-black uppercase text-gray-400">Description</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-xl border-2 border-black p-3 font-bold focus:outline-none dark:bg-black dark:border-white/20 dark:text-white"
                                    placeholder="Brief description..."
                                />
                            </div>

                            {/* Categories - Only show on Create for now as per plan */}
                            {!editingBoard && (
                                <div>
                                    <label className="mb-1 block text-xs font-black uppercase text-gray-400">
                                        Categories <span className="text-gray-500 normal-case">(Comma separated)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.categories}
                                        onChange={e => setFormData({ ...formData, categories: e.target.value })}
                                        className="w-full rounded-xl border-2 border-black p-3 font-bold focus:outline-none dark:bg-black dark:border-white/20 dark:text-white"
                                        placeholder="e.g. General, News, Tips"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="mb-1 block text-xs font-black uppercase text-gray-400">Access Level</label>
                                <select
                                    value={formData.access_level}
                                    onChange={e => setFormData({ ...formData, access_level: e.target.value as any })}
                                    className="w-full rounded-xl border-2 border-black p-3 font-bold focus:outline-none dark:bg-black dark:border-white/20 dark:text-white"
                                >
                                    <option value="PUBLIC">PUBLIC (Everyone)</option>
                                    <option value="ADMIN">ADMIN (Admins Only)</option>
                                    <option value="AUTHENTICATED">AUTHENTICATED (Members Only)</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 rounded-xl border-2 border-black bg-white py-3 font-black uppercase hover:bg-gray-100 dark:bg-transparent dark:text-white dark:border-white/20"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl border-2 border-black bg-[#FFD600] py-3 font-black uppercase shadow-[4px_4px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-[#FFD600] text-black"
                                >
                                    {editingBoard ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <SimpleFooter />
        </div>
    );
}
