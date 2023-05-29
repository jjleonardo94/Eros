import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
// import Moment from "react-moment";
import { Fragment } from "react";
import Modal from "../modal/Modal";
import EditDriver from "./EditDriver";
import Swal from "sweetalert2";

const Driver = () => {
  const [drivers, setDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [updateDriver, setUpdateDriver] = useState();
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    getDrivers();
  }, []);

  //function to fetch the drivers from supabase
  const getDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from("TestDriver")
        .select("*")
        .order("created_at", { ascending: false }); //order data in the table ascending

      if (error) throw error;
      if (data != null) {
        setDrivers(data);
      }
      //console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (driverId) => {
    try {
      const { value: confirmDelete } = await Swal.fire({
        title: "¿Seguro que quieres eliminar este chofer?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, elimínalo!",
      });

      if (confirmDelete) {
        // User confirmed deletion
        await supabase.from("TestDriver").delete().eq("id", driverId);

        getDrivers();

        Swal.fire({
          icon: "success",
          title: "El chofer ha sido eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error eliminando el chofer:", error);
      Swal.fire(
        "Error",
        "Se ha producido un error eliminando el chofer.",
        "error"
      );
    }
  };

  //Handle edit driver information
  const handleEditDriver = (index) => {
    const tempData = drivers[index];
    console.log("tempData", tempData);
    setShowModalEdit(true);
    setUpdateDriver(tempData);
  };

  // Create an empty array of length 15
  const emptyRows = new Array(9 + drivers.length).fill("");

  return (
    <Fragment>
      <div className="flex flex-col ">
        <div className="">
          {/* Add Driver button */}
          <button
            className="focus:outline-none float-right h-8 justify-between text-white bg-[#0F4C75] focus:ring-4 focus:ring-[#045899]  text-sm  mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={() => setShowModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Agregar Chofer</span>
          </button>
          {/* Search button */}
          <div class="flex items-center float-left">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                className="border w-80 py-1.5 px-30 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 block pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar Chofer"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Search button */}
        </div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
        <EditDriver
          isVisible={showModalEdit}
          onClose={() => setShowModalEdit(false)}
          handleEditDriver={handleEditDriver}
          updateDriver={updateDriver}
        />

        <div className="overflow-x-auto rounded-lg border h-96">
          <div className="flex-grow overflow-auto h-85">
            <table className="border table-auto overflow-x-scroll w-full">
              <thead className="text-xs text-white-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    // scope="col"
                    className="bg-primary-600 px-6 py-2 text-white text-xs font-bold text-left border border-b text-black-500 uppercase"
                  >
                    Id
                  </th>

                  {/* <th
                    scope="col"
                    className="px-6 py-2 text-xs font-bold text-white text-left border border-b text-gray-500 uppercase"
                  >
                    Fecha
                  </th> */}

                  <th
                    // scope="col"
                    className="bg-primary-600 px-6 py-2 text-white text-xs font-bold text-left border border-b text-black-500 uppercase"
                  >
                    Nombre
                  </th>

                  {/* <th
                    scope="col"
                    className="px-6 py-2 text-xs font-bold text-white text-left border border-b text-gray-500 uppercase"
                  >
                    Descripción
                  </th> */}
                  <th
                    // scope="col"
                    className="bg-primary-600 px-6 py-2 text-white text-xs font-bold text-center border  border-b text-black-500 uppercase"
                  >
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {drivers
                  .filter((item) => {
                    return search.toLocaleLowerCase() === ""
                      ? item
                      : item.id.toLocaleLowerCase().includes(search) ||
                          item.id.includes(search) ||
                          item.name.toLocaleLowerCase().includes(search) ||
                          item.name.includes(search);
                  })
                  .map((driver, id) => (
                    <tr key={id}>
                      <td className="px-6 py-2 text-sm font-medium border border-b text-gray-800 whitespace-nowrap">
                        {driver.id}
                      </td>

                      {/* <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                      <Moment format="MM-DD-YYYY">{driver.created_at}</Moment>
                    </td> */}

                      <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                        {driver.name}
                      </td>

                      {/* <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                      {driver.description}
                    </td> */}

                      <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                        <div className="flex justify-center gap-4 items-center">
                          <a x-data="{ tooltip: 'Delete' }" href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                              onClick={() => {
                                handleDelete(driver.id);
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </a>

                          <a x-data="{ tooltip: 'Edite' }" href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                              onClick={() => handleEditDriver(id)}
                              // onClick={() => setShowModalEdit(true)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                {/* Map over the emptyRows array and render empty table rows */}
                {drivers.map((driver) => (
                  <tr key={driver}>
                    <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                      &nbsp;
                    </td>
                    <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                      &nbsp;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Driver;
