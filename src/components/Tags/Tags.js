import classes from './Tags.module.scss'
import Tag from '../UI/Tag/Tag'

const Tags = props => {

    return (
        <ul className={classes.TagList}>
            {props.hobbies.map((hobby, index) => 
                // <li key={index} className={classes.Tag}>{hobby}</li>
                <Tag 
                    key={index} 
                    tag={hobby} 
                    index={props.index} 
                    onDeleteTag={props.onDeleteTag} 
                    onDeleteHandler={() => {}} />
            )}
        </ul>
    )
}

export default Tags