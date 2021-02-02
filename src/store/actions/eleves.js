import { SAVE_LIST } from "./actionTypes"
import delay from "../../utils/delay" // Promise
import { firstUpperCase } from "../../utils/firstUpperCase"

export function deleteEleve(ind) {
    return (dispatch, getState) => {
        let eleves = getState().elevesReducer.eleves.concat()
        delay(500).then(() => dispatch(saveListEleves(eleves.filter(e => e.index !== ind))))
    }
}

export function check(ind) {
    return (dispatch, getState) => {
        let eleves = getState().elevesReducer.eleves.concat().map(el => {
            if (el.index === ind) el.accepted = !el.accepted
            return el
        })
        dispatch(saveListEleves(eleves))
    }
}

export function onChangeName(ind, field, val) {
    return (dispatch, getState) => {
        let eleves = getState().elevesReducer.eleves.concat().map(el => {
            if (el.index === ind) el[field] = val
            return el
        })
        dispatch(saveListEleves(eleves))
    }
}

export function onDeleteTag(ind, tagName) {
    console.log("ind", ind)
    return (dispatch, getState) => {
        let eleves = getState().elevesReducer.eleves.concat().map(el => {
            if (el.index === ind) el['hobbies'] = el['hobbies'].filter(item => item !== tagName)
            return el
        })
        dispatch(saveListEleves(eleves))
    }
}

export function onAddEcolier({ name, surname, year, tags }) {
    return (dispatch, getState) => {
        const eleves = getState().elevesReducer.eleves.concat()
        const eleve = {
            index: Math.random().toString().substr(3, 6),
            accepted: true,
            year_of_study: year,
            hobbies: tags,
            name: firstUpperCase(name),
            surname: firstUpperCase(surname),
        }
        eleves.push(eleve)
        dispatch(saveListEleves(eleves))
    }
}

export function saveListEleves(eleves) {
    return {
        type: SAVE_LIST,
        eleves
    }
}

// export function onValidInput(isValid, field) {
//     return dispatch => {
//         dispatch(onValidNameField(isValid))
//     }
// }

// export function onValidNameField(isValid) {
//     return {
//         type: CHANGE_VALID_STATUS_NAME,
//         isValid
//     }
// }

// export function onValidSurnameField(isValid) {
//     return {
//         type: CHANGE_VALID_STATUS_SURNAME,
//         isValid
//     }
// }