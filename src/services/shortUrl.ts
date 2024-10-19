export const shortenUrl = async (
  url: string, 
  setShortenedUrl: (url: string | null) => void,
  setIsModalOpen: (open: boolean) => void,
  showToast: (type: 'success' | 'warn' | 'error', title: string, message: string) => void
) => {
  if (!url) {
    showToast('warn', 'Warning', 'Please enter a URL before trying to shorten it.');
    return;
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
    setShortenedUrl(data.shortened_url);
    setIsModalOpen(true);
    showToast('success', 'Shortened URL!', 'Your URL has been successfully shortened.');
  } catch (error) {
    console.error('Error shortening URL:', error);
    setShortenedUrl(null);
    showToast('error', 'Error', 'An error occurred when trying to shorten the URL. Please try again.');
  }
};
