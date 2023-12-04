import { type ChangeEvent, type Dispatch } from "react";

interface NumberInputProps {
  value: number;
  setValue: Dispatch<number>;
  min?: number;
  max?: number;
}

const NumberInput = ({
  value,
  setValue,
  min = 1,
  max = 14,
}: NumberInputProps) => {
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);

    if ((newValue >= min && newValue <= max) || e.target.value === "") {
      setValue(newValue || 0);
    }
  };

  return (
    <div className="inline-block rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-slate-900">
      <div className="flex items-center gap-x-1.5">
        {/* Minus Button */}
        <button
          type="button"
          className="inline-flex h-6 w-6 items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={() => value > min && setValue(value - 1)}
        >
          <svg
            className="h-3.5 w-3.5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
          </svg>
        </button>

        {/* Input */}
        <input
          className="w-6 border-0 bg-transparent p-0 text-center text-gray-800 focus:ring-0 dark:text-white"
          type="text"
          value={value}
          onChange={inputChangeHandler}
        />

        {/* Plus Button */}
        <button
          type="button"
          className="inline-flex h-6 w-6 items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          onClick={() => value < max && setValue(value + 1)}
        >
          <svg
            className="h-3.5 w-3.5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
