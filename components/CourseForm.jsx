import Link from 'next/link';
import { LucidePlus, LucideMinus } from 'lucide-react';

const CourseForm = ({ type, course, setCourse, submitting, handleSubmit }) => {
    console.log(course);
    return (
        <section className='w-full max-w-full flex-start flex-col mb-16'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{type} Course</span>
            </h1>

            <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Name
                    </span>

                    <input value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} placeholder='COMP0001' required className='form_input' type='text' />
                </label>

                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Credits
                    </span>

                    <input value={course.credits} onChange={(e) => setCourse({ ...course, credits: e.target.value })} placeholder='4' required className='form_input' type='number' min='0' />
                </label>

                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Professor Name
                    </span>

                    <input value={course.professor} onChange={(e) => setCourse({ ...course, professor: e.target.value })} placeholder='Mr. John Doe' className='form_input' type='text' />
                </label>

                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Status
                    </span>
                    <br />
                    <select value={course.status} onChange={(e) => setCourse({ ...course, status: e.target.value })} required className='form_select' >
                        <option value='not_started'>Not Started</option>
                        <option value='in_progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                    </select>
                </label>

                <label>
                    <div className='flex justify-between'>
                        <span className='font-semibold text-base text-gray-700'>
                            Grading Breakdown
                        </span>

                        <button
                            type='button'
                            onClick={() => {
                                if (course.breakdown.length < 10) {
                                    setCourse({ ...course, breakdown: [...course.breakdown, { type: '', percentage: 0 }] });
                                }
                            }}
                            className='px-3 py-1 text-sm bg-black rounded-full text-white'
                        >
                            <LucidePlus size={16} color="#ffffff" />
                        </button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {course.breakdown.map((breakdown, index) => (
                            <div key={index} className='flex gap-2 items-center'>
                                <input value={breakdown.type} onChange={(e) => {
                                    const breakdowns = [...course.breakdown];
                                    breakdowns[index].type = e.target.value;
                                    setCourse({ ...course, breakdown: breakdowns });
                                }} placeholder='Assignment' required className='form_input' type='text' />

                                <input value={breakdown.percentage} onChange={(e) => {
                                    const breakdowns = [...course.breakdown];
                                    breakdowns[index].percentage = e.target.value;
                                    setCourse({ ...course, breakdown: breakdowns });
                                }} placeholder='50' required className='form_input' type='number' min='0' max='100' />

                                <div>
                                    <button type='button' onClick={() => {
                                        const breakdowns = [...course.breakdown];
                                        breakdowns.splice(index, 1);
                                        setCourse({ ...course, breakdown: breakdowns });
                                    }} className='px-3 py-1 text-sm bg-red-600 rounded-full text-white'>
                                        <LucideMinus size={16} color="#ffffff" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </label>

                <label>
                    <span className='font-semibold text-base text-gray-700'>
                        Description
                    </span>

                    <textarea value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} placeholder='Enter description here...' required className='form_textarea' maxLength={300} />
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

export default CourseForm;