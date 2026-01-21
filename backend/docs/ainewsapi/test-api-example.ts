
import fetch from 'node-fetch';

// Type definition matches the API response
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

// 1. Define the API Endpoint (assuming local dev server)
// In production, this would be your actual Netlify URL e.g., 'https://your-site.netlify.app'
const API_URL = 'http://localhost:8888/.netlify/functions/api-report';

async function getTopNews() {
    console.log(`Fetching top 8 news from ${API_URL}...`);

    try {
        // 2. Fetch data with limit=8 parameter
        const res = await fetch(`${API_URL}?limit=8`);

        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }

        const data = (await res.json()) as ApiResponse;

        // 3. Validation
        if (!data.top_news) {
            console.error('Error: "top_news" field missing in response.');
            process.exit(1);
        }

        if (data.top_news.length !== 8) {
            console.warn(`Warning: Expected 8 items, got ${data.top_news.length}. (Check if database has enough data)`);
        } else {
            console.log('✅ Validation Success: Received exactly 8 items.');
        }

        // 4. Output results
        console.log('\n--- Top 8 AI News ---');
        data.top_news.forEach((item, index) => {
            console.log(`${index + 1}. [${item.topic}] ${item.title} (${item.source})`);
        });

    } catch (error) {
        console.error('Fetch Error:', error);
        process.exit(1);
    }
}

getTopNews();
