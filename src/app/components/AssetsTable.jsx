import React, { useState, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";
import { DownloadTableExcel } from "react-export-table-to-excel";
import exportToExcel from "../api/exportToExcel";

const AssetsTable = ({ onPageChange, playersData, paginationInfo }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState("");
  const tableRef = useRef(null); // Ref for table export

  const handleChange = (event, page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const inputHandler = (event) => {
    setInputText(event.target.value);
    setCurrentPage(1);
  };

  const exportAllPlayers = () => {
    const filename = "all_players.xlsx"; // Nom du fichier Excel à exporter
    const sheet = "all_players"; // Nom de la feuille Excel
  
    // Créer une copie des données des joueurs pour l'exportation
    const dataToExport = playersData.map(({ firstName, lastName, email, phoneNumber,region }) => ({
      "Participant Name": `${firstName} ${lastName}`,
      "Participant email": email,
      "phoneNumber": phoneNumber,
      "region": region,
    }));
  
    // Logique d'exportation vers Excel
    exportToExcel(dataToExport, filename, sheet);
  };

  const filteredData = playersData.filter((el) => {
    if (inputText === "") {
      return true;
    } else {
      return (
        el.firstName.toLowerCase() +
        " " +
        el.lastName.toLowerCase()
      ).includes(inputText.toLowerCase());
    }
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredData.length
  );
  const dataPerPage = filteredData.slice(startIndex, endIndex);

  return (
    <>
      

      <button onClick={exportAllPlayers} className="w-28 m-auto rounded-xl bg-[#2B77BB] text-white p-2">Export All Players</button>

     <div className="w-full flex items-center justify-end">
     <div >   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  " onChange={inputHandler} />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    </div>
     </div>

      <div className="flex flex-col">
        <div className="w-full overflow-x-scroll lg:overflow-x-hidden">
          <table
            className="w-full mt-6 text-sm text-left text-[#2B77BB]"
            ref={tableRef}
          >
            <thead className="w-full text-base text-[#2E75B5] font-extrabold bg-transparent">
              <tr className="w-full">
           
                <th
                  scope="col"
                  className="md:px-6 px-2 py-2 md:py-3 text-xs md:text-xl "
                >
                  <span className="text-xs md:text-xl">
                    Participant Name
                  </span>
                </th>
                <th
                  scope="col"
                  className="md:px-6 px-2 py-2 md:py-3 text-xs md:text-xl "
                >
                  <span className="text-xs md:text-xl">
                    Participant email
                  </span>
                </th>
                <th
                  scope="col"
                  className="md:px-6 px-2 py-2 md:py-3 text-xs md:text-xl "
                >
                  <span className="text-xs md:text-xl">phoneNumber</span>
                </th>
                <th
                  scope="col"
                  className="md:px-6 px-2 py-2 md:py-3 text-xs md:text-xl "
                >
                  <span className="text-xs md:text-xl">region</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPerPage.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
              
                  <td className="px-6 py-4">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phoneNumber}</td>
                  <td className="px-6 py-4">{item.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="flex justify-end pt-4" aria-label="Table navigation">
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
              />
            </li>
            <li>
            
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AssetsTable;
