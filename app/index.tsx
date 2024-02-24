import { useWorkouts } from '@/contexts';
import { ProgressGraph, RestCard } from '@/molecules';
import { MiniCalendar, WorkoutCard } from '@/organisms';
import { LocalDate } from '@js-joda/core';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function App() {
  const allWorkouts = useWorkouts();
  const todayLocal = LocalDate.now()
  const workouts = allWorkouts.filter(workout => workout.date.isEqual(todayLocal));
  const styles = makeStyles();
  // const fabStyle = { [animateFrom]: 16 };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 3 }}>
        <Text style={styles.header}>TODAY</Text>
        <View style={styles.movement}>
          {workouts.length ? [...workouts].sort((a, b) => b.complete ? -1 : 1).map(workout => <WorkoutCard key={workout.id} workout={workout}/>) : <RestCard />}
        </View>
        <Text style={styles.header}>THIS WEEK</Text>
        <MiniCalendar workouts={workouts} />
        <Text style={styles.header}>PROGRESS</Text>
        <ProgressGraph workouts={allWorkouts} />
        <Stack.Screen options={{ title: 'In Thickness (and in health)', }} />
      </ScrollView>
    </>
  )
}

function makeStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    header: {
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 5,
    },
    container: {
    },
    movement: {

    },
    fabStyle: {
      bottom: 16,
      right: 16,
      position: 'absolute',
    },
  })
}