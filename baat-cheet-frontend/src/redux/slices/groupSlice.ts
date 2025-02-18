import { createSlice } from "@reduxjs/toolkit";

interface Groups {
  groups: any;
  groupMessages: any;
  selectedGroupId: string | null;
}

const initialState: Groups = {
  groups: [],
  groupMessages: [],
  selectedGroupId: null,
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
    setSelectedGroup: (state, action) => {
      state.selectedGroupId = action.payload;
    },
    setGroupMessages: (state, action) => {
      state.groupMessages = action.payload;
    },
    addGroupMessage: (state, action) => {
      console.log("in group slice", action.payload);
      state.groupMessages = [...state.groupMessages, action.payload];
    },
  },
});

export const {
  setGroups,
  addGroup,
  setSelectedGroup,
  setGroupMessages,
  addGroupMessage,
} = groupSlice.actions;
export default groupSlice.reducer;
