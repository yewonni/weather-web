import { useNavigate } from "@tanstack/react-router";

type FavoriteCardProps = {
  name: string;
  location: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
};

export default function FavoriteCard({
  name,
  location,
  currentTemp,
  minTemp,
  maxTemp,
}: FavoriteCardProps) {
  const navigate = useNavigate();

  return (
    <article
      className="
        rounded-md p-4 shadow-md
        bg-gradient-to-br from-white via-sky-50/60 to-blue-50/60
        flex flex-col justify-between w-full
        transition-all duration-200 ease-out
        hover:-translate-y-0.5
        hover:shadow-lg
        hover:brightness-[1.02]
        cursor-pointer
        active:translate-y-0
        active:shadow-md
      "
      onClick={() => navigate({ to: "/detail" })}
    >
      <header>
        <h3 className="text-card-title">{name}</h3>
      </header>

      <p className="text-sub">{location}</p>

      <div className="mt-2">
        <p className="font-semibold" aria-label={`현재 온도 ${currentTemp}도`}>
          {currentTemp}°
        </p>

        <dl className="text-sub">
          <div className="flex gap-1">
            <dt className="sr-only">최저 온도</dt>
            <dd>{minTemp}°</dd>
            <span aria-hidden>/</span>
            <dt className="sr-only">최고 온도</dt>
            <dd>{maxTemp}°</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
