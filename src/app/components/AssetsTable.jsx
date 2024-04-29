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
    const dataToExport = playersData.map(({ firstName, lastName, email, phoneNumber }) => ({
      "Participant Name": `${firstName} ${lastName}`,
      "Participant email": email,
      "phoneNumber": phoneNumber
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

      <div style={{ textAlign: "right" }}>
  <li className="xn-search">
    <form role="form" style={{ display: "inline-block" }}>
      <span style={{ fontSize: "20px" }}>Recherche</span>
      <input
        onChange={inputHandler}
        type="text"
        name="search"
        placeholder="........."
        style={{ fontSize: "20px", marginLeft: "5px" }}
      />
      
    </form>
  </li>
</div>

      <div className="flex flex-col">
        <div className="w-full overflow-x-scroll lg:overflow-x-hidden">
          <table
            className="w-full mt-6 text-sm text-left text-[#2B77BB]"
            ref={tableRef}
          >
            <thead className="w-full text-base text-[#2E75B5] font-extrabold bg-transparent">
              <tr className="w-full">
                <th scope="col" className="md:px-6 px-2 py-2 md:py-3"></th>
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
              </tr>
            </thead>
            <tbody>
              {dataPerPage.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-[#2B77BB] whitespace-nowrap "
                  >
                    {index}
                  </th>
                  <td className="px-6 py-4">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phoneNumber}</td>
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
