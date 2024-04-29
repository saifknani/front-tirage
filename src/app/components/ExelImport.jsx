import React, { useState } from "react";
import axios from "axios";

function ExelImport() {
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("excelFile", selectedFile);
      const response = await axios.post(
        "http://localhost:3002/api/player/importExcel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOriginalData(response.data.players);
      setExcelData(response.data.players);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setTimeout(() => setLoading(false), 2000);
  };

  const handleReset = () => {
    setExcelData(originalData);
  };

  return (
    <div>
      
      <input
        type="file"
        className="w-full rounded-xl bg-[#ffffff] text-Noir p-1"
        onChange={handleFileChange}
      />
      {loading && (
        <div
          className="  m-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2B77BB] border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
         
        </div>
      )}
    </div>
  );
}

export default ExelImport;
