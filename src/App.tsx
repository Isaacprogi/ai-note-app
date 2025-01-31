import { Provider } from "react-redux";
import store from "./store/store";
import NoteForm from "./components/NoteForm/NoteForm";
import NoteList from "./components/NoteList/NoteList";

export default function App() {
  return (
    <Provider store={store}>
      <div className="w-full flex">
          <div className="min-w-[15rem] flex-none h-[3rem]">
            <NoteList />
          </div>
          <div className="flex-auto">
            <NoteForm />
          </div>
      </div>
    </Provider>
  );
}
