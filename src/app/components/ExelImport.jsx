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
      
      
<div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
    </label>
</div> 

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
