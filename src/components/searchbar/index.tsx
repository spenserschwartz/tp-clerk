import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

interface SearchbarProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

export default function Searchbar({
  inputValue,
  setInputValue,
}: SearchbarProps) {
  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="attractionSearch"
          name="attractionSearch"
          id="attractionSearch"
          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
          placeholder="Search for attraction"
          defaultValue={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-invalid="true"
          aria-describedby="email-error"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      </div>
      <p className="mt-2 text-sm text-red-600" id="email-error">
        Not a valid email address.
      </p>
    </div>
  );
}
