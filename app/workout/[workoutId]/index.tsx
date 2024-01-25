import { StyleSheet, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Graph } from '@/molecules'
import { Link, Stack } from 'expo-router';
import { useState, useContext } from 'react';
import { Adjustable } from '@/atoms';
import { Set } from '@/molecules';
import { useLocalSearchParams } from 'expo-router'
import { WorkoutContext } from '@/contexts/WorkoutContext';
import { MovementCard } from '@/molecules/MovementCard';

export default function Workout() {
  const workouts = useContext(WorkoutContext);
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
  // const params = useLocalSearchParams<WorkoutParams>()

  const workout = workouts[Number(workoutId)]

  return (
    <ScrollView>
      <Stack.Screen options={{ title: `${workout.variation} ${workout.day} - ${workout.date.toUTCString()}`, }} />
      {workout.movements.map((movement, key) => <MovementCard key={key} workoutId={workoutId} movementId={key} movement={movement} />)}
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
