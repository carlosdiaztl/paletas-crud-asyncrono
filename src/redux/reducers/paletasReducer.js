import { paletasTypes } from "../types/paletasTypes";
const initialState = {
    paletas: []
};

export const paletasReducer = (state = initialState, action) => {

    switch (action.type) {

        case paletasTypes.PALETAS_FILL:

            return { ...state, paletas: [...action.payload]};

            case paletasTypes.PALETAS_ADD:
            return{
                ...state,
                paletas: [...state.paletas, action.payload.paleta], 
                error: {error: action.payload.error, errorMessage: action.payload.errorMessage}
            };


        default:
            return state;
    }
}