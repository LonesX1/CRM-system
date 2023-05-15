import React from 'react';
import classes from './style_module/MainScreen.module.css';
import UsersList from './UsersList';

const MainScreen = ({users, setting, currentSortedUsers}) => {

    return ( 
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.id}>Id</div>
                {
                    setting.checkedField.length ? setting.checkedField.map( i => <div className={classes.containerField} key={i.id}>{i.name}</div> ) : <span key={1}>Set any setting</span>
                }
            </div>
            <UsersList currentSortedUsers={currentSortedUsers} users={users} setting={setting}></UsersList>
        </div>
     );
}
 
export default MainScreen;