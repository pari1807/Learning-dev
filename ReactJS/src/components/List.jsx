// const List =() => {
//     //const myList = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
//     const userInfo = [
//         {
//             username : "Paritosh",
//             Location: "India",
//             email: "paritoshrahul7@gmail.com",
//         },
//         {
//             username: "John",
//             Location: "USA",
//             email: "john@gmail.com",
//         },
//         {
//             username: "Alex",
//             Location: "UK",
//             email: "alex@gmail.com",
//         },
//         {
//             username: "Jordan",
//             Location: "Canada",
//             email: "jordan@gmail.com"
//         }
//     ]
//     return (
//         // <main>
//         //      {myList.map((item) => (
//         //         <ul key={item}>
//         //             <li>{item}</li>
//         //         </ul>
//         //     ))}; 
//         // </main>

//         <main>
//             { userInfo.map((user) => (
//                 <ul key={Math.random()}>
//                     <li>{user.username}</li>
//                     <li>{user.Location}</li>
//                     <li>{user.email}</li>
//                 </ul>
//             ))}
//         </main>
//     );
// }

// export default List;

const List = () => {
    const users = [
        {id: 1,name: "Paritosh", age: 21, Location : "India", email : "xyz@gmail.com"},
        {id: 2,name: "John", age: 22, Location : "USA", email : "abc@gmail.com"},
        {id: 3,name: "Alex", age: 23, Location : "UK", email : "def@gmail.com"},
        {id: 4,name: "Jordan", age: 24, Location : "Canada", email : "ghi@gmail.com"}
    ]

    return (
        <main>
            {users.map((user)=>(
                <ul key = {Math.random()}>
                    <li>ID: {user.id}</li>
                    <li>Name: {user.name}</li>
                    <li>Age: {user.age}</li>
                    <li>Location: {user.Location}</li>
                    <li>Email: {user.email}</li>
                </ul>
            ))}
        </main>
    );
};

export default List;