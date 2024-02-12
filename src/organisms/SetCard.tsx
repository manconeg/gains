import { Set } from '@/models/Workout';
import { LiftCard, PlateCalculator } from '@/molecules';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

type TrainingMaxWeight = {
  max: number,
}

export type SetParams = {
  weight: number | TrainingMaxWeight,
  set: Set,
  selected: boolean,
  onStart: false | ((set: Set) => void),
}

function calcWeight(max: number, percent: number) {
  return Math.ceil((max * percent) / 5) * 5
}

export function SetCard(params: SetParams) {
  const {set, selected, onStart} = params
  const [checked, setChecked] = useState(set.complete);
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
      setPercent(set.percent)
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
        <View style={styles.weightBox}>
          <Text style={[styles.weight, params.selected && styles.weightSelected]}>{weight}</Text>
          {/* <View style={styles.lbsContainer}><Text style={styles.lbs}>lbs</Text></View> */}
        <Text>x{set.reps}{!set.amrap || '+'}</Text>
        </View>
        <PlateCalculator weight={weight} />
      </LiftCard.Content>
      <LiftCard.Action>
        {onStart && <Button onPress={() => onStart(set)}>Start</Button>}
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
    weightSelected: {
      fontSize: 30,
    },
    weightBox: {
      flexDirection: 'row',
      justifyContent: 'center',
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