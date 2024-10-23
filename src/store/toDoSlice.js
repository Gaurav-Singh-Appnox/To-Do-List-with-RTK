import { createSlice } from "@reduxjs/toolkit";

const savedToDoList = localStorage.getItem("toDoList");
const initialState = {
  toDo: {
    id: 0,
    text: "",
    done: false,
  },
  toDoList: savedToDoList ? JSON.parse(savedToDoList) : [],
  isEditing: false,
  editId: null,
};

const toDoSlice = createSlice({
  name: "toDoSlice",
  initialState,
  reducers: {
    setToDo: (state, action) => {
      state.toDo.text = action.payload; // Set the input value correctly
    },

    addToDo: (state) => {
      if (state.toDo.text.trim() === "") return;
      if (state.isEditing) {
        console.log('update clicked')
        state.toDoList = state.toDoList.map((item) =>
          item.id === state.editId ? { ...item, text: state.toDo.text } : item
        );
        state.isEditing = false;
        state.editId = null;
      } else {
        const newToDo = { ...state.toDo, id: state.toDoList.length + 1 };
        state.toDoList.push(newToDo);
      }
      localStorage.setItem("toDoList", JSON.stringify(state.toDoList));
      state.toDo.text = "";
    },
    removeToDo: (state, action) => {
      state.toDoList = state.toDoList.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("toDoList", JSON.stringify(state.toDoList));
    },
    editToDo: (state, action) => {
      const editToDo = state.toDoList.find(
        (item) => item.id === action.payload
      );
      if (editToDo) {
        console.log('edit clicked', editToDo.text)
        state.toDo = { ...editToDo };
        state.isEditing = true;
        state.editId = action.payload;
      }
    },
    markDone: (state, action) => {
      state.toDoList = state.toDoList.map((item) =>
        item.id === action.payload ? { ...item, done: true } : item
      );
      localStorage.setItem("toDoList", JSON.stringify(state.toDoList));
    },
  },
});

export const { addToDo, removeToDo, editToDo, markDone, setToDo } =
  toDoSlice.actions;

export default toDoSlice.reducer;
