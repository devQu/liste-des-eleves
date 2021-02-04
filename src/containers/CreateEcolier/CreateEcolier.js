import InputEdit from "../../components/UI/InputEdit/InputEdit";
import classes from './CreateEcolier.module.scss'
import Select from "../../components/UI/Select/Select";
import InputTags from "../../components/UI/InputTags/InputTags";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { onAddEcolier } from "../../store/actions/eleves";
import { useValidInputs } from "./CreateContext";

const CreateEcolier = props => {

    const inputData = {
        required: true, // Option if the field is required
        min3: true, // Option if the minimum field length is specified
        validChars: true, // Option for symbol validation 
        change: false // If the field value changes
    }

    const { 
        name, surname, tags, year,
        setName, setSurname, setTag, setTags, setYear,
        onHandleName, onHandleSurname, onHandleYear, onHandleTag,
        validName, validSurname, toggleValidInputs,
        onClickButton
    } = useValidInputs()

    const onSave = e => {
        e.preventDefault()
        if (validName && validSurname) {
            props.onAddEcolier({ name, surname, year, tags })
            onClickButton()
            setName('')
            setSurname('')
            setTag('')
            setTags([])
            setYear(1)
            toggleValidInputs('name', false)
            toggleValidInputs('surname', false)
        }
    }

    return (
        <div className={classes.CreateBlock}>
            <form onSubmit={onSave} className={classes.CreateForm}>
                <InputEdit 
                    onChange={onHandleName} 
                    value={name} 
                    field={'name'}
                    {...inputData}
                />
                <InputEdit 
                    onChange={onHandleSurname} 
                    value={surname} 
                    field={'surname'}
                    {...inputData}
                />
                <Select 
                    onChange={onHandleYear} 
                    value={year} 
                    label={'Année d\'étude'} 
                />
                <InputTags 
                    onChange={onHandleTag} 
                    {...inputData} 
                />
                <Button 
                    onClick={onSave} 
                    value={'Ajouter'} 
                />
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return { onAddEcolier: inputs => dispatch(onAddEcolier(inputs)) }
}

export default connect(null, mapDispatchToProps)(CreateEcolier)