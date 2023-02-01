import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Servicioinfo {
  title?: string;
  id: number;
  content?: string;
  onShow: Function;
  show: boolean;
}

export const FaqItem = ({ title, content, id, onShow, show }: Servicioinfo) => {
  const handleClick = () => {
    onShow && onShow(id);
  };

  return (
    <div onClick={handleClick} className="py-2 border-b border-black group">
      <div className={'flex items-center justify-between cursor-pointer'}>
        <h5 className="text-lg font-bold text-black flex items-center justify-start"><span className="text-cm-primary font-bold text-3xl mr-3">{('0' + (id + 1)).slice(-2)}</span> {title}</h5>
        <span className="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`flex-shrink-0 w-5 h-5 transition duration-300 ${
              show ? '-rotate-45' : null
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      <div className={`${show ? 'block' : 'hidden'}`}>
        {content ? (
          <ReactMarkdown
            className="prose prose-p:text-black max-w-full xl:text-lg w-full mb-6 mt-4"
            children={content}
          />
        ) : null}
      </div>
    </div>
  );
};
