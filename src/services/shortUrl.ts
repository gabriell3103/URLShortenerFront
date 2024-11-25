export const shortenUrl = async (
  url: string, 
): Promise<string> => {
  if (!url) {
    throw new Error('Please enter a URL before trying to shorten it');
  }

  const api_url = 'http://localhost:3333/shorten';

  try {
    const response = await fetch(api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ original_url: url }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.shortened_url;
  } catch (error) {
    console.error('Error shortening URL:', error);
    throw new Error(`An error occurred when trying to shorten the URL.\n ${error}`);

  }
};
