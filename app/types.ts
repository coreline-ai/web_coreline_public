
export interface TechStackItem {
    name: string;
    icon: string; // material symbol name
    role: string;
    description: string;
}

export interface Feature {
    title: string;
    description: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    domain: string;
    // New detailed fields
    version?: string;
    repoUrl?: string; // GitHub link
    techStack?: TechStackItem[];
    visualOverview?: string[]; // Array of image URLs
    features?: Feature[];
    performance?: {
        title: string;
        description: string;
    };
    executionDetails?: string; // Long narrative text
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
