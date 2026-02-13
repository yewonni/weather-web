type HourlyTemp = {
  hour: string;
  temp: number;
};

type Props = {
  hourlyData: HourlyTemp[];
};

export default function HourlyTempCard({ hourlyData }: Props) {
  return (
    <section className="w-full mt-6 p-6 rounded-lg shadow-md bg-white lg:flex-1 lg:flex lg:flex-col lg:justify-end">
      <header className="mb-5">
        <h3 className="text-card-title text-center lg:text-left">
          시간대별 기온
        </h3>
      </header>

      <div className="relative">
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none md:hidden z-10" />
        <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
          <ul className="flex md:grid md:grid-cols-8 md:gap-4 gap-6 justify-start md:justify-center px-2">
            {hourlyData.map((item, index) => (
              <li
                key={index}
                className="flex flex-col items-center min-w-[50px] md:min-w-0 flex-shrink-0"
              >
                <time className="text-sub">{item.hour}시</time>
                <span className="text-base mt-1">{item.temp}°</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
