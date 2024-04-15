const AddIcon = () => {
  return (
    <div className="h-auto w-auto">
      <div className="h-full flex-1">
        <div className="flex h-full flex-1 items-center justify-center rounded-full bg-green-500 p-2 text-white shadow hover:bg-green-700">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIcon;
