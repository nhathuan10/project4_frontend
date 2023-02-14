import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { CategoryModel } from '../../models/CategoryModel';
import { DispatchType } from '../configStore';

export type CategoryState = {
    categories: CategoryModel[]
}

const initialState: CategoryState = {
    categories: []
}

const categoryReducer = createSlice({
    name: 'categoryReducer',
    initialState,
    reducers: {
        setCategoriesAction: (state: CategoryState, action: PayloadAction<CategoryModel[]>) => {
            state.categories = action.payload
        }
    }
});

export const { setCategoriesAction } = categoryReducer.actions

export default categoryReducer.reducer

const categoryURL = 'http://localhost:8080/api/categories'

export const getCategoriesApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.get(categoryURL)
            dispatch(setCategoriesAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

// export const addCategoryApi = () => {
//     return async (dispatch: DispatchType) => {
//         try{
//             const 
//         } catch(err) {
//             console.log(err)
//         }
//     }
// }
