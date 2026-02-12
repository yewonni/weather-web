import searchIcon from "@/assets/search.svg";
import type { FocusEventHandler } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export default function SearchInput({
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
}: Props) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder || "검색"}
        className="
          placeholder:text-divider text-sm w-full
          pr-10 pl-4 py-2 rounded-md
          border border-[#E5EAF2]
          transition-all duration-150 ease-out
          hover:border-[#D6E2F5]
          focus:outline-none
          focus:ring-2 focus:ring-point/40
          focus:border-point
        "
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <img src={searchIcon} alt="검색" className="w-4 h-4" />
      </div>
    </div>
  );
}
