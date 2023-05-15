import React from 'react';
import Module from './Module';

const AppModule = () => {
    const url = window.location.href;
    const name = url.substring(url.lastIndexOf('/') + 1);

    return ( 
        <Module name={name} />
     );
}
 
export default AppModule;