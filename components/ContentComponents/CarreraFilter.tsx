import React, { useState, useEffect, useRef } from 'react';

interface CarreraFilters {
  setOrderAlfabetico: Function;
  setOrderFecha: Function;
  orderFecha: string;
  orderAlfabetico: string;
}

export const CarreraFilter = ({
  setOrderFecha,
  setOrderAlfabetico,
  orderFecha,
  orderAlfabetico,
}: CarreraFilters) => {
  const [menuToggle, setMenuToggle] = useState(false);
  let menuDropDown = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDeskItem);
    window.addEventListener('scroll', handleScroll);
  }, [menuToggle]);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 10) {
      setMenuToggle(false);
    }
  };

  const handleClickOutsideDeskItem = (event: any) => {
    if (menuDropDown.current !== undefined) {
      if (menuDropDown.current && !menuDropDown.current.contains(event.target)) {
        setMenuToggle(false);
      }
    }
  };

  const buttonToggle = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <div
      className="relative text-left mt-4 xl:mt-0"
      onClick={() => buttonToggle()}
      ref={menuDropDown}
    >
      <div>
        <button
          aria-haspopup="true"
          aria-expanded={menuToggle}
          id="ordenarPor"
          className="focus:outline-none focus:ring focus:border-cm-primary px-2 py-2 font-medium text-gray-500 hover:text-gray-800 transition duration-300 ease-in-out border border-gray-400 rounded"
        >
          <div className={'flex items-center'}>
            Ordenar Por
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 ml-1 text-cm-primary"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>
      <div
        className={
          menuToggle
            ? 'origin-top-left xl:origin-top-right absolute xl:right-0 mt-2 rounded-lg w-64 shadow-lg bg-white transition ease-out duration-300 ring-1 ring-cm-primary ring-opacity-5 transform opacity-100 scale-100 z-20'
            : 'origin-top-left xl:origin-top-right absolute xl:right-0 mt-2 rounded-lg w-64 shadow-lg bg-white transition ease-out duration-300 ring-1 ring-cm-primary ring-opacity-5 transform opacity-0 scale-0 z-20'
        }
      >
        <div className="py-1 " aria-labelledby={'ordenar por items'}>
          {orderFecha === 'desc' ? (
            <button
              onClick={() => setOrderFecha('asc')}
              className="block w-full text-gray-400 transition duration-300 hover:text-gray-800 px-4 py-2 group/item"
            >
              <div className="flex items-center justify-start">
                <div>Más Antiguas primero</div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setOrderFecha('desc')}
              className="block w-full text-gray-400 transition duration-300 hover:text-gray-800 px-4 py-2 group/item"
            >
              <div className="flex items-center justify-start">
                <div>Más Nuevas primero</div>
              </div>
            </button>
          )}
          {orderAlfabetico === 'desc' ? (
            <button
              onClick={() => setOrderAlfabetico('asc')}
              className="block w-full text-gray-400 transition duration-300 hover:text-gray-800 px-4 py-2 group/item"
            >
              <div className="flex items-center justify-start">
                <div>Z - A</div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setOrderAlfabetico('desc')}
              className="block w-full text-gray-400 transition duration-300 hover:text-gray-800 px-4 py-2 group/item"
            >
              <div className="flex items-center justify-start">
                <div>A - Z</div>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};