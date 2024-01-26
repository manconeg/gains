import { WorkoutCard } from '@/organisms';
import { WorkoutContext } from '@/contexts/WorkoutContext';
import { Menu, MenuItem } from '@/molecules';
import { Stack } from 'expo-router';
import { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Divider, Text, useTheme } from 'react-native-paper';

export default function App() {
  const menuItems: MenuItem[] = [
    { text: '  {Log Workout}', link: 'workout' },
    { text: '  Log Sleep', link: 'sleep' },
    { text: '  Log Food', link: 'food' },
  ]
  const workouts = useContext(WorkoutContext);
  const styles = makeStyles();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding: 3}}>
      <Stack.Screen options={{ title: 'In Thickness (and in health)', }} />
      <Text style={styles.header}>Today</Text>
      <Divider />
      <View style={styles.movement}>
        {workouts.map((workout, key) => <WorkoutCard key={key} id={key} workout={workout} />)}
      </View>
      <Menu items={menuItems} />
      <Text>This week</Text>
      <Divider />
      <Text>This cycle</Text>
      <Divider />
    </ScrollView>
  )
}

function makeStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    header: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    container: {
    },
    movement: {

    },
  })
}