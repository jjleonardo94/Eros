import { Icons } from "../utils";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRouter } from "next/router";

const getIcon = (icon) => {
  const Icon = Icons[icon];
  return (
    <Icon
      className="flex-shrink-0 w-4 h-4 mr-4 font-medium"
      aria-hidden="true"
    />
  );
};

const Toolbar = ({ user, menuItems, openSidebar }) => {
  const router = useRouter();
  return (
    <div className="z-10 flex h-auto max-w-full py-2 bg-light-200 shadow">
      <button
        type="button"
        className="px-4 text-gray-400 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
        onClick={() => openSidebar(true)}
      >
        <Icons.menu className="w-6 h-6 text-primary-500" aria-hidden="true" />
      </button>
      <div className="flex flex-row-reverse justify-between flex-1 px-4 sm:px-6">
        <div className="flex items-center ml-4 md:ml-6">
          <button
            type="button"
            className="p-1 text-gray-400 bg-primary-600 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <Icons.bell className="w-6 h-6 text-light-100" aria-hidden="true" />
          </button>
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex items-center max-w-xs text-sm bg-primary-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md">
                {/* <img
                  className="w-8 h-8 rounded-full"
                  src={user.avatar}
                  alt=""
                /> */}
                <span className="hidden ml-3 text-sm font-medium text-light-100  lg:block">
                  {user.name}
                </span>
                <Icons.chevronDown
                  className="flex-shrink-0 hidden w-5 h-5 ml-1 text-light-100 lg:block"
                  aria-hidden="true"
                />
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
              <Menu.Items className="absolute right-0 flex flex-col w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none">
                {menuItems.map((item, i) => (
                  <Menu.Item key={i}>
                    <button
                      onClick={() => item.action(router)}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 transition duration-150 ease-in-out rounded-xl cursor-point  font-bold hover:text-light-100 hover:bg-primary-600 focus:outline-none focus:bg-gray-100"
                    >
                      {!!item.icon ? getIcon(item.icon) : null}
                      {item.label}
                    </button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
