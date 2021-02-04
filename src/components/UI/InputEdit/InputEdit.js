import React, { useState, useEffect } from 'react'
import classes from './InputEdit.module.scss'
import { onChangeName } from "../../../store/actions/eleves"
import { connect } from 'react-redux'
import { useValidInputs } from '../../../containers/CreateEcolier/CreateContext'

const InputEdit = props => {

    const [cls, setCls] = useState([classes.InputEdit])

    const { toggleValidInputs, isClick } = useValidInputs()
    const [touched, setTouched] = useState(false) // If the user has already changed the value
    // Error messages
    const errorRequiredMessage = "Le champ de saisie est vide"
    const errorMin3Message = "Il doit y avoir au moins 3 caractères" 
    const errorValidCharsMessage = "Veuillez saisir les caractères corrects"
    // Error triggers
    const [errorNothing, setErrorNothing] = useState(false) // The field is empty
    const [errorLengthThree, setErrorLengthThree] = useState(false) // Value length at least 3 characters
    const [errorValidChars, setErrorValidChars] = useState(false) // Valid characters in the field

    const valid = () => !errorNothing && !errorLengthThree && !errorValidChars

    const onHandler = e => {
        props.onChange(e.target.value) // If the input value changes
        setTouched(true) // Data entry started
        // Handling Input Errors
        props.required && setErrorNothing(!!!e.target.value.trim())
        props.min3 && setErrorLengthThree(!!(e.target.value.trim().length >= 1 && e.target.value.trim().length < 3))
        props.validChars && setErrorValidChars(!!!(/^[A-zÀ-ÿА-я]+$/.test(e.target.value.trim())))
        // Adding a class
        !cls.includes(classes.InputEdited) && setCls(cls => [...cls, classes.InputEdited])
    }

    const validHandler = () => {
        if (valid()) { // If there are no errors in the form
            toggleValidInputs(props.field, true)
            setCls([classes.InputEdit])
        } else {
            toggleValidInputs(props.field, false)
            !cls.includes(classes.InputError) && setCls(cls => [...cls, classes.InputError])
        }
    }

    useEffect(() => touched && validHandler(), [errorNothing, errorLengthThree, errorValidChars]) //  && !props.change

    useEffect(() => !props.change && setCls([classes.InputEdit]), [isClick]) // Every click on the form

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
            {/* Error message blocks // errorValidChars in priority */}
            { errorNothing && !errorValidChars &&
                <span className={classes.alarmMes}>{errorRequiredMessage}</span> 
            }
            { errorLengthThree && !errorValidChars &&
                <span className={classes.alarmMes}>{errorMin3Message}</span> 
            }
            { errorValidChars &&
                <span className={classes.alarmMes}>{errorValidCharsMessage}</span> 
            }
            {/* Save changes button */}
            { valid() && touched && props.change && 
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