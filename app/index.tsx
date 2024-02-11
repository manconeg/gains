import { useWorkouts } from '@/contexts';
import { ProgressGraph } from '@/molecules';
import { MiniCalendar, WorkoutCard } from '@/organisms';
import { Stack, router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedFAB, Text, useTheme } from 'react-native-paper';

export default function App() {
  const workouts = useWorkouts();
  const styles = makeStyles();
  // const fabStyle = { [animateFrom]: 16 };

  return (
    <View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 3 }}>
        <View><Text style={styles.header}>Today's Programming</Text></View>
        <View style={styles.movement}>
          {workouts.map(workout => <WorkoutCard key={workout.id} workout={workout} />)}
        </View>
        <Text style={styles.header}>Week</Text>
        <MiniCalendar workouts={workouts} />
        <Text style={styles.header}>Stats</Text>
        <ProgressGraph workouts={workouts} movement={"dl"} />
      </ScrollView>
      <AnimatedFAB
        icon={'plus'}
        label={'New Workout'}
        extended={true}
        onPress={() => router.navigate(`workout/new`)}
        visible={true}
        animateFrom={'right'}
        // iconMode={'static'}
        style={[styles.fabStyle]}
      />
      <Stack.Screen options={{ title: 'In Thickness (and in health)', }} />
    </View>
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