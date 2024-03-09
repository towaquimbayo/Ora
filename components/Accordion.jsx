"use client"
import {ChevronDown, ChevronRight, LucidePlus, Pencil} from "lucide-react";
import Task from "@/components/Task";
import {useState} from "react";

const Accordion = ({title, content}) => {
    const [isActive, setIsActive] = useState(false);

    return (<div style={{maxWidth: '800px', minWidth: '800px'}}>
        <div
            onClick={() => setIsActive(!isActive)}
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: '5px',
                borderBottom: '1px solid #ccc',
                alignContent: "center"
            }}
        >

            <div style={{color: 'grey', display: "flex", justifyContent: "center", alignItems: "center"}}>

                <div>
                    {isActive ? <ChevronDown size={10}/> : <ChevronRight size={10}/>}
                </div>
                <div>
                    {title}
                </div>
            </div>
            <div
                style={{
                    display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
                }}
            >
                <div>
                    <button
                        type='button'
                        onClick={() => {}}
                        className='px-3 py-1 text-sm bg-black rounded-full text-white'
                    >
                        <LucidePlus size={16} color="#ffffff"/>
                    </button>

                </div>
            </div>

        </div>
        {isActive && (<div className="accordion-content" style={{maxHeight: '200px', overflowY: 'auto'}}>
            {content.map((task, index) => (<Task key={index} name={task.name} type={task.type} dueDate={task.dueDate}
                                                 state={task.state}/>))}
        </div>)}
    </div>);
};

export default Accordion