import classes from './Select.module.scss'
import { useEffect } from 'react'

const Select = (props) => {

    const marker = Math.random().toString().substr(2, 7)
    // useEffect(()=> console.log(marker))

    const onSelectHandler = e => props.onChange(e.target.value)

    return (
        <div className={classes.SelectBlock}>
            <label className={classes.Label} htmlFor={marker}>{props.label}</label>
            <select className={classes.Select} defaultValue={props.value} onChange={onSelectHandler} id={marker}>
                {[1,2,3,4,5].map((el, i) => <option key={i}>{el}</option> )}
            </select>
        </div>
    )
}

export default Select