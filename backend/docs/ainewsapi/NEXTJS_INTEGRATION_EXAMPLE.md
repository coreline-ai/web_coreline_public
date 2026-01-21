# Next.js Integration Example

This guide explains how to fetch **Top 8 AI News** from the AI News Dashboard backend using **Next.js**.
The API supports Cross-Origin Resource Sharing (CORS), so you can call it from any domain.

## 1. API Endpoint

- **URL**: `https://YOUR_NETLIFY_SITE_URL/api/report`
- **Parameter**: `limit=8` (Returns top 8 items)
- **Method**: `GET`

---

## 2. Server Component Example (App Router)

Use this method for **Next.js 13+ App Router**. It fetches data on the server, improving SEO and performance.

```tsx
// components/TopNewsSection.tsx
import Link from 'next/link';

// 1. Define Types
interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  summary: string;
  topic: string;
  why_it_matters: string;
}

interface ApiResponse {
  date: string;
  top_news: NewsItem[];
  generated_at: string;
}

// 2. Fetch Function
async function getTopNews(): Promise<NewsItem[]> {
  // Replace with your actual production URL
  const API_URL = 'https://ai-news-dashboard.netlify.app/api/report?limit=8'; // EXAMPLE URL
  
  const res = await fetch(API_URL, { 
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }

  const data: ApiResponse = await res.json();
  return data.top_news || [];
}

// 3. Server Component
export default async function TopNewsSection() {
  const news = await getTopNews();

  return (
    <section className="p-8 bg-zinc-50">
      <h2 className="text-2xl font-bold mb-6">🔥 Top AI News</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {news.map((item) => (
          <article key={item.id} className="border border-zinc-200 p-4 rounded bg-white hover:shadow-lg transition-shadow">
            <span className="text-xs font-bold uppercase text-blue-600 mb-2 block">
              {item.source}
            </span>
            <h3 className="font-bold text-lg mb-2 line-clamp-2">
              <Link href={item.url} target="_blank" className="hover:underline">
                {item.title}
              </Link>
            </h3>
            <p className="text-sm text-zinc-600 line-clamp-3">
              {item.summary}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

---

## 3. Client Component Example (Classic / Page Router)

Use this if you need to fetch data on the client side (e.g., standard React or older Next.js).

```tsx
'use client';

import { useState, useEffect } from 'react';

// ... (Types are the same as above) ...

export default function LatestNewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('https://ai-news-dashboard.netlify.app/api/report?limit=8');
        const data = await res.json();
        setNews(data.top_news || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading AI News...</div>;

  return (
    <ul>
      {news.map(item => (
        <li key={item.id} className="mb-2">
          <a href={item.url} target="_blank" className="text-blue-600 hover:underline">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
```
