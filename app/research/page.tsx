'use client';

import React from 'react';
import BoardTemplate from '../components/community/BoardTemplate';

const MOCK_RESEARCH = [
    {
        id: 201,
        title: "Enhancing OCR Precision with Vision-Language Models",
        author: "Researcher_A",
        date: "Oct 24",
        views: "12k",
        isAnnouncement: true,
        category: "Paper"
    },
    {
        id: 200,
        title: "Multi-Agent Systems for Automated Code Review",
        author: "research_lab",
        date: "Oct 22",
        views: "3.2k",
        hasAttachment: true,
        category: "Experiment"
    },
    {
        id: 199,
        title: "Low-Latency Inference Patterns for Edge Devices",
        author: "edge_specialist",
        date: "Oct 20",
        views: "850",
        category: "Tech Report"
    }
];

const RESEARCH_CATEGORIES = ["Paper", "Experiment", "Tech Report", "Case Study"];

export default function ResearchPage() {
    return (
        <BoardTemplate
            title="AI Research"
            highlightedWord="Lab"
            description="Exploring the boundaries of artificial intelligence through academic rigor and practical experimentation."
            posts={MOCK_RESEARCH}
            categories={RESEARCH_CATEGORIES}
        />
    );
}
