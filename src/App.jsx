import "./App.css";
import WrapperDashLineChart from "./components/DashLIneChart/WrapperDashLineChart";
import WrapperLineChart from "./components/LIneChart/WrapperLineChart";
import WrapperStackedBar from "./components/Stack/WrapperStackedBar";
import { TestFour } from "./components/TestFour/TestFour";

function App() {
  return (
    <>
      <div className="mb-3">
        <WrapperStackedBar />
      </div>
      <div className="mb-3">
        <WrapperLineChart />
      </div>
      <div className="mb-3">
        <WrapperDashLineChart />
      </div>

      <div className="mb-20">
        <TestFour />
      </div>
    </>
  );
}

export default App;
