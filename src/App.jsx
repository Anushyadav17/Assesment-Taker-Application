import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Testpage from "./pages/Testpage";
import Dashboard from "./pages/Dashboard";
import TestHomepage from "./pages/TestHomepage";
import { useSelector } from "react-redux";
import PerformancePage from "./pages/PerformancePage";
import ResultDetailsPage from "./pages/ResultDetailsPage";
import Error from "./pages/Error"
import SomethingwentWrong from "./components/SomethingwentWrong";
import CalculatingYourResult from "./components/CalculatingYourResult";

function App() {
  const { startTest } = useSelector((state) => state.test);
  const { token } = useSelector((state) => state.auth);

  return (
    <div>
      <Routes>
        {
          token !== null ? (
            startTest > 0 ? (
              <Route path="/testpage" element={<Testpage />} />
            ) : (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/test-home-page" element={<TestHomepage />} />
                <Route path="/performance" element={<PerformancePage />} />
                <Route path="/performance/result-details" element={<ResultDetailsPage />} />
              </>
            )
          ) : (
            <Route path="/" element={<Login />} />
          )
        }
        <Route path="/error" element={<SomethingwentWrong/>} />

        <Route path="*" element={<Error />} />
        <Route path="/result" element={<CalculatingYourResult/>} /> 

      </Routes>
    </div>
  );
}

export default App;
