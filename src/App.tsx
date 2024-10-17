import './App.css';
import { useState } from 'react';
import { HiOutlineClipboardDocument } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const api_url = 'http://localhost:3333/shorten';

    try {
      const response = await fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_url: url,
        }),
      });

      const data = await response.json();
      setShortenedUrl(data.shortened_url);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao encurtar a URL:', error);
      setShortenedUrl(null);
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
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (error) {
        console.error('Erro ao copiar para a área de transferência:', error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center text-center w-full max-w-3xl mx-auto">
        <div>
          <h1 className="text-5xl font-bold mb-4">URL Shortener</h1>
          <h3 className="text-2xl font-bold mb-6 opacity-40">
            Enter your long URL below and get a shortened link in seconds.
          </h3>
          <div className="flex flex-col items-center">
            <form className="w-full max-w-md mb-4" onSubmit={handleSubmit}>
              <input
                type="text"
                className="border border-gray-300 rounded p-2 text-lg w-full"
                placeholder="Enter your URL"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
              <button
                type="submit"
                className="w-full py-2 bg-black text-white text-lg rounded-md hover:bg-gray-800 max-w-md mt-4"
              >
                Shorten URL
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-black text-white p-4">
        <div className="flex justify-center items-center max-w-3xl mx-auto">
          <p>&copy; 2024 Conheço uma Ponte. Todos os direitos reservados.</p>
        </div>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative transition-all transform scale-100 duration-300 animate-open">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              <IoMdClose size={24} />
            </button>
            <h4 className="text-xl font-bold mb-2">Shortened URL:</h4>
            <div className="flex gap-5">
              <div className="w-fit border border-gray-400 p-2 rounded-md bg-slate-50">
                <a
                  href={shortenedUrl || ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {shortenedUrl}
                </a>
              </div>
              <button
                className={`flex items-center justify-center w-10 h-10 bg-black text-white rounded-md transition-colors ${
                  copySuccess ? 'bg-black' : 'hover:bg-gray-800'
                }`}
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                {copySuccess ? (
                  <FaCheck size={18} />
                ) : (
                  <HiOutlineClipboardDocument size={18} />
                )}
              </button>
            </div>
            {copySuccess && (
              <p className="mt-2 text-sm text-green-600">
                URL copiada para a área de transferência!
              </p>
            )}
            <p className="mt-4 text-sm text-gray-600">
              Clique no link acima para acessar ou no ícone para copiar.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
