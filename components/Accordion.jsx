"use client"
import {ChevronDown, ChevronRight, LucidePlus, Pencil} from "lucide-react";
import Task from "@/components/Task";
import {useState} from "react";
import {useRouter} from "next/navigation";

const Accordion = ({title, content}) => {

    const [isActive, setIsActive] = useState(false);
    const router = useRouter();


    return (
        <div className="max-w-screen-md mx-auto">
            <div
                onClick={() => setIsActive(!isActive)}
                className="flex justify-between cursor-pointer p-2 border-b"
            >
                <div className="flex items-center">
                    {isActive ? <ChevronDown size={10}/> : <ChevronRight size={10}/>}
                    <div className="ml-2 flex flex-row justify-center">
                        {title}
                        <span
                            className="bg-gray-200 px-1 py-0.5 rounded ml-2 text-center text-xs flex flex-row justify-center"> {/* Apply styles here */}
                            {content.length}
                        </span>
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            router.push('/edit-course')

                        }}
                        className="px-3 py-1 text-sm bg-black rounded-full text-white"
                    >
                        <Pencil size={13} color="#ffffff"/>
                    </button>
                </div>
            </div>
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
