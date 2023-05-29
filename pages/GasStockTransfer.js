import { Table } from "../components";
import { useState, useRef, useEffect } from "react";
import config from "../utils/config.util";
import { Icons } from "../utils";
import { SubHeader } from "../components/Header.component";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import ListBoxComponent from "../components/utils/ListBox.Component";
import {
  getDrivers,
  getMaterialCodes,
  getPlants,
  getStoreLocations,
  getUserByEmail,
} from "../backend/storeLocationController";
//var moment = require('moment'); // require
import { format } from "date-fns";
import { supabase } from "../utils/supabaseClient";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export async function getStaticProps(context) {
  // const res = await fetch(config.env.API_URL + "Plant");
  //const plants = await res.json();

  //const res2 = await fetch(config.env.API_URL + "Material");
  // const materials = await res2.json();

  // const res3 = await fetch(config.env.API_URL + "StoreLocation");
  // const stores = await res3.json();

  const storeLocations = await getStoreLocations();

  const plants = await getPlants();

  console.log(plants);

  const materials = await getMaterialCodes();

  const drivers = await getDrivers();

  const driversList = await drivers.map((item) => {
    const driverOption = {};

    driverOption.value = item.id;
    driverOption.label = item.id + "-" + item.name;

    return driverOption;
  });

  const data = {
    plants,
    materials,
    //stores,
    storeLocations,
    drivers,
    driversList,
    //  user
  };

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default function GasStockTransfer({ data }) {
  const fichaRef = useRef(null);
  const capacityRef = useRef(null);
  const movementDateRef = useRef(null);
  const router = useRouter();

  const [user, setUser] = useState(null);
  //const user = await getUserByEmail('dario.cruz@arpictech.com')

  useEffect(() => {
    async function getInitialSession() {
      //setUserData(await getUserByEmail('dario.cruz@arpictech.com'))
      const { user } = supabase.auth.session();
      const data = await getUserByEmail(user.email);

      console.log(data);
      setDefaultData(data);

      setUser(data);
    }
    getInitialSession();
  }, []);

  const setDefaultData = (userData) => {
    //Default Material
    setSelectedMaterial(userData.defaultMaterial);

    //Movimientos en Supabase, los que el usuario tiene por default permitidos
    let allowedMovements = userData.allowedMovements;

    if (allowedMovements) {
      // Movement types, son la lista de todos los movimientos en la application

      //Remueve los movimientos que no son parte de los default del usuario
      let displayMovements = movementTypes.filter(function (el) {
        return allowedMovements.includes(el.movement);
      });

      setMovementTypes(displayMovements);
    }

    //Set Default Plant
    setSelectedOPlant(userData.defaultPlant);

    //setDefault Movement
    setSelectedMov(userData.defaultMovement);
  };

  useEffect(() => {
    movementDateRef.current.value = format(new Date(), "yyyy-MM-dd");
  }, []);

  const [startDate, setStartDate] = useState(new Date());

  const [selectedOPlant, setSelectedOPlant] = useState("");
  const [selectedDPlant, setSelectedDPlant] = useState("");
  const [selectedOStore, setSelectedOStore] = useState("");
  const [selectedDStore, setSelectedDStore] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [stockType, setStockType] = useState("");
  const [movementType, setMovementType] = useState("");

  const [createdDocument, setCreatedDocument] = useState("");

  const [quantity, setQuantity] = useState(0);

  const [volumenInicial, setVolumenInicial] = useState(0);

  const [volumenFinal, setVolumenFinal] = useState(0);

  const [driver, setDriver] = useState("");
  const [mister, setMister] = useState("");
  const [ficha, setFicha] = useState("");

  const [orderDate, setOrderDate] = useState(new Date());

  const [selectedMov, setSelectedMov] = useState("101");

  const [poNumber, setPONumber] = useState("");

  const [batch, setBatch] = useState("");

  const [pedido, setPedido] = useState("");

  const [unit, setUnit] = useState("");

  const [rotogageMister, setRotogageMister] = useState(0);
  const [rotogageRecibido, setRotogageRecibido] = useState(0);

  const [fichaCamion, setFichaCamion] = useState("");

  const [post511, setPost511] = useState(true);

  // const [DStoreLocation, setDStoreLocation] = useState("");

  //Formula para obtener el valor de la carga, Volumen Inicial - Volumen final * Carga

  useEffect(() => {
    //CalculoCarga(volumenInicial, volumenFinal);
  }, [volumenInicial, volumenFinal, quantity]);
  console.log(volumenInicial);
  console.log(volumenFinal);

  const CalculoCarga = async (volumenInicial, volumenFinal) => {
    //getting the array by the id of the storeLocation
    const selectedDStoreLocation = data.storeLocations.filter(
      (sl) => sl.id === selectedDStore
    );

    //getting the capacity variable out of the array
    const getCapacity = selectedDStoreLocation.map(function (item) {
      const capacity = item.capacity;
      return capacity;
    });
    console.log((volumenInicial - volumenFinal) * getCapacity[0]);

    // selectedDStore = DStoreLocation;

    const DStoreLocation = getCapacity[0];

    const quantity = (volumenInicial - volumenFinal) * DStoreLocation;

    setQuantity(quantity);
    console.log(quantity);
  };

  // console.log(selectedDStore);

  //driver
  useEffect(() => {
    console.log(driver);
  }, [driver]);

  const units = [
    "Kg",
    "Ltr",
    "Mtr",
    "Pcs",
    "Pair",
    "Set",
    "Box",
    "Bottle",
    "Bag",
    "Can",
    "Cm",
    "Dozen",
    "Gm",
    "Inch",
  ];

  const stockTypes = [
    "Unrestricted",
    "Quality Inspection",
    "Blocked",
    "In Transit",
  ];

  const [movementTypes, setMovementTypes] = useState([
    { movement: "101", movementDescrition: "Entrada de mercancías" },
    { movement: "301", movementDescrition: "Traslado centro a centro" },
    { movement: "311", movementDescrition: "Traslado en centro" },
  ]);

  
  function randomString(length, chars) {
    var mask = "";
    if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
    if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (chars.indexOf("#") > -1) mask += "0123456789";
    if (chars.indexOf("!") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
    var result = "";
    for (var i = length; i > 0; --i)
      result += mask[Math.floor(Math.random() * mask.length)];
    return result;
  }

  const onSubmit = async (event) => {
    console.log(selectedMov);
    event.preventDefault();
    let movDate = format(orderDate, "yyyyMMdd");

    let do_post_511 = "";
    if (selectedMov === "101" && post511) {
      do_post_511 = "X";
    }

    let chofer = "";

    if (driver) {
      if (!driver.value.includes("E")) {
        chofer = "E" + driver.value;
      } else {
        chofer = driver.value;
      }
    }
    console.log(chofer);

    if (selectedMov === "301") {
      setRotogageMister = 0;
      setRotogageRecibido = 0;
    }

    let payload = {
      DATE: movDate, //"20211111"
      BWART: selectedMov, //movementType,
      HEADER_TEXT: "",
      FROM_PLANT: selectedOPlant,
      TO_PLANT: selectedDPlant,
      FROM_LGORT: selectedOStore,
      TO_LGORT: selectedDStore,
      MATERIAL_CODE: selectedMaterial,
      QUANTITY: quantity,
      BATCH: batch, //"4600111162",
      MISTER: mister,
      CHOFER: chofer,
      FICHA: fichaCamion,
      PO_NUMBER: poNumber,
      PO_ITEM: "10",
      POST_511: do_post_511,
      ROTOGAGE_MISTER: rotogageMister,
      ROTOGAGE_RECIBIDO: rotogageRecibido,
    };

    
    let despacho = {
      ficha: ficha,
    };

    console.log(JSON.stringify(payload));
   
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(user.sapUser + ":" + user.sapPassword).toString("base64"),
        "My-Custom-Header": "foobar",
      },
      body: JSON.stringify(payload),
    };
    setPedido("");
    if (!user.sapUser || !user.sapPassword) {
      toast.error(
        "Debe configurar su usuario y clave SAP en la opción de Configuración"
      );
      return;
    }
    toast("Realizando movimiento...", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    fetch(config.env.MARTI_URL + "create/movement", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log(response);
        console.log(data);
        //    let  {error} = data;
        //    if(error){
        //     toast.error(error, {
        //         position: "top-center",
        //         autoClose: 4000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        //     return Promise.reject(error);
        //    }
        setPedido(data?.result?.codigo);
        console.log(data?.result?.codigo);
        // check for error response
        if (!data?.result?.codigo) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          toast.error(data.result.error, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return Promise.reject(error);
        } else {

          console.log(payload)

             //Guardar el movimiento realizdo en SUPABASE
             const { data, error } = await supabase.from("movements").insert(payload);

          setSelectedDPlant("");
          setSelectedDStore("");
          setSelectedOPlant("");
          setSelectedOStore("");
          setSelectedMaterial("");
          setQuantity(0);
          setDriver("");
          setMister("");
          setFicha("");
          setPONumber("");
          setRotogageMister = 0;
          setRotogageRecibido = 0;
          setFichaCamion("");
          //capacityRef.current.value = "";

          // console.log(data.result.codigo)
          toast.success(
            "Documento" + " " + data?.result?.codigo + " " + "creado",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );



       





          return Promise.resolve(pedido);



          



          // setTimeout(() => {
          //     router.push({
          //         pathname: '/Dashboard/Forms',
          //         query: { ficha: 'RG-345' },
          //     })
          // }, 3000);
        }
      })
      .catch((error) => {
        // this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  };
  const setDestinationStorage = (storeLocationID) => {
    //console.log(storeLocationID);
    setSelectedDStore(storeLocationID);

    let { truckToken, capacity, name } = data.storeLocations.filter(
      (store) => store.id === storeLocationID
    )[0];
    // console.log(truckToken);

    // console.log(ficha);
    if (truckToken) {
      setFicha(truckToken);
    } else {
      setFicha(" ");
    }

    //fichaRef.current.value = truckToken;
    setFichaCamion(truckToken);
    //capacityRef.current.value = capacity;
  };

  const setOriginPlant = function (originPlant) {
    console.log(originPlant);
    setSelectedOPlant(originPlant);
    if (selectedMov === "311") {
      setSelectedDPlant(originPlant); //El destino igual al origen cuando sea movimiento 311. Sella
    }
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-1 md:gap-0">
          <div className="mt-5 md:mt-0">
            <form
            // onSubmit={(e) => {
            //     e.preventDefault();
            //     onSubmit();
            // }}
            >
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <h2 className="mb-2 w-full text-lg font-bold capitalize">
                    Datos
                  </h2>
                  <div className="grid grid-cols-6 gap-6 border border-gray-100 p-4 rounded-md">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Fecha
                      </label>
                      <DatePicker
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          orderDate
                            ? "border-gray-300"
                            : "border-red-500 focus:border-red-500"
                        }`}
                        ref={movementDateRef}
                        dateFormat="dd/MM/yyyy"
                        selected={orderDate}
                        onChange={(date) => setOrderDate(date)}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Movimiento
                      </label>
                      <div className="col-span-3 sm:col-span-3">
                        <select
                          id="material"
                          name="material"
                          value={selectedMov}
                          onChange={(e) => setSelectedMov(e.target.value)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="" disabled>
                            Seleccione una clase de movimiento
                          </option>
                          {movementTypes.map((type) => (
                            <option key={type.movement} value={type.movement}>
                              {type.movement}-{type.movementDescrition}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mt-4 space-y-4">
                        {/*     <div className="flex items-center">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            value="101"
                            checked={selectedMov === "101"}
                            onChange={(e) => setSelectedMov(e.target.value)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-everything"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            101-Entrada mercancías
                          </label>
                        </div> */}
                        {selectedMov === "101" && (
                          <div className="flex items-center">
                            <input
                              id="post511"
                              name="post511"
                              type="checkbox"
                              value="true"
                              checked={post511 === true}
                              onChange={(e) => setPost511(!post511)}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="push-everything"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              511-Incluir movimiento
                            </label>
                          </div>
                        )}

                        {/* <div className="flex items-center">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            value="301"
                            checked={selectedMov === "301"}
                            onChange={(e) => setSelectedMov(e.target.value)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-email"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            301 | Traslado centro a centro
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-nothing"
                            name="push-notifications"
                            type="radio"
                            value="311"
                            checked={selectedMov === "311"}
                            onChange={(e) => setSelectedMov(e.target.value)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="push-nothing"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            311 | Traslado en centro
                          </label>
                        </div> */}
                      </div>
                      {/* ******************************************************* */}
                    </div>
                  </div>

                  {selectedMov === "101" && (
                    <div>
                      <div>
                        <h2 className="mb-2 w-full text-lg font-bold capitalize">
                          Datos
                        </h2>
                        <div className="grid grid-cols-6 gap-6 border border-gray-100 p-4 rounded-md">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="ficha"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Pedido
                            </label>
                            <input
                              id="PONumber"
                              type="text"
                              name="PONumber"
                              value={poNumber}
                              onChange={(e) => setPONumber(e.target.value)}
                              className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block font-bold w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                poNumber
                                  ? "border-gray-300"
                                  : "border-red-500 focus:border-red-500"
                              }`}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="quantity"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Galones a 60 grados *F
                            </label>
                            <input
                              id="quantity"
                              type="number"
                              name="quantity"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block font-bold w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                quantity
                                  ? "border-gray-300"
                                  : "border-red-500 focus:border-red-500"
                              }`}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-6 gap-6 border border-gray-100 p-4 rounded-md">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="Rotogage"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Rotogage (Mister)
                            </label>
                            <input
                              id="RotogageMister"
                              type="number"
                              name="RotogageMister"
                              value={rotogageMister}
                              onChange={(e) =>
                                setRotogageMister(e.target.value)
                              }
                              className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full font-bold shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                rotogageMister
                                  ? "border-gray-300"
                                  : "border-red-500 focus:border-red-500"
                              }`}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="Rotogage"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Rotogage (Recibido)
                            </label>
                            <input
                              id="RotogageRecibido"
                              type="number"
                              name="RotogageRecibido"
                              value={rotogageRecibido}
                              onChange={(e) =>
                                setRotogageRecibido(e.target.value)
                              }
                              className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full font-bold shadow-sm sm:text-sm border-gray-300 rounded-md ${
                                rotogageRecibido
                                  ? "border-gray-300"
                                  : "border-red-500 focus:border-red-500"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMov !== "101" && (
                    <div>
                      <h2 className="mb-2 w-full text-lg font-bold capitalize">
                        OrigensetSelectedOStore
                      </h2>

                      <div className="grid grid-cols-6 gap-6 border border-gray-100 p-4 rounded-md">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="Centro_origen"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Centro de Distribución
                          </label>

                          <select
                            id="Centro_origen"
                            name="Centro_origen"
                            value={selectedOPlant}
                            onChange={(e) => setOriginPlant(e.target.value)}
                            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                              selectedOPlant
                                ? "border-gray-300"
                                : "border-red-500 focus:border-red-500"
                            }`}
                          >
                            <option value="" disabled>
                              Seleccione un Centro de Distribución
                            </option>
                            {data.plants.map((plant) => (
                              <option key={plant.id} value={plant.id}>
                                {plant.name} - {plant.description}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="almacen_origen"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Almacen
                          </label>
                          <select
                            id="almacen_origen"
                            name="almacen_origen"
                            value={selectedOStore}
                            onChange={(e) => setSelectedOStore(e.target.value)}
                            autoComplete="country-name"
                            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                              selectedOStore
                                ? "border-gray-300"
                                : "border-red-500 focus:border-red-500"
                            }`}
                          >
                            <option value="" disabled>
                              Seleccione un Almacen
                            </option>
                            {data.storeLocations
                              .filter((x) => x.plantID === selectedOPlant)
                              .map((store) => (
                                <option key={store.id} value={store.id}>
                                  {store.name} - {store.description} -{" "}
                                  {store.capacity}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <h2 className="my-2 w-full text-lg font-bold capitalize">
                        Destino
                      </h2>
                      <div className="grid grid-cols-6 gap-6 border border-gray-100 p-4 rounded-md">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="centro_destino"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Centro de Distribución
                          </label>
                          <select
                            id="centro_destino"
                            name="centro_destino"
                            value={selectedDPlant}
                            onChange={(e) => setSelectedDPlant(e.target.value)}
                            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                              selectedDPlant
                                ? "border-gray-300"
                                : "border-red-500 focus:border-red-500"
                            }`}
                          >
                            <option value="" disabled>
                              Seleccione un Centro de Distribución
                            </option>
                            {/* {data.plants
                                                            .filter((x) => x.id !== selectedDPlant)
                                                            .map((plant) => (
                                                                <option key={plant.id} value={plant.id}>
                                                                    {plant.name} - {plant.description}
                                                                </option>
                                                            ))} */}
                            {data.plants.map((plant) => (
                              <option key={plant.id} value={plant.id}>
                                {plant.name} - {plant.description}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="almacen_destino"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Almacen
                          </label>
                          <select
                            id="almacen_destino"
                            name="almacen_destino"
                            value={selectedDStore}
                            onChange={(e) =>
                              setDestinationStorage(e.target.value)
                            }
                            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                              selectedDStore
                                ? "border-gray-300"
                                : "border-red-500 focus:border-red-500"
                            }`}
                          >
                            <option value="" disabled>
                              Seleccione un Almacen
                            </option>
                            {data.storeLocations
                              .filter((x) => x.plantID === selectedDPlant)
                              .map((store) => (
                                <option key={store.id} value={store.id}>
                                  {store.name} - {store.description} -{" "}
                                  {store.capacity}
                                </option>
                              ))}
                          </select>
                        </div>
                        {selectedMov === "311" && (
                          <div className="col-span-3 sm:col-span-3">
                            <label
                              htmlFor="volumenInicial"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Volumen Inicial
                            </label>
                            <input
                              id="volumenInicial"
                              type="number"
                              name="volumenInicial"
                              value={volumenInicial}
                              onChange={(e) =>
                                setVolumenInicial(e.target.value)
                              }
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        )}
                        {selectedMov === "311" && (
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="volumenInicial"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Volumen Final
                            </label>
                            <input
                              id="volumenFinal"
                              type="number"
                              name="volumenFinal"
                              value={volumenFinal}
                              onChange={(e) => setVolumenFinal(e.target.value)}
                              className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        )}
                      </div>

                      <h2 className="my-2 w-full text-lg font-bold capitalize">
                        Stock
                      </h2>
                      <div className="grid grid-cols-6 gap-6 border border-gray-100 p-4 rounded-md">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="material"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Material
                          </label>
                          <select
                            id="material"
                            name="material"
                            value={selectedMaterial}
                            onChange={(e) =>
                              setSelectedMaterial(e.target.value)
                            }
                            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                              selectedMaterial
                                ? "border-gray-300"
                                : "border-red-500 focus:border-red-500"
                            }`}
                          >
                            <option value="" disabled>
                              Seleccione un Material
                            </option>
                            {data.materials.map((material) => (
                              <option key={material.id} value={material.id}>
                                {material.name} - {material.description}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="quantity"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Cantidad / Carga
                          </label>
                          <input
                            id="quantity"
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block font-bold w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                              quantity
                                ? "border-gray-300"
                                : "border-red-500 focus:border-red-500"
                            }`}
                          />
                        </div>

                        {/*  */}
                      </div>
                    </div>
                  )}

                  <h2 className="my-2 w-full text-lg font-bold capitalize">
                    Otros Datos
                  </h2>
                  <div className="grid grid-cols-6 gap-6 border border-gray-100 p-4 rounded-md">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="chofer"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Chofer
                      </label>
                      <Select
                        value={driver}
                        onChange={(driverOption) => setDriver(driverOption)}
                        options={data.driversList}
                        className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white font-bold rounded-md shadow-sm  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          driver
                            ? "border-gray-300"
                            : "border-red-500 focus:border-red-500"
                        }`}
                      />
                      {/* <select
                                                id="chofer"
                                                name="chofer"
                                                value={driver}
                                                onChange={(e) => setDriver(e.target.value)}
                                                className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${driver ? 'border-gray-300' : 'border-red-500 focus:border-red-500'}`}
                                            >
                                                <option value="" disabled>
                                                    Seleccione un chofer
                                                </option>
                                                {data.drivers.map((driver) => (
                                                    <option key={driver.id} value={driver.id}>
                                                        {driver.id}-{driver.name}
                                                    </option>
                                                ))}
                                            </select> */}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="fichaCamion"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ficha Camión
                      </label>
                      <input
                        id="fichaCamion"
                        type="text"
                        name="fichaCamion"
                        value={fichaCamion}
                        onChange={(e) => setFichaCamion(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full font-bold shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="mister"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mister
                      </label>
                      <input
                        id="mister"
                        type="text"
                        name="mister"
                        value={mister}
                        onChange={(e) => setMister(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {/*
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="ficha"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Ficha
                                            </label>
                                            <input
                                                id="ficha"
                                                type="text"
                                                name="ficha"
                                                ref={fichaRef}
                                                disabled={true}
                                                className="disabled bg-gray-100  focus:outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div> */}
                    {/* <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="Capacidad"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Capacidad
                                            </label>
                                            <input
                                                id="ficha"
                                                type="text"
                                                name="capacidad"
                                                ref={capacityRef}
                                                disabled={true}
                                                className="disabled bg-gray-100  focus:outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div> */}
                    {selectedMov !== "101" && (
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="Capacidad"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Lote
                        </label>
                        <input
                          id="ficha"
                          type="text"
                          name="capacidad"
                          value={batch}
                          onChange={(e) => setBatch(e.target.value)}
                          className="focus:outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full font-bold  shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  <div className={`bg-white ${pedido ? "block" : "hidden"}`}>
                    <h2 className="mb-2 w-full text-lg font-bold capitalize">
                      Resultado
                    </h2>
                    <div
                      className={`grid grid-cols-6 gap-6 border border-gray-100 p-4 rounded-md ${
                        pedido ? "border-green-400" : ""
                      }`}
                    >
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="pedido"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Documento de material
                        </label>
                        <input
                          id="pedido"
                          type="text"
                          name="pedido"
                          value={pedido}
                          className="disabled bg-gray-100  outline-none mt-1  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  {selectedMov === "101" && (
                    <button
                      type="button"
                      onClick={onSubmit}
                      disabled={
                        !(
                          orderDate &&
                          selectedMov &&
                          poNumber &&
                          quantity &&
                          driver &&
                          rotogageMister &&
                          rotogageRecibido
                        )
                      }
                      className={`disabled:bg-primary-200 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border-primary-600 text-light-500 bg-primary-600 hover:bg-primary-500`}
                    >
                      Guardar
                    </button>
                  )}
                  {selectedMov !== "101" && (
                    <button
                      type="button"
                      onClick={onSubmit}
                      disabled={
                        !(
                          orderDate &&
                          selectedMov &&
                          quantity &&
                          driver &&
                          selectedOPlant &&
                          selectedOStore &&
                          selectedDPlant &&
                          selectedDStore &&
                          selectedMaterial
                        )
                      }
                      className={`disabled:bg-primary-200 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border-primary-600 text-light-500 bg-primary-600 hover:bg-primary-500`}
                    >
                      Guardar
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
