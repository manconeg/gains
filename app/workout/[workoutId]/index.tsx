import { WorkoutContext } from '@/contexts/WorkoutContext';
import { MovementCard } from '@/organisms';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function Workout() {
  const workouts = useContext(WorkoutContext);
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
  // const params = useLocalSearchParams<WorkoutParams>()

  const workout = workouts[Number(workoutId)]

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 3 }}>
      <Stack.Screen options={{ title: `${workout.variation} ${workout.day} - ${workout.date.toUTCString()}`, }} />
      {workout.movements.map((movement, key) => <MovementCard key={key} workoutId={workoutId} movementId={key} movement={movement} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 0,
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})
