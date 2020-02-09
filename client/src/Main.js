import React from 'react';
import CurrenTime from './CurrentTime';
import History from './History'

export default function Main(props) {
    return (
        <div>
            <CurrenTime />
            <History />
        </div>
    )
}
