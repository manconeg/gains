import { useWorkouts } from '@/contexts';
import { WorkoutCard } from '@/organisms';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

export default function Workout() {
  const workouts = useWorkouts();
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

  const workout = workouts.find(workout => workout.id == workoutId)

  if (workout === undefined)
    return

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 3 }}>
      <Stack.Screen options={{ title: `${workout.variation} ${workout.day} - ${workout.date.toString()}`, }} />
      <WorkoutCard key={workout.id} workout={workout} big={true} />
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
