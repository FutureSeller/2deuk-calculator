import { Metadata } from 'next';
import { buyOneGetOneFree } from '@/constants/menu';
import { PageHeader } from '@/ui/page-header';
import BuyOneGetOnFreeForm from './_component/form';

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
      <BuyOneGetOnFreeForm />
    </div>
  );
}
