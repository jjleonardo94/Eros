import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Moment from "react-moment";
import moment from "moment";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { useDownloadExcel } from "react-export-table-to-excel";
// import ReactHTMLTableToExcel from "react-html-table-to-excel"

const { RangePicker } = DatePicker;

const dateFormat = "MM/DD/YY";

const Report = () => {
  const [movements, setMovements] = useState([]);
  const tableRef = useRef(null);

  // Define the start and end dates for the range
  const [fromDate, setFromDate] = useState(
    moment()
      .zone(0)
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toISOString()
  );
  const [endDate, setEndDate] = useState(
    moment()
      .zone(0)
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toISOString()
  );

  //generate the Excel file
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Reporte de Movimiento",
    sheet: "Reporte de Movimiento",
  });

  useEffect(() => {
    // console.log(fromDate);
    // console.log(endDate);
    getMovements(fromDate, endDate);
  }, [fromDate, endDate]);

  const getMovements = async (fromDate, endDate) => {
    try {
      const { data, error } = await supabase
        .from("movements")
        .select("*")
        .gte("DATE", fromDate)
        .lte("DATE", endDate)
        .limit(15);

      if (error) throw error;
      if (data != null) {
        setMovements(data);
      }
      //console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDatePickerChange = (date, dateString) => {
    setFromDate(
      moment(new Date(dateString[0]))
        .zone(0)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0)
        .toISOString()
    );

    setEndDate(
      moment(new Date(dateString[1]))
        .zone(0)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0)
        .toISOString()
    );
  };

  // Create an empty array of length 15
  const emptyRows = new Array(9 + movements.length).fill("");

  return (
    <div className="flex flex-col ">
      <div className="">
        <Space direction="vertical" size={12} className="pb-1">
          <RangePicker
            defaultValue={[dayjs(new Date()), dayjs(new Date())]}
            format={dateFormat}
            rangePlaceholder={["fecha de inicio", "fecha final"]}
            onChange={(date, dateString) =>
              handleDatePickerChange(date, dateString)
            }
          />
        </Space>
        {/* Download to Excel Button */}
        <button
          className="focus:outline-none float-right h-8 ml-8 justify-between text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  text-sm  mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={onDownload}
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Descargar a Excel</span>
        </button>
      </div>
      <div className="overflow-x-auto rounded border h-96">
        <div className=" rounded-lg  h-85">
          <table className="table-auto overflow-x-scroll w-full" ref={tableRef}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  DATE
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  BWART
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  HEADER_TEXT
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  FROM_PLANT
                </th>

                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  TO_PLANT
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  FROM_LGORT
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  TO_LGORT
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  MATERIAL_CODE
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  QUANTITY
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  BATCH
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  MISTER
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  CHOFER
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  FICHA
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  PO_NUMBER
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  PO_ITEM
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  POST_511
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  ROTOGAGE_MISTER
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-xs font-bold text-left border border-b text-gray-500 uppercase"
                >
                  ROTOGAGE_RECIBIDO
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {movements.map((movement, id) => (
                <tr key={id}>
                  <td className="px-6 py-2 text-sm font-medium border border-b text-gray-800 whitespace-nowrap">
                    {movement.id}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    <Moment format="MM-DD-YYYY">{movement.DATE}</Moment>
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.HEADER_TEXT}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.FROM_PLANT}
                  </td>

                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.TO_PLANT}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.FROM_LGORT}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.TO_LGORT}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.MATERIAL_CODE}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.QUANTITY}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.BATCH}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.MISTER}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.CHOFER}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.FICHA}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.PO_NUMBER}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.PO_ITEM}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.POST_511}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.ROTOGAGE_MISTER}
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    {movement.ROTOGAGE_RECIBIDO}
                  </td>
                </tr>
              ))}
              {/* Map over the emptyRows array and render empty table rows */}
              {emptyRows.map((row, id) => (
                <tr key={id}>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
                  <td className="px-6 py-2 text-sm border border-b text-gray-800 whitespace-nowrap">
                    &nbsp;
                  </td>
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
  );
};

export default Report;
