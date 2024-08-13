// Modal.js
import React from 'react';
import { Transition } from '@headlessui/react'; // For transitions
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, closeModal, children,url }) => {
  const navigate=useNavigate()
  const close=()=>{
    closeModal()
    navigate(url);

  }
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Background Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'} blur-sm`}
          aria-hidden="true"
        ></div>
        
        {/* Modal Container */}
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition ease-in duration-200"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative z-10">
            <button
              onClick={close}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div>{children}</div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default Modal;
