import React from 'react';
import { fetchAPI } from '../lib/api';
import ComponentSwitcher from '../components/ComponentSwitcher';

const Home = ({ homepage, carreras }: any) => {
  return (
    <div className="min-h-screen mt-16">
      <ComponentSwitcher attributes={homepage.attributes} carreras={carreras} />
    </div>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [homepageRes, carrerasRes] = await Promise.all([
    fetchAPI('/home', {
      populate: {
        attributes: '*',
        content: { populate: '*' },
      },
    }),
    fetchAPI('/carreras', {
      pagination: {
        start: 0,
        limit: 4,
      },
       sort: ['createdAt:desc'],
      populate: '*',
    }),
  ]);
  return {
    props: {
      homepage: homepageRes.data,
      carreras: carrerasRes.data,
    },
    revalidate: 1,
  };
}

export default Home;
