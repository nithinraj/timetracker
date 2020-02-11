import React, { useEffect } from 'react'
import moment from 'moment';
import { connect } from 'react-redux'

import { doFetch as fetch } from './utils';
import Input from './Input';

let gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)'
}

function CurrentTime(props) {
    let { getCurrent, current, setCurrent } = props;
    let currentYear = moment().year();
    let currentMonth = moment().month(); //moment().month() returns 0-11. 0-Jan; 11-Dec
    let currentDate = moment().date();
    console.log(currentMonth)
    useEffect(() => {
        getCurrent(`/timerecords/${currentYear}/${currentMonth + 1}/${currentDate}`)
    }, []);
    let timeInSubmit = (val) => {
        let timeSplitted = val.split(':');
        let date = `${currentDate}/${currentMonth + 1}/${currentYear}`;
        let inTime = new Date(currentYear, currentMonth, currentDate, ...timeSplitted).getTime();
        let bodyData = {
            [date]: {
                in: current.in < inTime ? current.in : inTime
            }
        }
        if (current.out) {
            bodyData[date]['out'] = current.out
        }

        let options = {
            method: 'POST',
            body: JSON.stringify({ data: bodyData })

        }
        setCurrent(`/timerecords`, options)
        getCurrent(`/timerecords/${currentYear}/${currentMonth + 1}/${currentDate}`)
    }
    let timeOutSubmit = (val) => {
        let timeSplitted = val.split(':');
        let date = `${currentDate}/${currentMonth + 1}/${currentYear}`;
        let outTime = new Date(currentYear, currentMonth, currentDate, ...timeSplitted).getTime();
        let bodyData = {
            [date]: {
                out: current.out > outTime ? current.out : outTime
            }
        }
        if (current.in) {
            bodyData[date]['in'] = current.in
        }

        let options = {
            method: 'POST',
            body: JSON.stringify({ data: bodyData })
        }
        setCurrent(`/timerecords`, options)
        getCurrent(`/timerecords/${currentYear}/${currentMonth + 1}/${currentDate}`)
        console.log(options)
    }
    return (
        <div style={gridStyle}>
            <div>In: {current.in ? moment(current.in).format('hh:mm:ss') : <Input onSubmit={timeInSubmit} buttonName={'Record In'} />} (hh:mm:ss) </div>

            <div>Out: {current.out ? moment(current.out).format('hh:mm:ss') : <Input onSubmit={timeOutSubmit} buttonName={'Record Out'} />} (hh:mm:ss)</div>
        </div>
    )
}

let getCurrent = (url) => {
    return (dispatch) => {
        fetch(url, 'getCurrent', dispatch)
    }
}

let setCurrent = (url, options) => {
    return (dispatch) => {
        fetch(url, 'setCurrent', dispatch, options)
    }
}


let mapStateToProps = (state) => {
    return {
        current: state.currentData
    }
}

let mapDispatchToProps = { getCurrent, setCurrent }

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTime)
