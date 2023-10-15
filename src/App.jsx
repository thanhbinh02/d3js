import "./App.css";
import WrapperCombineLineAndBarChart from "./components/CombineLineAndBarChart/WrapperCombineLineAndBarChart";
import WrapperDashLineChart from "./components/DashLIneChart/WrapperDashLineChart";
import WrapperLineChart from "./components/LIneChart/WrapperLineChart";
import WrapperStackedBar from "./components/Stack/WrapperStackedBar";

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
      <div>
        <WrapperCombineLineAndBarChart />
      </div>
    </>
  );
}

export default App;
