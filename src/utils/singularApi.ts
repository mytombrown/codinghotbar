interface SingularApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const getSingularApiKey = (): string | null => {
  return localStorage.getItem('singular-api-key');
};

export const singularApiRequest = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<SingularApiResponse> => {
  const apiKey = getSingularApiKey();
  
  if (!apiKey) {
    return {
      success: false,
      error: 'No API key found. Please add your Singular.live API key in settings.',
    };
  }

  try {
    console.log('Making request with API key:', apiKey); // Debug log
    const baseUrl = `https://app.singular.live/apiv2/controlapps/${apiKey}/control`;
    const url = endpoint ? `${baseUrl}/${endpoint}` : baseUrl;
    
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      console.error('API Response not OK:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data); // Debug log
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Singular API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};