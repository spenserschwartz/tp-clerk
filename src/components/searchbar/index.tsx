interface SearchbarProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

export default function Searchbar({
  inputValue,
  setInputValue,
}: SearchbarProps) {
  return (
    <div className="my-2 w-60">
      <input
        type="attractionSearch"
        name="attractionSearch"
        id="attractionSearch"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search for attraction"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
    </div>
  );
}
