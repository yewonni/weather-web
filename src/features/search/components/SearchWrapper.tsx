import SearchDropdown from "./SearchDropdown";

interface SearchWrapperProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSelect: (fullAddress: string) => void;
  results: string[];
  showDropdown: boolean;
}

export default function SearchWrapper({
  value,
  onChange,
  onFocus,
  onBlur,
  onSelect,
  results,
  showDropdown,
}: SearchWrapperProps) {
  return (
    <>
      <div className="relative z-50">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder="예: 서울특별시, 강남구, 신사동"
          className="w-full px-4 py-3 border rounded-lg bg-white"
        />

        {showDropdown && (
          <SearchDropdown
            results={results}
            keyword={value}
            onSelect={onSelect}
          />
        )}
      </div>
    </>
  );
}
