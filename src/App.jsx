import "./App.css";
import WrapperDashLineChart from "./components/DashLIneChart/WrapperDashLineChart";
import WrapperLineChart from "./components/LIneChart/WrapperLineChart";
import WrapperStackedBar from "./components/Stack/WrapperStackedBar";
import WrapperTestFive from "./components/TestFive/WrapperTestFive";
import { TestFour } from "./components/TestFour/TestFour";
import WrapperTestSix from "./components/TestSix/WrapperTestSix";

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
      <div className="mb-20">
        <WrapperTestFive />
      </div>
      <div className="mb-20">
        <WrapperTestSix />
      </div>
    </>
  );
}

export default App;
