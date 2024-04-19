'use client';

import { clsx } from 'clsx/lite';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SiteGrid from '../components/SiteGrid';
import { SITE_DOMAIN_OR_TITLE } from '@/site/config';
import ViewSwitcher, { SwitcherSelection } from '@/site/ViewSwitcher';
import {
  PATH_ROOT,
  isPathGrid,
  isPathProtected,
  isPathSignIn,
} from '@/site/paths';
import AnimateItems from '../components/AnimateItems';

export default function NavClient({
  showAdmin,
  animate = true,
}: {
  showAdmin?: boolean,
  animate?: boolean,
}) {
  const pathname = usePathname();

  const showNav = !isPathSignIn(pathname);

  const renderLink = (
    text: string,
    linkOrAction: string | (() => void),
  ) =>
    typeof linkOrAction === 'string'
      ? <Link href={linkOrAction}>{text}</Link>
      : <button onClick={linkOrAction}>{text}</button>;

  const switcherSelectionForPath = (): SwitcherSelection | undefined => {
    if (pathname === PATH_ROOT) {
      return 'full-frame';
    } else if (isPathGrid(pathname)) {
      return 'grid';
    } else if (isPathProtected(pathname)) {
      return 'admin';
    }
  };

  return (
    <SiteGrid
      contentMain={
        <AnimateItems
          animateOnFirstLoadOnly
          type={animate ? 'bottom' : 'none'}
          distanceOffset={10}
          items={showNav
            ? [<div
              key="nav"
              className={clsx(
                'flex items-center',
                'w-full min-h-[4rem]',
              )}>
              <div className="flex-grow">
                <ViewSwitcher
                  currentSelection={switcherSelectionForPath()}
                  showAdmin={showAdmin}
                />
              </div>
              <div className="hidden xs:block text-right text-balance">
                {renderLink(SITE_DOMAIN_OR_TITLE, PATH_ROOT)}
              </div>
            </div>]
            : []}
        />
      }
    />
  );
};
