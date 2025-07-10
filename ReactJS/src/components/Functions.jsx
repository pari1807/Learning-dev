const Functions = () => {
    const myName = "Paritosh";
    const multiply = (a,b) => a*b;

    return (
        <section>
            <p>2 + 2 = {2+2}</p>
            <h1>{myName}</h1>
            <p>My Friends List : {["Alex","John","Was","Jordan"]}</p>
            <p>2 * 2 = {multiply(2,2)}</p>
        </section>
    );
}

export default Functions;