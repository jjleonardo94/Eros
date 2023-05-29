import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Icons } from "../utils";
import config from "../utils/config.util";
const sidebar = config.dashboard.sidebar;

const navItems = sidebar.navItems;
const header = sidebar.header;
const backgroundlight = header.backgroundlight;

const Sidebar = ({ show, setShow }) => {
  const router = useRouter();
  const { pathname } = router;

  const getIcon = (icon) => {
    const Icon = Icons[icon];
    return <Icon className="flex-shrink-0 w-6 h-6 mr-4" aria-hidden="true" />;
  };

  return (
    <>
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setShow}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              className={`relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-50`}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-light"
                    onClick={() => setShow(false)}
                  >
                    <Icons.x
                      className="w-6 h-6 text-light-100"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex items-center justify-center flex-shrink-0">
                <div className="relative flex-shrink-0 w-40 h-10 cursor-pointer lg:hidden">
                  <Image
                    alt="Marti"
                    src={header.brandLogo}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              <nav
                className={`flex-shrink-0 inset-y-0 h-full mt-5 pt-4 overflow-y-auto bg-gray-50`}
                aria-label="Sidebar"
              >
                {navItems.map((navigation, index) => (
                  <>
                    {index !== 0 && (
                      <div
                        key={index + "div"}
                        className="w-10/12 h-1 mx-auto my-2 rounded w-90 bg-primary-800"
                      ></div>
                    )}
                    <div className="p-2 space-y-1" key={index}>
                      {navigation.map((item) => (
                        <Link href={item.href} key={item.label}>
                          <a
                            className={`group flex items-center p-2 text-base font-medium rounded-md ${
                              pathname === item.href
                                ? "bg-primary-600 text-light-100"
                                : "hover:text-light-100 hover:bg-primary-600"
                            }`}
                            aria-current={
                              pathname === item.href ? "page" : undefined
                            }
                          >
                            {getIcon(item.icon)}
                            {item.label}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </>
                ))}
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
        </Dialog>
      </Transition.Root>
      <div className="hidden w-full lg:w-64 lg:flex lg:flex-col lg:inset-y-0">
        <div
          className={`flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-gray-50 shadow-sm`}
        >
          <div className="flex flex-col items-center flex-shrink-0 px-4">
            <div className="relative inline-grid w-40 h-20">
              <Image src={header.brandLogo} layout="fill" objectFit="contain" />
            </div>
            {!!header.companyName && (
              <span className="text-lg text-light-100">
                {header.companyName}
              </span>
            )}
          </div>
          <nav
            className="flex flex-col flex-1 mt-5 overflow-y-auto "
            aria-label="Sidebar"
          >
            {navItems.map((navigation, index) => (
              <>
                {index !== 0 && (
                  <div className="w-10/12 h-1 mx-auto my-2 rounded w-90 bg-primary-600"></div>
                )}
                <div className="p-2 space-y-1" key={index}>
                  {navigation.map((item) => (
                    <Link href={item.href} key={item.label}>
                      <a
                        className={`group flex items-center p-2 rounded-xl cursor-point text-base font-bold ${
                          pathname === item.href
                            ? "bg-primary-600 text-light-100"
                            : "hover:text-light-100 hover:bg-primary-600"
                        }`}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                      >
                        {getIcon(item.icon)}
                        {item.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
