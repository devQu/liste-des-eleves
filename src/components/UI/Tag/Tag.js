import classes from './Tag.module.scss'

const Tag = props => {
    return (
        <div 
            onClick={Number.isInteger(props.index) ? 
                () => props.onDeleteTag(props.index, props.tag) :
                () => props.onDeleteHandler(props.tag)} 
            className={classes.Tag}
        >{props.tag}
            <span className={classes.Close}><i className="fa fa-times"></i></span>
        </div>
    )
}

export default Tag