import Card from "../Home/Card";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
function CompleteTask() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://task-tracker-ipz8.onrender.com/api/get-complete-task",
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>{loading ? <div>Loading...</div> : <Card add="false" data={data} />}</>
  );
}
export default CompleteTask;
