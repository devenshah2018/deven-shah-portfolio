'use client';

import { Link2 } from 'lucide-react';
import { itemSlug, navigateToItem, type PortfolioItemType } from '@/lib/url-utils';
import { cn } from '@/lib/utils';

export function ItemPermalink({
  type,
  id,
  label,
  className,
  action = false,
}: {
  type: PortfolioItemType;
  id: string;
  label: string;
  className?: string;
  action?: boolean;
}) {
  return (
    <a
      href={`#${itemSlug(type, id)}`}
      aria-label={`Link to ${label}`}
      title={`Link to ${label}`}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded text-[#777f79] hover:text-[#a5c9bd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5c9bd]',
        action ? 'h-12 w-12' : 'h-11 w-11',
        className
      )}
      onClick={event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        event.preventDefault();
        navigateToItem(type, id);
      }}
    >
      <Link2 aria-hidden='true' className={action ? 'h-5 w-5' : 'h-4 w-4'} />
    </a>
  );
}
