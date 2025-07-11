const ValidPassword = () => <h1>valid Password</h1>
const InValidPassword = () => <h1>Invalid Password</h1>


const Password = ({isValid}) => {
    if(isValid){
        return <ValidPassword />
    }
    return <InValidPassword />
};

const Conditional = () => {
    return(
        <section>
            <Password isValid={true} />
        </section>
    );
};

export default Conditional;
