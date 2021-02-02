import classes from './Label.module.scss'

const Label = (props) => {
    return <span className={classes.Label} >{props.label}em année</span>
}

export default Label