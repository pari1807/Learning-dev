
const ConditionalGreeting = () => {
    if(timeOfDay === "morning") {
        return <h1>Good Morning!</h1>;
    } else if(timeOfDay === "afternoon") {
        return <h1>Good Afternoon!</h1>;
    } else if(timeOfDay === "evening") {
        return <h1>Good Evening!</h1>;
    }
};

export default ConditionalGreeting;