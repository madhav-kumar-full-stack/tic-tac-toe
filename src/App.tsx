import { Route, Routes } from "react-router";
import Layout from "./pages/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Provider } from "react-redux";
import store from "./store/store";
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeflex/primeflex.css'; // flex
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
