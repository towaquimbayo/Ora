import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CldUploadWidget } from 'next-cloudinary';
import { LucidePlus } from 'lucide-react';

const TaskForm = ({ data, type, task, setTask, submitting, handleSubmit }) => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [breakdown, setBreakdown] = useState([]);

    useEffect(() => {
        const course = data.find((course) => course._id === task.course);
        setSelectedCourse(course);
        if (course) {
            setBreakdown(course.breakdown);
        }
    }, [task.course, data]);

    useEffect(() => {
        if (data.length === 1) {
            const course = data[0];
            if (task.course !== course._id) {
                setTask({ ...task, course: course._id });
                setSelectedCourse(course);
                setBreakdown(course.breakdown);
            }
        }
    }, [data, setTask, task]);

    useEffect(() => {
        if (breakdown.length === 1) {
          setTask((prevTask) => ({
            ...prevTask,
            type: breakdown[0]._id,
          }));
        }
      }, [breakdown, setTask]);

    const handleUploadSuccess = (result) => {
        console.log(result);
        setTask((prevTask) => ({
            ...prevTask,
            file: result.info.secure_url,
        }));
        console.log(task);
    };

    return (
        <section className='w-full max-w-full flex-start flex-col mb-16'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{type} Task</span>
            </h1>

            <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Course
                    </span>
                    <br />
                    <select value={task.course} onChange={(e) => {
                        setTask({ ...task, course: e.target.value });
                        const course = data.find((course) => course._id === e.target.value);
                        setSelectedCourse(course);
                        if (course) {
                            setBreakdown(course.breakdown);
                        }
                    }} required className='form_select' >
                        {data.map((course) => (
                            <option key={course._id} value={course._id}>{course.name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Name
                    </span>

                    <input value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })} placeholder='Assignment 1' required className='form_input' type='text' />
                </label>

                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Type
                    </span>
                    <br />
                    <select value={task.type?._id} onChange={(e) =>{
                        const selectedType = breakdown.find((type) => type._id === e.target.value);
                        setTask({ ...task, type: selectedType });
                    }} required className='form_select' >
                        {breakdown.map((type, index) => (
                            <option key={index} value={type._id}>{type.type}</option>
                        ))}
                    </select>
                </label>

                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Status
                    </span>
                    <br />
                    <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })} required className='form_select' >
                        <option value='in_progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                    </select>
                </label>

                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Due Date
                    </span>

                    <input value={task.dueDate} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} required className='form_input' type='date' />
                </label>

                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        File
                    </span>
                    <br />
                    <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                        onSuccess={handleUploadSuccess}
                        unsigned
                    >
                        {({ open }) => (
                            <button
                                type='button'
                                onClick={open}
                                className='form_input bg-white relative'
                            >
                                {task.file ? (
                                    <span className='truncate'>{task.file}</span>
                                ) : (
                                    <span>No file uploaded</span>
                                )}
                                <LucidePlus className='right-0 absolute mr-2' size={18} color='#888888' />
                            </button>
                        )}
                    </CldUploadWidget>
                </label>

                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Description
                    </span>

                    <textarea value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} placeholder='Enter description here...' required className='form_textarea' maxLength={300} />
                </label>

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href='/' className='text-gray-500 text-sm'>
                        Cancel
                    </Link>

                    <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-black rounded-full text-white'>{submitting ? `${type}ing...` : type}</button>
                </div>
            </form>
        </section>
    );
};

export default TaskForm;