import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    creatorCourses: [],
    allCourses: [],
    selectedCourse: null,
    loading: false,
    error: null,
};

const courseSlice = createSlice({
    name: "course",
    initialState,

    reducers: {
        setCreatorCourses: (state, action) => {
            state.creatorCourses = action.payload;
        },

        setAllCourses: (state, action) => {
            state.allCourses = action.payload;
        },

        setSelectedCourse: (state, action) => {
            state.selectedCourse = action.payload;
        },


        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
});

export const {
    setCreatorCourses,
    setAllCourses,
    setSelectedCourse,
    setLoading,
} = courseSlice.actions;

export default courseSlice.reducer;