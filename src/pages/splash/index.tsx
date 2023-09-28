import { type MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "~/components";
import QuickLaunchForm from "~/components/forms/quickLaunch";
import { api } from "~/utils/api";

const SplashPage = () => {
  return (
    <div>
      <QuickLaunchForm />
    </div>
  );
};

export default SplashPage;
