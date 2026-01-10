'use client';

import React from 'react';
import BoardTemplate from '../components/community/BoardTemplate';

const MOCK_NEWS = [
    {
        id: 1043,
        title: "OpenAI, GPT-5 개발자 프리뷰 발표",
        author: "관제자",
        date: "2시간 전",
        views: "1.2k",
        isAnnouncement: true,
        category: "공지사항"
    },
    {
        id: 1042,
        title: "2026년 최고의 AI 코딩 어시스턴트 비교 연구",
        author: "alex_dev",
        date: "5시간 전",
        views: "856",
        category: "리뷰"
    },
    {
        id: 1041,
        title: "트랜스포머 아키텍처 기초부터 이해하기",
        author: "sarah_j",
        date: "어제",
        views: "2.4k",
        hasImage: true,
        category: "튜토리얼"
    },
    {
        id: 1040,
        title: "NVIDIA의 새로운 H200 칩: 스타트업에 미치는 영향",
        author: "hardware_pro",
        date: "어제",
        views: "420",
        category: "시장동향"
    },
    {
        id: 1039,
        title: "생성형 AI 개발의 윤리적 고려사항",
        author: "ethics_lead",
        date: "2일 전",
        views: "150",
        category: "일반"
    }
];

const NEWS_CATEGORIES = ["공지사항", "리뷰", "튜토리얼", "시장동향", "일반"];

export default function NewsPage() {
    return (
        <BoardTemplate
            title="AI 뉴스"
            highlightedWord="게시판"
            description="전 세계 AI 생태계의 최신 돌파구, 출시 소식 및 트렌드를 가장 빠르게 확인하세요."
            posts={MOCK_NEWS}
            categories={NEWS_CATEGORIES}
        />
    );
}
