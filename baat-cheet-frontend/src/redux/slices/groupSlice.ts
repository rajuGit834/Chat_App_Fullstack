import { createSlice } from "@reduxjs/toolkit";

interface Groups {
  groups: any;
}

const initialState: Groups = {
  groups: [],
};

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action) => {
        state.groups = action.payload;
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
  },
});

export const { setGroups, addGroup } = groupSlice.actions;
export default groupSlice.reducer;
