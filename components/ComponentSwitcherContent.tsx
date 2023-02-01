import FaqComponentContent from './ContentComponents/FaqsComponentContent';
import RichTextComponent from './ContentComponents/RichTextComponent';
import CTAComponent from './ContentComponents/CTAComponent';

interface Home {
  attributes: Attributes;
}

interface Attributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  content: Content[];
}

interface Content {
  id: number;
  __component: string;
  title: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  image?: any;
  pregunta?: Pregunta[];
  description?: string;
}

interface Pregunta {
  id: number;
  content: string;
  title: string;
}

import { FAQS, CTA, RICH_TEXT } from './constants';

export default function ComponentSwitcherContent({ attributes }: Home) {
  const RenderComponent = (component: any) => {
    switch (component.__component) {
      case FAQS:
        return (
          <FaqComponentContent
            key={component.id + 'faq-component'}
            id={component.id}
            title={component.title}
            subtitle={component.subtitle}
            pregunta={component.pregunta}
          />
        );
      case CTA:
        return (
          <div className="py-6">
            <CTAComponent
              key={component.id + 'cta-component'}
              title={component.title}
              description={component.description}
              cta_link={component.cta_link}
              cta_text={component.cta_text}
              bgImage={component.backgroundDefault}
              rounded={true}
            />
          </div>
        );
      case RICH_TEXT:
        return <RichTextComponent key={component.id + 'home-header'} text={component.text} />;
      default:
        return null;
    }
  };
  return (
    <>
      {attributes?.content?.map((component) => {
        return RenderComponent(component);
      })}
    </>
  );
}
