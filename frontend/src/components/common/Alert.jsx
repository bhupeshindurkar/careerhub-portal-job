import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

const Alert = ({ type = 'info', message, onClose }) => {
  const alertStyles = {
    success: 'bg-green-100 border-green-500 text-green-800',
    error: 'bg-red-100 border-red-500 text-red-800',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    info: 'bg-blue-100 border-blue-500 text-blue-800',
  };

  const icons = {
    success: <FaCheckCircle className="text-green-500" />,
    error: <FaTimesCircle className="text-red-500" />,
    warning: <FaExclamationTriangle className="text-yellow-500" />,
    info: <FaInfoCircle className="text-blue-500" />,
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${alertStyles[type]} rounded-r-lg flex items-center justify-between`}>
      <div className="flex items-center">
        <span className="mr-3">{icons[type]}</span>
        <span>{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="ml-4 font-bold">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
