const Person = (props) => {
    return (
       <div>
        <h2>{props.name}</h2>
       <h3>{props.age}</h3>
       </div>
    );
};

export default Person;