'use client';

import React from 'react';
import BoardTemplate from '../components/features/community/BoardTemplate';

export default function BlogPage() {
    return (
        <BoardTemplate
            slug="blog"
            title="기술 블로그"
            highlightedWord="인사이트"
            description="Coreline 엔지니어링 팀이 공유하는 기술적 도전과 해결 과정, 그리고 깊이 있는 개발 이야기를 만나보세요."
        />
    );
}
