import React, { useState } from 'react'
import moment from 'moment'

import DailyData from './DailyData';
let gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)'
}

let hideDiv = {
    display: 'none'
}

let showDiv = {
    display: 'block'
}

let arrowDown = {
    display: 'inline-block',
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderTop: '10px solid #000'
}
let arrowUp = {
    display: 'inline-block',
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '10px solid #000'
}

export default function MissingDate(props) {

    const [hide, setHide] = useState(false)
    let toggle = (e) => {
        setHide(!hide)
    }
    let { data } = props;
    let [month, date] = [moment().month(), moment().date()];
    let totalDays = Object.keys(data);
    let daysMissing = date - parseInt(totalDays[totalDays.length - 1])
    data = [...data, ...new Array(4).fill(null)];
    console.log(data, daysMissing)
    delete data[0];
    let missed = data.reduce((accu, item, index) => {
        if (!item || !item.in || !item.out) {
            let options = {
                inTime: null,
                outTime: null,
                date: new Date(2020, month, index),
                total: 0
            }
            accu.push(<DailyData setClass={hide ? hideDiv : showDiv} key={`dd${index}`} {...options} />)
        }
        return accu;
    }, [])

    let arrowStyle = hide ? arrowDown : arrowUp

    return (
        <div onClick={toggle} >
            <span> Missed Dates </span><div style={{ ...arrowStyle }}></div>
            {missed}
        </ div>
    )
}
