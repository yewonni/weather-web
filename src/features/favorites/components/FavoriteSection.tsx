import FavoriteCard from "./FavoriteCard";

export default function FavoriteSection() {
  const favoriteItems = [
    {
      name: "우리집",
      location: "서울특별시 종로구",
      currentTemp: 23,
      minTemp: 18,
      maxTemp: 25,
    },
  ];

  return (
    <section
      aria-labelledby="favorite-heading"
      className="w-full flex flex-col lg:min-h-[450px]"
    >
      <header className="flex items-center gap-2 mb-3">
        <h2 className="text-card-title">즐겨찾는 장소</h2>
        <p className="text-sub">({favoriteItems.length}/6)</p>
      </header>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
        {favoriteItems.map((item, index) => (
          <li key={index}>
            <FavoriteCard {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
