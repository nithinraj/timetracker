import React, { Fragment } from 'react'
import { connect } from 'react-redux'

function Input(props) {
    let inputRef = React.createRef();
    let buttonClick = () => {
        props.onSubmit(inputRef.current.value);
    }
    return (
        <>
            <input type="text" ref={inputRef} />
            <button onClick={buttonClick}> {props.buttonName}</button>
        </>
    )
}

export default connect()(Input)
