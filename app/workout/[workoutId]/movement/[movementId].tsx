import { Adjustable } from '@/atoms';
import { WorkoutContext } from '@/contexts/WorkoutContext';
import { Graph } from '@/molecules';
import { Set } from '@/organisms';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function Movement() {
  const workouts = useContext(WorkoutContext)
  const { movementId, workoutId } = useLocalSearchParams<{ movementId: string, workoutId: string }>();
  // const params = useLocalSearchParams<WorkoutParams>()

  const workout = workouts[Number(workoutId)]
  const movement = workout.movements[Number(movementId)]

  const [trainingMax, setTrainingMax] = useState(movement.max)

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 3 }}>
      <Stack.Screen options={{ title: movement.name, }} />
      <View style={{ flexDirection: 'row' }}>
        <Text>Training Max</Text>
        <Adjustable number={trainingMax} onChange={(number, type) => setTrainingMax(number)} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>220 PR </Text>
        <Text>230 PR calc</Text>
      </View>
      <View>
        <Text>Progress</Text>
        <Card>
          <Graph data={[{
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
          },]} />
        </Card>
      </View>
      <View>
        <Text>Upcoming Sets</Text>
        {movement.setGroups.map((setGroup, key) => (
          <View key={key}>
            <Text>{setGroup.name}</Text>
            {setGroup.sets.map((set, key) => <Set key={key} weight={{ max: movement.max, percent: set.percent }} reps={5} amrap={set.amrap} complete={set.complete} />)}
          </View>
        ))}
        <Card>
          <Text>New Set</Text>
          <Text>Weight Select</Text>
          <Text>Percent Slider</Text>
          <Text>Type weight</Text>
          <Text>Add</Text>
        </Card>
      </View>
      <View>
        <Text>Complete Sets</Text>
        <Card>
          <Text>Edit</Text>
          <Text>130 65%</Text>
          <Text>5 of 5</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {

  },
})
