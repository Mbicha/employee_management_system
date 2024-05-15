import React from 'react';

const Dialog = ({ isOpen, title, message, imageSrc, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg border-green-800 sm:w-1/2 md:w-1/4 lg:w-1/4">
            {imageSrc && (
              <img src={imageSrc} alt="Dialog Image" className="w-16 h-16 mx-auto mb-4" />
            )}
            <div className='flex justify-center p-2 border-t-2'>
                <h2 className="text-lg font-bold">{title}</h2>
            </div>
            <div className='flex justify-center p-2 border-t-2'>
                <p className="text-sm">{message}</p>
            </div>
            
            <div className="flex justify-end p-2 border-t-2">
              <button
                onClick={onConfirm}
                className="bg-green-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
