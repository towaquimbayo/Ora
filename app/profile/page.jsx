"use client"
import React, { useState } from 'react';

const Task = ({ name, type, dueDate, state }) => {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                margin: '10px',
                backgroundColor: '#f9f9f9',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h3>{name}</h3>
            <p>Type: {type}</p>
            <p>Due Date: {dueDate}</p>
            <p>State: {state}</p>
        </div>
    );
};

const Accordion = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div style={{maxWidth: '800px', minWidth: '800px'}}>
            <div
                onClick={() => setIsActive(!isActive)}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    padding: '5px',
                    borderBottom: '1px solid #ccc',
                }}
            >
                <div style={{color: 'grey'}}>{title}</div>
                <div style={{alignSelf: 'flex-end'}}>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && (
                <div className="accordion-content" style={{maxHeight: '200px', overflowY: 'auto'}}>
                    {content.map((task, index) => (
                        <Task key={index} name={task.name} type={task.type} dueDate={task.dueDate} state={task.state}/>
                    ))}
                </div>
            )}
        </div>
    );
};

const Profile = () => {
    const accordionData = [
        {
            title: 'Comp 3981',
            content: [
                {name: 'Complete React Assignment', type: 'Assignment', dueDate: '2024-03-15', state: 'In Progress'},
                {name: 'Take Quiz 2', type: 'Quiz', dueDate: '2024-03-10', state: 'Done'},
                {name: 'Submit Project Proposal', type: 'Project', dueDate: '2024-03-20', state: 'Pending'},
            ],
        },
        {
            title: 'Comp 999',
            content: [
                {name: 'Complete React Assignment', type: 'Assignment', dueDate: '2024-03-15', state: 'In Progress'},
                {name: 'Take Quiz 2', type: 'Quiz', dueDate: '2024-03-10', state: 'Done'},
                {name: 'Submit Project Proposal', type: 'Project', dueDate: '2024-03-20', state: 'Pending' },
                { name: 'Submit Project Proposal', type: 'Project', dueDate: '2024-03-20', state: 'Pending' },
                { name: 'Submit Project Proposal', type: 'Project', dueDate: '2024-03-20', state: 'Pending' },
            ],
        },
        {
            title: 'Comp chillinh',
            content: [
                { name: 'Complete React Assignment', type: 'Assignment', dueDate: '2024-03-15', state: 'In Progress' },
                { name: 'Take Quiz 2', type: 'Quiz', dueDate: '2024-03-10', state: 'Done' },
                { name: 'Submit Project Proposal', type: 'Project', dueDate: '2024-03-20', state: 'Pending' },
            ],
        },
    ];

    return (
        <div style={{ margin: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>React Accordion Demo</h1>
            <div className="accordion">
                {accordionData.map(({ title, content }, index) => (
                    <Accordion key={index} title={title} content={content} />
                ))}
            </div>
        </div>
    );
};

export default Profile;
