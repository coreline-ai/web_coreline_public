'use client';

import React from 'react';
import BoardTemplate from '../components/community/BoardTemplate';

const MOCK_NEWS = [
    {
        id: 1043,
        title: "OpenAI Announces GPT-5 Developer Preview",
        author: "Admin",
        date: "2h ago",
        views: "1.2k",
        isAnnouncement: true,
        category: "Announcements"
    },
    {
        id: 1042,
        title: "Best AI Coding Assistants for 2026: A Comparative Study",
        author: "alex_dev",
        date: "5h ago",
        views: "856",
        category: "Reviews"
    },
    {
        id: 1041,
        title: "Understanding Transformer Architecture from Scratch",
        author: "sarah_j",
        date: "Yesterday",
        views: "2.4k",
        hasImage: true,
        category: "Tutorials"
    },
    {
        id: 1040,
        title: "NVIDIA's New H200 Chips: What it means for Startups",
        author: "hardware_pro",
        date: "Yesterday",
        views: "420",
        category: "Market"
    },
    {
        id: 1039,
        title: "Ethical Considerations in Generative AI Development",
        author: "ethics_lead",
        date: "2 days ago",
        views: "150",
        category: "General"
    }
];

const NEWS_CATEGORIES = ["Announcements", "Reviews", "Tutorials", "Market", "General"];

export default function NewsPage() {
    return (
        <BoardTemplate
            title="AI News"
            highlightedWord="Board"
            description="Stay updated with the latest breakthroughs, releases, and trends in the global AI ecosystem."
            posts={MOCK_NEWS}
            categories={NEWS_CATEGORIES}
        />
    );
}
