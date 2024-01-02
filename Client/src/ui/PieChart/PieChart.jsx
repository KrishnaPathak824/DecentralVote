import {
  lightningChart,
  LegendBoxBuilders,
  SliceLabelFormatters,
  Themes,
  SolidFill,
  ColorRGBA,
} from "@arction/lcjs";
import styles from "./PieChart.module.css";
import React, { useRef, useEffect } from "react";

const Chart = (props) => {
  const lc = lightningChart({
    // Valid until 1/31/2024
    license:
      "0002-n5lTV8LUoCASPW19aJudTTEPmg6cKwCYU27WzKE/BiVsYrAjRUjYm7J79qtc9tzZjvaZh6hyzwAlSMlt5bOiWWVy-MEUCIQCiB8nJUqVh6/L41KcsabvENh9ae+bdcHpQeMiYgyNbhAIgS/HPJZW+tOdYTqx5R8A3Hi+tPMpqL8b7iJzoKnIhEJE=",
    licenseInformation: {
      appTitle: "LightningChart JS Trial",
      company: "LightningChart Ltd.",
    },
  });

  const { data, id } = props;
  const chartRef = useRef(undefined);

  useEffect(() => {
    // Create Spider Chart and Three series

    const pie = lightningChart()
      .Pie({
        theme: Themes.light,
        container: id,
      })
      .setTitle("Number of Voters By Age")
      .setMultipleSliceExplosion(true);

    // Set background color to white
    pie.setBackgroundFillStyle(
      new SolidFill({ color: ColorRGBA(225, 226, 226) })
    );

    // // Set label and font color to black
    // pie.setLabelFillStyle(new SolidFill({ color: ColorRGBA(0, 0, 0, 1) }));

    // // Set pie chart outline color to black
    // pie.setSliceStrokeStyle((style) =>
    //   style.setFillStyle(new SolidFill({ color: ColorRGBA(0, 0, 0, 1) }))
    // );

    // ----- User defined data -----
    const data = [
      {
        name: "Planning",
        value: 40,
      },
      {
        name: "Development",
        value: 120,
      },
      {
        name: "Testing",
        value: 60,
      },
      {
        name: "Review",
        value: 24,
      },
      {
        name: "Bug Fixing",
        value: 90,
      },
    ];

    // ----- Create Slices -----
    const slices = data.map((item) => pie.addSlice(item.name, item.value));

    // Specify function which generates text for Slice Labels(LabelFormatter).

    pie.setLabelFormatter(SliceLabelFormatters.NamePlusRelativeValue);

    // ----- Add LegendBox -----
    pie
      .addLegendBox(LegendBoxBuilders.VerticalLegendBox)
      // Dispose example UI elements automatically if they take too much space. This is to avoid bad UI on mobile / etc. devices.
      .setAutoDispose({
        type: "max-width",
        maxWidth: 0.3,
      })
      .add(pie);

    //Return function that will destroy the Chart when component is unmounted
    return () => {
      //Destory Chart
      console.log("Destroy Chart");
      chartRef.current = undefined;
    };
  }, [id]);

  return <div id={id} className={styles.chart}></div>;
};

export default Chart;
