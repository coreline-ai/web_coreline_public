
export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    domain: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

export interface Step {
    id: string;
    number: string;
    title: string;
    description: string;
    shape: 'square' | 'circle' | 'polygon' | 'rect';
}
