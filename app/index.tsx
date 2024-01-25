import { StyleSheet, View } from 'react-native';
import { LiftCard } from '@/atoms';
import { MenuItem, Menu }  from '@/molecules'
import { Slot, Stack } from 'expo-router'
import { Divider, Text } from 'react-native-paper';
import { WorkoutContext } from '@/contexts/WorkoutContext';
import { useContext } from 'react';

export default function App() {
  const menuItems: MenuItem[] = [
    { text: '  {Log Workout}', link: 'workout' },
    { text: '  Log Sleep', link: 'sleep' },
    { text: '  Log Food', link: 'food' },
  ]
  const workouts = useContext(WorkoutContext);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'In Thickness (and in health)',}}/>
      <Text>Today</Text>
      <Divider />
      <View style={styles.movement}>
          {workouts.map((workout, key) => <LiftCard key={key} id={key} workout={workout}/>)}
      </View>
      <Menu items={menuItems} />
      <Text>This week</Text>
      <Divider />
      <Text>This cycle</Text>
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  movement: {
    // backgroundColor: 'black',
    alignItems: 'center',
  },
})
