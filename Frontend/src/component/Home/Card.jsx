/* eslint-disable react/prop-types */
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ add, adding, data }) => {
  const [tasks, setTasks] = useState(data);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
  };

  const changeComplete = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/update-complete-task/${id}`,
        {},
        { headers }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, complete: !task.complete } : task
        )
      );
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Error updating task");
      console.log(error);
    }
  };

  const changeFavourite = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/update-imp-task/${id}`,
        {},
        { headers }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, important: !task.important } : task
        )
      );
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Error updating task");
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/delete-task/${id}`, {
        headers,
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Error deleting task");
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {tasks.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-lg shadow-sm shadow-white bg-lightBlack flex flex-col justify-between hover:scale-105 transition-all ease-in-out"
        >
          <div>
            <h3 className="text-2xl font-bold">{item?.title ?? "No Title"}</h3>
            <h4 className="my-2 text-lg text-white">
              {item?.desc ?? "No Description"}
            </h4>
          </div>
          <div className="mt-3 flex items-center">
            <button
              className={`py-2 px-4 w-3/6 ${
                item.complete === false
                  ? "bg-newRed hover:bg-red-800"
                  : "bg-newGreen hover:bg-green-700"
              } rounded-lg transition-all ease-in-out text-lg font-semibold shadow shadow-slate-50`}
              onClick={() => changeComplete(item._id)}
            >
              {item.complete === true ? "Completed" : "Incomplete"}
            </button>
            <div className="w-3/6 flex justify-around">
              <button
                className="hover:text-red-500"
                title="Favourite"
                onClick={() => changeFavourite(item._id)}
              >
                {item.important === false ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteIcon className="text-red-500" />
                )}
              </button>
              <button className="hover:text-red-500" title="Edit">
                <EditNoteIcon />
              </button>
              <button
                className="hover:text-red-500"
                title="Delete"
                onClick={() => deleteTask(item._id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      ))}
      {add === "true" && (
        <button
          title="Add New Task"
          className="p-4 rounded-lg bg-lightBlack flex flex-col items-center justify-center font-bold text-2xl gap-2 cursor-pointer hover:text-gray-500 hover:scale-105 transition-all ease-in-out duration-200"
          onClick={() => {
            adding("fixed");
          }}
        >
          <AddIcon fontSize="large" />
          Add Task
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default Card;
