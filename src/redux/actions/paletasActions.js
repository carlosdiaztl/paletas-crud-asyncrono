
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseConfig";
import { paletasTypes } from "../types/paletasTypes";

const collectionName = 'paletas';
const paletasCollection = collection(dataBase, collectionName);



export const actionFillPaletasAsync = () => {
    return async (dispatch) => {
        const querySnapshot = await getDocs(paletasCollection);
        const paletas = [];
        try {
            querySnapshot.forEach(element => {
                const paleta = {
                    id: element.id,
                    ...element.data()
                }
                paletas.push(paleta)
            });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(actionFillPaletasSync(paletas));

        }
    }
}

const actionFillPaletasSync = (paletas) => {
    return {
        type: paletasTypes.PALETAS_FILL,
        payload: paletas
    }
}

export const  actionAddPaletasAsync=(paleta)=>{
    return async (dispatch)=>{
        try {
            const docs= await addDoc(paletasCollection,paleta)
            const newPaleta={
                id:docs.id,
                ...paleta
            }
            dispatch(actionAddPaletasSync({paleta:newPaleta,error:false}))
            
        } catch (error) {
            console.log(error);
            dispatch(actionAddPaletasSync({paleta:{},error:true,errorMessage:error.message}))
            
        }

    }

}
const actionAddPaletasSync=(objetoPaleta)=>{
return{
    type:paletasTypes.PALETAS_ADD,
    payload:{...objetoPaleta}
}
}

export const actionEditPaletasAsync = (paletaEdit) => {
    return async (dispatch) => {
        const paletaRef = doc(dataBase, collectionName, paletaEdit.id)
        try {
            await updateDoc(paletaRef, paletaEdit);
            dispatch(actionEditPaletasSync({
                id: paletaRef.id, 
                ...paletaEdit
            }))
        } catch (error) {
            console.log(error)
            // dispatch(actionEditPaletasSync({
            //     error: true,
            //     errorMessage: error.message
            // }))
        }       
    }
}

const actionEditPaletasSync = (paletaEdit) => {
    return {
        type: paletasTypes.PALETAS_EDIT,
        payload: {...paletaEdit}
    }
}

export const actionDeletePaletasAsync =(paleta) => {
    return  async (dispatch) => {
        const paletaRef = doc(dataBase, collectionName, paleta.id)
        try {
            await deleteDoc(paletaRef);
            dispatch(actionDeletePaletasSync(paleta))
        } catch (error) {
            console.log(error);
            dispatch(actionDeletePaletasSync({
                error: true,
                errorMessage: error.message
            }))
        }        
    }
}

const actionDeletePaletasSync = (paleta) => {
    return {
        type: paletasTypes.PALETAS_DELETE,
        payload: {id: paleta.id}
    }
}