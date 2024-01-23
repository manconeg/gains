import { View, Text } from "react-native"

type PlateCalculatorParams = {
    weight: number,
    plates?: number[],
  }

export function PlateCalculator({weight, plates = [45, 25, 10, 5, 2.5]}: PlateCalculatorParams) {
    const set: Array<number> = new Array()

    let weightLeft = weight / 2
    plates.sort((x, y) => y - x).forEach((plate) => {
        let num = Math.floor(weightLeft / plate)
        while (num--)
        {
            set.push(plate)
            weightLeft -= plate
        }
    })

    return (
        <View style={{flexDirection: 'row'}}>
            {set.map((plate, key) => {
                return (<Text key={key} style={{marginRight: 10}}>{plate}</Text>)
            })}
        </View>
      )
  }