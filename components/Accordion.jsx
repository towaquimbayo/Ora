import { ChevronDown, ChevronRight, Pencil } from "lucide-react";
import Task from "@/components/Task";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use useRouter from "next/router" instead of "next/navigation"

const Accordion = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();

    return (
        <div className="max-w-screen-md mx-auto">
            {/* Clicking on this div toggles the accordion */}
            <div
                onClick={() => setIsActive(!isActive)}
                className="flex justify-between cursor-pointer p-2 border-b"
            >
                <div className="flex items-center">
                    {/* Conditional rendering of the chevron icon */}
                    {isActive ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                    <div className="ml-2 flex flex-row justify-center">
                        {/* Display the title of the accordion */}
                        {title}
                        {/* Display the number of tasks */}
                        <span className="bg-gray-200 px-1 py-0.5 rounded ml-2 text-center text-xs flex flex-row justify-center">
                            {content.length}
                        </span>
                    </div>
                </div>
                <div>
                    {/* Button to navigate to "/edit-course" */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push('/edit-course');
                        }}
                        className="px-3 py-1 text-sm bg-black rounded-full text-white"
                    >
                        <Pencil size={13} color="#ffffff" />
                    </button>
                </div>
            </div>
            {/* Render tasks if the accordion is active */}
            {isActive && (
                <div className="max-h-60 overflow-y-auto">
                    {content.map(({ id, title, dueDate, type, status, course }) => (
                        <Task key={id} name={title} type={type} dueDate={dueDate} state={status} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Accordion;
