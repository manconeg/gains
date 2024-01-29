import { WorkoutContext } from '@/contexts/WorkoutContext';
import { Graph, LiftCard, Timer } from '@/molecules';
import { Set } from '@/organisms';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedFAB, Card, Text, Button } from 'react-native-paper';

const max = {
  "bp": 200
}



export default function Movement() {
  const workouts = useContext(WorkoutContext)
  const styles = makeStyles()
  const { movementId, workoutId } = useLocalSearchParams<{ movementId: string, workoutId: string }>();
  // const params = useLocalSearchParams<WorkoutParams>()

  const workout = workouts[Number(workoutId)]
  const movement = workout.movements[Number(movementId)]

  const maxLift = max['bp']
  const trainingMaxPercent = .9

  const [trainingMax, setTrainingMax] = useState(maxLift * trainingMaxPercent)
  const [createSet, setCreateSet] = useState(false)

  const graphData = [{
    date: new Date('1995-12-17T03:24:00'),
    value: 50,
  }, {
    date: new Date('1996-1-17T03:24:00'),
    value: 60,
  }, {
    date: new Date('1996-2-17T03:24:00'),
    value: 70,
  }, {
    date: new Date('1996-2-17T03:24:00'),
    value: 80,
  }, {
    date: new Date('1996-3-17T03:24:00'),
    value: 90,
  }, {
    date: new Date('1996-4-17T03:24:00'),
    value: 100,
  },]

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
            <Graph data={graphData} />
          </Card>
        </View>
        <View>
          {createSet &&
            <View>
              <Text style={styles.header}>New set</Text>
              <Set selected={true} weight={{ max: movement.max, percent: trainingMaxPercent }} reps={5} amrap={false} complete={false} />
            </View>}
          {movement.setGroups.map((setGroup, key) => (
            <View key={key}>
              <Text style={styles.header}>{setGroup.name} sets</Text>
              {setGroup.sets.map((set, key) => <Set key={key} weight={{ max: movement.max, percent: set.percent }} reps={5} amrap={set.amrap} selected={key == 0} complete={set.complete} />)}
            </View>
          ))}
        </View>
      </ScrollView>
      <Timer seconds={90} />
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