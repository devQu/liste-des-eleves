import React, { useState, useEffect } from 'react'
import classes from './InputEdit.module.scss'
import { onChangeName } from "../../../store/actions/eleves"
import { connect } from 'react-redux'
import { useValidInputs } from '../../../containers/CreateEcolier/CreateContext'

const InputEdit = props => {

    const [cls, setCls] = useState([classes.InputEdit])

    const { toggleValidInputs, isClick } = useValidInputs()
    const [touched, setTouched] = useState(false)
    // Error messages
    const errorRequiredMessage = "Le champ de saisie est vide"
    const errorMin3Message = "Il doit y avoir au moins 3 caractères." 
    // Error triggers
    const [errorNothing, setErrorNothing] = useState(false) // The field is empty
    const [errorLengthThree, setErrorLengthThree] = useState(false) // Value length at least 3 characters

    const onHandler = e => {
        props.onChange(e.target.value) // If the input value changes
        setTouched(true) // Data entry started
        // Handling Input Errors
        props.required && setErrorNothing(e.target.value.trim() ? false : true)
        props.min3 && setErrorLengthThree((e.target.value.trim().length >= 1 && e.target.value.trim().length < 3) ? true : false)
        // Adding a class
        !cls.includes(classes.InputEdited) && setCls(cls => [...cls, classes.InputEdited])
    }

    const validHandler = () => {
        if (!errorNothing && !errorLengthThree) { // If there are no errors in the form
            if (touched) { // If the user has already changed the value
                toggleValidInputs(props.field, true)
            }
        } else {
            toggleValidInputs(props.field, false)
        }
    }

    useEffect(() => {
        if (touched && !props.change) { validHandler() }
    }, [errorNothing, errorLengthThree])

    useEffect(() => { !props.change && setCls([classes.InputEdit]) }, [isClick])

    const onSaveChangeHandler = () => {
        props.onChangeName(props.index, props.field, props.value) // Saving changes
        setTouched(false)
    }

    return (
        <div className={classes.InputBlock}>
            <input 
                type="text"
                value={props.value} 
                onChange={onHandler} 
                className={cls.join(' ')} 
            />
            { errorNothing && 
                <span className={classes.alarmMes}>{errorRequiredMessage}</span> 
            }
            { errorLengthThree &&
                <span className={classes.alarmMes}>{errorMin3Message}</span> 
            }
            { !errorNothing && !errorLengthThree && touched && props.change &&
                <span 
                    onClick={onSaveChangeHandler} 
                    className={classes.approvMes}
                >
                    <i className="fa fa-check"></i>&nbsp;Sauver
                </span> 
            }
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return { 
        onChangeName: (id, field, val) => dispatch(onChangeName(id, field, val))
    }
}

export default connect(null, mapDispatchToProps)(InputEdit)