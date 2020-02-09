function getYearData(state = [], action) {
    if ('getYearData' == action.type) {
        let responseData = action.data;
        let data = Object.keys(responseData).reduce((accu, item) => {
            let monthData = responseData[item];
            let days = Object.keys(responseData[item]).reduce((dayAccu, eachDay) => {
                dayAccu[eachDay] = monthData[eachDay];
                return dayAccu;
            }, []);
            accu[item] = days;
            return accu;
        }, [])
        console.log("getYearData -->", data)
        return data;
    }
    return state;
}

function getCurrentTimeRecord(state = {}, action) {
    if ('getCurrent' == action.type) {
        return { ...state, ...action.data }
    }
    return state;
}

export default {
    yearData: getYearData,
    currentData: getCurrentTimeRecord
}