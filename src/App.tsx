import './App.css';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center w-full max-w-3xl">
        <h1 className="text-5xl font-bold mb-4">URL Shortener</h1>
        <h3 className="text-2xl font-bold mb-6 opacity-40">
          Enter your long URL below and get a shortened link in seconds.
        </h3>
        <div className="flex flex-col items-center">
          <input
            type="text"
            className="border border-gray-300 rounded p-2 text-lg mb-4 w-full max-w-md"
            placeholder="Enter your URL"
          />
          <button className="w-full py-2 bg-black text-white text-lg rounded-md hover:bg-gray-800 max-w-md">
            Shorten URL
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
