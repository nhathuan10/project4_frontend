import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryModel, CategoryRequest } from '../../models/CategoryModel';
import { http } from '../../utils/config';
import { DispatchType } from '../configStore';

export type CategoryState = {
    categories: CategoryModel[]
    categoryById: CategoryModel | null
    addedCategory: CategoryModel | null
    updatedCategory: CategoryModel | null
    deleteCategoryResponse: string,
    categoryState: boolean
}

const initialState: CategoryState = {
    categories: [],
    categoryById: null,
    addedCategory: null,
    updatedCategory: null,
    deleteCategoryResponse: '',
    categoryState: false
}

const categoryReducer = createSlice({
    name: 'categoryReducer',
    initialState,
    reducers: {
        setCategoriesAction: (state: CategoryState, action: PayloadAction<CategoryModel[]>) => {
            state.categories = action.payload
        },
        getCategoryByIdAction: (state: CategoryState, action: PayloadAction<CategoryModel>) => {
            state.categoryById = action.payload
        },
        addCategoryAction: (state: CategoryState, action: PayloadAction<CategoryModel>) => {
            state.addedCategory = action.payload
            state.categoryState = !state.categoryState
        },
        updateCategoryAction: (state: CategoryState, action: PayloadAction<CategoryModel>) => {
            state.updatedCategory = action.payload
            state.categoryState = !state.categoryState
        },
        deleteCategoryAction: (state: CategoryState, action: PayloadAction<string>) => {
            state.deleteCategoryResponse = action.payload
            state.categoryState = !state.categoryState
        }
    }
});

export const {
    setCategoriesAction,
    addCategoryAction,
    deleteCategoryAction,
    getCategoryByIdAction,
    updateCategoryAction
} = categoryReducer.actions

export default categoryReducer.reducer

const categoryURL = 'http://localhost:8080/api/categories'

export const getCategoriesApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get(categoryURL)
            dispatch(setCategoriesAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const addCategoryApi = (categoryRequest: CategoryRequest) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.post(categoryURL, categoryRequest)
            dispatch(addCategoryAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateCategoryApi = (id: number, categoryRequest: CategoryRequest) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.put(categoryURL + `/${id}`, categoryRequest)
            dispatch(updateCategoryAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const getCategoryByIdApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get(categoryURL + `/${id}`)
            dispatch(getCategoryByIdAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const deleteCategoryApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.delete(categoryURL + `/${id}`)
            dispatch(deleteCategoryAction(result.data))
        } catch (err) {
            console.log(err)
        }
    }
}
