import Link from 'next/link';

interface Item {
  item: MenuItem;
}

interface MenuItem {
  id: number;
  __component: string;
  subitem_title: string;
  subitem_link: string;
  destacado: boolean;
}

export default function MenuItemMobile({ item }: Item) {
  if (!item.destacado) {
    return (
      <Link key={'desk-item' + item.id} href={item.subitem_link}>
        <a className="block focus:outline-none focus:ring focus:border-cm-primary xl:hidden px-2 py-2 font-medium text-gray-500 hover:text-gray-800 transition duration-300 ease-in-out my-2">
          <div className="flex items-center justify-start">
            <div>{item.subitem_title}</div>
          </div>
        </a>
      </Link>
    );
  } else {
    return (
      <Link key={'desk-item' + item.id} href={item.subitem_link}>
        <a className="block focus:outline-none focus:ring focus:border-cm-primary bg-cm-primary rounded-lg xl:hidden px-6 py-2 font-medium text-gray-300 hover:text-white hover:bg-cm-primaryLight transition duration-300 ease-in-out my-2">
          <div className="flex items-center justify-start">
            <div>{item.subitem_title}</div>
          </div>
        </a>
      </Link>
    );
  }
}
