import { useWorkouts, useWorkoutsDispatch, WorkoutsActions } from '@/contexts';
import { Set, SetGroup } from '@/models/Workout';
import { LiftCard, ProgressGraph } from '@/molecules';
import { SetCard } from '@/organisms';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { TimerActions, useTimer, useTimerDispatch } from '@/contexts/TimerContext';

const max = {
  "bp": 200
}

export default function Movement() {
  const workouts = useWorkouts()
  const workoutsDispatch = useWorkoutsDispatch()
  const timerDispatch = useTimerDispatch()
  const timerContext = useTimer()

  const styles = makeStyles()
  const { movementId, workoutId } = useLocalSearchParams<{ movementId: string, workoutId: string }>()

  const workout = workouts.find(workout => workout.id == workoutId)

  if (workout === undefined)
    return

  const movement = workout.movements.find(movement => movement.id == movementId)

  if (movement === undefined)
    return

  const maxLift = max['bp']
  const trainingMaxPercent = .9

  const [trainingMax, setTrainingMax] = useState(maxLift * trainingMaxPercent)

  const recordSet = (setGroup: SetGroup, mySet: Set, repsPerformed: number, weightPerformed: number) => {
    workoutsDispatch({
      type: WorkoutsActions.ADD_REPS,
      workoutId: workout.id,
      movementId: movement.id,
      setGroupId: setGroup.id,
      setId: mySet.id,
      repsPerformed,
      weightPerformed,
      complete: true,
    })
  }

  const startTimer = (set: Set, setGroup: SetGroup) => {
    timerDispatch({
      type: TimerActions.START_TIMER,
      onTimerComplete: () => recordResult(set, setGroup),
    })
  }

  const recordResult = (set: Set, setGroup: SetGroup) => {
    timerDispatch({
      type: TimerActions.RECORD_REPS,
      initialReps: set.repsPerformed ? set.repsPerformed : set.reps,
      onComplete: (reps: number, seconds: number) => {
        recordSet(setGroup, set, reps, set.percent * trainingMax)
        timerDispatch({ type: TimerActions.STOP_TIMER })
      },
    })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 3 }}>
      <Stack.Screen options={{ title: movement.name, }} />
      <LiftCard>
        <LiftCard.Content>
          <Text>Max {maxLift} [?]</Text>
          <Text>Training Max {trainingMax} (@ {100 * trainingMaxPercent}%)</Text>
        </LiftCard.Content>
      </LiftCard>
      <Text style={styles.header}>Progress</Text>
      <Card>
        <ProgressGraph workouts={workouts} movement={movement} />
      </Card>
      {[...movement.setGroups].sort((setGroupA, setGroupB) => !setGroupB.sets.find(set => !set.complete) ? -1 : 1).map((setGroup, position) => (
        <View key={setGroup.id}>
          {!position && <Text style={styles.header}>Current Set</Text>}
          {[...setGroup.sets].sort((setA, setB) => setB.complete ? -1 : 1).map((set, position) => <SetCard busy={!timerContext.active} onStart={() => startTimer(set, setGroup)} onEdit={() => recordResult(set, setGroup)} key={set.id} weight={{ max: movement.max }} set={set} setGroup={setGroup} />)}
        </View>
      ))}
    </ScrollView>
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
  })
}