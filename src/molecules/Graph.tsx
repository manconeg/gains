import { LocalDate } from "@js-joda/core";
import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export type GraphParams = {
  data:
  {
    date: LocalDate,
    value: number,
  }[]
}

export function Graph({
  data,
}: GraphParams) {
  let dataSummary: number[] = []
  let labels = new Set<string>()
  data.sort((dataPointA, dataPointB) => dataPointA.date.toEpochDay() - dataPointB.date.toEpochDay()).forEach((dataPoint) => {
    labels.add(dataPoint.date.month().name())
    dataSummary.push(dataPoint.value)
  })

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const update = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
    setHeight(event.nativeEvent.layout.height)
  }

  if (!labels.size)
  {
    labels.add('Empty')
  }

  if (!dataSummary.length)
  {
    dataSummary.push(1)
  }

  return (
    <View onLayout={update} style={{ flex: 1 }}>
      <LineChart
        data={{
          labels: Array.from(labels.values()),
          datasets: [
            {
              data: dataSummary
            }
          ]
        }}
        width={width}
        height={220}
        transparent={true}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        // yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          // backgroundGradientFrom: "#fb8c00",
          // backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          // style: {
          //   borderRadius: 16
          // },
          // propsForDots: {
          //   r: "6",
          //   strokeWidth: "2",
          //   stroke: "#ffa726"
          // }
        }}
        bezier
        style={{
          //   marginVertical: 8,
          //   borderRadius: 16
        }}
      />
    </View>
  )
}
