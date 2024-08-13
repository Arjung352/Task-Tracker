import Cards from "../Home/Card";
import AddIcon from "@mui/icons-material/Add";
import InputData from "../Home/InputData";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function Alltasks() {
  const [add, adding] = useState("hidden");
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://https://task-tracker-ag.vercel.app/api/get-all-task",
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div>
        <div className="flex justify-end mb-4">
          <button title="Add New Task" onClick={() => adding("fixed")}>
            <AddIcon
              fontSize="large"
              className="hover:text-gray-500 transition-all ease-in-out duration-300"
            />
          </button>
        </div>
        {data && (
          <Cards
            add="true"
            adding={adding}
            data={data.task}
            setUpdatedData={setUpdatedData}
          />
        )}
      </div>
      <InputData
        add={add}
        adding={adding}
        refetch={fetchData}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </>
  );
}

export default Alltasks;
