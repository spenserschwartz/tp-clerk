import Head from "next/head";
import Link from "next/link";
import { type ReactElement } from "react";
import { PortfolioLayout } from "~/components/layout";
import { Container, Resume } from "~/components/portfolio";
import { GitHubIcon, LinkedInIcon } from "~/components/portfolio/Icons";
import { type NextPageWithLayout } from "~/types/pages";

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

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
            {`I'm Spenser, a software developer based in Los Angeles. I'm the creator of TravelPerfect, a travel app that helps you plan your perfect trip. I'm also a full-stack developer with a passion for building beautiful, functional, and user-friendly web applications.`}
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
          </div>
        </div>
      </Container>

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>
    </div>
  );
};

PortfolioPage.getLayout = function getLayout(page: ReactElement) {
  return <PortfolioLayout>{page}</PortfolioLayout>;
};

export default PortfolioPage;
