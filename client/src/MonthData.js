import React, { Fragment } from 'react';
import moment from 'moment'


let gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)'
}

export default function MonthData(props) {
    let { month, data } = props
    let dailyData = data.map((item, index) => {
        return (
            <Fragment key={index}>
                <div>{moment(item.in).format('DD-MM-YYYY')}</div>
                <div>{moment(item.in).format('hh:mm:ss')}</div>
                <div>{moment(item.out).format('hh:mm:ss')}</div>
                <div>{((item.out - item.in) / (1000 * 60 * 60)).toPrecision(4)}</div>
            </Fragment>
        )
    })
    return (
        <Fragment>
            <span>{month}</span>
            <div style={gridStyle}>
                {dailyData}
            </div>
        </Fragment>
    )
}
