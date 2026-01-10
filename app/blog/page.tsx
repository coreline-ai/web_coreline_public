'use client';

import React from 'react';
import BoardTemplate from '../components/community/BoardTemplate';

const MOCK_BLOGS = [
    {
        id: 504,
        title: "Next.js 15: Mastering Partial Prerendering (PPR)",
        author: "Coreline_Dev",
        date: "1h ago",
        views: "340",
        isAnnouncement: true,
        category: "Frontend"
    },
    {
        id: 503,
        title: "How we scaled our Vector Database to 1B Embeddings",
        author: "infra_guru",
        date: "4h ago",
        views: "1.5k",
        hasAttachment: true,
        category: "Infrastructure"
    },
    {
        id: 502,
        title: "Zustand vs Jotai: Choosing the right state manager",
        author: "sarah_j",
        date: "Yesterday",
        views: "890",
        category: "Frontend"
    },
    {
        id: 501,
        title: "Rethinking API Design: GraphQL in the age of LLMs",
        author: "api_architect",
        date: "Yesterday",
        views: "120",
        category: "Backend"
    }
];

const BLOG_CATEGORIES = ["Announcement", "Frontend", "Backend", "Infrastructure", "UI/UX"];

export default function BlogPage() {
    return (
        <BoardTemplate
            title="Tech Blog"
            highlightedWord="Lab"
            description="Deep dives into engineering challenges, architectural patterns, and development best practices."
            posts={MOCK_BLOGS}
            categories={BLOG_CATEGORIES}
        />
    );
}
