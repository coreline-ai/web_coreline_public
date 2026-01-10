'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const iconPool = ['breaking_news', 'code_blocks', 'science', 'psychology', 'hub', 'rocket_launch', 'memory', 'auto_awesome', 'terminal', 'analytics', 'architecture', 'database'];

const communityData = {
    news: Array.from({ length: 8 }).map((_, i) => ({
        title: `AI 5분 최신뉴스 ${i + 1}`,
        description: [
            'OpenAI, 신규 소라 모델 업데이트 - 비디오 생성 기술의 혁신',
            '구글 제미나이 1.5 프로 공개 - 200만 토큰 컨텍스트 지원',
            '엔비디아 차세대 블랙웰 GPU 발표 - 연산 성능의 진화',
            '애플 온디바이스 AI 기능 애플 인텔리전스 공개',
            '메타 라마 3 공개 - 오픈소스 LLM의 새로운 기준',
            '국내 AI 스타트업 연합 발족 - 글로벌 경쟁력 강화',
            'AI 안전 서밋 개최 - 보안과 윤리에 대한 글로벌 합의',
            'MS Copilot+ PC 발표 - 하드웨어와 AI의 결합'
        ][i],
        icon: iconPool[i % iconPool.length],
        href: `/news/${i + 1}`,
        badges: ['Hot'],
        badgeColor: 'bg-red-400',
    })),
    blog: Array.from({ length: 8 }).map((_, i) => ({
        title: `기술 블로그 ${i + 1}`,
        description: [
            'Next.js 14 App Router 전환기 - 서버 컴포넌트 활용',
            'Rust로 구현하는 고성능 AI 추론 엔진 및 성능 비교',
            '마이크로서비스 아키텍처에서의 분산 트랜잭션 전략',
            'Tailwind CSS 활용 효율적인 디자인 시스템 구축',
            'LLM 파인튜닝 실무 가이드 - 최적화 노하우 공유',
            '프론트엔드 성능 최적화: 유저 경험을 좌우하는 0.1초',
            '클린 코드와 리팩토링: 유지보수 가능한 소프트웨어',
            'CI/CD 파이프라인 자동화 - GitHub Actions 활용'
        ][i],
        icon: iconPool[(i + 4) % iconPool.length],
        href: `/blog/${i + 1}`,
        badges: ['Active'],
        badgeColor: 'bg-green-400',
    })),
    lab: Array.from({ length: 8 }).map((_, i) => ({
        title: `코어라인 AI 연구소 ${i + 1}`,
        description: [
            '다중 에이전트 협업 시스템 연구 - LangChain 활용',
            '검색 증강 생성(RAG) 프레임워크 정확도 개선 실험',
            '효율적인 모델 양자화 기법 - 실시간 추론 실현',
            '감성 분석 기반 대화형 AI 고도화 - 사용자 맥락 파악',
            '비정형 데이터 정규화 알고리즘 및 파이프라인 혁신',
            '멀티모달 AI 시스템 설계 - 텍스트와 이미지 융합',
            '머신러닝 모델 모니터링 및 재학습 자동화 구축',
            '연합 학습(Federated Learning) 기술 적용 연구'
        ][i],
        icon: iconPool[(i + 8) % iconPool.length],
        href: `/research/${i + 1}`,
        badges: ['Research'],
        badgeColor: 'bg-purple-400',
    })),
};

export default function CommunitySection() {
    const [activeTab, setActiveTab] = useState<'news' | 'blog' | 'lab'>('news');

    return (
        <section className="border-b border-black bg-white px-4 py-24 dark:border-white/10 dark:bg-black">
            <div className="mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="mb-16">
                    <div className="mb-4 inline-flex items-center rounded-full border border-black bg-white px-4 py-1.5 text-xs font-black tracking-widest text-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black dark:text-white dark:shadow-none">
                        <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                        LIVE UPDATES
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-black md:text-5xl dark:text-white">
                        인사이트 & <span className="bg-[#FFD600] text-black px-2">AI 연구소</span>
                    </h2>
                </div>

                {/* Toolbar / Sort */}
                <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-wrap">
                        {/* Topic Filters */}
                        <button
                            onClick={() => setActiveTab('news')}
                            className={`h-12 w-fit whitespace-nowrap rounded-xl px-6 font-bold transition-transform hover:-translate-y-1 ${activeTab === 'news'
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'border border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
                                }`}
                        >
                            AI 5분 최신뉴스
                        </button>
                        <button
                            onClick={() => setActiveTab('blog')}
                            className={`h-12 w-fit whitespace-nowrap rounded-xl px-6 font-bold transition-transform hover:-translate-y-1 ${activeTab === 'blog'
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'border border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
                                }`}
                        >
                            기술 블로그
                        </button>
                        <button
                            onClick={() => setActiveTab('lab')}
                            className={`h-12 w-fit whitespace-nowrap rounded-xl px-6 font-bold transition-transform hover:-translate-y-1 ${activeTab === 'lab'
                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                : 'border border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
                                }`}
                        >
                            코어라인 AI 연구소
                        </button>
                    </div>

                    <Link
                        href="/login"
                        className="flex h-12 items-center gap-2 rounded-xl border border-black bg-[#FFD600] px-6 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                        <span className="material-symbols-outlined">add</span>
                        포스트 추가하기
                    </Link>
                </div>

                {/* Grid: 4x2 Layout (Mobile: 1col, Tablet: 2col, Desktop: 4col) */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {communityData[activeTab].map((item: any, index: number) => (
                        <Link
                            key={`${activeTab}-${index}`}
                            href={item.href}
                            className="group relative flex flex-col justify-between rounded-3xl border border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white/10 dark:bg-[#111] dark:shadow-none"
                        >
                            <div>
                                <div className="mb-6 flex items-start justify-between">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:scale-110 group-hover:bg-[#FFD600] dark:border-white dark:bg-black dark:text-white dark:shadow-none dark:group-hover:text-black">
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    {item.badges.map((badge: string) => (
                                        <span
                                            key={badge}
                                            className={`rounded border border-black px-2 py-0.5 text-[10px] font-black uppercase text-black ${item.badgeColor} dark:bg-[#FFD600]`}
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="mb-3 text-2xl font-black text-black dark:text-white">{item.title}</h3>
                                <p className="mb-8 text-sm font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* More Button */}
                <div className="mt-16 flex justify-center">
                    <Link
                        href={activeTab === 'news' ? '/news' : activeTab === 'blog' ? '/blog' : '/research'}
                        className="group flex items-center gap-3 rounded-xl border border-black bg-white px-8 py-4 font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:bg-[#FFD600] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none dark:border-white dark:bg-black dark:text-white dark:hover:bg-[#FFD600] dark:hover:text-black"
                    >
                        더보기
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                            arrow_forward
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
