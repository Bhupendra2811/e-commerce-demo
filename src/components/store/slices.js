import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
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
        baseUrl: `https://fakestoreapi.com/`,
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
        // createOnBoarding: builder.mutation({
        //     query: ({ id, ...data }) => ({
        //         url: `user/update/${id}`,
        //         method: 'PUT',
        //         body: { ...data?.data },
        //     }),
        // }),
        // updateUserData: builder.mutation({
        //     query: ({ id, body }) => {
        //         const formData = convertObjectToFormData(body);
        //         return {
        //             url: `user/update/${id}`,
        //             method: 'PUT',
        //             body: body,
        //             formData: true
        //         }
        //     },
        // }),
        getProducts: builder.query({
            query: () => ({
                url: "products/",
                method: 'GET'
            }),
            providesTags: (result) => [
                { type: 'products', id: 'LIST' }
            ],
        }),
        getCategory: builder.query({
            query: () => ({
                url: "products/categories",
                method: 'GET'
            }),
        }),
        // get_newsletter_option: builder.query({
        //     query: () => ({
        //         url: "newLetterCategory/get",
        //         method: 'GET'
        //     }),
        // }),
        // get_newsletter_profile: builder.query({
        //     query: (email) => (
        //         {
        //             url: `/suscribe/get?email=${email}`,
        //             method: 'GET'
        //         }),
        // }),
        // update_newsletter: builder.mutation({
        //     query: ({ id, category }) => {
        //         return {
        //             url: `/suscribe/${id}`,
        //             method: 'PUT',
        //             body: { category: category },
        //             formData: true
        //         }
        //     },
        // }),
        // accept_endorsement: builder.mutation({
        //     query: (data) => ({
        //         url: `user/accept-endorsement`,
        //         method: 'POST',
        //         body: { ...data },
        //     }),
        // }),
        // get_newsletter_data: builder.query({
        //     query: ({ offset = 1, limit = 50, search = '' }) => (
        //         {
        //             url: `/suscribe/get?offset=${offset}&limit=${limit}&search=${search}`,
        //             method: 'GET'
        //         }),
        // }),
        // active_newsletter: builder.mutation({
        //     query: (data) => {
        //         return {
        //             url: `/suscribe/manage`,
        //             method: 'PUT',
        //             body: { ...data },
        //         }
        //     },
        // }),
        // newsletter_approve: builder.mutation({
        //     query: (data) => {
        //         return {
        //             url: `/suscribe/approve`,
        //             method: 'PUT',
        //             body: { ...data },
        //         }
        //     },
        // }),
    })
})
export const {
    useGetProductsQuery,
    useGetCategoryQuery
} = ProductApi
export const { login, logout, setShowMeetingButton, checkLogin, setIsEditActive, setSelectedSolution, setDataLoading, setData, setDelete, setVerificationEmail, setUserRole, setUserRoleInfo, setRegisterModal, setRegisterEmail, setEditnewsLdata } = AuthData.actions;
export default AuthData.reducer;
export const selectIsLoggedIn = (state) => state.AuthData.isLoggedIn;
