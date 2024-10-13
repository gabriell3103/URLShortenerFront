import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center text-center w-full max-w-3xl mx-auto">
        <div>
          <h1 className="text-5xl font-bold mb-4">URL Shortener</h1>
          <h3 className="text-2xl font-bold mb-6 opacity-40">
            Enter your long URL below and get a shortened link in seconds.
          </h3>
          <div className="flex flex-col items-center">
            <form className="w-full max-w-md mb-4">
              <input
                type="text"
                className="border border-gray-300 rounded p-2 text-lg w-full"
                placeholder="Enter your URL"
              />
            </form>
            <button className="w-full py-2 bg-black text-white text-lg rounded-md hover:bg-gray-800 max-w-md">
              Shorten URL
            </button>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-black text-white p-4">
        <div className="flex justify-center items-center max-w-3xl mx-auto">
          <p>&copy; 2024 Conheço uma Ponte. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
