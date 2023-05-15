
export const compareDate = (arr, startDate, endDate) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    
    const filteredUsers = arr.filter(obj => {
        const date = new Date(obj.date);
        return date >= newStartDate && date <= newEndDate;
    });

    return filteredUsers;
};

export const sortUsers = (users, sortingName, sortingValue) => {
    const sortedUsers = [...users];
  
    sortedUsers.sort((a, b) => {
      let comparison = 0;
      
      switch (sortingName) {
        case "Id":
          comparison = a.id - b.id;
          break;
        case "Name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "Surname":
          comparison = a.surname.localeCompare(b.surname);
          break;
        case "Date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        default:
          break;
      }
      
      return sortingValue === "desc" ? comparison * -1 : comparison;
    });
    
    return sortedUsers;
}