import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface RichTextComponent {
  text?: string;
}

export default function RichTextComponent({ text }: RichTextComponent) {
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
    <section className="py-6">
      <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={control}>
        <div className="PageMainContainer">
          {text ? <ReactMarkdown className="prose w-full max-w-full m-0 xl:prose-p:text-lg" children={text} /> : null}
        </div>
      </motion.div>
    </section>
  );
}
