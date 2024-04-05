import Head from "next/head";
import { type ReactElement } from "react";

import {
  FadeUpWrapper,
  ScrollLeftWrapper,
  ZoomInUpWrapper,
} from "@/framer-motion";
import { PortfolioLayout } from "~/components/layout";
import {
  About,
  Container,
  Photos,
  Resume,
  SocialLink,
  TechStack,
} from "~/components/portfolio";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "~/components/portfolio/Icons";
import { type NextPageWithLayout } from "~/types/pages";

const PortfolioPage: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Spenser Schwartz</title>
      </Head>

      <Container className="mt-9">
        <div className="max-w-2xl">
          <ZoomInUpWrapper>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-purple-400 sm:text-5xl">
              Software designer, founder, and travel enthusiast.
            </h1>

            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              I&apos;m Spenser, a software developer based in Los Angeles.
              I&apos;m a full-stack engineer with a strength in front-end
              development and a passion for building beautiful, functional, and
              user-friendly web applications. I&apos;m also the creator of&nbsp;
              <a
                href="https://www.travelperfect.io"
                className="text-purple-800 hover:text-purple-600 dark:text-purple-400"
              >
                TravelPerfect
              </a>
              , a travel app that helps you plan your perfect trip.
            </p>
            <div className="mt-6 flex gap-6">
              <SocialLink
                href="https://www.github.com/spenserschwartz"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href="https://www.linkedin.com/in/spenser-schwartz/"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
              <SocialLink
                href="mailto:spenser.m.schwartz@gmail.com"
                aria-label="Email Spenser"
                icon={MailIcon}
              />
            </div>
          </ZoomInUpWrapper>
        </div>
      </Container>

      <ScrollLeftWrapper>
        <Photos />
      </ScrollLeftWrapper>

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <ZoomInUpWrapper>
              <About />
            </ZoomInUpWrapper>

            <FadeUpWrapper>
              <TechStack />
            </FadeUpWrapper>
          </div>

          <FadeUpWrapper>
            <div className="space-y-10 lg:pl-16 xl:pl-24">
              <Resume />
            </div>
          </FadeUpWrapper>
        </div>
      </Container>
    </div>
  );
};

PortfolioPage.getLayout = function getLayout(page: ReactElement) {
  return <PortfolioLayout>{page}</PortfolioLayout>;
};

export default PortfolioPage;
