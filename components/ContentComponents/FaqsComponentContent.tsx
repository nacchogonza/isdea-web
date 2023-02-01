import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaqItem } from './FaqItem';

import { useInView } from 'react-intersection-observer';

interface FaqItem {
  id: number;
  title?: string;
  content?: string;
}

interface FaqsProps {
  id: number;
  key: any;
  title: string;
  subtitle: string;
  pregunta: FaqItem[];
}

export default function FaqComponentContent({ title, pregunta, subtitle }: FaqsProps) {
  const [showId, setShowId] = useState(0);

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

  const handleShow = (id: number) => setShowId(id);

  useEffect(() => {
    if (inView) {
      control.start('visible');
    }
  }, [control, inView]);

  return (
    <>
      <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={control}>
        <div className="PageMainContainer mx-auto relative">
          <div className="py-6">
            <div className="px-4 py-10 xl:p-10 bg-white rounded-xl border xl:col-span-8 z-20">
              {title ? (
                <h3 className="font-bold text-2xl xl:text-4xl text-center mx-auto text-gray-900 mb-2">
                  {title}
                </h3>
              ) : null}
              {subtitle ? (
                <p className="font-medium xl:text-lg text-center mx-auto text-gray-600">
                  {subtitle}
                </p>
              ) : null}
              <div className="mt-12">
                {pregunta.length > 0
                  ? pregunta.map((servicio, i) => (
                      <FaqItem
                        key={i}
                        onShow={handleShow}
                        id={i}
                        show={showId === i}
                        title={servicio.title}
                        content={servicio.content}
                      />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
