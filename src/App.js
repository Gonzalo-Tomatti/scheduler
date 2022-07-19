import "./App.css";
import Login from "./pages/Login";
import Scheduler from "./pages/Scheduler";
import NotFound from "./pages/NotFound";
import { Route, Routes, HashRouter } from "react-router-dom";
import { GlobalProvider } from "./context";

function App() {
  return (
    <HashRouter>
      <GlobalProvider>
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </GlobalProvider>
    </HashRouter>
  );
}

export default App;
