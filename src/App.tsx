import { Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import { PrimeReactProvider } from "primereact/api";

import store from "./store/store";

import Layout from "./pages/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
      </PrimeReactProvider>
    </Provider>
  );
}

export default App;
