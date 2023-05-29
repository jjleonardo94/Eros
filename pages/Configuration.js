import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import config from "../utils/config.util";
import toast from "react-hot-toast";
import {
  getDrivers,
  getMaterialCodes,
  getPlants,
  getStoreLocations,
  getUserByEmail,
} from "../backend/storeLocationController";
import { supabase } from "../utils/supabaseClient";

const Configuration = () => {
  const router = useRouter();
  const [sapUser, setSapUser] = useState(null);
  const [sapPass, setSapPass] = useState(null);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from(sapUser + ":" + sapPass).toString("base64"),
      "My-Custom-Header": "foobar",
    },
  };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function getInitialSession() {
      //setUserData(await getUserByEmail('dario.cruz@arpictech.com'))
      //const data = await getUserByEmail('dario.cruz@arpictech.com');
      const { user } = supabase.auth.session();
      const data = await getUserByEmail(user.email);
      setUserData(data);
      setSapUser(data.sapUser);
      setSapPass(data.sapPassword);
    }
    getInitialSession();
  }, []);

  async function checkSAPConexion() {
    console.log(sapUser);
    console.log(sapPass);

    if (userData.sapPassword !== sapPass || userData.sapUser !== sapUser) {
      userData.sapPassword = sapPass;
      userData.sapUser = sapUser;
      const { data, error } = await supabase.from("user").upsert(userData);
    }

    //return;
    fetch(config.env.MARTI_URL + "testSap", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log(data);
        const { result, error } = data;
        if (result) {
          toast.success("Conexión SAP establecida", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(
            "Error al establecer conexión con SAP. Revise su usuario y/o password"
          );
        }
      })
      .catch((error) => {
        // this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  }

  return (
    <>
      {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-gray-50">
            <body class="h-full">
            ```
          */}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                checkSAPConexion();
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="sapUser"
                  className="block text-sm font-medium text-gray-700"
                >
                  Usuario SAP
                </label>
                <div className="mt-1">
                  <input
                    id="sapUser"
                    name="sapUser"
                    type="text"
                    value={sapUser}
                    onChange={(e) => setSapUser(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Clave
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={sapPass}
                    onChange={(e) => setSapPass(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium border border-transparent rounded-md text-light-100 group bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Probar Conexión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configuration;
