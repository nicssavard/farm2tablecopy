import Image from "next/image";
import DefaultUserImage from "../../../public/user.png";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
//import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";

import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../../utils/api";
import useStore from "../../store/userStore";

const Header: React.FC = () => {
  const { data: sessionData } = useSession();
  //placeholder will never be used, but it is needed to prevent a typescript error
  const { data: user } = api.users.getUserByName.useQuery({
    name: sessionData?.user?.name ? sessionData.user.name : "placeholder",
  });
  const setUser = useStore((state) => state.setUser);
  if (user) {
    setUser(user);
  }

  return (
    <Disclosure
      as="nav"
      className="fixed z-10 w-full bg-green-400 opacity-50 shadow-2xl"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-8">
            <div className="relative flex h-14 items-center justify-between">
              <div className="flex items-center px-2 md:px-0">
                <Link href="/subjects">
                  {/* <Image
                    className="block h-9 w-auto md:hidden"
                    src={"WFLKLogo"}
                    alt="WFLK"
                  />
                  <Image
                    className="hidden h-9 w-auto md:block"
                    src={"WFLKLogo"}
                    alt="WFLK"
                  /> */}
                </Link>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    <NavLink href="subjects">subjects</NavLink>
                    <NavLink href="flashcards">flashcards</NavLink>
                    <NavLink href="practice">practice</NavLink>
                    <NavLink href="homeworks">homeworks</NavLink>
                    <NavLink href="games">games</NavLink>
                  </div>
                </div>
              </div>
              <SearchBar />
              <div className="flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="text-green-light hover:text-green-dark inline-flex items-center  justify-center  rounded-md focus:outline-none   ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <img
                      className="h-9 w-9 rounded-full"
                      src={`/users/${sessionData?.user?.image}`}
                      alt=""
                    />
                  ) : (
                    //<XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                    <img
                      className="h-9 w-9 rounded-full"
                      src={`/users/${sessionData?.user?.image}`}
                      alt=""
                    />
                    //<Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden md:ml-4 md:block">
                <div className="flex items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="focus:ring-green-light flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        {sessionData?.user?.image ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={`/users/${sessionData?.user?.image}`}
                            alt=""
                          />
                        ) : (
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={DefaultUserImage}
                            alt="WFLK"
                            width={32}
                            height={32}
                          />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="bg-green-dark absolute right-0 z-10 mt-2 flex w-48 origin-top-right flex-col rounded-md py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user?.is_admin && (
                          <Menu.Item>
                            <NavLink href="settings">{user.name}</NavLink>
                          </Menu.Item>
                        )}
                        {/* {sessionData?.user?.name !== null && (
                          <Menu.Item>
                            <NavLink href="settings">
                              {sessionData?.user?.name}
                            </NavLink>
                          </Menu.Item>
                        )} */}
                        {user?.is_admin && (
                          <Menu.Item>
                            <NavLink href="admin">admin</NavLink>
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          <NavLink
                            href=""
                            onClick={
                              sessionData ? () => signOut() : () => signIn()
                            }
                          >
                            {sessionData ? "Log out" : "Log in"}
                          </NavLink>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="flex flex-col space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button as={NavLink} href="subjects">
                subjects
              </Disclosure.Button>
              <Disclosure.Button as={NavLink} href="flashcards">
                flashcards
              </Disclosure.Button>
              <Disclosure.Button as={NavLink} href="practice">
                practice
              </Disclosure.Button>
              <Disclosure.Button as={NavLink} href="homeworks">
                homeworks
              </Disclosure.Button>
              <Disclosure.Button as={NavLink} href="games">
                games
              </Disclosure.Button>
              {user?.is_admin && (
                <Disclosure.Button as={NavLink} href="settings">
                  {sessionData?.user?.name}
                </Disclosure.Button>
              )}
              {user?.is_admin && (
                <Disclosure.Button as={NavLink} href="admin">
                  admin
                </Disclosure.Button>
              )}
              <Disclosure.Button
                as={NavLink}
                href="#"
                onClick={sessionData ? () => signOut() : () => signIn()}
              >
                {sessionData ? "Log out" : "Log in"}
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-700">
              <div className="flex items-center justify-center px-5">
                {/* <div className="flex-shrink-0">
                  {sessionData?.user?.image ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={`/users/${sessionData?.user?.image}`}
                      alt=""
                    />
                  ) : (
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={DefaultUserImage}
                      alt="WFLK"
                    />
                  )}
                </div> */}
                <div className="ml-3">
                  {/* <div className="text-4xl font-medium text-gold-500">
                    {sessionData?.user?.name}
                  </div> */}
                  {/* <div className="text-md font-medium text-gray-400">
                    {user?.position}
                  </div> */}
                </div>
              </div>
              {/* <div className="mt-3 flex flex-col space-y-1 px-2">
                {user?.is_admin && (
                  <Disclosure.Button as={NavLink} href="settings">
                    {sessionData?.user?.name}
                  </Disclosure.Button>
                )}
                {user?.is_admin && (
                  <Disclosure.Button as={NavLink} href="admin">
                    admin
                  </Disclosure.Button>
                )}
                <Disclosure.Button
                  as={NavLink}
                  href="#"
                  onClick={sessionData ? () => signOut() : () => signIn()}
                >
                  {sessionData ? "Log out" : "Log in"}
                </Disclosure.Button>
              </div> */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
