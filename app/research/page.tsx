'use client';

import React from 'react';
import BoardTemplate from '../components/community/BoardTemplate';

const MOCK_RESEARCH = [
    {
        id: 201,
        title: "비전-언어 모델을 활용한 OCR 정밀도 향상",
        author: "연구원_A",
        date: "10월 24일",
        views: "12k",
        isAnnouncement: true,
        category: "논문"
    },
    {
        id: 200,
        title: "자동 코드 리뷰를 위한 멀티 에이전트 시스템",
        author: "research_lab",
        date: "10월 22일",
        views: "3.2k",
        hasAttachment: true,
        category: "실험"
    },
    {
        id: 199,
        title: "엣지 디바이스를 위한 저지연 추론 패턴",
        author: "edge_specialist",
        date: "10월 20일",
        views: "850",
        category: "기술리포트"
    }
];

const RESEARCH_CATEGORIES = ["논문", "실험", "기술리포트", "사례연구"];

export default function ResearchPage() {
    return (
        <BoardTemplate
            title="AI 연구소"
            highlightedWord="Lab"
            description="학술적 엄격함과 실질적인 실험을 통해 인공지능의 경계를 확장합니다."
            posts={MOCK_RESEARCH}
            categories={RESEARCH_CATEGORIES}
        />
    );
}
