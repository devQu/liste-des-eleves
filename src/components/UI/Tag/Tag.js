import classes from './Tag.module.scss'

const Tag = props => {
    return (
        <div 
            onClick={props.index ? 
                () => props.onDeleteTag(props.index, props.tag) : // List of ecoliers
                () => props.onDeleteHandler(props.tag)} // Ecolier creation form
            className={classes.Tag}
        >{props.tag}
            <span className={classes.Close}><i className="fa fa-times"></i></span>
        </div>
    )
}

export default Tag