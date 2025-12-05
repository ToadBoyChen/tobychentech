// app/api/hackerrank/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  try {
    // 1. Fetch Profile Data (Badges, etc)
    const profileRes = await fetch(`https://www.hackerrank.com/rest/hackers/${username}/badges`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    
    // 2. Fetch Submission History (for total solved)
    const historyRes = await fetch(`https://www.hackerrank.com/rest/hackers/${username}/submission_histories`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!profileRes.ok || !historyRes.ok) {
        throw new Error('Failed to fetch data from HackerRank');
    }

    const profileData = await profileRes.json();
    const historyData = await historyRes.json();

    return NextResponse.json({
        models: profileData.models, // Contains badges/stars
        submissionHistory: historyData // Contains daily activity
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch HackerRank data' }, { status: 500 });
  }
}