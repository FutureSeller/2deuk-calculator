interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium text-black dark:text-gray-300">
        {title}
      </h1>
      {description && (
        <div className="space-y-10 text-black dark:text-gray-300">
          {description}
        </div>
      )}
    </div>
  );
}
