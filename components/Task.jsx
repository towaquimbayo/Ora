const Task = ({name, type, dueDate, state}) => {
    return (<div
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
    </div>);
};

export default Task