import { StyleSheet, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Graph } from '@/molecules'
import { Stack } from 'expo-router';
import { useState, useContext } from 'react';
import { Adjustable } from '@/atoms';
import { Set } from '@/molecules';
import { useLocalSearchParams } from 'expo-router'
import { WorkoutContext } from '@/contexts/WorkoutContext';

export default function Workout() {
  const workouts = useContext(WorkoutContext);
  const { workoutId } = useLocalSearchParams<{workoutId: string}>();
  // const params = useLocalSearchParams<WorkoutParams>()
  
  const workout = workouts[Number(workoutId)]
  const movement = workout.movements[0]

  const [trainingMax, setTrainingMax] = useState(movement.max)
  
  return (
    <ScrollView>
        <Stack.Screen options={{title: movement.name,}}/>
        <View style={{flexDirection: 'row'}}>
          <Text>Training Max</Text>
          <Adjustable number={trainingMax} onChange={(number, type) => setTrainingMax(number)} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>220 PR </Text>
          <Text>230 PR calc</Text>
        </View>
        <View>
          <Text>Progress</Text>
          <Graph data={[5, 2, 8, 2, 6, 8, 9, 10]}/>
        </View>
        <View>
            <Text>Upcoming Sets</Text>
            {movement.sets.map((set, key) => <Set key={key} weight={{max: movement.max, percent: set.percent}} reps={5} amrap={set.amrap} complete={set.complete} />)}
            <View>
                <Text>New Set</Text>
                <Text>Weight Select</Text>
                <Text>Percent Slider</Text>
                <Text>Type weight</Text>
                <Text>Add</Text>
            </View>
        </View>
        <View>
            <Text>Complete Sets</Text>
            <View>
                <Text>Edit</Text>
                <Text>130 65%</Text>
                <Text>5 of 5</Text>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
