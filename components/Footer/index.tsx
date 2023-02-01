import Link from 'next/link';
import Image from 'next/image';
import FooterSocialIcons from './FooterSocialIcons';
import { link } from 'fs';

interface FooterData {
  footerData: Footer;
  image?: any;
}

interface Footer {
  logo_acreditacion?: any;
  logo_articulacion?: any;
  links_institucionales: LinksInstitucionales[];
  redes: Red[];
}

interface LinksInstitucionales {
  id: number;
  destacado: boolean;
  subitem_link: string;
  subitem_title: string;
}

interface Red {
  id: number;
  link: string;
  nombre: string;
}

export default function Footer({ footerData, image }: FooterData) {
  return (
    <footer className="border-t border-gray-200">
      <div className="PageMainContainer pb-8 pt-16 px-4 xl:px-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:border-r xl:border-black">
            <Image
              alt="ISDEA Logo"
              src={image?.data?.attributes?.url}
              width={362}
              height={131}
            />
            <div className="flex items-center gap-4 mt-6">
              {footerData?.redes.length > 0
                ? footerData.redes.map((red) => (
                    <FooterSocialIcons key={red.id} nombre={red.nombre} link={red.link} />
                  ))
                : null}
            </div>
          </div>
          <div className="">
            <h4 className="font-bold text-black mb-4">Links Institucionales</h4>
            <ul>
              {footerData?.links_institucionales?.length > 0
                ? footerData?.links_institucionales?.map((item) => (
                    <li key={'desk-item' + item.id}>
                      <Link  href={item.subitem_link}>
                        <a className="block focus:outline-none focus:ring focus:border-blue-800 py-2 font-medium text-gray-700 hover:text-black transition duration-300 ease-in-out">
                          <div className="flex items-center justify-start">
                            <div>{item.subitem_title}</div>
                          </div>
                        </a>
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <div className="xl:border-l xl:border-black"></div>
        </div>
      </div>
      <div className="bg-gray-200 px-4 py-4 flex items-center justify-center">
        <Link href={'https://tucodigital.com'}>
          <a className="text-black font-bold text-sm">
            <div className="flex items-center justify-start">
              <div>Powered by @TucoDigital</div>
            </div>
          </a>
        </Link>
      </div>
    </footer>
  );
}
