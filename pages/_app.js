import "tailwindcss/tailwind.css";
import "../styles/theme.css";
import "../styles/invoice.css";
import { useRouter } from "next/router";
import Dashboard from "../components/DashboardLayout.component"
import { Toaster } from "react-hot-toast";
import { supabase } from  "../utils/supabaseClient";
import Login from "./Login";
import useAuthState from "./useAuthState";
import { useState, useRef, useEffect } from "react";
import { getDrivers, getMaterialCodes, getPlants, getStoreLocations, getUserByEmail } from "../backend/storeLocationController";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  const noNav = ["/Login", "/", "/Profile"];
  //console.log("My Main App");
  //console.log(supabase.auth.session())
  const { user } = useAuthState();
  console.log(user)
  //console.log(router.pathname);
  

 
  

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      {/* {
        
        supabase.auth.session() ? (
          noNav.includes(pathname) ? (
            <Component {...pageProps} />
          ) : (
            <Dashboard>
              <Component {...pageProps} />
            </Dashboard>
          )
         
        ): (          
          <Login/>
        )
        
      } */}

{
        user ? noNav.includes(pathname) ? (
          <Component {...pageProps} />
        ) : (
          <Dashboard>
            <Component {...pageProps } />
          </Dashboard>
        ): <Login/>
      }

{/* {
        user ? noNav.includes(pathname) ? (
          <Component {...pageProps} />
        ) : (
          <Dashboard>
            <Component {...pageProps } />
          </Dashboard>
        ): <Login/>
      } */}

      
    </>
  );

}
