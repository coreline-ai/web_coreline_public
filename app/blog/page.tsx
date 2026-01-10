'use client';

import React from 'react';
import BoardTemplate from '../components/community/BoardTemplate';

const MOCK_BLOGS = [
    {
        id: 504,
        title: "Next.js 15: 부분 사전 렌더링(PPR) 마스터하기",
        author: "Coreline_Dev",
        date: "1시간 전",
        views: "340",
        isAnnouncement: true,
        category: "프론트엔드"
    },
    {
        id: 503,
        title: "벡터 데이터베이스를 10억 개의 임베딩으로 확장한 방법",
        author: "infra_guru",
        date: "4시간 전",
        views: "1.5k",
        hasAttachment: true,
        category: "인프라"
    },
    {
        id: 502,
        title: "Zustand vs Jotai: 적합한 상태 관리자 선택하기",
        author: "sarah_j",
        date: "어제",
        views: "890",
        category: "프론트엔드"
    },
    {
        id: 501,
        title: "API 디자인의 재고: LLM 시대의 GraphQL",
        author: "api_architect",
        date: "어제",
        views: "120",
        category: "백엔드"
    }
];

const BLOG_CATEGORIES = ["공지", "프론트엔드", "백엔드", "인프라", "UI/UX"];

export default function BlogPage() {
    return (
        <BoardTemplate
            title="기술"
            highlightedWord="블로그"
            description="엔지니어링 과제, 아키텍처 패턴 및 개발 모범 사례에 대한 심도 있는 분석을 공유합니다."
            posts={MOCK_BLOGS}
            categories={BLOG_CATEGORIES}
        />
    );
}
