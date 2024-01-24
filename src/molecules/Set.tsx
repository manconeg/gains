import { Text, View, Button } from 'react-native'
import { Adjustable } from '@/atoms';
import { PlateCalculator } from '@/molecules/PlateCalculator';
import { Checkbox } from 'react-native-paper';
import { useEffect, useState } from 'react'

type TrainingMaxWeight = {
  max: number,
  percent: number,
}

export type SetParams = {
  weight: number | TrainingMaxWeight,
  reps: number,
  amrap: boolean,
}

function calcWeight(max: number, percent: number)
{
  return Math.ceil((max * percent) / 5) * 5
}

export function Set(params: SetParams) {
  const [checked, setChecked] = useState(false);
  const [isTrainingMax, setTrainingMax] = useState(typeof params.weight === "number")
  const [percent, setPercent] = useState(0)
  const [weight, setWeight] = useState(0)

  useEffect(() => {
    if(typeof params.weight === "number")
    {
      setTrainingMax(false)
      setWeight(params.weight)
    }
    else
    {
      setTrainingMax(true)
      setPercent(params.weight.percent)
      setWeight(params.weight.max * percent)
    }
  }, [params])

  useEffect(() => {
    if(typeof params.weight === "number")
    {
      setWeight(params.weight)
    }
    else
    {
      setWeight(calcWeight(params.weight.max, percent))
    }
  }, [percent])

  return ( 
  <View>
    <View style={{flexDirection: 'row'}}>
      <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
      {isTrainingMax
      ? (<View style={{flexDirection: 'row'}}><Text>{weight}</Text><Adjustable number={percent * 100} increment={5} formatFn={(count) => `${count}%`} onChange={(number, type) => setPercent(number / 100)} /></View>)
      : <View style={{flexDirection: 'row'}}><Adjustable number={weight} increment={5} onChange={(number, type) => setWeight(number)} /></View>}
    </View>
    <Text>x{params.reps}{!params.amrap || '+'}</Text>
    <PlateCalculator weight={weight} />
  </View>)
}