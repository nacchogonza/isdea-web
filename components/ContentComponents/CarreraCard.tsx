import Image from 'next/image';
import Link from 'next/link';

interface CarreraCard {
  image: any;
  inscription_state: string;
  short_description: string;
  slug: string;
  title: string;
}

export const CarreraCard = ({
  title,
  short_description,
  image,
  inscription_state,
  slug,
}: CarreraCard) => {
  return (
    <Link href={'/carreras/' + slug}>
      <a>
        <div className="bg-white rounded-lg shadow-lg relative">
          {image?.data ? (
            <div className="h-56 w-full shadow-lg object-cover relative">
              <Image
                alt={image?.data?.attributes?.alternativeText}
                src={image?.data?.attributes?.url}
                layout="fill"
                className="rounded-t-lg"
                objectFit="cover"
                priority
              />
            </div>
          ) : (
            <div className="h-56 w-full bg-gray-300 rounded-t-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <div className="absolute top-4 right-4 rounded-lg bg-cm-primary text-white text-sm font-medium px-5 py-1 shadow-lg">
            {inscription_state}
          </div>
          <div className="p-6">
            <h5 className="font-bold text-lg">{title}</h5>
            <p className="text-sm text-gray-600">{short_description}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};
