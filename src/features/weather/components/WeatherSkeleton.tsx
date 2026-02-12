export default function WeatherSkeleton() {
  return (
    <div className="mt-6">
      {/* WeatherCard */}
      <div className="w-full p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-2 mx-auto md:mx-0"></div>
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-2 mb-2">
          <div className="h-20 bg-gray-200 rounded w-24"></div>
          <div className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-20 mb-1 mx-auto md:mx-0"></div>
        <div className="h-3 bg-gray-200 rounded w-36 mx-auto md:mx-0"></div>
      </div>

      {/* HourlyTempCard */}
      <div className="mt-4 p-4">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 min-w-[50px] animate-pulse"
            >
              <div className="h-3 bg-gray-200 rounded w-10"></div>
              <div className="h-4 bg-gray-200 rounded w-8"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
