import {useEffect} from 'react';

const BasicEffect = () => {
    useEffect(()=>{
        console.log("Component Mounted");
    }, []);

    return(
        <div>
            <h1>Basic console mounted using use Effect</h1>
        </div>
    );
};

export default BasicEffect;