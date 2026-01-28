import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '8';

    const TARGET_URL = `https://ai-news-5min-dashboard.netlify.app/api/report?limit=${limit}`;

    try {
        const res = await fetch(TARGET_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch external data' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
