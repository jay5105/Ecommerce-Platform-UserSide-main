
import React from 'react';

function Modal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm w-full p-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-4 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-yellow-400 text-black py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-yellow-500">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
