import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";
import Spinner from "./Spinner";
import TaskList from "./TaskList";

export default function TaskListView({ tasks, setTasks }) {
  const router = useRouter();

  const [tasksUpdated, setTasksUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const inProgressTasks = tasks.filter((task) => task.status === "in_progress") || [];
  const completedTasks = tasks.filter((task) => task.status === "completed") || [];

  async function saveChanges() {
    setLoading(true);
    tasks.forEach(async (task) => {
      try {
        await fetch(`/api/task/${task._id}`, {
          method: "PATCH",
          body: JSON.stringify({
            course: task.course,
            name: task.name,
            description: task.description,
            type: task.type,
            status: task.status,
            dueDate: task.dueDate,
            file: task.file,
          })
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setTasksUpdated(true);
      }
    });
  }

  return (
    <div className="w-full flex flex-col-reverse justify-center gap-8 mb-4 lg:flex-row">
      <div className="w-full flex flex-col lg:w-2/3">
        <TaskList
          inProgressTasks={inProgressTasks}
          completedTasks={completedTasks}
          setTasks={setTasks}
          setTasksUpdated={setTasksUpdated}
        />
      </div>
      <div className="w-full flex flex-col lg:w-1/3 mt-0 lg:mt-14">
        <div className="flex flex-col rounded-lg border px-6 py-4 gap-4 w-full glassmorphism">
          <h1 className="text-2xl font-bold">Weekly Progress</h1>
          <div className="flex justify-between gap-4 mb-2">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-[#9c9c9c]">Total Tasks</p>
              <h2 className="text-3xl font-bold">{tasks.length}</h2>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-[#9c9c9c]">
                Completed Tasks
              </p>
              <h2 className="text-3xl font-bold">{completedTasks.length}</h2>
            </div>
          </div>
          <ProgressBar
            progressNum={(completedTasks.length / tasks.length) * 100}
          />
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              className="max-w-full text-sm bg-[#3573e7] text-white rounded-md px-4 py-2.5 mt-4 hover:opacity-80 transition duration-300 ease-in-out sm:max-w-fit"
              onClick={() => router.push("/create-task")}
            >
              Add Task
            </button>
            <button
              className={`max-w-full text-sm bg-white text-[#3573e7] border rounded-md px-4 py-2.5 hover:bg-[#3573e7] hover:text-white transition duration-300 ease-in-out sm:max-w-fit sm:mt-4 ${
                tasksUpdated
                  ? ""
                  : "bg-[#d3d3d3] text-[#858585] cursor-not-allowed"
              }`}
              onClick={saveChanges}
              disabled={!tasksUpdated}
            >
              {loading ? <Spinner /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
