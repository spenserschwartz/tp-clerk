import { SignInButton } from "@clerk/nextjs";
import React from "react";

interface LoginModalProps {
  closeModalHandler: () => void;
}

const LoginModal = ({ closeModalHandler }: LoginModalProps) => {
  return (
    <div className="">
      {" "}
      <h2 className="text-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Login
      </h2>
      <div className="mt-2 block text-center text-sm font-medium leading-6 text-gray-900">
        Please log in or sign up to use this feature
      </div>
      <div className="mt-4 flex items-center justify-center gap-x-6">
        <SignInButton>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign In
          </button>
        </SignInButton>

        <button
          className="rounded-md px-3 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={closeModalHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
