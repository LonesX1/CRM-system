import React from 'react';
import classes from './style_module/Footer.module.css';

const Footer = ({totalPage, page, changePage, limit, handleLimit, totalPageDate}) => {
    const checkCurrentTotalPage = () => {
        if (totalPageDate) {
            return totalPageDate;
        };

        return totalPage;
    };

    return ( 
    <div className={classes.footer}>
            <select value={limit} onChange={handleLimit}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="35">35</option>
                <option value="40">40</option>
            </select>
            <div className={classes.paginationNr}>
                <button className={classes.btn} disabled={page === 1} onClick={() => 
                    changePage(page -= 1)
                }>{'<'}</button>
                <span className={classes.currentPage}>{page}</span>
                <button className={classes.btn} disabled={page === checkCurrentTotalPage()} onClick={ () =>
                    changePage(page += 1)
                }> {'>'} </button>
            </div>
    </div> 
    );
}
 
export default Footer;