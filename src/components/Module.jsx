import React, { useEffect, useMemo, useState } from 'react';
import Header from './Header';
import MainScreen from './MainScreen';
import Footer from './Footer'
import PostService from '../API/PostService';
import getTotalPage from '../utils/pages';
import ErrorLoading from './error_on_loading/ErrorLoading';
import { useSelector, useDispatch } from 'react-redux';
import { addSetting } from '../features/settingFromLocalStorage';
import { loadSettingsFromLocalStorage } from '../utils/localStorage';
import { compareDate, sortUsers } from '../utils/sort';
import { createPagination } from '../utils/createArrayForPagination';
import defaultConfig from '../config/defaultConfig.json';

const Module = ({name}) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [defaultMetric, setDefaultMetric] = useState('Fields');
    const [fromDate, setFromDate] = useState('2022-01-01');
    const [toDate, setToDate] = useState('2022-12-12');
    const [totalPageDate, setTotalPageDate] = useState(false);
    const [sortedUsersByDate, setSortedUsersByDate] = useState('');
    const [dataLoading, setDataLoading] = useState('true');
    const setting = useSelector(state => state.setting.value);
    const dispatch = useDispatch();

    const lastIndexUser = page * limit;
    const firstIndexUser = lastIndexUser - limit;
    const currentSortedUsersByDate = createPagination(sortedUsersByDate, firstIndexUser, lastIndexUser);

    const softSearch = () => {
        if (searchQuery) {
            const newUsers = [...users].filter(item => {
                const stringifiedItem = JSON.stringify(item);
                return stringifiedItem.toLowerCase().includes(searchQuery);
            });

            setTotalPage(getTotalPage(newUsers.length, limit));

            return createPagination(newUsers, firstIndexUser, lastIndexUser); 
        };

        setTotalPage(getTotalPage(users.length, limit));
        
        return createPagination(users, firstIndexUser, lastIndexUser);
    };

    const searchedUserMemo = useMemo(() => {
        return softSearch();
    }, [searchQuery, users]);

    useEffect(() => {
        const res = loadSettingsFromLocalStorage(name);

        if (res) {
            dispatch(addSetting(res));
        } else if (defaultConfig[name]) {
            console.log(defaultConfig[name])
            dispatch(addSetting(defaultConfig[name]));
        }
    }, []);

    const handleChange = (e) => {
        setLimit(e.target.value);
    };

    const fetchPost = async() => {
        const res = await PostService.getAll(name);
       
        if (!res) {
            setDataLoading(res);
        } else {
            setUsers(sortUsers(res.data, setting.sortingName, setting.sortingValue));
            setTotalPage(getTotalPage(users.length, limit));
        };
    };

    const handleSortByDate = (e) => {
        e.preventDefault();
        setPage(1);
        setSortedUsersByDate(compareDate(users, fromDate, toDate));
    };

    useEffect(() => {
        setLimit(setting.itemPerPage);
    }, [setting]);

    useEffect(() => {
        fetchPost();
    }, [limit, page, setting]);

    useEffect(() => {
        setTotalPageDate(getTotalPage(sortedUsersByDate.length, limit));
    }, [sortedUsersByDate]);



    if (!dataLoading) {
        return <ErrorLoading />
    }

    return ( 
        <div className='module'>
            <Header 
                    setDefaultMetric={setDefaultMetric}
                    defaultMetric={defaultMetric}
                    handleSortByDate={handleSortByDate}
                    setSearchQuery={setSearchQuery} 
                    setPage={setPage}
                    setting={setting} 
                    toDate={toDate}
                    fromDate={fromDate}
                    setToDate={setToDate}
                    setFromDate={setFromDate}
                    name={name}>
            </Header>
            <MainScreen 
                    currentSortedUsers={currentSortedUsersByDate}
                    setting={setting}
                    defaultMetric={defaultMetric}
                    users={searchedUserMemo}>
            </MainScreen>
            <Footer 
                    totalPageDate={totalPageDate}
                    totalPage={totalPage} 
                    page={page} 
                    changePage={setPage} 
                    limit={limit} 
                    handleLimit={handleChange}>
            </Footer>
        </div>
     );
};
 
export default Module;