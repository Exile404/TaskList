import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isAddTaskDialogOpen: boolean;
}

const initialState: UIState = {
  isAddTaskDialogOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAddTaskDialog: (state) => {
      state.isAddTaskDialogOpen = true;
    },
    closeAddTaskDialog: (state) => {
      state.isAddTaskDialogOpen = false;
    },
  },
});

export const { openAddTaskDialog, closeAddTaskDialog } = uiSlice.actions;

export default uiSlice.reducer;
