import './App.css';
import { useRef, useState } from 'react';
import { ToastNotification } from './components/ToastNotification';
import { Toast } from 'primereact/toast';
import OutputModal from './components/OutputModal';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{
    severity: 'success' | 'info' | 'warn' | 'error';
    summary: string;
    detail: string;
  } | null>(null);

  const toastRef = useRef<Toast | null>(null);

  const showToast = (
    severityValue: 'success' | 'info' | 'warn' | 'error',
    summaryValue: string,
    detailValue: string
  ) => {
    setToastMessage({
      severity: severityValue,
      summary: summaryValue,
      detail: detailValue,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!url) {
      showToast(
        'warn',
        'Warning',
        'Please enter a URL before trying to shorten it.'
      );
      return;
    }

    const api_url = 'http://localhost:3333/shorten';

    try {
      const response = await fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original_url: url }),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      const data = await response.json();
      setShortenedUrl(data.shortened_url);
      setIsModalOpen(true);
      showToast(
        'success',
        'Shortened URL!',
        'Your URL has been successfully shortened.'
      );
    } catch (error) {
      console.error('Error shortening URL:', error);
      setShortenedUrl(null);
      showToast(
        'error',
        'Error',
        'An error occurred when trying to shorten the URL. Please try again.'
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShortenedUrl(null);
    setCopySuccess(false);
  };

  const copyToClipboard = async () => {
    if (shortenedUrl) {
      try {
        await navigator.clipboard.writeText(shortenedUrl);
        setCopySuccess(true);
        showToast('success', 'Sucess', 'URL copied to clipboard!');
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        showToast('error', 'Error', 'Unable to copy URL to clipboard.');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <div className="toast-container">
        <ToastNotification ref={toastRef} message={toastMessage || undefined} />
      </div>

      <div className="flex-grow flex items-center justify-center text-center w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <h1 className="text-4xl sm:text-4xl font-medium mb-4">
            URL Shortener
          </h1>
          <h3 className="text-xl sm:text-2xl font-light mb-6 opacity-60">
            Enter your long URL below and get a shortened link in seconds.
          </h3>
          <div className="flex flex-col items-center">
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
              >
                Shorten URL
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-base-100 p-1 w-full">
        <div className="flex justify-center items-center w-full">
          <div className="inline-flex border-t border-secondary px-10 py-1">
            <p className="text-center">
              &copy; 2024 Conheço uma Ponte. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

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
