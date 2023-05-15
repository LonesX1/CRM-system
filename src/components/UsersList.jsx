import React from 'react';
import classes from './style_module/MainScreen.module.css';

const UsersList = ({users, setting, currentSortedUsers}) => {
    const renderUser = (user) => {
          return (
            setting.checkedField.map((item) => {
                if (item.id === 1) {
                  return (
                    <div key={item.id} className={classes.containerField}>{user.surnames}</div>
                  );
                } else if (item.id === 2) {
                  return (
                    <div key={item.id} className={classes.containerField}>{user.name}</div>
                  );
                } else if (user.fields[item.id - 3]) {
                  return <div key={item.id} className={classes.containerField}>{user.fields[item.id - 3]}</div>;
                } else {
                  return null;
                }
              }).filter(Boolean)
          );
    }
    return ( 
            <ol className={classes.listUsers}>
                {
                    currentSortedUsers ? currentSortedUsers.map(i => 
                        <li className={classes.user} key={i.id}>
                            <div className={classes.id}>{i.id}</div>
                            {
                                setting.checkedField ? 
                                    renderUser(i)
                                : "Select any data"
                            } 
                        </li>
                    ) :
                    users.length !== 0 || users ? users.map(i => 
                        <li className={classes.user} key={i.id}>
                            <div className={classes.id}>{i.id}</div>
                            {
                                setting.checkedField ? 
                                    renderUser(i)
                                : "Select any data"
                            }
                        </li>
                    ) : '404 ERROR'
                }
            </ol>
     );
}
 
export default UsersList;