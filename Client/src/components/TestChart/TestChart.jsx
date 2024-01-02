import Chart from "../../ui/PieChart/PieChart";
import styles from "./TestChart.module.css";

const TestChart = () => {
  return (
    <div className={styles.pieChartCover}>
      <Chart id="chart" />
    </div>
  );
};

export default TestChart;
