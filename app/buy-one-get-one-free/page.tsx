import { Metadata } from 'next';
import { buyOneGetOneFree } from '@/constants/menu';
import { PageHeader } from '@/ui/page-header';

export const metadata: Metadata = {
  title: buyOneGetOneFree.name,
};

export default function BuyOneGetOnFree() {
  return (
    <div>
      <PageHeader
        title={buyOneGetOneFree.name}
        description={buyOneGetOneFree.description}
      />
    </div>
  );
}
