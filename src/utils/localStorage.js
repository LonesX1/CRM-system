
export const toLocalStorage = (name, defaultMetric,itemPerPage, sortingName, sortingValue, checkedField, fields) => {
    localStorage.setItem(`configuratorSetting${name.toLowerCase()}`, JSON.stringify({
        defaultMetric: defaultMetric,
        itemPerPage: itemPerPage,
        sortingName: sortingName,
        sortingValue: sortingValue,
        checkedField: checkedField,
        fields: fields,
    }));
};

export const loadSettingsFromLocalStorage = (name) => {
    const storedSettings = JSON.parse(localStorage.getItem(`configuratorSetting${name}`));

    if (storedSettings) {
        return storedSettings;
    };
};