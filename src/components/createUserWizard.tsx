import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";

import { type MouseEvent } from "react";
import { toast } from "react-hot-toast";

const CreateUserWizard = () => {
  const { user } = useUser();

  const ctx = api.useContext();

  const { mutate, isLoading: isCreatingUser } = api.users.create.useMutation({
    onSuccess: () => {
      void ctx.users.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to create user! Please try again later.");
      }
    },
  });

  if (!user) return null;

  const createUser = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    mutate({ name: user.fullName ?? "wrong name", email: "fake email" });
  };

  return (
    <div className="flex w-full gap-3">
      {!isCreatingUser && (
        <button onClick={createUser}>CreateUserWizard</button>
      )}
    </div>
  );
};

export default CreateUserWizard;
