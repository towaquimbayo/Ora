"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TaskList from "@/components/TaskList";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import Spinner from "@/components/Spinner";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [tasksUpdated, setTasksUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 0,
      name: "Assignment 2: Data Structures",
      dueDate: "2023-03-02",
      type: "assignment",
      status: "completed",
      course: "COMP 3760",
    },
    {
      id: 1,
      name: "Lab 3: SQL Queries",
      dueDate: "2023-03-26",
      type: "assignment",
      status: "in-progress",
      course: "COMP 4537",
    },
    {
      id: 2,
      name: "Assignment 4: Ethics Report",
      dueDate: "2023-04-01",
      type: "assignment",
      status: "in-progress",
      course: "LIBS 7102",
    },
    {
      id: 3,
      name: "Midterm Exam: Object-Oriented Programming",
      dueDate: "2023-04-06",
      type: "exam",
      status: "in-progress",
      course: "COMP 3522",
    },
    {
      id: 4,
      name: "Quiz 2: Operating Systems",
      dueDate: "2023-04-01",
      type: "quiz",
      status: "in-progress",
      course: "COMP 4736",
    },
  ]);
  const inProgressTasks =
    tasks.filter((task) => task.status === "in-progress") || [];
  const completedTasks =
    tasks.filter((task) => task.status === "completed") || [];

  async function saveChanges() {
    setLoading(true);
    const res = await fetch("/api/task/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.id, tasks }),
    });
    setLoading(false);
    if (res.ok) {
      alert("Task list updated!");
    } else {
      alert("Failed to update task list");
    }
  }

  if (!session && status === "unauthenticated") {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <h1 className="text-4xl font-bold mb-20">
          Please Sign in to Get Started!
        </h1>
        <Image
          src="./assets/images/student_studying.svg"
          alt="Sign in"
          width={600}
          height={600}
          layout="contain"
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center mb-20">
      <h1 className="text-4xl font-bold mb-8 lg:mb-4">My Tasks</h1>

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
          <div className="flex flex-col rounded-lg border px-6 py-4 gap-4 w-full">
            <h1 className="text-2xl font-bold">Weekly Progress</h1>
            <div className="flex justify-between gap-4 mb-2">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-[#9c9c9c]">
                  Total Tasks
                </p>
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
            <div className="flex gap-4">
              <button
                className="max-w-fit text-sm bg-[#3573e7] text-white rounded-md px-4 py-2.5 mt-4 hover:opacity-80 transition duration-300 ease-in-out"
                onClick={() => router.push("/create-task")}
              >
                Add Task
              </button>
              <button
                className={`max-w-fit text-sm bg-white text-[#3573e7] border rounded-md px-4 py-2.5 mt-4 hover:bg-[#3573e7] hover:text-white transition duration-300 ease-in-out ${
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
    </div>
  );
}
