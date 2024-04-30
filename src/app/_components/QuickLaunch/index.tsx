"use client";
import { BubbleBackground } from "@/components";
import React from "react";
import { FadeUpWrapper } from "../framer-motion";
import QuickLaunchTool from "./Tool";

const QuickLaunch = () => {
  return (
    <section className="relative" id="quick_launch">
      {/* Background Illustration */}
      <BubbleBackground />

      <FadeUpWrapper>
        <div className="relative mx-auto max-w-6xl px-3 sm:px-6">
          <div className="">
            {/* Section header */}
            <div className="mx-auto max-w-3xl pb-2 text-center md:pb-20">
              <h2 className="h2 mb-4">Plan a trip in seconds</h2>
              <p className="text-xl text-gray-600">
                Want a quick itinerary? Fill out the form below and we will
                generate a trip for you using the best attractions in the city.
              </p>
            </div>
          </div>
          <QuickLaunchTool />
        </div>
      </FadeUpWrapper>
    </section>
  );
};

export default QuickLaunch;
