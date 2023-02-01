import React, { useEffect } from 'react';
import Image from 'next/image';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import durationIcon from '../../public/assets/images/duracion_icon.svg';
import modalityIcon from '../../public/assets/images/modalidad_icon.svg';
import { CareerSpecsItem } from './CareerSpecsItem';

interface CareerPageHeaderProps {
  image: any;
  title: string;
  short_description: string;
  inscription_state: string;
  duracion: string;
  modalidad: string;
}

export default function CareerPageHeader({
  image,
  title,
  short_description,
  inscription_state,
  duracion,
  modalidad,
}: CareerPageHeaderProps) {
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
      <div className="w-full mt-16 relative">
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={control}>
          <div className=" bg-cm-primary mx-auto flex items-center justify-center flex-row relative">
            <div className=" PageMainContainer px-8 lg:px-16 z-20 careerHeaderBackground w-full h-mobile lg:h-screen">
              <div className="careerHeaderBackground flex flex-col md:flex-row justify-start md:justify-between h-mobile md:h-screen">
                <div className="mt-12 md:mt-40 lg:mt-32 careerInformationContainer">
                  {inscription_state ? (
                    <div className="rounded-full bg-cm-tagGreen text-white text-sm font-medium px-5 py-1 max-w-fit mb-6">
                      {inscription_state}
                    </div>
                  ) : null}
                  {title ? (
                    <h2 className="font-bold text-white text-2xl lg:text-4xl mx-auto mb-2 lg:mb-6">
                      {title}
                    </h2>
                  ) : null}
                  {short_description ? (
                    <h5 className="font-light text-white text-md lg:text-xl mx-auto mb-6">
                      {short_description}
                    </h5>
                  ) : null}
                  <div className="flex gap-2 xl:gap-6">
                    {duracion ? (
                      <CareerSpecsItem
                        image_src={durationIcon?.src || ''}
                        title="Duración"
                        content={duracion}
                      />
                    ) : null}
                    {modalidad ? (
                      <CareerSpecsItem
                        image_src={modalityIcon?.src || ''}
                        title="Modalidad"
                        content={modalidad}
                      />
                    ) : null}
                  </div>
                </div>
                {image?.data ? (
                  <div className="relative w-full sm:w-3/4 md:w-2/4 careerInformationImage mt-6 md:mt-32 h-2/6 md:h-3/6">
                    <Image
                      className="careerInformationImage"
                      alt={image?.data?.attributes?.alternativeText}
                      src={image?.data?.attributes?.url}
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
