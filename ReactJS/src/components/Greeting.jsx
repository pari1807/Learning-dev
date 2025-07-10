const Greeting = () => {
    const greet = "Hello Paritosh";
    const date  = new Date();

    return (
        <section>
            <h1>{greet}</h1>
            <p>Current Date and Time: {date.toLocaleString()}</p>
            <p>Current Year: {date.getFullYear()}</p>
            <p>Current Month: {date.getMonth() + 1}</p>
            <p>Current Day: {date.getDate()}</p>
            <p>Current Time: {date.toLocaleTimeString()}</p>
        </section>
    );
}

export default Greeting;