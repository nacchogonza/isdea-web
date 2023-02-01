import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { CarreraCard } from '../ContentComponents/CarreraCard';

interface CarreraComponent {
  cta_link?: string;
  cta_text?: string;
  subtitle: string;
  title: string;
  carreras: CarreraAttributes[] | null;
}

interface CarreraAttributes {
  attributes: Carrera;
  id: number;
}

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
  content: CarreraContent[];
}

interface CarreraContent {
  id: number;
  __component: string;
  text?: string;
  title?: string;
  description?: string;
  cta_text?: string;
  cta_link?: string;
  subtitle?: string;
}

export default function HomeCarreras({
  cta_link,
  cta_text,
  subtitle,
  title,
  carreras,
}: CarreraComponent) {
  const fadeUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 0.6,
      },
    },
  };

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    }
  }, [control, inView]);

  return (
    <section>
      <div className="bg-gray-50 w-full">
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={control}>
          <div className="PageMainContainer mx-auto px-4 xl:px-16 py-10 xl:py-20">
            {title ? (
              <h3 className="font-bold text-2xl xl:text-4xl text-center mx-auto text-gray-900 mb-2">{title}</h3>
            ) : null}
            {subtitle ? (
              <p className="font-medium xl:text-lg text-center mx-auto text-gray-600">
                {subtitle}
              </p>
            ) : null}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
              {carreras && carreras.length > 0
                ? carreras?.map((carrera) => (
                    <article key={carrera.id}>
                      <CarreraCard
                        title={carrera.attributes.title}
                        short_description={carrera.attributes.short_description}
                        image={carrera.attributes.image}
                        inscription_state={carrera.attributes.inscription_state}
                        slug={carrera.attributes.slug}
                      />
                    </article>
                  ))
                : null}
            </div>
            {cta_link && cta_text ? (
              <div className="flex items-center justify-center mt-6 xl:mt-12">
                <Link href={cta_link}>
                  <motion.a
                    className="cursor-pointer bg-transparent px-10 py-1 rounded-md border-2 border-black font-medium hover:bg-black hover:text-white text-black transition duration-300 flex items-center"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.3 }}
                  >
                    {cta_text}
                  </motion.a>
                </Link>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
