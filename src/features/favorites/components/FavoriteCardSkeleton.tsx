export default function FavoriteCardSkeleton() {
  return (
    <article
      className="
        rounded-md p-6 shadow-md
        bg-gradient-to-br from-white via-sky-50/60 to-blue-50/60
        flex flex-col justify-between w-full
      "
    >
      <header>
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
      </header>

      <div className="h-4 bg-gray-200 rounded w-full mb-2" />

      <div className="mt-2">
        <div className="h-6 bg-gray-200 rounded w-12 mb-[2px]" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
    </article>
  );
}
