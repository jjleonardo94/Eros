import { LockClosedIcon } from "@heroicons/react/solid";
import { supabase } from  "../utils/supabaseClient";
import { useRouter } from "next/dist/client/router";
import { useState } from 'react'
import { Footer } from "../components";
import Image from "next/image";
import config from "../utils/config.util";
import DashboardLayout from "../components/DashboardLayout.component";
import MyApp from "./_app";
import { JellyTriangle } from "@uiball/loaders";
import toast from 'react-hot-toast';
const conf = config.login;
const logo = conf.logo;
const title = conf.title;
const subtitle = conf.subtitle;

export default function Example() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {

    //Remover mas tarde.....
    let userName= "dev@arpictech.com"
    let password= "Dev001"


    const { user, session, error } = await supabase.auth.signIn({
      email: 'dev@arpictech.com',
      password: 'Dev001',
    })
    
  console.log(error)
  console.log(user);
//Fin--Remover mas tarde
      

    //   const { error } = await supabase.auth.signIn({ email })
    //   if (error) throw error
    //  // alert('Check your email for the login link!')
    //   toast.success('Verifique su correo para autorizar login', {
    //     position: "top-center",
    //     autoClose: 6000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    // });
    // } catch (error) {
    //   console.log(error.error_description || error.message)
    // } finally {
    //  // router.push("/Dashboard")
    // }
  }


  

  if(supabase.auth.session()){
    router.push("/GasStockTransfer")
    return (
      <div className="flex w-full items-center justify-center p-30 text-xl">
        <JellyTriangle size={80} speed={1.75} color="#0F4C81" />
      </div>
    )
  }

  return (
  
    <div className="flex flex-col justify-between flex-1 w-screen h-screen">
      <div className="inset-y-0 flex items-center justify-center w-full h-full">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="relative flex-shrink-0 w-auto h-24 mx-auto cursor-pointer">
              <Image alt="Marti" src={logo} layout="fill" objectFit="contain" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              <a
                href="#"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                {subtitle}
              </a>
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(email)
            }}
            className="mt-8 space-y-6"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              {/* <div>
                <label htmlFor="password" className="sr-only">
                  Clave
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Clave"
                />
              </div> */}
            </div>
{/* 
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Olvidaste tu clave?
                </a>
              </div>
            </div> */}

            <div>
              <button className="relative flex justify-center w-full px-4 py-2 text-sm font-medium border border-transparent rounded-md text-light-100 group bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="w-5 h-5 text-light-100"
                    aria-hidden="true"
                  />
                </span>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );          
}
