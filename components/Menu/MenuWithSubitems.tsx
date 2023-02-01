import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface ItemWithSub {
  item: MenuItem;
}

interface MenuItem {
  id: number;
  __component: string;
  item_title: string;
  subitems?: MenuSubItem[];
}

interface MenuSubItem {
  id: number;
  __component: string;
  subitem_title: string;
  subitem_link: string;
  destacado: boolean;
}

export default function MenuWithSubitems({ item }: ItemWithSub) {
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
      className="relative text-left hidden lg:block"
      onClick={() => buttonToggle()}
      ref={menuDropDown}
    >
      <div>
        <button
          aria-haspopup="true"
          aria-expanded={menuToggle}
          id={item.item_title}
          className="hidden focus:outline-none focus:ring focus:border-cm-primary xl:block px-2 py-2 font-medium text-gray-500 hover:text-gray-800 transition duration-300 ease-in-out"
        >
          <div className={'flex items-center'}>
            {item.item_title}
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
            ? 'origin-top-right absolute right-0 mt-2 rounded-lg w-64 shadow-lg bg-white transition ease-out duration-300 ring-1 ring-cm-primary ring-opacity-5 transform opacity-100 scale-100'
            : 'origin-top-right absolute right-0 mt-2 rounded-lg w-64 shadow-lg bg-white transition ease-out duration-300 ring-1 ring-cm-primary ring-opacity-5 transform opacity-0 scale-0'
        }
      >
        <div className="py-1 " aria-labelledby={item.item_title}>
          {item?.subitems?.map((item) => (
            <Link key={'desk-item' + item.id} href={item.subitem_link} >
              <a className="block text-gray-400 transition duration-300 hover:text-gray-800 px-4 py-2 group/item">
                <div className="flex items-center justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-2 transition ease-out duration-300 group-hover/item:text-cm-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>{item.subitem_title}</div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
