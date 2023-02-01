import React, { useState, useEffect } from 'react';
import { fetchAPI } from '../../lib/api';
import { CarreraCard } from '../../components/ContentComponents/CarreraCard';
import Pagination from '../../components/Pagination/Pagination';
import { CarreraFilter } from '../../components/ContentComponents/CarreraFilter';
import { CarreraCategoryFilter } from '../../components/ContentComponents/CarreraCategoryFilter';
import { motion } from 'framer-motion';

interface Carrera {
  title: string;
  short_description: string;
  inscription_state: string;
  duracion: string;
  modalidad: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  slug: string;
  image: any;
}

interface Categorias {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  nombre: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const Carreras = () => {
  const [orderFecha, setOrderFecha] = useState('desc');
  const [orderAlfabetico, setOrderAlfabetico] = useState('desc');
  const [searchInput, setSearchInput] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  let PageSize = 1;

  const [queryResult, setQueryResult] = useState<Carrera[]>([]);
  const [categories, setCategories] = useState<Categorias[]>([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedCatName, setSelectedCatName] = useState('');

  useEffect(() => {
    getCarreras();
  }, [orderFecha, orderAlfabetico, searchWord, currentPage, selectedCat]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const catRes = await fetchAPI('/categorias');
      setCategories(catRes.data);
    } catch (e: any) {
      console.error(e.response);
    }
  };

  const getCarreras = async () => {
    try {
      if (searchWord) {
        const pagesRes = await fetchAPI('/carreras', {
          filters: {
            $or: [
              {
                title: {
                  $contains: searchWord,
                },
              },
              {
                short_description: {
                  $contains: searchWord,
                },
              },
            ],
            $and: [
              {
                categoria: {
                  $or: [
                    {
                      slug: {
                        $contains: selectedCat,
                      },
                    },
                  ],
                },
              },
            ],
          },
          pagination: {
            page: currentPage,
            pageSize: PageSize,
          },
          sort: [`createdAt:${orderFecha}`, `title:${orderAlfabetico}`],
          populate: {
            image: '*',
            categoria: '*',
          },
        });
        setTotalPages(pagesRes.meta.pagination.total);
        setQueryResult(pagesRes.data);
      } else {
        const pagesRes = await fetchAPI('/carreras', {
          sort: [`createdAt:${orderFecha}`, `title:${orderAlfabetico}`],
          filters: {
            categoria: {
              $or: [
                {
                  slug: {
                    $contains: selectedCat,
                  },
                },
              ],
            },
          },
          pagination: {
            page: currentPage,
            pageSize: PageSize,
          },
          populate: {
            image: '*',
            categoria: '*',
          },
        });
        setTotalPages(pagesRes.meta.pagination.total);
        setQueryResult(pagesRes.data);
      }
    } catch (e: any) {
      console.error(e.response);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchWord(searchInput);
    setCurrentPage(1);
  };

  return (
    <div className="mt-16">
      <div className="PageMainContainer mx-auto px-4 xl:px-16 py-6">
        <div className="mb-4">
          <h1 className="font-bold text-black text-2xl xl:text-4xl lg:mx-auto">Carreras</h1>
        </div>
        <div className="block xl:flex xl:justify-between">
          <form onSubmit={(e) => handleSearch(e)}>
            <div className="flex gap-4">
              <input
                className="px-4 py-2 border border-gray-400 rounded"
                type="text"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <motion.button
                type="submit"
                className={`cursor-pointer px-5 py-2 rounded-md text-gray-200 bg-cm-primary hover:bg-cm-primaryLight hover:text-white font-bold transition duration-300 flex items-center`}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.3 }}
              >
                Buscar
              </motion.button>
            </div>
          </form>
          <div className="flex justify-start gap-4">
            <CarreraCategoryFilter
              categorias={categories}
              setSelectedCat={setSelectedCat}
              setSelectedCatName={setSelectedCatName}
              selectedCatName={selectedCatName}
            />
            <CarreraFilter
              orderFecha={orderFecha}
              orderAlfabetico={orderAlfabetico}
              setOrderFecha={setOrderFecha}
              setOrderAlfabetico={setOrderAlfabetico}
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="PageMainContainer mx-auto px-4 xl:px-16 min-h-screen relative py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {queryResult.length > 0
              ? queryResult.map((item: any) => (
                  <div key={item.id}>
                    <CarreraCard
                      title={item.attributes.title}
                      short_description={item.attributes.short_description}
                      image={item.attributes.image}
                      inscription_state={item.attributes.inscription_state}
                      slug={item.attributes.slug}
                    />
                  </div>
                ))
              : null}
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={totalPages}
            pageSize={PageSize}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Carreras;
