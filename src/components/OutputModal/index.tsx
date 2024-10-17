import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';
import { HiOutlineClipboardDocument } from 'react-icons/hi2';

interface OutputModalProps {
  shortenedUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
  copySuccess: boolean;
}

const OutputModal: React.FC<OutputModalProps> = ({
  shortenedUrl,
  isOpen,
  onClose,
  onCopy,
  copySuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-11/12 max-w-md relative transition-all transform scale-100 duration-300 animate-open">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>
        <h4 className="text-xl font-bold mb-2">Shortened URL:</h4>
        <div className="flex gap-5 items-center">
          <div className="w-fit border border-gray-400 p-2 rounded-md bg-slate-50 overflow-x-auto">
            <a
              href={shortenedUrl || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline break-all"
            >
              {shortenedUrl}
            </a>
          </div>
          <button
            className={`flex items-center justify-center w-10 h-10 bg-black text-white rounded-md transition-colors ${
              copySuccess ? 'bg-black' : 'hover:bg-gray-800'
            }`}
            onClick={onCopy}
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
            URL copied to clipboard!
          </p>
        )}
        <p className="mt-4 text-sm text-gray-600">
          Click on the link above to access or on the icon to copy.
        </p>
      </div>
    </div>
  );
};

export default OutputModal;
