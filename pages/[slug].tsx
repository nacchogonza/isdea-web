import React from 'react';
import { fetchAPI } from '../lib/api';
import PageHeader from '../components/Page/PageHeader';
import ComponentSwitcherContent from '../components/ComponentSwitcherContent';

const Pages = ({ page }: any) => {
  return (
    <div className="bg-gray-200">
      <PageHeader
        title={page.attributes.titulo}
        image_desk={page.attributes.image_desk}
        image_mobile={page.attributes.image_mobile}
      />
      <div className="PageMainContainer mx-auto px-4 xl:px-16 min-h-screen relative pb-16 z-20">
        <div className="bg-white rounded-lg shadow-lg -mt-48 w-full p-4 xl:p-10 z-50">
          <ComponentSwitcherContent attributes={page.attributes} />
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const pagesRes = await fetchAPI('/paginas', { fields: ['slug'] });
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
  const pagesRes = await fetchAPI('/paginas', {
    filters: {
      slug: params.slug,
    },
    populate: {
      image_desk: '*',
      image_mobile: '*',
      content: { populate: '*' },
    },
  });

  return {
    props: { page: pagesRes.data[0] },
    revalidate: 1,
  };
}

export default Pages;
