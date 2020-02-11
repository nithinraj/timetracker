import React, { Fragment } from 'react'
import { connect } from 'react-redux'

let inputStyle = {
    lineHeight: '1rem',
    padding: '5px 10px',
    borderRadius: '4px',
    border: '1px solid #d9d9d9'
};

let buttonStyle = {
    padding: '5px 10px',
    marginLeft: '10px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    backgroundColor: '#fafafa'
}

function Input(props) {
    let inputRef = React.createRef();
    let buttonClick = () => {
        props.onSubmit(inputRef.current.value);
    }
    return (
        <>
            <input style={{ ...inputStyle }} type="text" ref={inputRef} />
            <button style={{ ...buttonStyle }} onClick={buttonClick}> {props.buttonName}</button>
        </>
    )
}

export default connect()(Input)
