import fixture from '../../data/fixture';
import { SAVE_LIST, CHANGE_VALID_STATUS_NAME, CHANGE_VALID_STATUS_SURNAME } from '../actions/actionTypes';

const initialState = {
    eleves: [...fixture],
    validInputName: false,
    validInputSurname: false
}

export default function elevesReducer(state=initialState, action) {
    switch (action.type) {
        case SAVE_LIST: return { ...state, eleves: action.eleves }
        case CHANGE_VALID_STATUS_NAME: return { ...state, validInputName: action.isValid }
        case CHANGE_VALID_STATUS_SURNAME: return { ...state, validInputSurname: action.isValid }
        default: return state
    }
}