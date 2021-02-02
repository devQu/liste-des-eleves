import Tags from "../../components/Tags/Tags"
import classes from './Ecolier.module.scss'
import ButtonDelete from "../../components/UI/ButtonDelete/ButtonDelete"
import InputEdit from "../../components/UI/InputEdit/InputEdit"
import Label from "../../components/UI/Label/Label"
import { useEffect, useState } from "react"
import Checkbox from "../../components/UI/Checkbox/Checkbox"
import { connect } from "react-redux"
import { onDeleteTag } from "../../store/actions/eleves"

const Ecolier = props => {

    const [cls, setCls] = useState([classes.Ecolier])
    const setAnim = () => setCls(cls => [...cls, classes.deleted]) // set animation class
    const delAnim = () => setCls([classes.Ecolier]) // delete animation class

    const [name, setName] = useState(props.name)
    const [surname, setSurname] = useState(props.surname)
    const onHandleName = e => setName(e)
    const onHandleSurname = e => setSurname(e)
    // const refE = useRef()

    // useEffect(() => console.log('refE.current), []'))

    const inputData = {
        required: true, // Option if the field is required
        min3: true, // Option if the minimum field length is specified
        change: true // Field change option
    }

    return (
        <div className={cls.join(' ')}>
            <Checkbox index={props.index} accepted={props.accepted} />
            <InputEdit onChange={onHandleName} index={props.index} {...inputData} value={name} field="name" />
            <InputEdit onChange={onHandleSurname} index={props.index} {...inputData} value={surname} field="surname" /> 
            <Label label={props.years} />  
            { !!props.hobbies.length ?
                <Tags hobbies={props.hobbies} index={props.index} onDeleteTag={props.onDeleteTag} /> :
                <div className={classes.NoTags}>Intérêts non spécifiés</div>
            }
            <ButtonDelete index={props.index} setAnim={setAnim} delAnim={delAnim} />
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return { onDeleteTag: (ind, tagName) => dispatch(onDeleteTag(ind, tagName)) }
}

export default connect(null, mapDispatchToProps)(Ecolier)