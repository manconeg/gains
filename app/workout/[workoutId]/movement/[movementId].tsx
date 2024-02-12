import { useWorkouts, useWorkoutsDispatch, WorkoutsActions } from '@/contexts';
import { Set, SetGroup } from '@/models/Workout';
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
  const [createSet, setCreateSet] = useState(false)
  const [timerContext, setTimerContext] = useState({
    onComplete: (reps: number) => { },
    active: false,
    set: {},
  })

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

  const startTimer = (set: Set, setGroup: SetGroup) => () => {
    setTimerContext({
      onComplete: (reps: number) => {
        recordSet(setGroup, set, reps, set.percent * maxLift)
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
            <ProgressGraph workouts={workouts} movement={movement} />
          </Card>
        </View>
        <View>
          {createSet &&
            <View>
              <Text style={styles.header}>New set</Text>
              <SetCard onStart={createSet} selected={true} weight={{ max: movement.max }} />
            </View>}
          {[...movement.setGroups].sort((setGroupA, setGroupB) => !setGroupB.sets.find(set => !set.complete) ? -1 : 1).map(setGroup => (
            <View key={setGroup.id}>
              <Text style={styles.header}>{setGroup.name} sets</Text>
              {[...setGroup.sets].sort((setA, setB) => setB.complete ? -1 : 1).map((set, position) => <SetCard onStart={!set.complete && !timerContext.active && startTimer(set, setGroup)} key={set.id} weight={{ max: movement.max }} set={set} selected={position == 0} />)}
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