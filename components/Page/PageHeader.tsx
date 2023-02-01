import React, { useEffect } from 'react';
import Image from 'next/image';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Header {
  image_desk: any;
  image_mobile: any;
  title: string;
}

export default function PageHeader({ image_desk, image_mobile, title }: Header) {
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
          <div className="PageMainContainer mx-auto px-4 xl:px-16 flex items-center justify-center relative">
            <div className="absolute top-24 z-20 headerImage">
              <div>
                {title ? (
                  <h1 className="font-bold text-white text-2xl xl:text-4xl text-center lg:mx-auto mb-6 ">
                    {title}
                  </h1>
                ) : null}
              </div>
            </div>
          </div>
          {image_mobile?.data || image_desk?.data ? (
            <div className="absolute headerImage bg-black opacity-50 z-10"></div>
          ) : null}
          <div className="relative">
            {image_desk?.data ? (
              <div className="headerImage hidden object-cover xl:block relative">
                <Image
                  alt={image_desk?.data?.attributes?.alternativeText}
                  src={image_desk?.data?.attributes?.url}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            ) : (
              <div className="headerImage background-header-page hidden object-cover xl:block"></div>
            )}
            {image_mobile?.data ? (
              <div className="headerImage block object-cover xl:hidden relative">
                <Image
                  alt={image_mobile?.data?.attributes?.alternativeText}
                  src={image_mobile?.data?.attributes?.url}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            ) : (
              <div className="headerImage background-header-page block object-cover xl:hidden"></div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
