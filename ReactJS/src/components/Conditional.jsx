// const ValidPassword = () => <h1>valid Password</h1>
// const InValidPassword = () => <h1>Invalid Password</h1>


// const Password = ({isValid}) => {
//     if(isValid){
//         return <ValidPassword />
//     }
//     return <InValidPassword />
// };

// const Conditional = () => {
//     return(
//         <section>
//             <Password isValid={true} />
//         </section>
//     );
// };

// export default Conditional;


const Cart =()=> {
    const items = ['apple', 'banana', 'orange'];

    return (
        <div>
            <h1>Cart 🛒</h1>
            {items.length > 0 && <h2>You have {items.length} items in your cart</h2>}
        </div>
    );
};

const Conditional = () => {
    return(
        <Cart/>
    )
};

export default Conditional;