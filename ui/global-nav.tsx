'use client';

import tw from 'twin.macro';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';

import { useDisclosure } from '@/hooks/useDisclosure';
import { menu } from '@/constants/menu';

import type { MenuItem } from '@/constants/menu';

export function GlobalNav() {
  const { isOpen, close, toggle } = useDisclosure();

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-white dark:bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800">
      <div className="flex items-center px-5 py-5">
        <Link
          href="/"
          className="group flex w-full items-center gap-x-2.5"
          onClick={close}
        >
          <h3 className="text-xl font-bold tracking-wide text-black group-hover:text-gray-400 dark:text-white dark:group-hover:text-gray-400">
            이득 계산기
          </h3>
        </Link>
        <button
          type="button"
          className="group absolute right-0 flex items-center gap-x-2 px-4 lg:hidden"
          aria-label="메뉴"
          onClick={toggle}
        >
          {isOpen ? (
            <XMarkIcon className="block w-6 text-black dark:text-gray-400" />
          ) : (
            <Bars3Icon className="block w-6 text-black dark:text-gray-400" />
          )}
        </button>
      </div>
      <div
        css={[
          tw`overflow-y-auto lg:static lg:block`,
          isOpen
            ? tw`fixed inset-x-0 bottom-0 top-14 mt-px bg-white dark:bg-black`
            : tw`hidden`,
        ]}
      >
        <nav className="space-y-6 px-2 py-5">
          {menu.map((section) => {
            return (
              <div key={section.name}>
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-black dark:text-gray-400/80">
                  <div>{section.name}</div>
                </div>

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <GlobalNavItem key={item.slug} item={item} close={close} />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function GlobalNavItem({
  item,
  close,
}: {
  item: MenuItem;
  close: () => false | void;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = item.slug === segment;

  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      css={[
        tw`block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300`,
        isActive
          ? tw`bg-gray-800 text-gray-300 dark:text-white`
          : tw`text-gray-400 hover:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800`,
      ]}
    >
      {item.name}
    </Link>
  );
}
