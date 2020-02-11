import React from 'react'

export default function NetWorkingHours(props) {
    let { actual, total } = props
    let netWorkingMinutes = actual - total;
    let extraMinutes = <span> Extra Minutes: {netWorkingMinutes > 0 ? netWorkingMinutes : 0}</span>
    let pendingMinutes = <span> Pending Minutes: {netWorkingMinutes < 0 ? Math.abs(netWorkingMinutes) : 0}</span>
    return (
        <>
            {extraMinutes}
            {pendingMinutes}
        </>
    )
}
