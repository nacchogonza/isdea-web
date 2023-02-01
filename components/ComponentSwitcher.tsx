import HomeHeader from './Home/HomeHeader';
import FaqComponent from './ContentComponents/FaqsComponent';
import HomeCarreras from './Home/HomeCarreras';

interface Home {
  attributes: Attributes;
  carreras?: CarreraAttributes[] | null;
}

interface Attributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  content: Content[];
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

import { HOME_HEADER, FAQS, CARRERAS_HOME, CTA } from './constants';
import CTAComponent from './ContentComponents/CTAComponent';

export default function ComponentSwitcher({ attributes, carreras }: Home) {
  const RenderComponent = (component: any) => {
    switch (component.__component) {
      case HOME_HEADER:
        return (
          <HomeHeader
            key={component.id + 'home-header'}
            title={component.title}
            subtitle={component.subtitle}
            cta_link={component.cta_link}
            cta_text={component.cta_text}
            image={component.image}
          />
        );
      case CARRERAS_HOME:
        return (
          <HomeCarreras
            key={component.id + 'home-carreras'}
            title={component.title}
            subtitle={component.subtitle}
            cta_link={component.cta_link}
            cta_text={component.cta_text}
            carreras={carreras ? carreras : null}
          />
        );
      case FAQS:
        return (
          <FaqComponent
            key={component.id + 'faq-component'}
            id={component.id}
            title={component.title}
            subtitle={component.subtitle}
            pregunta={component.pregunta}
          />
        );
      case CTA:
        return (
          <CTAComponent
            key={component.id + 'cta-component'}
            title={component.title}
            description={component.description}
            cta_link={component.cta_link}
            cta_text={component.cta_text}
            bgImage={component.backgroundDefault}
          />
        );
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
