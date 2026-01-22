import { Step } from '../../../types';

export const PROCESS_STEPS: Step[] = [
    {
        id: 'p1',
        number: '01',
        title: '탐색 및 분석',
        description: '요구 사항을 분석하고 확장 가능한 전략을 수립합니다.',
        shape: 'square',
    },
    {
        id: 'p2',
        number: '02',
        title: '설계',
        description: '확장 가능한 시스템을 설계하고 기술 스택을 선정합니다.',
        shape: 'circle',
    },
    {
        id: 'p3',
        number: '03',
        title: '개발',
        description: '투명한 코드 리뷰와 함께 애자일 스프린트를 진행합니다.',
        shape: 'polygon',
    },
    {
        id: 'p4',
        number: '04',
        title: '배포',
        description: '운영 환경에 배포하고 지속적인 모니터링을 지원합니다.',
        shape: 'rect',
    },
];
