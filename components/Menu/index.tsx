import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';
import MenuItem from './MenuItem';
import MenuWithSubitems from './MenuWithSubitems';
import MenuItemMobile from './MenuItemMobile';
import MenuWithSubitemsMobile from './MenuWithSubitemsMobile';

interface MenuItemsContent {
  menuItems: MenuItem[];
  image: any;
}

interface MenuItem {
  __component: string;
  subitem_title: string;
  subitem_link: string;
  destacado: boolean;
  subitems?: MenuSubItem[];
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

export default function Menu({ menuItems, image }: MenuItemsContent) {
  const [open, setOpen] = useState(false);

  let mainMenu = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDeskItem);
    window.addEventListener('scroll', handleScroll);
  }, [open]);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 10) {
      setOpen(false);
    }
  };

  const handleClickOutsideDeskItem = (event: any) => {
    if (mainMenu.current !== undefined) {
      if (mainMenu.current && !mainMenu.current.contains(event.target)) {
        setOpen(false);
      }
    }
  };

  const menuMobile = {
    hidden: {
      height: '0rem',
      opacity: 0,
    },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      height: '0rem',
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const fadeToRight = {
    initial: { y: -60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <header className="bg-white fixed top-0 z-50 w-full shadow-lg" ref={mainMenu}>
      <div className="PageMainContainer mx-auto px-4 xl:px-16">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1">
            <Link href="/">
              <a className="flex items-center justify-start">
                <span className="sr-only">ISDEA Logo</span>
                <Image
                  alt="ISDEA Logo"
                  src={image?.data?.attributes?.url}
                  width={173}
                  height={53}
                />
              </a>
            </Link>
          </div>

          <div className="md:flex md:items-center justify-end">
            <nav className="hidden lg:block" aria-labelledby="header-navigation">
              <h2 className="sr-only" id="header-navigation">
                Header navigation
              </h2>

              <ul className="flex items-center gap-2 text-sm">
                {menuItems.length > 0
                  ? menuItems.map((item) => {
                      if (item.__component === 'atoms.navigation-menu-subitem') {
                        return <div key={item.id + "item"}><MenuItem item={item} /></div>;
                      }
                      if (item.__component === 'atoms.navigation-menu-item') {
                        return <div key={item.id + "item-sub"}><MenuWithSubitems item={item} /></div>;
                      }
                    })
                  : null}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="block lg:hidden">
                <motion.button
                  aria-label="Botón menu principal"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.3 }}
                  onClick={() => setOpen(!open)}
                  className="p-2 text-white transition bg-cm-primary rounded duration-200 hover:bg-cm-primaryLight"
                >
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {open ? (
            <motion.div variants={menuMobile} initial={'hidden'} animate={'visible'} exit={'exit'}>
              <div className="pb-4 xl:p-0">
                <ul className="text-sm">
                  {menuItems.length > 0
                    ? menuItems.map((item, i) => {
                        if (item.__component === 'atoms.navigation-menu-subitem') {
                          return (
                            <motion.li
                              variants={fadeToRight}
                              initial="initial"
                              animate="animate"
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              key={item.subitem_title + item.id}
                            >
                              <MenuItemMobile item={item} />
                            </motion.li>
                          );
                        }
                        if (item.__component === 'atoms.navigation-menu-item') {
                          return (
                            <motion.li
                              variants={fadeToRight}
                              initial="initial"
                              animate="animate"
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              key={item.item_title + item.id}
                            >
                              <MenuWithSubitemsMobile item={item} />
                            </motion.li>
                          );
                        }
                      })
                    : null}
                </ul>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
