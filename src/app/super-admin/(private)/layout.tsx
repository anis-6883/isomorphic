'use client';

import { LAYOUT_OPTIONS } from '@/config/enums';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useLayout } from '@/hooks/use-layout';
import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';
import HeliumLayout from '@/layouts/helium/helium-layout';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import LithiumLayout from '@/layouts/lithium/lithium-layout';
import { WiDaySnowThunderstorm } from 'react-icons/wi';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>
          <WiDaySnowThunderstorm className="animate-bounce text-6xl" />
        </span>
      </div>
    );
  }

  if (layout === LAYOUT_OPTIONS.HELIUM) {
    return <HeliumLayout>{children}</HeliumLayout>;
  }
  if (layout === LAYOUT_OPTIONS.LITHIUM) {
    return <LithiumLayout>{children}</LithiumLayout>;
  }
  if (layout === LAYOUT_OPTIONS.BERYLLIUM) {
    return <BerylLiumLayout>{children}</BerylLiumLayout>;
  }

  return <HydrogenLayout>{children}</HydrogenLayout>;
}
