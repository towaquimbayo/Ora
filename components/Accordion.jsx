import {ChevronDown, ChevronRight, CircleEllipsis, Pencil} from "lucide-react";
import Task from "@/components/Task";
import {useState} from "react";
import {useRouter} from "next/navigation"; // Use useRouter from "next/router" instead of "next/navigation"

const Accordion = ({title, content}) => {
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();


    return (
        <div className="flex flex-col w-full">
            {/* Clicking on this div toggles the accordion */}
            <div
                onClick={() => setIsActive(!isActive)}
                className="flex justify-between cursor-pointer p-1 items-center"
            >
                <span className="flex items-center gap-2 my-4">
                    {isActive ? <ChevronDown size={20} color="#858585"/> : <ChevronRight size={20} color="#858585"/>}
                    <p className="text-[#858585]">{title}</p>
                    <span
                        className="bg-gray-200 px-1 py-0.5 rounded ml-2 text-center text-xs flex flex-row justify-center">
                            {content.length}
                        </span>
                </span>
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
                        <Pencil size={13} color="#ffffff"/>
                    </button>
                </div>
            </div>
            {/* Render tasks if the accordion is active */}
            {isActive && (
                <div className="max-h-60 overflow-y-auto">
                    {content.map(({id, title, dueDate, type, status, course}) => (
                        <Task key={id} name={title} type={type} dueDate={dueDate} state={status}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Accordion;
