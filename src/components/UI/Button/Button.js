import classes from './Button.module.scss'

const Button = props => {
    return (
        <input 
            type={'submit'}
            value={props.value}
            className={classes.Button}
            onClick={props.onClick}
        />
    )
}

export default Button