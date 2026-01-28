import { Project } from '../types';

export const PROJECTS: Project[] = [
    {
        id: '1',
        title: 'Flask Board Application',
        version: 'v2.4.0',
        description:
            'A robust, scalable message board solution featuring secure user authentication, real-time updates, and a comprehensive admin dashboard.',
        tags: ['FullStack', 'Next.js', 'Node.js'],
        imageUrl: '/images/project_cases_1.png',
        imageAlt:
            'Flask Board Application Admin Dashboard displaying user analytics and real-time charts',
        domain: 'fullstack-coreline.app',
        repoUrl: 'https://github.com/coreline-ai/web_coreline_public',
        techStack: [
            {
                name: 'Flask',
                icon: 'terminal',
                role: 'BACKEND CORE',
                description: 'RESTful API architecture with modular blueprints.',
            },
            {
                name: 'Tailwind',
                icon: 'brush',
                role: 'UI STYLING',
                description: 'Utility-first CSS for rapid, responsive design.',
            },
            {
                name: 'PostgreSQL',
                icon: 'database',
                role: 'DATABASE',
                description: 'Robust data storage with SQLAlchemy ORM.',
            },
            {
                name: 'Docker',
                icon: 'deployed_code',
                role: 'DEVOPS',
                description: 'Containerized deployment for consistency.',
            },
        ],
        visualOverview: ['/images/project_1_overview_1.png', '/images/project_1_overview_2.png'],
        features: [
            { title: 'JWT Authentication', description: 'Secure, stateless token-based auth flow.' },
            { title: 'RBAC System', description: 'Granular Role-Based Access Control for admins.' },
            {
                title: 'CI/CD Pipeline',
                description: 'Automated testing and deployment via GitHub Actions.',
            },
            { title: 'Real-time Notifications', description: 'Socket.IO integration for live updates.' },
        ],
        performance: {
            title: 'PERFORMANCE ACHIEVEMENT',
            description:
                'Reduced server response time by 40% through optimized Redis caching for session management.',
        },
        executionDetails:
            'This project was architected with scalability in mind. By utilizing the Factory Pattern in Flask, we ensured that the application can easily handle multiple configurations for development, testing, and production environments. The frontend is completely decoupled from the logic, using Jinja2 templates styled with Tailwind CSS to ensure a lightweight and highly responsive user interface without the overhead of a heavy JS framework.',
    },
    {
        id: '2',
        title: 'Native Mobile Apps',
        version: 'v1.2.0',
        description:
            '다양한 네이티브 앱 개발 프로젝트를 직접 참여하여 경험을 쌓았습니다. 사용자 경험을 최우선으로 고려한 모바일 솔루션입니다.',
        tags: ['Android', 'IOS', 'Flutter'],
        imageUrl: '/images/project_cases_2.png',
        imageAlt: 'Mobile App Development screen showing Flutter code editor and device simulator',
        domain: 'application-coreline.sys',
        repoUrl: '#',
        techStack: [
            {
                name: 'Flutter',
                icon: 'flutter_dash',
                role: 'CROSS PLATFORM',
                description: 'Single codebase for iOS and Android.',
            },
            {
                name: 'Firebase',
                icon: 'local_fire_department',
                role: 'BACKEND',
                description: 'Real-time database and authentication.',
            },
            {
                name: 'Riverpod',
                icon: 'waves',
                role: 'STATE MGT',
                description: 'Robust state management solution.',
            },
        ],
        features: [
            { title: 'Offline Mode', description: 'Full functionality without internet connection.' },
            { title: 'Push Notifications', description: 'Targeted engagement via FCM.' },
        ],
        performance: {
            title: 'APP PERFORMANCE',
            description: 'Achieved 60fps consistent frame rate on low-end devices.',
        },
        executionDetails:
            'We focused on delivering a native-like experience using Flutter. By optimizing the rendering engine and using native platform channels where necessary, we achieved high performance and smooth animations across all devices.',
    },
    {
        id: '3',
        title: 'AI 솔루션 플랫폼',
        description: 'LLM 기반의 자동화 봇과 데이터 분석 대시보드를 구축하였습니다.',
        tags: ['AI', 'Python', 'LangChain'],
        imageUrl: '/images/project_cases_3.png',
        imageAlt:
            'AI Solution Platform interface featuring LangChain node visualization and chatbot analytics',
        domain: 'ai-coreline.tech',
        techStack: [
            {
                name: 'LangChain',
                icon: 'psychology',
                role: 'AI ORCHESTRATION',
                description: 'Building context-aware LLM applications.',
            },
            {
                name: 'FastAPI',
                icon: 'bolt',
                role: 'API SERVING',
                description: 'High-performance async API backend.',
            },
        ],
    },
    {
        id: '4',
        title: '커머스 최적화 시스템',
        description: '대용량 트래픽을 처리하는 마이크로서비스 기반의 커머스 플랫폼입니다.',
        tags: ['Commerce', 'MSA', 'Docker'],
        imageUrl: '/images/project_cases_4.png',
        imageAlt:
            'E-Commerce System Microservices Dashboard showing traffic capability and Docker container status',
        domain: 'commerce-coreline.store',
    },
];
