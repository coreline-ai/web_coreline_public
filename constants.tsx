
import { Project, Service, Step } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nova 금융 대시보드',
    description: '수백만 건의 일일 트랜잭션을 1초 미만의 지연 시간으로 처리하는 고성능 React 애플리케이션입니다.',
    tags: ['Fintech', 'React'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=1000',
    domain: 'nova-fintech.app'
  },
  {
    id: '2',
    title: 'MediScan AI 진단',
    description: '예측 모델을 사용하여 이상 징후를 조기에 감지하는 AI 기반 환자 모니터링 시스템입니다.',
    tags: ['HealthTech', 'AI / Python'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
    domain: 'mediscan-ai.sys'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: '맞춤형 S/W',
    description: 'React, Node, Go 등 최신 스택으로 복잡한 비즈니스 로직을 완벽하게 구현합니다.',
    icon: 'terminal',
    color: '#1A1A1A'
  },
  {
    id: 's2',
    title: 'AI & ML 통합',
    description: 'LLM과 예측 알고리즘을 비즈니스 워크플로우에 통합하여 효율성을 극대화합니다.',
    icon: 'memory',
    color: '#8B5CF6'
  },
  {
    id: 's3',
    title: '클라우드 인프라',
    description: 'AWS, Azure, GCP에서 확장 가능하고 비용 효율적인 아키텍처를 설계합니다.',
    icon: 'cloud',
    color: '#00E5FF'
  },
  {
    id: 's4',
    title: 'MVP 개발',
    description: '아이디어를 빠르게 검증할 수 있도록 핵심 기능을 갖춘 제품을 신속하게 출시합니다.',
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
    { name: 'Go', icon: 'terminal' },
    { name: 'PostgreSQL', icon: 'database' }
  ],
  AI: [
    { name: 'LangChain', icon: 'psychology' },
    { name: 'OpenAI API', icon: 'api' },
    { name: 'HuggingFace', icon: 'smart_toy' },
    { name: 'RAG', icon: 'library_books' }
  ],
  Infra: [
    { name: 'AWS', icon: 'dns' },
    { name: 'Docker', icon: 'deployed_code' },
    { name: 'Vercel', icon: 'cloud' },
    { name: 'GitHub Actions', icon: 'settings_suggest' }
  ]
};
