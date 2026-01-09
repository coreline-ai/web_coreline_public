
import { Project, Service, Step } from './types';

export const PROJECTS: Project[] = [
    {
        id: '1',
        title: 'Flask Board Application',
        version: 'v2.4.0',
        description: 'A robust, scalable message board solution featuring secure user authentication, real-time updates, and a comprehensive admin dashboard.',
        tags: ['FullStack', 'Next.js', 'Node.js'],
        imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000', // Code on screen
        domain: 'fullstack-coreline.app',
        repoUrl: 'https://github.com/coreline-ai/web_coreline_public',
        techStack: [
            { name: 'Flask', icon: 'terminal', role: 'BACKEND CORE', description: 'RESTful API architecture with modular blueprints.' },
            { name: 'Tailwind', icon: 'brush', role: 'UI STYLING', description: 'Utility-first CSS for rapid, responsive design.' },
            { name: 'PostgreSQL', icon: 'database', role: 'DATABASE', description: 'Robust data storage with SQLAlchemy ORM.' },
            { name: 'Docker', icon: 'deployed_code', role: 'DEVOPS', description: 'Containerized deployment for consistency.' }
        ],
        visualOverview: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'
        ],
        features: [
            { title: 'JWT Authentication', description: 'Secure, stateless token-based auth flow.' },
            { title: 'RBAC System', description: 'Granular Role-Based Access Control for admins.' },
            { title: 'CI/CD Pipeline', description: 'Automated testing and deployment via GitHub Actions.' },
            { title: 'Real-time Notifications', description: 'Socket.IO integration for live updates.' }
        ],
        performance: {
            title: 'PERFORMANCE ACHIEVEMENT',
            description: 'Reduced server response time by 40% through optimized Redis caching for session management.'
        },
        executionDetails: 'This project was architected with scalability in mind. By utilizing the Factory Pattern in Flask, we ensured that the application can easily handle multiple configurations for development, testing, and production environments. The frontend is completely decoupled from the logic, using Jinja2 templates styled with Tailwind CSS to ensure a lightweight and highly responsive user interface without the overhead of a heavy JS framework.'
    },
    {
        id: '2',
        title: 'Native Mobile Apps',
        version: 'v1.2.0',
        description: '다양한 네이티브 앱 개발 프로젝트를 직접 참여하여 경험을 쌓았습니다. 사용자 경험을 최우선으로 고려한 모바일 솔루션입니다.',
        tags: ['Android', 'IOS', 'Flutter'],
        imageUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=1000', // Mobile app development (Working)
        domain: 'application-coreline.sys',
        repoUrl: '#',
        techStack: [
            { name: 'Flutter', icon: 'flutter_dash', role: 'CROSS PLATFORM', description: 'Single codebase for iOS and Android.' },
            { name: 'Firebase', icon: 'local_fire_department', role: 'BACKEND', description: 'Real-time database and authentication.' },
            { name: 'Riverpod', icon: 'waves', role: 'STATE MGT', description: 'Robust state management solution.' }
        ],
        features: [
            { title: 'Offline Mode', description: 'Full functionality without internet connection.' },
            { title: 'Push Notifications', description: 'Targeted engagement via FCM.' }
        ],
        performance: {
            title: 'APP PERFORMANCE',
            description: 'Achieved 60fps consistent frame rate on low-end devices.'
        },
        executionDetails: 'We focused on delivering a native-like experience using Flutter. By optimizing the rendering engine and using native platform channels where necessary, we achieved high performance and smooth animations across all devices.'
    },
    {
        id: '3',
        title: 'AI 솔루션 플랫폼',
        description: 'LLM 기반의 자동화 봇과 데이터 분석 대시보드를 구축하였습니다.',
        tags: ['AI', 'Python', 'LangChain'],
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000', // AI/Futuristic
        domain: 'ai-coreline.tech',
        techStack: [
            { name: 'LangChain', icon: 'psychology', role: 'AI ORCHESTRATION', description: 'Building context-aware LLM applications.' },
            { name: 'FastAPI', icon: 'bolt', role: 'API SERVING', description: 'High-performance async API backend.' }
        ]
    },
    {
        id: '4',
        title: '커머스 최적화 시스템',
        description: '대용량 트래픽을 처리하는 마이크로서비스 기반의 커머스 플랫폼입니다.',
        tags: ['Commerce', 'MSA', 'Docker'],
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000', // Dashboard/Data
        domain: 'commerce-coreline.store'
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
