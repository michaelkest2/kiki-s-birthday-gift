import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, buttonText, onButtonClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-gray-800 text-white rounded-lg shadow-2xl p-8 m-4 max-w-md w-full border-2 border-pink-400 transform transition-all duration-300 scale-95 animate-fade-in">
        <h2 className="text-3xl font-bold mb-4 text-pink-400">{title}</h2>
        <div className="text-gray-300 mb-6 space-y-2">
            {children}
        </div>
        <button
          onClick={onButtonClick}
          className="w-full bg-pink-500 hover:bg-pink-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          {buttonText}
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;