export interface User {
    id: string;
    email: string;
    name?: string;
    username: string;
    nickname: string;
    image?: string;
    is_admin: boolean;
    is_banned: boolean;
    login_count: number;
    last_login_at?: string;
    created_at: string;
}

export interface Board {
    id: number;
    name: string;
    slug: string;
    description?: string;
    access_level: 'PUBLIC' | 'AUTHENTICATED' | 'ADMIN';
    created_at: string;
}

export interface BoardCategory {
    id: number;
    board_id: number;
    name: string;
    created_at: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    user_id: string;
    board_id: number;
    category_id: number;
    file_url?: string;
    is_notice: boolean;
    view_count: number;
    like_count: number;
    liked?: boolean;
    created_at: string;
    updated_at: string;
    author?: {
        id: string;
        nickname: string;
    };
    category?: BoardCategory;
}

export interface Comment {
    id: number;
    content: string;
    user_id: string;
    post_id: number;
    created_at: string;
    updated_at: string;
    author?: {
        id: string;
        nickname: string;
    };
}

export interface Notification {
    id: number;
    user_id: string;
    post_id: number;
    comment_id?: number;
    type: 'COMMENT' | 'LIKE' | 'MENTION';
    actor_user_id?: string;
    is_read: boolean;
    created_at: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// NextAuth Type Augmentation
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            isAdmin: boolean;
        } & DefaultSession["user"]
    }

    interface User {
        accessToken: string;
        isAdmin: boolean;
    }
}
