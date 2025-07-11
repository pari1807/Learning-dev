const List =() => {
    //const myList = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
    const userInfo = [
        {
            username : "Paritosh",
            Location: "India",
            email: "paritoshrahul7@gmail.com",
        },
        {
            username: "John",
            Location: "USA",
            email: "john@gmail.com",
        },
        {
            username: "Alex",
            Location: "UK",
            email: "alex@gmail.com",
        },
        {
            username: "Jordan",
            Location: "Canada",
            email: "jordan@gmail.com"
        }
    ]
    return (
        // <main>
        //      {myList.map((item) => (
        //         <ul key={item}>
        //             <li>{item}</li>
        //         </ul>
        //     ))}; 
        // </main>

        <main>
            { userInfo.map((user) => (
                <ul key={Math.random()}>
                    <li>{user.username}</li>
                    <li>{user.Location}</li>
                    <li>{user.email}</li>
                </ul>
            ))}
        </main>
    );
}

export default List;