import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Header {
  cta_link?: string;
  cta_text?: string;
  image: any;
  subtitle: string;
  title: string;
}

export default function HomeHeader({ cta_link, cta_text, image, subtitle, title }: Header) {
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
      <div className="background-header w-full mt-16">
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={control}>
          <div className="PageMainContainer headerContainer mx-auto px-4 xl:px-16 flex items-center justify-center">
            <div className="grid grid-cols-1 xl:grid-cols-6 gap-4">
              <div className="col-span-6  xl:col-span-2 flex items-center">
                <div>
                  {title ? (
                    <ReactMarkdown
                      className="font-medium prose prose-p:font-bold prose-p:text-white text-4xl xl:text-6xl text-center xl:text-left lg:mx-auto text-white mb-6"
                      children={title}
                    />
                  ) : null}
                  {subtitle ? (
                    <ReactMarkdown
                      className="font-light prose text-xl text-white text-center xl:text-2xl prose-p:text-ruido-primary lg:mb-0 mx-auto xl:text-left"
                      children={subtitle}
                    />
                  ) : null}
                  {cta_link && cta_text ? (
                    <div className="flex items-center justify-center xl:justify-start mt-6 xl:mt-10">
                      <Link href={cta_link}>
                        <motion.a
                          className="cursor-pointer bg-white px-5 py-2 rounded-md border-2 border-white font-bold bg-transparent hover:bg-white hover:text-cm-primary text-cm-primary transition duration-300 flex items-center"
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
              <div></div>
              <div className="col-span-6 xl:col-span-3 relative my-4 xl:my-0">
                {image?.data ? (
                  <div className="headerImage shadow-lg object-cover">
                    <Image
                      alt={image?.data?.attributes?.alternativeText}
                      src={image?.data?.attributes?.url}
                      layout="fill"
                      className="rounded-xl"
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
