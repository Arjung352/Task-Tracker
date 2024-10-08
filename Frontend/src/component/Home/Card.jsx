/* eslint-disable react/prop-types */
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Card = ({ add, adding, data, setUpdatedData }) => {
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
        `https://task-tracker-ipz8.onrender.com/api/update-complete-task/${id}`,
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
      console.error(error);
    }
  };

  const changeFavourite = async (id) => {
    try {
      await axios.put(
        `https://task-tracker-ipz8.onrender.com/api/update-imp-task/${id}`,
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
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://task-tracker-ipz8.onrender.com/api/delete-task/${id}`,
        {
          headers,
        }
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Error deleting task");
      console.error(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    adding("fixed");
    setUpdatedData({ id, title, desc });
  };

  return (
    <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
      {tasks.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-lg shadow-sm shadow-white bg-lightBlack flex flex-col justify-between hover:scale-105 transition-all ease-in-out"
        >
          <div>
            <h3 className="text-2xl font-bold max-sm:text-lg">
              {item?.title ?? "No Title"}
            </h3>
            <h4 className="my-2 text-lg text-white max-sm:text-base">
              {item?.desc ?? "No Description"}
            </h4>
          </div>
          <div className="mt-3 flex items-center max-xl:flex-col">
            <button
              className={`py-2 px-4 ${
                item.complete === false
                  ? "bg-newRed hover:bg-red-800"
                  : "bg-newGreen hover:bg-green-700"
              } rounded-lg transition-all ease-in-out max-xl:w-full text-lg font-semibold shadow text-center shadow-slate-50 max-sm:text-base max-sm:px-2 max-sm:py-1 max-sm:w-5/6`}
              onClick={() => changeComplete(item._id)}
            >
              {item.complete === true ? "Completed" : "Incomplete"}
            </button>
            <div className="w-3/6 flex justify-around max-xl:w-full max-xl:mt-2">
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
              {add === "true" && (
                <button
                  className="hover:text-red-500"
                  title="Edit"
                  onClick={() => handleUpdate(item._id, item.title, item.desc)}
                >
                  <EditNoteIcon />
                </button>
              )}
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
