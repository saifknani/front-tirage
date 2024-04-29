"use client";
import React, { useEffect, useState } from "react";
import AssetsTable from "../components/AssetsTable";
import CreateNftModal from "../components/CreateNftModal";
import { gettListPlayers } from "../api/player";
import ExelImport from "../components/ExelImport";
function Page() {
  const [openCreateNftModal, setOpenCreateNftModal] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await gettListPlayers(pagination);
        console.log(response);
        setPlayers(response.players);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchPlayers();
  }, [pagination]);

  const onPageChange = (page) => {
    setPagination({ ...pagination, page });
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:p-6 p-3 w-full h-full overflow-y-scroll">
        <button
          onClick={() => {
            setOpenCreateNftModal(true);
          }}
          className="w-28 m-auto rounded-xl bg-[#2B77BB] text-white p-2"
        >
          + add player{" "}
        </button>
        <ExelImport />
        <AssetsTable
          paginationInfo={pagination}
          onPageChange={onPageChange}
          playersData={players}
        />
      </div>
      <CreateNftModal
        open={openCreateNftModal}
        setOpen={setOpenCreateNftModal}
      />
    </>
  );
}

export default Page;
