"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
    content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none break-words">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                components={{
                    // Override specific elements for custom styling if needed
                    a: ({ node, ...props }) => (
                        <a {...props} className="text-blue-600 hover:underline dark:text-blue-400 font-bold" target="_blank" rel="noopener noreferrer" />
                    ),
                    img: ({ node, ...props }) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img {...props} className="rounded-xl border-2 border-black dark:border-white/20 shadow-md max-w-full h-auto my-4" alt={props.alt || 'Markdown image'} />
                    ),
                    code: ({ node, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !match && !String(children).includes('\n');
                        return isInline ? (
                            <code className="bg-gray-100 dark:bg-white/10 px-1 py-0.5 rounded font-mono text-sm font-bold text-red-500" {...props}>
                                {children}
                            </code>
                        ) : (
                            <pre className="bg-gray-900 rounded-xl p-4 overflow-x-auto text-sm text-gray-100 my-4 border-2 border-black dark:border-white/20">
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            </pre>
                        );
                    },
                    blockquote: ({ node, ...props }) => (
                        <blockquote
                            {...props}
                            className="my-6 border-l-[6px] border-[#FFD600] bg-gray-50 p-4 dark:bg-white/5 dark:border-[#FFD600] rounded-r-xl"
                        />
                    ),
                    h1: ({ node, ...props }) => <h1 className="mb-4 mt-8 text-4xl font-black" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="mb-4 mt-8 text-3xl font-black border-b-4 border-black pb-2 dark:border-white/20" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="mb-3 mt-6 text-2xl font-black" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 text-lg font-medium leading-relaxed" {...props} />,
                    ul: ({ node, ...props }) => <ul className="mb-4 list-disc pl-6 space-y-2 font-bold" {...props} />,
                    ol: ({ node, ...props }) => <ol className="mb-4 list-decimal pl-6 space-y-2 font-bold" {...props} />,
                    li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                    hr: ({ node, ...props }) => <hr className="my-8 border-t-4 border-black dark:border-white/20" {...props} />,
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-8 rounded-xl border-4 border-black dark:border-white/20">
                            <table className="w-full text-left border-collapse" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => <thead className="bg-[#FFD600] text-black border-b-4 border-black dark:border-white/20 dark:bg-white/10 dark:text-white" {...props} />,
                    tbody: ({ node, ...props }) => <tbody className="bg-white dark:bg-black" {...props} />,
                    tr: ({ node, ...props }) => <tr className="border-b-2 border-gray-100 dark:border-white/10 last:border-0" {...props} />,
                    th: ({ node, ...props }) => <th className="p-4 font-black uppercase text-sm tracking-wide" {...props} />,
                    td: ({ node, ...props }) => <td className="p-4 font-bold text-sm" {...props} />
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
