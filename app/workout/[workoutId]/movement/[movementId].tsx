import { useWorkouts, useWorkoutsDispatch, WorkoutsActions } from '@/contexts';
import { Set } from '@/models/Workout';
import { LiftCard, LiftTimer, ProgressGraph } from '@/molecules';
import { SetCard } from '@/organisms';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedFAB, Card, Text } from 'react-native-paper';

const max = {
  "bp": 200
}

export default function Movement() {
  const workouts = useWorkouts()
  const workoutsDispatch = useWorkoutsDispatch()

  const styles = makeStyles()
  const { movementId, workoutId } = (() => {
    const params = useLocalSearchParams<{ movementId: string, workoutId: string }>()
    return { movementId: Number(params.movementId), workoutId: Number(params.workoutId)}
  })()

  const workout = workouts[workoutId]
  const movement = workout.movements[movementId]

  const maxLift = max['bp']
  const trainingMaxPercent = .9

  const [trainingMax, setTrainingMax] = useState(maxLift * trainingMaxPercent)
  const [createSet, setCreateSet] = useState(false)
  const [timerContext, setTimerContext] = useState({
    onComplete: (reps: number) => { },
    active: false,
    set: {},
  })

  const recordSet = (setGroupId: number, mySet: Set, repsPerformed: number, weightPerformed: number) => {
    workoutsDispatch({
      type: WorkoutsActions.ADD_REPS,
      workoutId,
      movementId,
      setGroupId,
      setId: 1,
      repsPerformed,
      weightPerformed,
    })
  }

  const startTimer = (set: Set, setGroupId: number) => () => {
    setTimerContext({
      onComplete: (reps: number) => {
        recordSet(setGroupId, set, reps, set.percent * maxLift)
        setTimerContext({ active: false, onComplete: () => { }, set: set })
      },
      active: true,
      set: set,
    })
  }

  return (
    <View>
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 3 }}>
        <Stack.Screen options={{ title: movement.name, }} />
        <Text style={styles.header}>Movement Information</Text>
        <LiftCard>
          <LiftCard.Content>
            <Text>Max {maxLift} [?]</Text>
            <Text>Training Max {trainingMax} (@ {100 * trainingMaxPercent}%)</Text>
          </LiftCard.Content>
        </LiftCard>
        <View>
          <Text style={styles.header}>Progress</Text>
          <Card>
            <ProgressGraph workouts={workouts} movement={movement.name} />
          </Card>
        </View>
        <View>
          {createSet &&
            <View>
              <Text style={styles.header}>New set</Text>
              <SetCard onStart={startTimer} selected={true} weight={{ max: movement.max }} />
            </View>}
          {movement.setGroups.map((setGroup, key) => (
            <View key={key}>
              <Text style={styles.header}>{setGroup.name} sets</Text>
              {setGroup.sets.map((set, key) => <SetCard onStart={!timerContext.active && startTimer(set, key)} key={key} weight={{ max: movement.max }} set={set} selected={key == 0} />)}
            </View>
          ))}
        </View>
      </ScrollView>
      <LiftTimer {...timerContext} />
      <AnimatedFAB
        icon={'plus'}
        label={'Add set'}
        extended={true}
        onPress={() => { setCreateSet(true) }}
        visible={!createSet}
        animateFrom={'right'}
        // iconMode={'static'}
        style={[styles.fabStyle]}
      />
    </View>
  );
}

function makeStyles() {
  return StyleSheet.create({
    header: {
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 5,
    },
    container: {

    },
    fabStyle: {
      bottom: 16,
      right: 16,
      position: 'absolute',
    },
  })
}