import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppRouter } from "./router";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </Provider>
  );
}

export default App;
