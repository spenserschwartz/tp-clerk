import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Quick Launch", href: "/quick-launch" },
  { name: "Cities", href: "/cities" },
  { name: "London", href: "/city/london" },
  { name: "Berlin", href: "/city/berlin" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    // <header className="mb-2 w-screen">
    //   <nav
    //     className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
    //     aria-label="Global"
    //   >
    //     <div className="flex lg:flex-1">
    //       <Link href="/">
    //         <span className="sr-only">TravelPerfect</span>
    //         {/* eslint-disable-next-line @next/next/no-img-element */}
    //         {/* <img
    //           className="h-8 w-auto"
    //           src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
    //           alt=""
    //         /> */}
    //         <p className="text-2xl font-bold text-white">TravelPerfect</p>
    //       </Link>
    //     </div>

    //     {/* Small screens */}
    //     <div className="flex lg:hidden">
    //       <button
    //         type="button"
    //         className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
    //         onClick={() => setMobileMenuOpen(true)}
    //       >
    //         <span className="sr-only">Open main menu</span>
    //         <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    //       </button>
    //     </div>

    //     <div className="hidden lg:flex lg:gap-x-12">
    //       {navigation.map((item) => (
    //         <a
    //           key={item.name}
    //           href={item.href}
    //           className="text-sm font-semibold leading-6 text-white"
    //         >
    //           {item.name}
    //         </a>
    //       ))}
    //     </div>
    //     <div className="hidden lg:flex lg:flex-1 lg:justify-end">
    //       <SignedIn>
    //         <UserButton />
    //       </SignedIn>
    //       <SignedOut>
    //         <SignInButton />
    //       </SignedOut>
    //     </div>
    //   </nav>
    //   <Dialog
    //     as="div"
    //     className="lg:hidden"
    //     open={mobileMenuOpen}
    //     onClose={setMobileMenuOpen}
    //   >
    //     <div className="fixed inset-0 z-10" />
    //     <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
    //       <div className="flex items-center justify-between">
    //         <a href="#" className="-m-1.5 p-1.5">
    //           <span className="sr-only">TravelPerfect</span>
    //           {/* eslint-disable-next-line @next/next/no-img-element */}
    //           {/* <img
    //             className="h-8 w-auto"
    //             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
    //             alt=""
    //           /> */}
    //           <p className="text-lg font-bold text-purple-500">TravelPerfect</p>
    //         </a>
    //         <button
    //           type="button"
    //           className="-m-2.5 rounded-md p-2.5 text-gray-400"
    //           onClick={() => setMobileMenuOpen(false)}
    //         >
    //           <span className="sr-only">Close menu</span>
    //           <XMarkIcon className="h-6 w-6" aria-hidden="true" />
    //         </button>
    //       </div>
    //       <div className="mt-6 flow-root">
    //         <div className="-my-6 divide-y divide-gray-500/25">
    //           <div className="space-y-2 py-6">
    //             {navigation.map((item) => (
    //               <a
    //                 key={item.name}
    //                 href={item.href}
    //                 className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
    //               >
    //                 {item.name}
    //               </a>
    //             ))}
    //           </div>
    //           <div className="py-6">
    //             <a
    //               href="#"
    //               className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
    //             >
    //               {/* Log in */}
    //               <SignedIn>
    //                 <UserButton />
    //               </SignedIn>
    //               <SignedOut>
    //                 <SignInButton />
    //               </SignedOut>
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     </Dialog.Panel>
    //   </Dialog>
    // </header>

    <header
      className={`fixed z-30 w-full transition duration-300 ease-in-out md:bg-opacity-90 ${
        !top ? "bg-white shadow-lg backdrop-blur-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Site branding */}
          <div className="mr-4 shrink-0">TravelPerfect</div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow flex-wrap items-center justify-end">
              <li>
                <Link
                  href="/signin"
                  className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="btn-sm ml-3 bg-gray-900 text-gray-200 hover:bg-gray-800"
                >
                  <span>Sign up</span>
                  <svg
                    className="-mr-1 ml-2 h-3 w-3 shrink-0 fill-current text-gray-400"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fillRule="nonzero"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
