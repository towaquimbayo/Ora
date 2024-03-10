import { formatDate } from "@/utils/helpers";
import { Circle, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskCard({ task, setTasks, setTasksUpdated }) {
  const router = useRouter();

  const [taskChecked, setTaskChecked] = useState(task.status === "completed");

  function toggleTaskCheck() {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const index = updatedTasks.findIndex((t) => t._id === task._id);
      updatedTasks[index].status = taskChecked ? "in_progress" : "completed";
      return updatedTasks;
    });
    setTaskChecked((prevTaskChecked) => !prevTaskChecked);
  }

  useEffect(() => {
    setTaskChecked(task.status === "completed");
  }, [task.status]);

  return (
    <div
      className="flex border rounded-lg p-4 transition duration-300 ease-in-out cursor-pointer w-full glassmorphism"
      onClick={() => {
        toggleTaskCheck();
        setTaskChecked((prevTaskChecked) => !prevTaskChecked);
        setTasksUpdated(true);
      }}
    >
      {taskChecked ? (
        <div className="flex justify-between items-center">
          <CircleCheck size={24} color="#43b65c" />
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <Circle size={24} color="#858585" />
        </div>
      )}
      <div className="flex-col w-full pl-4">
        <div className="flex justify-between">
          <h2 className="text-md font-semibold mb-2 overflow-hidden truncate sm:text-lg">
            {task.name}
          </h2>
          <button
            className="bg-transparent border border-[#3573e7] text-[#3573e7] rounded-md min-w-16 px-2 py-0.5 text-sm hover:bg-[#3573e7] hover:text-white transition duration-300 ease-in-out"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/edit-task?id=${task._id}`);
            }}
          >
            View
          </button>
        </div>
        <p className="text-sm font-light">
          Due date: {formatDate(task.dueDate)}
        </p>
      </div>
    </div>
  );
}
