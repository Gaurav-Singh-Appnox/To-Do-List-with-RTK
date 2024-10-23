import { useDispatch, useSelector } from "react-redux";
import {
  addToDo,
  setToDo,
  removeToDo,
  editToDo,
  markDone,
} from "./store/toDoSlice";

function App() {
  const dispatch = useDispatch();
  const toDoList = useSelector((state) => state.toDoSlice.toDoList);
  const toDo = useSelector((state) => state.toDoSlice.toDo);
  const isEditing = useSelector((state) => state.toDoSlice.isEditing);
  const editId = useSelector((state) => state.toDoSlice.editId);

  const handleInputChange = (e) => {
    dispatch(setToDo(e.target.value));
  };

  const handleAddToDO = (e) => {
    e.preventDefault();
    if (isEditing) {
      console.log("isEditing", isEditing);
      dispatch(addToDo());
    } else {
      dispatch(addToDo());
    }
  };

  const handleDelete = (id) => {
    dispatch(removeToDo(id));
  };

  const handleEdit = (id) => {
    const itemToEdit = toDoList.find((item) => item.id === id);
    dispatch(setToDo(itemToEdit.text));
    dispatch(editToDo(id));
  };

  const handleDone = (id) => {
    dispatch(markDone(id));
  };

  return (
    <div className="w-[80vw] max-w-[1200px] mx-auto">
      <h1 className="text-4xl font-bold text-center">To-Do List</h1>
      <div className="mt-12">
        <form onSubmit={handleAddToDO} className="flex justify-between">
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Add new To-Do"
            value={toDo.text}
            className="outline flex-1 px-4"
          />
          <button
            type="submit"
            className="ml-12 border-2 border-black px-4 py-1"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </form>
        <div className="flex flex-col gap-4 mt-12 w-full min-h-96 bg-slate-300 p-4">
          {toDoList.length > 0 &&
            toDoList.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <p
                  className={`text-lg font-bold bg-white px-2 flex-1 ${
                    item.done ? "line-through" : ""
                  }`}
                >
                  {item.text}
                </p>
                <button
                  onClick={() => handleEdit(item.id)}
                  className="p-2 border-2 border-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDone(item.id)}
                  className="p-2 border-2 border-black"
                >
                  Done
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 border-2 border-black"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
