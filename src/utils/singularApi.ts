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
    const response = await fetch(`https://api.singular.live/api/v1/${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': window.location.origin,
      },
      mode: 'cors',
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};