import React, { useEffect } from 'react';

const ToastNotification = ({
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-end mb-40 z-50 justify-center">
      <div className="bg-gray-800 text-white px-6 py-4 shadow-3xl rounded-lg">
        <span className='text-2xl'>⚠️</span>{message}
      </div>
    </div>
  );
};

export default ToastNotification;
