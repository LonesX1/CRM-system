const getTotalPage = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export default getTotalPage;