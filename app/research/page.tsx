'use client';

import React from 'react';
import BoardTemplate from '../components/community/BoardTemplate';

export default function ResearchPage() {
    return (
        <BoardTemplate
            slug="research"
            title="AI 연구소"
            highlightedWord="Lab"
            description="학술적 엄격함과 실질적인 실험을 통해 인공지능의 경계를 확장합니다."
        />
    );
}
