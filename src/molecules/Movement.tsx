import { Text, View, Button } from 'react-native'
import { Link } from "expo-router"
import { Counterr } from '@/atoms/Counter';

export type MovementParams = {
  weight: number,
  percent: number,
  reps: number,
  amrap: boolean,
}

export function Movement(params: MovementParams) {
  return ( 
  <View>
    <View><Counterr number={params.weight}/><Counterr number={params.percent * 100}/></View>
    <Text>x{params.reps}{!params.amrap || '+'}</Text>
    <Text>45 35 25 1</Text>
  </View>)
}