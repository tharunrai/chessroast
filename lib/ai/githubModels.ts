export async function callGitHubModel(systemPrompt: string, userPrompt: string, jsonMode: boolean = true): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  try {
    const payload: Record<string, unknown> = {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: process.env.GITHUB_MODEL || 'gpt-4o-mini',
      temperature: 0.9,
      max_tokens: 1000
    };

    if (jsonMode) {
      payload.response_format = { type: 'json_object' };
    }

    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.warn(`GitHub Models API error (${response.status}): ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    return content || null;
  } catch (err) {
    console.warn('Failed to connect to GitHub Models:', err);
    return null;
  }
}
