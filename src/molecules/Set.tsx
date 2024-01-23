import { Text, View, Button } from 'react-native'
import { Link } from "expo-router"
import { Adjustable } from '@/atoms';
import { PlateCalculator } from '@/molecules/PlateCalculator';
import { Checkbox } from 'react-native-paper';
import { useState } from 'react'

export type SetParams = {
  weight: number,
  percent: number,
  reps: number,
  amrap: boolean,
}

export function Set(params: SetParams) {
  const [checked, setChecked] = useState(false);

  return ( 
  <View>
    <View style={{flexDirection: 'row'}}>
      <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
      <View style={{flexDirection: 'row'}}>
        <Adjustable number={params.weight} />
        <Adjustable number={params.percent * 100} formatFn={(count) => `${count}%`} />
      </View>
    </View>
    <Text>x{params.reps}{!params.amrap || '+'}</Text>
    <PlateCalculator weight={params.weight} />
  </View>)
}