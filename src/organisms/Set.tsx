import { Adjustable } from '@/atoms';
import { PlateCalculator, LiftCard } from '@/molecules';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Checkbox, Text } from 'react-native-paper';

type TrainingMaxWeight = {
  max: number,
  percent: number,
}

export type SetParams = {
  weight: number | TrainingMaxWeight,
  reps: number,
  amrap: boolean,
  complete: boolean,
}

function calcWeight(max: number, percent: number) {
  return Math.ceil((max * percent) / 5) * 5
}

export function Set(params: SetParams) {
  const [checked, setChecked] = useState(params.complete);
  const [isTrainingMax, setTrainingMax] = useState(typeof params.weight === "number")
  const [percent, setPercent] = useState(0)
  const [weight, setWeight] = useState(0)

  useEffect(() => {
    if (typeof params.weight === "number") {
      setTrainingMax(false)
      setWeight(params.weight)
    }
    else {
      setTrainingMax(true)
      setPercent(params.weight.percent)
      setWeight(params.weight.max * percent)
    }
  }, [params])

  useEffect(() => {
    if (typeof params.weight === "number") {
      setWeight(params.weight)
    }
    else {
      setWeight(calcWeight(params.weight.max, percent))
    }
  }, [percent])

  return (
    <LiftCard>
      <LiftCard.Left>
        <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
      </LiftCard.Left>
      <LiftCard.Content>
        <View style={{ flexDirection: 'row' }}>

          {isTrainingMax
            ? (<View style={{ flexDirection: 'row' }}><Text>{weight}</Text><Adjustable number={percent * 100} increment={5} formatFn={(count) => `${count}%`} onChange={(number, type) => setPercent(number / 100)} /></View>)
            : <View style={{ flexDirection: 'row' }}><Adjustable number={weight} increment={5} onChange={(number, type) => setWeight(number)} /></View>}
        </View>
        <Text>x{params.reps}{!params.amrap || '+'}</Text>
        <PlateCalculator weight={weight} />
      </LiftCard.Content>
    </LiftCard>
  )
}