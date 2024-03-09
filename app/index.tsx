import { useWorkouts } from '@/contexts';
import { ProgressGraph, RestCard } from '@/molecules';
import { MiniCalendar, WorkoutCard } from '@/organisms';
import { LocalDate } from '@js-joda/core';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { FloatingAction } from '@/contexts';
import { router } from 'expo-router';

export default function App() {
  const allWorkouts = useWorkouts();
  const todayLocal = LocalDate.now()
  const workouts = allWorkouts.filter(workout => workout.date.isEqual(todayLocal));
  const styles = makeStyles();

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
        <FloatingAction
            icon={'check'}
            label={'Create Workout'}
            onPress={() => { router.navigate('workout/new') }}
            visible={true}
        />
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
  })
}