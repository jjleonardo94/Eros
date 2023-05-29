const colors = require("tailwindcss/colors");

module.exports = {
  //   webpack: (config, { isServer }) => {
  //     if (!isServer) {
  //         // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
  //         config.resolve.fallback = {
  //           fs: false,
  //           path: false
  //         }
  //     }

  //     return config;
  // },
  env: {
    API_URL: "https://marti-qa.arpictech.io/", //"http://localhost:4200/",
    MARTI_URL: "https://marti-qa.arpictech.io/", //"https://marti-prod.arpictech.io/",
    SUPABASE_CLIENT_URL: "https://vxqyhgzlbcbszekpqcbk.supabase.co",
    SUPABASE_CLIENT_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cXloZ3psYmNic3pla3BxY2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjExMTI0MTUsImV4cCI6MTk3NjY4ODQxNX0.Zdmozyc-lgKYzIECIsJvno4621eVF1lYUkspdxLNok4",
  },
  login: {
    logo: "/img/logos/marti_logo.png",
    title: "Eros 2.0",
    //subtitle: "Panel de administración",
  },
  dashboard: {
    user: {
      id: "1",
      name: "Scarly",
      lastName: "Tejeda",
      avatar: "",
      detail: {
        icon: "mailSolid",
        value: "stejeda@marti.do",
        href: "stejeda@marti.do",
      },
    },
    sidebar: {
      navItems: [
        [
          // {
          //   label: "Dashboard",
          //   description: "",
          //   icon: "home",
          //   href: "/Dashboard",
          //   items: [],
          // },
          // {
          //   label: "Centros de Distribución",
          //   description: "Mantenimiento de Centros de Distribución",
          //   icon: "calendar",
          //   href: "/Dashboard/Plants",
          //   items: [],
          // },
          // {
          //   label: "Stock",
          //   description: "",
          //   icon: "viewGrid",
          //   href: "/Dashboard/Stocks",
          //   items: [],
          // },
          // {
          //   label: "Materiales",
          //   description: "",
          //   icon: "truck",
          //   href: "/Dashboard/Materials",
          //   items: [],
          // },
          // {
          //   label: "Almacenes",
          //   description: "",
          //   icon: "userGroup",
          //   href: "/Dashboard/StoreLocations",
          //   items: [],
          // },
          {
            label: "Movimientos de Stock",
            description: "",
            icon: "truck",
            href: "/GasStockTransfer",
            items: [],
          },
          {
            label: "Reporte",
            description: "",
            icon: "documentReport",
            href: "/Reports",
            items: [],
          },
          {
            label: "Movimiento",
            description: "",
            icon: "archive",
            href: "/Movements",
            items: [],
          },
          {
            label: "Choferes",
            description: "",
            icon: "userGroup",
            href: "/Driver",
            items: [],
          },
          // {
          //   label: "Ventas",
          //   description: "",
          //   icon: "truck",
          //   href: "/Dashboard/GasSalesOrder",
          //   items: [],
          // },
        ],
        [
          {
            label: "Configuración",
            description: "",
            icon: "cog",
            href: "/Configuration",
            items: [],
          },
          {
            label: "Ayuda",
            description: "",
            icon: "questionMark",
            href: "#",
            items: [],
          },
          {
            label: "Privacy",
            description: "",
            icon: "shieldCheck",
            href: "#",
            items: [],
          },
        ],
      ],
      header: {
        brandLogo: "/img/logos/marti_logo.png",
        companyName: "",
      },
    },
    toolbar: {
      rightMenu: [
        {
          label: "Perfil",
          description: "",
          icon: "user",
          action: (router) => {
            router.push("/Profile");
          },
          items: [],
        },
        {
          label: "Configuración",
          description: "",
          icon: "cog",
          action: (router) => {
            router.push("/Configuration");
          },
          items: [],
        },
        {
          label: "Cerrar Sesión",
          description: "",
          icon: "logout",
          action: (router) => async () => {
            const { error } = await supabase.auth.signOut();
            console.log(error);
            router.push("/");
          },
          items: [],
        },
      ],
    },
    footer: {
      brand: {
        name: "Martí",
        href: "https://Marti.com/",
      },
      poweredBy: {
        name: "Arpitech",
        href: "#",
      },
    },
  },
  theme: {
    colors: {
      primary: {
        100: "#fbd2d4",
        200: "#7294a1",
        300: "#f4797e",
        400: "#f04d53",
        500: "#07445c",
        600: "#0f4c75",
        700: "#0f4c81",
        800: "#5e0d10",
        900: "#2f0608",
        1000: "#F5F5F5",
      },
      secondary: colors.orange,
      accent: colors.yellow,
      success: {
        100: "#dbefdc",
        200: "#b7dfb9",
        300: "#94cf96",
        400: "#70bf73",
        500: "#4caf50",
        600: "#3d8c40",
        700: "#2e6930",
        800: "#1e4620",
        900: "#0f2310",
      },
      warning: colors.orange,
      danger: colors.red,
      info: colors.blue,
      gray: {
        100: "#dbdcde",
        200: "#b7b9bc",
        300: "#93959b",
        400: "#6f7279",
        500: "#4b4f58",
        600: "#3c3f46",
        700: "#2d2f35",
        800: "#1e2023",
        900: "#0f1012",
      },
      light: {
        100: "#fffeff",
        200: "#fffeff",
        300: "#fffdff",
        400: "#fffdff",
        500: "#fffcff",
        600: "#cccacc",
        700: "#999799",
        800: "#666566",
        900: "#333233",
      },
      dark: {
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#000000",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000",
      },
    },
  },
};
