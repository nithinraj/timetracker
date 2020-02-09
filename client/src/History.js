import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { doFetch as fetch, months } from './utils';
import MonthData from './MonthData'

function History(props) {
    let { all, getYearData } = props

    useEffect(() => {
        getYearData('/timerecords/2020', 'getYearData')
    }, [])
    console.log('history --> ', all)

    let history = Object.keys(all).map((item) => {
        return <MonthData key={months[item]} data={all[item]} month={months[item]} />
    })

    return (
        <div>
            {history}
        </div>
    )
}

let getYearData = (url, actionType) => {
    return (dispatch) => {
        fetch(url, actionType, dispatch)
    }
}


let mapStateToProps = (state) => {
    return {
        all: state.yearData
    }
}

let mapDispatchToProps = { getYearData }

export default connect(mapStateToProps, mapDispatchToProps)(History)