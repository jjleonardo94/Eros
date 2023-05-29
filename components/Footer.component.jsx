import config from "../utils/config.util";
const footer = config.dashboard.footer;

const Footer = ({}) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="bottom-0 h-auto p-2 text-sm text-center bg-light-300 shadow"
      styles={{ zIndex: 0 }}
    >
      <p>
        Copyright © {currentYear}&nbsp;
        <a
          className="text-primary-500 hover:text-primary-700"
          href={footer.brand.href}
        >
          {footer.brand.name}
        </a>
        , Todos los derechos reservados.
      </p>
      {!!footer.poweredBy && (
        <p>
          Powered by&nbsp;
          <a
            className="text-primary-500 hover:text-primary-700"
            href={footer.poweredBy.href}
          >
            {footer.poweredBy.name}
          </a>
        </p>
      )}
    </footer>
  );
};

export default Footer;
