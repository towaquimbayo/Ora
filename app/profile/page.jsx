"use client"
import React, {useState} from 'react';
import {Pencil, ChevronDown, ChevronRight} from "lucide-react";
import Accordion from "@/components/Accordion";


const Profile = () => {
    const accordionData = [{
        title: 'Comp 3981', content: [{
            name: 'Complete React Assignment', type: 'Assignment', dueDate: '2024-03-15', state: 'In Progress'
        }, {name: 'Take Quiz 2', type: 'Quiz', dueDate: '2024-03-10', state: 'Done'}, {
            name: 'Submit Project Proposal', type: 'Project', dueDate: '2024-03-20', state: 'Pending'
        },],
    }, {
        title: 'Comp 999', content: [{
            name: 'Complete React Assignment', type: 'Assignment', dueDate: '2024-03-15', state: 'In Progress'
        }, {name: 'Take Quiz 2', type: 'Quiz', dueDate: '2024-03-10', state: 'Done'}, {
            name: 'Submit Project Proposal', type: 'Project', dueDate: '2024-03-20', state: 'Pending'
        }, {
            name: 'Submit Project Proposal', type: 'Project', dueDate: '2024-03-20', state: 'Pending'
        }, {name: 'Submit Project Proposal', type: 'Project', dueDate: '2024-03-20', state: 'Pending'},],
    }, {
        title: 'Comp chillinh', content: [{
            name: 'Complete React Assignment', type: 'Assignment', dueDate: '2024-03-15', state: 'In Progress'
        }, {name: 'Take Quiz 2', type: 'Quiz', dueDate: '2024-03-10', state: 'Done'}, {
            name: 'Submit Project Proposal', type: 'Project', dueDate: '2024-03-20', state: 'Pending'
        },],
    },];

    return (<div style={{margin: '20px'}}>
        <h1 style={{textAlign: 'center'}}>React Accordion Demo</h1>
        <div className="accordion">
            {accordionData.map(({title, content}, index) => (<Accordion key={index} title={title} content={content}/>))}
        </div>
    </div>);
};

export default Profile;
