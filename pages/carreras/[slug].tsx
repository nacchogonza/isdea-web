import React from 'react';
import { fetchAPI } from '../../lib/api';
import ComponentSwitcherContent from '../../components/ComponentSwitcherContent';
import CareerPageHeader from '../../components/Career/CareerPageHeader';

const Carrera = ({ page }: any) => {
  return (
    <div className="bg-gray-200">
      <CareerPageHeader
        title={page.attributes.title}
        image={page.attributes.image}
        short_description={page.attributes.short_description}
        inscription_state={page.attributes.inscription_state}
        duracion={page.attributes.duracion}
        modalidad={page.attributes.modalidad}
      />
      <div className="PageMainContainer mx-auto px-6 md:px-8 lg:px-12 xl:px-16 relative pb-16 z-20">
        <div className="bg-white rounded-lg shadow-lg -mt-12 md:-mt-20 lg:-mt-32 w-full p-6 md:p-8 xl:p-10 z-50">
          <ComponentSwitcherContent attributes={page.attributes} />
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const pagesRes = await fetchAPI('/carreras', { fields: ['slug'] });
  return {
    paths: pagesRes.data.map((article: any) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const carrerasRes = await fetchAPI('/carreras', {
    filters: {
      slug: params.slug,
    },
    populate: {
      image: '*',
      content: { populate: '*' },
    },
  });

  return {
    props: { page: carrerasRes.data[0] },
    revalidate: 1,
  };
}

export default Carrera;
