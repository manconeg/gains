import { WorkoutContext } from '@/contexts';
import { Graph } from '@/molecules';
import { MiniCalendar, WorkoutCard } from '@/organisms';
import { Stack } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedFAB, Text, useTheme } from 'react-native-paper';

export default function App() {
  const workouts = useContext(WorkoutContext);
  const styles = makeStyles();
  // const fabStyle = { [animateFrom]: 16 };

  const liftData = [{
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
  },];

  return (
    <View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 3 }}>
        <View><Text style={styles.header}>Today's Programming</Text></View>
        <View style={styles.movement}>
          {workouts.map((workout, key) => <WorkoutCard key={key} id={key} workout={workout} />)}
        </View>
        <Text style={styles.header}>Week</Text>
        <MiniCalendar />
        <Text style={styles.header}>Stats</Text>
        <Graph data={liftData} />
      </ScrollView>
      <AnimatedFAB
        icon={'plus'}
        label={'New Workout'}
        extended={true}
        onPress={() => console.log('Pressed')}
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