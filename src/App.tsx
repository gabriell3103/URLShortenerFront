import './App.css';
import { useState, useRef, useEffect } from 'react';
import { ToastNotification } from './components/ToastNotification';
import OutputModal from './components/OutputModal';
import useQuery from './hooks/useQuery';
import { useToast } from './hooks/useToast';
import { Toast } from 'primereact/toast';
import { shortenUrl } from './services/shortUrl';
import { ProgressSpinner } from 'primereact/progressspinner';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { toastMessage, showToast } = useToast();
  const toastRef = useRef<Toast | null>(null);

  const query = useQuery();
  const error = query.get('error');

  const validateUrl = (inputUrl: string): string | null => {
    try {
      const validatedUrl = new URL(inputUrl);
      return validatedUrl.href;
    } catch {
      return null;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validUrl = validateUrl(url);

    if (!validUrl) {
      showToast('warn', 'Invalid URL', 'Please provide a valid URL.');
      return;
    }

    setLoading(true);

    try {
      const data = await shortenUrl(validUrl);
      setShortenedUrl(data);
      
      setIsModalOpen(true);
      showToast('success', 'Shortened URL!', 'Your URL has been successfully shortened.');
    } catch {
      showToast('error', 'Error', 'An error occurred while shortening the URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShortenedUrl(null);
    setCopySuccess(false);
  };

  const copyToClipboard = async () => {
    if (!shortenedUrl) return;

    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopySuccess(true);
      showToast('success', 'Copied!', 'URL copied to clipboard.');
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      showToast('error', 'Error', 'Failed to copy URL to clipboard.');
    }
  };

  useEffect(() => {
    if (error === 'URLNotFound' && !toastMessage) {
      showToast('error', 'Error', 'The shortened URL was not found.');
      query.delete('error');
    }
  }, [error, toastMessage, showToast, query]);

  return (
    <div className="flex flex-col min-h-screen bg-base-100 relative">
      <div className="toast-container">
        <ToastNotification ref={toastRef} message={toastMessage || undefined} />
      </div>

      <div className="flex-grow flex items-center justify-center text-center w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center content-center w-full">
          <h1 className="text-4xl sm:text-4xl font-medium mb-4">URL Shortener</h1>
          <h3 className="text-xl sm:text-2xl font-light mb-6 opacity-60">
            Enter your long URL below and get a shortened link in seconds.
          </h3>

          <form className="w-full max-w-md mb-4" onSubmit={handleSubmit}>
            <input
              type="text"
              className="border border-primary focus:border-secondary rounded p-2 text-lg w-full"
              placeholder="Enter your URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white text-lg rounded-md hover:bg-neutral max-w-md mt-4"
              disabled={loading}
            >
              Shorten URL
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-base-100 p-1 w-full">
        <div className="flex justify-center items-center w-full">
          <div className="inline-flex border-t border-secondary px-10 py-1">
            <p className="text-center">&copy; 2024 Conheço uma Ponte. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {loading && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <ProgressSpinner style={{ width: '50px', height: '50px' }} className="p-3 spinner-primary" />
        </div>
      )}

      <OutputModal
        shortenedUrl={shortenedUrl}
        isOpen={isModalOpen}
        onClose={closeModal}
        onCopy={copyToClipboard}
        copySuccess={copySuccess}
      />
    </div>
  );
};

export default App;
