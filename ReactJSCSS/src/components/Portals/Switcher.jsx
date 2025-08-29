import {useState} from 'react';

const Switcher = () => {
    const[sw, setSw] = useState(false);

    return (
        <div>
            {sw ? <span>Dark</span> : <span>Light</span>};
            <br />
            <input type="text"  />
            <button onClick={(s) =>setSw(!s)}>Switch</button>
        </div>
    );
};
export default Switcher;