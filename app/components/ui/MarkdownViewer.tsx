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
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
