import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/helpers";

export function TaskViewModal({ task, handleCloseModal }) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Want to View This Task?</h2>
        <p className="text-md mb-2">
          Task: <span className="font-semibold">{task.title}</span>
        </p>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-md">Due Date</p>
          <p className="text-md font-semibold">
            {formatDate(task.start.toLocaleDateString("en-CA"))}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="text-sm font-semibold text-blue-600"
            onClick={() => router.push(`./edit-task?id=${task.id}`)}
          >
            View Task
          </button>
          <button
            className="text-sm font-semibold text-red-600 ml-4"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
