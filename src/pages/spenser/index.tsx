import Head from "next/head";
import { type ReactElement } from "react";
import { PortfolioLayout } from "~/components/layout";
import { Container } from "~/components/portfolio/Container";
import { type NextPageWithLayout } from "~/types/pages";

const PortfolioPage: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Spenser Schwartz</title>
      </Head>

      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software designer, founder, and travel enthusiast.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {`I'm Spenser, a software developer based in Los Angeles. I'm the found of TravelPerfect, a travel app that helps you plan your perfect trip. I'm also a full-stack developer with a passion for building beautiful, functional, and user-friendly web applications.`}
          </p>
        </div>
      </Container>
    </div>
  );
};

PortfolioPage.getLayout = function getLayout(page: ReactElement) {
  return <PortfolioLayout>{page}</PortfolioLayout>;
};

export default PortfolioPage;
