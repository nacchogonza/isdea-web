import React, { useEffect } from 'react';
import Link from 'next/link';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CTA {
  cta_link?: string;
  cta_text?: string;
  bgImage: boolean;
  rounded?:boolean;
  description: string;
  title: string;
}

export default function CTAComponent({ cta_link, cta_text, bgImage, description, title, rounded }: CTA) {
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
      <div
        className={`${
          bgImage ? 'background-cta' : 'bg-gray-200'
        } w-full h-80 flex items-center justify-center ${rounded ? 'rounded-lg' : null}`}
      >
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={control}>
          <div className="CTAContainer mx-auto px-4 xl:px-16 ">
            <div className="flex items-center">
              <div>
                {title ? (
                  <h2
                    className={`font-bold ${
                      bgImage ? 'text-white' : 'text-black'
                    }  text-2xl xl:text-4xl text-center mb-6`}
                  >
                    {title}
                  </h2>
                ) : null}
                {description ? (
                  <p
                    className={`font-light ${
                      bgImage ? 'text-white' : 'text-black'
                    } text-center xl:text-xl`}
                  >
                    {description}
                  </p>
                ) : null}
                {cta_link && cta_text ? (
                  <div className="flex items-center justify-center mt-6 xl:mt-10">
                    <Link href={cta_link}>
                      <motion.a
                        className={`cursor-pointer bg-transparent px-5 py-2 rounded-md border-2 ${bgImage ? 'bg-white border-white text-cm-primary hover:bg-white hover:text-cm-primary' : 'border-black text-black hover:bg-black hover:text-white'}  font-bold bg-transparent transition duration-300 flex items-center`}
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
