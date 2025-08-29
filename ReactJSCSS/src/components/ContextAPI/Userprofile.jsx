import {useContext} from 'react';
import { UserContext } from './UserContext';

import React from 'react'

const Userprofile = () => {
    
    const {user} = useContext(UserContext);

  return (
    <div>
        <h1>
            User profile:  {user.name}
        </h1>
    </div>
  );
}

export default Userprofile;