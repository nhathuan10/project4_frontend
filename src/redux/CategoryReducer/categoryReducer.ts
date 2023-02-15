import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { CategoryModel, CategoryRequest } from '../../models/CategoryModel';
import { DispatchType } from '../configStore';

export type CategoryState = {
    categories: CategoryModel[],
    addedCategory: CategoryModel | null,
    deleteCategoryResponse: string
}

const initialState: CategoryState = {
    categories: [],
    addedCategory: null,
    deleteCategoryResponse: ''
}

const categoryReducer = createSlice({
    name: 'categoryReducer',
    initialState,
    reducers: {
        setCategoriesAction: (state: CategoryState, action: PayloadAction<CategoryModel[]>) => {
            state.categories = action.payload
        },
        addCategoryAction: (state: CategoryState, action: PayloadAction<CategoryModel>) => {
            state.addedCategory = action.payload
        },
        deleteCategoryAction: (state: CategoryState, action: PayloadAction<string>) => {
            state.deleteCategoryResponse = action.payload
        }
    }
});

export const {
    setCategoriesAction,
    addCategoryAction,
    deleteCategoryAction
} = categoryReducer.actions

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

export const addCategoryApi = (categoryRequest: CategoryRequest) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.post(categoryURL, categoryRequest)
            dispatch(addCategoryAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteCategoryApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios.delete(categoryURL + `/${id}`)
            dispatch(deleteCategoryAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}
