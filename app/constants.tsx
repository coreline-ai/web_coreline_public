
import { Project, Service, Step } from './types';

export const PROJECTS: Project[] = [
    {
        id: '1',
        title: '프로젝트 소개 페이지',
        description: 'FullStack 웹&앱 개발을 통한 다양한 프로젝트 경험을 쌓았습니다.',
        tags: ['FullStack', 'Next.js', 'Node.js', 'FastAPI', 'TypeScript', 'Tailwind'],
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
        domain: 'fullstack-coreline.app'
    },
    {
        id: '2',
        title: '프로젝트 소개 페이지',
        description: '다양한 네이티브 앱 개발 프로젝트를 직접 참여하여 경험을 쌓았습니다.',
        tags: ['Android', 'IOS', 'Flutter', 'C&C++', 'Kotlin', 'Java', 'SwiftUI'],
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1000',
        domain: 'application-coreline.sys'
    }
];

export const SERVICES: Service[] = [
    {
        id: 's1',
        title: '맞춤형 S/W, 멀티 앱, FullStack 웹 개발',
        description: 'Next, Node, FastAPI, Android&IOS, Flutter 등 최신 스택으로 복잡한 비즈니스 로직을 완벽하게 구현합니다.',
        icon: 'terminal',
        color: '#1A1A1A'
    },
    {
        id: 's2',
        title: 'AI & ML 통합, AX 개발 & 컨설팅',
        description: 'AI LLM과 예측 알고리즘 서비스를 통합하여 비즈니스 워크플로우에 효율성을 극대화합니다.',
        icon: 'memory',
        color: '#8B5CF6'
    },
    {
        id: 's3',
        title: 'AI 인프라 바이브 코딩 교육 지원',
        description: '현 시장에서 가장 핫 한 AI 인프라를 활용한 IDE Tool 초보자 사용 교육 지원(Vibe Coding)을 제공합니다.',
        icon: 'smart_toy',
        color: '#00E5FF'
    },
    {
        id: 's4',
        title: '요구사항을 반영한 신속한 MVP 개발 지원',
        description: '전문 시니어 개발자가 직접 아이디어를 빠르게 검증할 수 있도록 핵심 기능을 갖춘 제품을 신속하게 출시합니다.',
        icon: 'rocket_launch',
        color: '#000000'
    }
];

export const PROCESS_STEPS: Step[] = [
    {
        id: 'p1',
        number: '01',
        title: '탐색 및 분석',
        description: '요구 사항을 분석하고 확장 가능한 전략을 수립합니다.',
        shape: 'square'
    },
    {
        id: 'p2',
        number: '02',
        title: '설계',
        description: '확장 가능한 시스템을 설계하고 기술 스택을 선정합니다.',
        shape: 'circle'
    },
    {
        id: 'p3',
        number: '03',
        title: '개발',
        description: '투명한 코드 리뷰와 함께 애자일 스프린트를 진행합니다.',
        shape: 'polygon'
    },
    {
        id: 'p4',
        number: '04',
        title: '배포',
        description: '운영 환경에 배포하고 지속적인 모니터링을 지원합니다.',
        shape: 'rect'
    }
];

export const TECH_STACK = {
    Frontend: [
        { name: 'React', icon: 'html' },
        { name: 'TypeScript', icon: 'code' },
        { name: 'Tailwind CSS', icon: 'palette' },
        { name: 'Next.js', icon: 'layers' }
    ],
    Backend: [
        { name: 'Node.js', icon: 'javascript' },
        { name: 'Python', icon: 'data_object' },
        { name: 'FastAPI', icon: 'terminal' },
        { name: 'PostgreSQL', icon: 'database' }
    ],
    AI: [
        { name: 'LangChain', icon: 'psychology' },
        { name: 'OpenAI API', icon: 'api' },
        { name: 'HuggingFace', icon: 'smart_toy' },
        { name: 'RAG', icon: 'library_books' }
    ],
    Application: [
        { name: 'Android', icon: 'dns' },
        { name: 'IOS', icon: 'deployed_code' },
        { name: 'Flutter', icon: 'cloud' },
        { name: 'C&C++', icon: 'settings_suggest' }
    ]
};
