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
  title?: string;
}

const OutputModal: React.FC<OutputModalProps> = ({
  shortenedUrl,
  isOpen,
  onClose,
  onCopy,
  copySuccess,
  title = "Shortened URL:", 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0">
      <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full sm:w-11/12 max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-base-content" onClick={onClose}>
          <IoMdClose size={24} />
        </button>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <div className="flex gap-5 items-center">
          <div className="w-fit border border-primary p-2 rounded-md bg-base-200 overflow-x-auto">
            <a
              href={shortenedUrl || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline break-all"
            >
              {shortenedUrl}
            </a>
          </div>
          <button
            className={`flex items-center justify-center w-10 h-10 bg-base-300 text-base-con rounded-md transition-colors ${
              copySuccess ? 'bg-base-100' : 'hover:bg-primary'
            }`}
            onClick={onCopy}
            title="Copy to clipboard"
          >
            {copySuccess ? <FaCheck size={18} /> : <HiOutlineClipboardDocument size={18} />}
          </button>
        </div>
        <p className="mt-4 text-sm text-neutral-content">
          Click on the link above to access or on the icon to copy.
        </p>
      </div>
    </div>
  );
};

export default OutputModal;
