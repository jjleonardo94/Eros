import { Icons } from "../utils";

const Header = ({ children }) => (
  <header className="w-full bg-gray-50 border-0 border-light-600">
    <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div className="py-6 md:flex md:items-center md:justify-between lg:border-gray-200">
        {children}
      </div>
    </div>
  </header>
);

const getRegards = (name) => {
  const date = new Date();
  const hours = date.getHours();
  let greetings = "";
  if (hours < 12) {
    greetings = `Buenos días, ${name}`;
  } else if (hours >= 12 && hours <= 17) {
    greetings = `Buenas tardes, ${name}`;
  } else if (hours >= 17 && hours <= 24) {
    greetings = `Buenas noches, ${name}`;
  }
  return greetings;
};

const getIcon = (icon) => {
  const Icon = Icons[icon];
  return (
    <Icon
      className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary-400"
      aria-hidden="true"
    />
  );
};

export const UserInfoHeader = ({ photo, name, details }) => (
  <div className="flex-1 min-w-0">
    <div className="flex items-center">
      <img
        className="hidden w-16 h-16 rounded-full sm:block"
        src={photo}
        alt="photo"
      />
      <div>
        <div className="flex items-center">
          <img
            className="w-16 h-16 rounded-full sm:hidden"
            src={photo}
            alt="photo"
          />
          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
            {getRegards(name)}
          </h1>
        </div>
        <dl className="flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
          <dd className="flex items-center text-sm font-medium sm:mr-6">
            {getIcon(details.icon)}
            {!!details.href ? (
              <a
                href={details.href}
                className="text-gray-500 hover:text-gray-700"
              >
                {details.value}
              </a>
            ) : (
              <span className="text-gray-500">{details.value}</span>
            )}
          </dd>
        </dl>
      </div>
    </div>
  </div>
);

export const SubHeader = ({ children }) => (
  <div className="flex mt-6 space-x-3 md:mt-0 md:ml-4 justify-end w-full">{children}</div>
);

export const SimpleHeader = ({ title, subTitle }) => (
  <div className="flex-1 min-w-0">
    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
      {title}
    </h2>
    <p className="mt-1 text-sm leading-5 text-gray-500">{subTitle}</p>
  </div>
);

export default Header;
