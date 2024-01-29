import { LiftCard, PlateCalculator } from '@/molecules';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

type TrainingMaxWeight = {
  max: number,
  percent: number,
}

export type SetParams = {
  weight: number | TrainingMaxWeight,
  reps: number,
  amrap: boolean,
  complete: boolean,
  selected: boolean,
}

function calcWeight(max: number, percent: number) {
  return Math.ceil((max * percent) / 5) * 5
}

export function Set(params: SetParams) {
  const [checked, setChecked] = useState(params.complete);
  const [isTrainingMax, setTrainingMax] = useState(typeof params.weight === "number")
  const [percent, setPercent] = useState(0)
  const [weight, setWeight] = useState(0)
  const styles = makeStyles()

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
        {params.selected && <Text style={styles.currentSet}>Current set</Text>}
        <View style={[styles.weightBox, params.selected && styles.selected]}>
          <Text style={styles.weight}>{weight}</Text>
          <View style={styles.lbsContainer}><Text style={styles.lbs}>lbs</Text></View>
        </View>
        <PlateCalculator weight={weight} />
      </LiftCard.Content>
      <LiftCard.Action>
        <Text>x{params.reps}{!params.amrap || '+'}</Text>
      </LiftCard.Action>
    </LiftCard>
  )
}

function makeStyles() {
  return StyleSheet.create({
    weight: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    weightBox: {
      flexDirection: 'row',
    },
    selected: {
      height: 100,
    },
    currentSet: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    lbs: {
    },
    lbsContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    fabStyle: {
    },
  })
}