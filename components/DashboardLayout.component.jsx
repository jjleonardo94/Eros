import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Sidebar, Toolbar, Header, Footer } from ".";
import { SubHeader, UserInfoHeader, SimpleHeader } from "./Header.component";
import config from "../utils/config.util";
import { supabase } from  "../utils/supabaseClient";
import { getDrivers, getMaterialCodes, getPlants, getStoreLocations, getUserByEmail } from "../backend/storeLocationController";
import { JellyTriangle } from "@uiball/loaders";


const user = config.dashboard.user;

const toolbarMenuItems =  [
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
    action: async (router) => {
      
      const { error } = await supabase.auth.signOut()
      
      router.push("/");
    },
    items: [],
  },
];
const navHeaders = {};

config.dashboard.sidebar.navItems.flat().forEach((item) => {
  navHeaders[item.href.split("/").pop()] = {
    title: item.label,
    subTitle: item.description,
  };
});



export default function DashboardLayout({ children }) {
 
  const router = useRouter();
  let pageTitle;
  let pageSubTitle;
  const routeSplit = router.pathname.split("/");

  if (navHeaders[routeSplit[routeSplit.length - 1]]) {
    pageTitle = navHeaders[routeSplit[routeSplit.length - 1]].title;
    pageSubTitle = navHeaders[routeSplit[routeSplit.length - 1]].subTitle;
  }
  else {
    pageTitle = navHeaders[routeSplit[routeSplit.length]].title;
    pageSubTitle = navHeaders[routeSplit[routeSplit.length]].subTitle;
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [userData, setUserData] = useState(null)
  useEffect( () => {
    async function getInitialSession() { 
      //setUserData(await getUserByEmail('dario.cruz@arpictech.com'))
      const { user } = supabase.auth.session()
      const data = await getUserByEmail(user.email);
      
      setUserData(data);
     }
     getInitialSession()

  }, [])

  

  if(userData){
  return (
    <main className="flex flex-row w-screen h-screen p-0 m-0">
      <Sidebar show={sidebarOpen} setShow={setSidebarOpen} />
      <div className="flex flex-col flex-1 w-full">
        <Toolbar
          user={userData}
          menuItems={toolbarMenuItems}
          openSidebar={setSidebarOpen}
        />
        <main className="flex flex-col justify-between flex-1">
          <div className="w-full">
            <Header>
              {router.pathname === "/Dashboard" ? (
                <UserInfoHeader
                  photo={user.avatar}
                  name={`${user.name}`}
                  details={user.detail}
                />
              ) : (
                <SimpleHeader title={pageTitle} subTitle={pageSubTitle} />
              )}
            </Header>
            <div className="bg-slate-50 inset-y-0 p-2 mt-8 overflow-x-hidden overflow-y-auto px-2 sm:px-2  lg:max-w-6xl lg:mx-auto lg:px-2">
              {children}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </main>
  );
}

return (
   <div className="flex w-full items-center justify-center p-30 text-xl">
      <JellyTriangle size={80} speed={1.75} color="#0F4C81" />
    </div>  
)
}

