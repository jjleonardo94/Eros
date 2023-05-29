import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import Swal from "sweetalert2";

const EditDriver = ({ isVisible, onClose, updateDriver }) => {
  const [id, setId] = useState("");
  // const [created_at, setCreated_at] = useState("");
  const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  if (!isVisible) return null;

  const handleUpdateDriver = async () => {
    try {
      const { data, error } = await supabase
        .from("TestDriver")
        .update({
          // id,
          // created_at,
          name,
          // description,
        })
        .eq("id", updateDriver.id);

      if (error) throw error;

      updateDriverNotification();

      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  //notifications
  const updateDriverNotification = () => {
    Swal.fire({
      icon: "success",
      title: "El chofer ha sido actualizado",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
    <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <div className="bg-white border p-2 rounded">
          {/*header*/}
          <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">Actualizar Datos Chofer</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <form className="space-y-6" action="#">
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ID
                </label>
                <input
                  readOnly
                  type="text"
                  name="text"
                  id="text"
                  defaultValue={updateDriver.id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              {/* <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fecha
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  defaultValue={updateDriver.created_at}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={(e) => setCreated_at(e.target.value)}
                />
              </div> */}

              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  defaultValue={updateDriver.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Descripción
                </label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  defaultValue={updateDriver.description}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div> */}
            </form>
          </div>

          {/*Action Buttons*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={() => onClose()}
            >
              Cerrar
            </button>
            <button
              data-modal-hide="staticModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleUpdateDriver(id)}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDriver;
