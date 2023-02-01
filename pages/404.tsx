import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Page404 = () => {
  return (
    <div className="min-h-screen mt-16 flex items-center justify-center">
      <div>
        <p className="text-center mb-2 font-medium text-xl text-gray-500 animate-bounce">¡ERROR!</p>
        <h2 className="text-9xl font-bold flex items-center justify-center mb-6">
          4
          <span>
            <svg className="h-28 w-28 text-red-700" viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM64 256c0-106.1 86-192 192-192c42.1 0 81 13.7 112.6 36.7L100.7 368.6C77.7 337 64 298.1 64 256zm192 192c-42.1 0-81-13.7-112.6-36.7l267.9-267.9c23 31.7 36.7 70.5 36.7 112.6c0 106.1-86 192-192 192z"
              ></path>
            </svg>
          </span>
          4
        </h2>
        <p className="text-center mb-4 text-black">
          El contenido que estas buscando, no existe o fue modificado.
        </p>
        <div className="flex items-center justify-center">
          <Link href="/">
            <motion.a
              className="cursor-pointer bg-transparent px-10 py-1 rounded-md border-2 border-black font-medium hover:bg-black hover:text-white text-black transition duration-300 flex items-center"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.3 }}
            >
              Volver al inicio
            </motion.a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
