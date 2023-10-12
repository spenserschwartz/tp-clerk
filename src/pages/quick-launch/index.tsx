import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { Button, LoadingSpinner } from "~/components";
import QuickLaunch from "~/components/quickLaunch";
import { api } from "~/utils/api";

interface ParsedAIMessageInterface {
  dayOfWeek: string;
  date: string;
  morning: string;
  afternoon: string;
  evening: string;
}

const QuickLaunchPage: NextPage = () => {
  return (
    <div>
      <QuickLaunch />
    </div>
  );
};

export default QuickLaunchPage;
