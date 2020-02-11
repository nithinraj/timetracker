import React from 'react'
import moment from 'moment'
import { constants } from './utils'

import Input from './Input'

let divStyle = {
    lineHeight: '3rem'
};
let gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)'
}

export default function DailyData(props) {
    let { date, inTime, outTime, total, setClass } = props;
    let inElement = inTime ? moment(inTime).format('hh:mm:ss') : <Input buttonName={constants.recordIn} />
    let outElement = outTime ? moment(outTime).format('hh:mm:ss') : <Input buttonName={constants.recordOut} />
    return (
        <div style={gridStyle}>
            <div style={{ ...divStyle, ...setClass }} >{moment(date).format('DD-MM-YYYY')}</div>
            <div style={{ ...divStyle, ...setClass }} >{inElement}</div>
            <div style={{ ...divStyle, ...setClass }} >{outElement}</div>
            <div style={{ ...divStyle, ...setClass }} >{total}</div>
        </div>
    )
}
