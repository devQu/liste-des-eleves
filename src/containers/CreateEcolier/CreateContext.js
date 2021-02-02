import React, { useState, useContext } from 'react'
import { firstUpperCase } from '../../utils/firstUpperCase'

const CreateContext = React.createContext()

export const useValidInputs = () => useContext(CreateContext)

export const CreateProvider = ({ children }) => {

    const [validName, setValidName] = useState(false)
    const [validSurname, setValidSurname] = useState(false)
    
    const [isClick, setIsClick] = useState(false)
    const onClickButton = () => setIsClick(prev => !prev) // If the user was able to click on the button

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [year, setYear] = useState(1)
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const onHandleName = e => setName(e)
    const onHandleSurname = e => setSurname(e)
    const onHandleYear = e => setYear(e)
    const onHandleTag = e => setTag(e)
    const onAddTag = e => setTags([...tags, firstUpperCase(e)])
    const onDeleteTag = e => setTags(tags.filter(val => val !== e))

    const toggleValidInputs = (field, ifValid) => {
        if (field === "name") {setValidName(ifValid)}
        if (field === "surname") {setValidSurname(ifValid)}
    }

    // useEffect(() => {console.log("name, surname: ", validName, validSurname)}, [validName, validSurname])

    return (
        <CreateContext.Provider value={{
            validName, validSurname,
            name, surname, year, tag, tags,
            setName, setSurname, setYear, setTag, setTags,
            toggleValidInputs,
            onHandleName, onHandleSurname, onHandleYear, onHandleTag,
            onAddTag, onDeleteTag,
            isClick, onClickButton
        }}>
            { children }
        </CreateContext.Provider>
    )
}