import React, { useState, useEffect } from 'react'
import classes from './InputTags.module.scss'
import Tag from '../Tag/Tag'
import { useValidInputs } from '../../../containers/CreateEcolier/CreateContext'

const InputTags = props => {

    const [cls, setCls] = useState([classes.InputTags])
    const [touched, setTouched] = useState(false)
    const [valid, setValid] = useState(false)
    const errorRequiredMessage = "Le champ de saisie est vide"
    
    const { tags, tag, onAddTag, onDeleteTag } = useValidInputs()

    const isError = () => !valid && touched && props.required

    const onHandeTag = e => props.onChange(e)

    const onAddHandler = e => {
        onHandeTag(e.target.value)
        setTouched(true)
        props.required && setValid(e.target.value.trim() ? true : false)
        !cls.includes(classes.InputTagsEdited) && setCls(cls => [...cls, classes.InputTagsEdited])
    }

    const onHandler = e => {
        e.preventDefault()
        console.log(valid, touched)
        if (valid && touched) {
            onAddTag(tag)
            onHandeTag('')
        }
    }

    useEffect(() => {setTouched(false)}, [tags])

    const onDeleteHandler = el => onDeleteTag(el)

    // function(ev){
    //     f.style.transform = 'translateY('+(ev.clientY-25)+'px)';
    //     f.style.transform += 'translateX('+(ev.clientX-25)+'px)';
    // }

    return (
        <div className={classes.InputBlock}>
            
            <input 
                type="text"
                value={tag} 
                onChange={onAddHandler} 
                className={cls.join(' ')} 
            />
            <button
                type="submit"
                onClick={onHandler}
                className={classes.InputSubmit}
            >
                <i className="fa fa-plus"></i>
            </button>
            <div 
                style={!!tags.length ? {display: 'flex'} : {display: 'none'}}
                className={classes.TagsBlock}
            >
                {!!tags.length && 
                    tags.map((item, i) => <Tag key={i} tag={item} onDeleteHandler={onDeleteHandler} />)
                }
            </div>
            { isError() && 
                <span className={classes.alarmMes}>{errorRequiredMessage}</span> 
            }
            
        </div>
    )
}

export default InputTags