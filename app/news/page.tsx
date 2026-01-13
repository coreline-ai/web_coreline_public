'use client';

import React from 'react';
import BoardTemplate from '../components/community/BoardTemplate';

const MOCK_NEWS = Array.from({ length: 50 }, (_, i) => {
    const id = 1050 - i;
    const isAnnouncement = i < 3; // First 3 are announcements

    // Sample data rotation
    const titles = [
        "OpenAI, GPT-5 개발자 프리뷰 발표",
        "2026년 최고의 AI 코딩 어시스턴트 비교 연구",
        "트랜스포머 아키텍처 기초부터 이해하기",
        "NVIDIA의 새로운 H200 칩: 스타트업에 미치는 영향",
        "생성형 AI 개발의 윤리적 고려사항",
        "Python 3.14의 새로운 기능 미리보기",
        "Rust가 웹 어셈블리 생태계를 주도하는 이유",
        "Next.js 16과 React Server Components 활용 가이드",
        "Kubernetes 클러스터 최적화 전략",
        "마이크로서비스 아키텍처의 장단점 분석"
    ];

    const categories = ["공지사항", "리뷰", "튜토리얼", "시장동향", "일반"];
    const authors = ["관제자", "alex_dev", "sarah_j", "hardware_pro", "ethics_lead", "coder_kim"];

    return {
        id,
        title: isAnnouncement ? titles[0] : titles[i % titles.length] + ` - Part ${Math.floor(i / 10) + 1}`,
        author: isAnnouncement ? "관제자" : authors[i % authors.length],
        date: isAnnouncement ? "2시간 전" : `${(i % 5) + 1}일 전`,
        views: isAnnouncement ? "1.2k" : `${((i * 137) % 500) + 100}`,
        isAnnouncement,
        category: isAnnouncement ? "공지사항" : categories[i % categories.length],
        hasImage: i % 4 === 0,
        hasAttachment: i % 7 === 0
    };
});

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
