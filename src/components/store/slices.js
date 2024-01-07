import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseURL } from "lib/api";
// export const fetchData = createAsyncThunk('data/fetchDatafromApi', async (character) => {
//     const response = await fetch(baseUrl + character)
//     const data = await response.json()
//     return data;
// })
export const AuthData = createSlice({
    name: 'Auth',
    initialState: {
        isLoading: false,
        error: '',
        userInfo: [],
        isLoggedIn: false,
        verificationEmail: '',
        role: '',
        userRoleInfo: '',
        selectedSolution: '',
        registerModal: false,
        registerEmail: '',
        editnewsLdata: [],
        isEditActive: false,
        showMeetingButton: false
    }, reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;

        },
        setUserRole: (state, action) => {
            state.role = localStorage.setItem('userRole', action.payload)
        },
        setDataLoading: (state) => {
            state.isLoading = true;
        },
        setUserRoleInfo: (state, action) => {
            state.userRoleInfo = action.payload;
        },
        setData: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        setDelete: (state, action) => {
            state.data = state.data.name !== action.payload;
        },
        setVerificationEmail: (state, action) => {
            state.verificationEmail = action.payload
        },
        setSelectedSolution: (state, action) => {
            state.selectedSolution = action.payload
        },
        setRegisterModal: (state, action) => {
            state.registerModal = action.payload
        },
        setRegisterEmail: (state, action) => {
            state.registerEmail = action.payload
        },
        setEditnewsLdata: (state, action) => {
            state.editnewsLdata = action.payload
        },
        setIsEditActive: (state, action) => {
            state.isEditActive = action.payload
        },
        setShowMeetingButton: (state, action) => {
            state.showMeetingButton = action.payload
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(logoutUser.fulfilled, (state) => {
        //     state.user = null;
        //     state.token = null;
        // });
    }
})
export const ProductApi = createApi({
    reducerPath: 'ProductApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseURL,
        prepareHeaders: (headers, { getState }) => {
            const currentToken = JSON.parse(localStorage.getItem('token'));
            if (currentToken) {
                headers.set('Authorization', `Bearer ${currentToken}`);
            }
            headers.set('Content-Type', 'application/json');
            // headers.set('Accept', 'application/json');
            headers.set('ngrok-skip-browser-warning', true)
            return headers
        },
    }),
    tagTypes: ['ProductApiType'],
    endpoints: (builder) => ({
        createDepartment: builder.mutation({
            query: (data) => ({
                url: `/create-department`,
                method: 'POST',
                body: { ...data },
            }),
        }),
        signUp: builder.mutation({
            query: (data) => {
                return {
                    url: `/signup`,
                    method: 'POST',
                    body: { ...data },
                }
            },
        }),
        logIn: builder.mutation({
            query: (data) => {
                return {
                    url: `/login`,
                    method: 'POST',
                    body: { ...data },
                }
            },
        }),
        updateDepartment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update-department/${id}`,
                method: 'PUT',
                body: { ...data },
            }),
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `/delete-department/${id}`,
                method: 'DELETE',
            }),
        }),
        getProducts: builder.query({
            query: () => ({
                url: "products/",
                method: 'GET'
            }),
            providesTags: (result) => [
                { type: 'products', id: 'LIST' }
            ],
        }),
        getAllRoles: builder.query({
            query: () => ({
                url: "/get-all-roles",
                method: 'GET'
            }),
            providesTags: (result) => [
                { type: 'roles', id: 'LIST' }
            ],
        }),
        getCategory: builder.query({
            query: () => ({
                url: "products/categories",
                method: 'GET'
            }),
        }),
        getDepartment: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: `/get-all-departments?page=${page}&limit=${limit}`,
                method: 'GET'
            }),
        }),
        getAllEmployee: builder.query({
            query: ({ page = 1, limit = 10, sortField = '', sortOrder = 'asc' }) => ({
                url: `/get-all-employees?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`,
                method: 'GET'
            }),
        }),
        updateEmployee: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update-employee/${id}`,
                method: 'PUT',
                body: { ...data },
            }),
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/delete-employee/${id}`,
                method: 'DELETE',
            }),
        }),
        getEmployeeDetailById: builder.query({
            query: ({ id }) => {
                if (!id) return
                return {
                    url: `/get-employee-details/${id}`,
                    method: 'GET'
                }
            },
        }),
    })
})
export const {
    useGetProductsQuery,
    useGetCategoryQuery,
    useSignUpMutation,
    useLogInMutation,
    useGetAllRolesQuery,
    useGetDepartmentQuery,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
    useCreateDepartmentMutation,
    useGetAllEmployeeQuery,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation,
    useGetEmployeeDetailByIdQuery
} = ProductApi
export const { login, logout, setShowMeetingButton, checkLogin, setIsEditActive, setSelectedSolution, setDataLoading, setData, setDelete, setVerificationEmail, setUserRole, setUserRoleInfo, setRegisterModal, setRegisterEmail, setEditnewsLdata } = AuthData.actions;
export default AuthData.reducer;
export const selectIsLoggedIn = (state) => state.AuthData.isLoggedIn;
