import { LocalDate } from "@js-joda/core";
import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";

export type GraphParams = {
  dataSets: {
    data:
    {
      date: LocalDate,
      value: number,
    }[],
    color: string
  }[]
}
export function Graph({
  dataSets,
}: GraphParams) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const update = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
    setHeight(event.nativeEvent.layout.height)
  }

  let labels = new Set<string>()

  const processedDataSets:Dataset[] = []

  dataSets.forEach(dataSet => {
    let dataSummary: number[] = []
    dataSet.data.sort((dataPointA, dataPointB) => dataPointA.date.toEpochDay() - dataPointB.date.toEpochDay()).forEach((dataPoint) => {
      labels.add(`${dataPoint.date.month().ordinal() + 1}/${dataPoint.date.dayOfMonth()}`)
      dataSummary.push(dataPoint.value)
    })

    const processedDatSet = {
      data: dataSummary.length ? dataSummary : [1],
      color: (opacity = 1) => dataSet.color,//`rgb(134, 65, 244, ${opacity})`, TODO: Replace this with a theme color
    }

    processedDataSets.push(processedDatSet)
  })

  if (!labels.size) {
    labels.add('Empty')
  }

  return (
    <View onLayout={update} style={{ flex: 1 }}>
      <LineChart
        data={{
          labels: Array.from(labels.values()),
          datasets: processedDataSets,
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
