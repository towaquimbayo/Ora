"use client";

import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/helpers";

const Task = ({ id, name, dueDate }) => {
  const router = useRouter();

  return (
    <div style={{ margin: "10px" }}>
      <div
        className="flex border rounded-lg p-4 bg-transparent  ease-in-out cursor-pointer w-full glassmorphism"
        onClick={() => {
          router.push(`/edit-task?id=${id}`);
        }}
      >
        <div className="flex-col w-full pl-4">
          <div className="flex justify-between">
            <h2 className="text-md font-semibold mb-2 overflow-hidden truncate sm:text-lg">
              {name}
            </h2>
          </div>
          <p className="text-sm font-light">Due date: {formatDate(dueDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default Task;
