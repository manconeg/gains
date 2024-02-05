import { useWorkouts } from '@/contexts';
import { MovementCard } from '@/organisms';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function Workout() {
  const workouts = useWorkouts();
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
  // const params = useLocalSearchParams<WorkoutParams>()

  const workout = workouts[Number(workoutId)]

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 3 }}>
      <Stack.Screen options={{ title: `${workout.variation} ${workout.day} - ${workout.date.toString()}`, }} />
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
