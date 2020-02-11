import React from 'react';
import moment from 'moment'

import DailyData from './DailyData';
import NetWorkingHours from './NetWorkingHours';
import MissingDate from './MissingDate';


let gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)'
}

const NEEDED_MINUTES = 540;

let getDate = (item) => {
    let timeStamp = item.in ? item.in : item.out;
    let momentTime = moment(timeStamp);
    return [momentTime.year(), momentTime.month(), momentTime.date()];
}

function MonthData(props) {
    let { month, monthId, data } = props;
    let thisMonth = parseInt(monthId, 10) - 1 == moment().month();

    let dataClone = JSON.parse(JSON.stringify(data));
    let sortedData = data.sort((a, b) => {
        let aDate = new Date(getDate(a)).getTime();
        let bDate = new Date(getDate(b)).getTime();
        return bDate - aDate;
    })
    let workingMinutes = {
        total: 0,
        actual: 0
    }
    let dailyData = sortedData.map((item, index) => {
        // ((item.out - item.in) / (1000 * 60 * 60))
        let totalMinutes = item.out && item.in ? moment(item.out).diff(moment(item.in), 'minutes') : 0
        let options = {
            inTime: item.in,
            outTime: item.out,
            date: item.in,
            total: totalMinutes
        }
        workingMinutes.actual += totalMinutes;
        workingMinutes.total += NEEDED_MINUTES;
        return (
            <DailyData key={index} {...options} />
        )
    })

    return (
        <>
            <span>{month}</span>
            <NetWorkingHours {...workingMinutes} />
            <div>
                {thisMonth && <MissingDate data={dataClone} />}
                {dailyData}
            </div>
        </>
    )
}

export default MonthData
