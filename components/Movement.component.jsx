import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Movement = () => {
  const [DATE, setDATE] = useState("");
  const [BWART, setBWART] = useState("");
  const [HEADER_TEXT, setHEADER_TEXT] = useState("");
  const [FROM_PLANT, setFROM_PLANT] = useState("");
  const [TO_PLANT, setTO_PLANT] = useState("");
  const [FROM_LGORT, setFROM_LGORT] = useState("");
  const [TO_LGORT, setTO_LGORT] = useState("");
  const [MATERIAL_CODE, setMATERIAL_CODE] = useState("");
  const [QUANTITY, setQUANTITY] = useState("");
  const [BATCH, setBATCH] = useState("");
  const [MISTER, setMISTER] = useState("");
  const [CHOFER, setCHOFER] = useState("");
  const [FICHA, setFICHA] = useState("");
  const [PO_NUMBER, setPO_NUMBER] = useState("");
  const [PO_ITEM, setPO_ITEM] = useState("");
  const [POST_511, setPOST_511] = useState("");
  const [ROTOGAGE_MISTER, setROTOGAGE_MISTER] = useState("");
  const [ROTOGAGE_RECIBIDO, setROTOGAGE_RECIBIDO] = useState("");

  const handleCreateMovement = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from("movements").insert({
        DATE,
        BWART,
        HEADER_TEXT,
        FROM_PLANT,
        TO_PLANT,
        FROM_LGORT,
        TO_LGORT,
        MATERIAL_CODE,
        QUANTITY,
        BATCH,
        MISTER,
        CHOFER,
        FICHA,
        PO_NUMBER,
        PO_ITEM,
        POST_511,
        ROTOGAGE_MISTER,
        ROTOGAGE_RECIBIDO,
      });

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="relative flex flex-col justify-center pt-4 pb-4 overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase decoration-wavy">
          DATE
        </h1>
        <form className="mt-2">
          <div className="mb-2">
            <label htmlFor="DATE">DATE</label>
            <input
              type="date"
              id="DATE"
              value={DATE}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setDATE(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="BWART">BWART</label>
            <input
              type="text"
              id="BWART"
              value={BWART}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setBWART(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="HEADER_TEXT">HEADER_TEXT</label>
            <input
              type="text"
              id="HEADER_TEXT"
              value={HEADER_TEXT}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setHEADER_TEXT(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="FROM_PLANT">FROM_PLANT</label>
            <input
              type="text"
              id="FROM_PLANT"
              value={FROM_PLANT}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setFROM_PLANT(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="TO_PLANT">TO_PLANT</label>
            <input
              type="text"
              id="TO_PLANT"
              value={TO_PLANT}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setTO_PLANT(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="FROM_LGORT">FROM_LGORT</label>
            <input
              type="text"
              id="FROM_LGORT"
              value={FROM_LGORT}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setFROM_LGORT(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="TO_LGORT">TO_LGORT</label>
            <input
              type="text"
              id="TO_LGORT"
              value={TO_LGORT}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setTO_LGORT(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="MATERIAL_CODE">MATERIAL_CODE</label>
            <input
              type="text"
              id="MATERIAL_CODE"
              value={MATERIAL_CODE}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setMATERIAL_CODE(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="QUANTITY">QUANTITY</label>
            <input
              type="text"
              id="QUANTITY"
              value={QUANTITY}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setQUANTITY(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="BATCH">BATCH</label>
            <input
              type="text"
              id="BATCH"
              value={BATCH}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setBATCH(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="MISTER">MISTER</label>
            <input
              type="text"
              id="MISTER"
              value={MISTER}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setMISTER(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="CHOFER">CHOFER</label>
            <input
              type="text"
              id="CHOFER"
              value={CHOFER}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setCHOFER(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="FICHA">FICHA</label>
            <input
              type="text"
              id="FICHA"
              value={FICHA}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setFICHA(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="PO_NUMBER">PO_NUMBER</label>
            <input
              type="text"
              id="PO_NUMBER"
              value={PO_NUMBER}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPO_NUMBER(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="PO_ITEM">PO_ITEM</label>
            <input
              type="text"
              id="PO_ITEM"
              value={PO_ITEM}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPO_ITEM(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="POST_511">POST_511</label>
            <input
              type="text"
              id="POST_511"
              value={POST_511}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPOST_511(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="ROTOGAGE_MISTER">ROTOGAGE_MISTER</label>
            <input
              type="text"
              id="ROTOGAGE_MISTER"
              value={ROTOGAGE_MISTER}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setROTOGAGE_MISTER(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="ROTOGAGE_RECIBIDO">ROTOGAGE_RECIBIDO</label>
            <input
              type="text"
              id="ROTOGAGE_RECIBIDO"
              value={ROTOGAGE_RECIBIDO}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setROTOGAGE_RECIBIDO(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              onClick={handleCreateMovement}
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Movement;
