import { buyOneGetOneFree } from '@/constants/menu';

export default function BuyOneGetOnFree() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium text-black dark:text-gray-300">
        {buyOneGetOneFree.name}
      </h1>
      <div className="space-y-10 text-black dark:text-gray-300">
        {buyOneGetOneFree.description}
      </div>
    </div>
  );
}
