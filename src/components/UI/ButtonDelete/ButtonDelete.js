import { connect } from "react-redux"
import { deleteEleve } from "../../../store/actions/eleves"
import classes from './ButtonDelete.module.scss'
// import { useEffect } from "react"
import delay from "../../../utils/delay"

function ButtonDelete(props) {

    const onDelete = () => {
        props.setAnim()
        delay(500).then(() => props.delAnim())
        props.delete(props.index)
    }

    // useEffect(() => {console.log(props.refCurr)}, [props.index])

    return (
        <div 
            className={classes.Icon} 
            onClick={onDelete}
        >
            <i className="fa fa-user-times"></i>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        delete: (id) => dispatch(deleteEleve(id))
    }
}

export default connect(null, mapDispatchToProps)(ButtonDelete)