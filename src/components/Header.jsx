import React, { useEffect, useState } from 'react';
import classes from './style_module/Header.module.css';
import { toLocalStorage, loadSettingsFromLocalStorage } from '../utils/localStorage';
import { addSetting } from '../features/settingFromLocalStorage';
import DragList from './dnd_components/DragList';
import { useDispatch } from 'react-redux';

const Header = ({name, setDefaultMetric, setPage, defaultMetric, setting, setSearchQuery, setFromDate, setToDate, toDate, fromDate, handleSortByDate}) => {
    const [itemPerPage, setItemPerPage] = useState(20);
    const [sortingName, setSortingName] = useState('Id');
    const [sortingValue, setSortingValue] = useState('ASC');
    const [ifOpen, setIfOpen] = useState(false);
    const [searchQueryHeader, setSearchQueryHeader] = useState('');
    const [openDataPicker, setOpenDataPicker] = useState(false);
    const [checkedField, setCheckedField] = useState('');
    const [fields, setFields] = useState([{id: 1, checked: true, name: "Name", disabled: true}, {id: 2, checked: false, name: "Surname"}, {id: 3, checked: false, name: "Field 1"}, {id: 4, checked: false, name: "Field 2"}, {id: 5, checked: false, name: "Field 3"}, {id: 6, checked: false, name: "Field 4"},  {id: 7, checked: false, name: "Field 5"},  {id: 8, checked: false, name: "Field 6"},  {id: 9, checked: false, name: "Field 7"},  {id: 10, checked: false, name: "Field 8"},  {id: 11, checked: false, name: "Field 9"},  {id: 12, checked: false, name: "Field 10"} ]);
    const dispatch = useDispatch();    

    
    useEffect(() => {
            setItemPerPage(setting.itemPerPage);
            setSortingName(setting.sortingName);
            setSortingValue(setting.sortingValue);
            setCheckedField(setting.checkedField);
            setFields(setting.fields);  
            setDefaultMetric(setting.defaultMetric);
    }, [setting]);
    
    const handleCheckboxChange = (event, elem) => {
        const isChecked = event.target.checked;
        const createdFields = {id: elem.id, checked: isChecked, name: elem.name};

        if (isChecked) {
            setCheckedField([...checkedField, createdFields]);
        } else {
            setCheckedField(checkedField.filter((item) => item.id !== elem.id));
        };

        setFields(fields.map(field => {
          if (field.id === elem.id) {

            return { ...field, checked: event.target.checked };
          };

          return field;
        }));
        
    };  

    const handleSubmit = (e) => {
        e.preventDefault();
        toLocalStorage(name, defaultMetric, itemPerPage, sortingName, sortingValue, checkedField, fields);
        dispatch(addSetting(loadSettingsFromLocalStorage(name)));
        setIfOpen(false);
    };

    const openConfigurator = () => {
        if (ifOpen) {
            setIfOpen(false);
        } else {
            setIfOpen(true);
        };
    };

    const handleSubmitSearchBox = (e) => {
        e.preventDefault();

        setSearchQueryHeader(e.target.value);
    }

    return ( 
        <div className={classes.header}>
            <div className={classes.search}>
                    <div className={classes.containerSearch}>
                        <button onClick={() => {setSearchQuery(searchQueryHeader); setPage(1)}}>
                            <ion-icon name="search" ></ion-icon>
                        </button>
                        <input placeholder='search' type="text" className={classes.searchQuery} onChange={(e) => handleSubmitSearchBox(e)} name='search' />
                    </div>
                    <div onClick={ () => setOpenDataPicker( openDataPicker ? false : true )} className={classes.dataPicker}>
                        <span>Date</span>
                    </div>
                    <form onSubmit={(e) => {handleSortByDate(e); setOpenDataPicker(false) }} className={openDataPicker ? classes.openDataPicker : classes.closedDataPicker}>
                        <div className={classes.changeData}>
                            from: 
                            <input 
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                type='date'
                            />
                        </div>
                        <div className={classes.changeData}>
                            to:
                            <input 
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                type='date' 
                            />
                        </div>
                        <div>
                            <button type='submit'>Filter</button>
                        </div>
                    </form>
            </div>
            {/* <span className={classes.name}>{name}</span> */}
            <div onClick={( ) => openConfigurator()} className={classes.configurator}>
                    <span>
                        <ion-icon name="cog"></ion-icon> 
                        Configurator
                    </span>
            </div>
            <form onSubmit={( e ) => handleSubmit(e) } className={ ifOpen ? classes.open_configurator: classes.closed_configurator }>
                
                    <div className={classes.headerConfigurator}>
                        Configurator
                        <div onClick={( ) => setIfOpen(false)} className={classes.close}>X</div> 
                    </div>
                    <div className={classes.itemPerPage}>
                        <span>Item per page</span>
                        <select value={itemPerPage} onChange={( e ) => setItemPerPage(e.target.value)}>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                        </select>
                    </div>
                    <div className={classes.sorting}>
                        <div className={classes.sortingValue}>
                            <span>Field name</span>
                            <select value={sortingName} onChange={( e ) => setSortingName(e.target.value)}>
                                <option value="Id">Id</option>
                                <option value="Name">Name</option>
                                <option value="Surnames">Surname</option>
                                <option value="Date">Date</option>
                            </select>
                        </div>
                        <div className={classes.sortingValue}>
                            <span>Sorting value</span>
                            <select value={sortingValue} onChange={( e ) => setSortingValue(e.target.value)}>
                                <option value="asc">ASC</option>
                                <option value="desc">DESC</option>
                            </select>   
                        </div>
                    </div>
                    {
                        checkedField ?                     
                        <DragList setDraggableItem={setCheckedField} draggableItem={checkedField}></DragList> :
                        <div className={classes.dragAndDropFields}>Empty</div>

                    }
                    <div className={classes.selectFields}>
                        {
                        fields.map( i => 
                                    <div key={i.id} className={classes.selectField}>
                                        <input checked={i.checked} disabled={i.disabled ? true : false} type="checkbox" onChange={( e ) => handleCheckboxChange(e, i)} />
                                        <span>{i.name}</span>
                                    </div> 
                                    )
                        }
                    </div>
                    <div className={classes.configuratorButton}>
                        <button onClick={( ) => setIfOpen(false)} type='reset'>Cancel</button>
                        <button type='submit'>Save</button>
                    </div>
            </form>

        </div>
     );
}
 
export default Header;