import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./pages/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
