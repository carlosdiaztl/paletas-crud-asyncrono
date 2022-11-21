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
        case paletasTypes.PALETAS_EDIT:
            return{
                ...state,
                paletas: state.paletas.map((paleta)=>{
                    const originalPaleta = paleta;
                    if (paleta.id === action.payload.id){
                        originalPaleta.name = action.payload.name;
                        originalPaleta.description = action.payload.description;
                        originalPaleta.category = action.payload.category;
                        originalPaleta.quantity = action.payload.quantity;
                        originalPaleta.price = action.payload.price;
                        originalPaleta.image = action.payload.image
                    }
                    return originalPaleta
                })
            }
        case paletasTypes.PALETAS_DELETE:
            return{
                ...state,
                paletas: state.paletas.filter((paleta) => 
                    paleta.id !== action.payload.id
                ) 
            }
        default:
            return state;
    }
}