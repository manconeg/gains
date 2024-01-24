import { StyleSheet, View } from 'react-native';
import { LiftCard } from '@/atoms';
import { MenuItem, Menu }  from '@/molecules'
import { Slot, Stack } from 'expo-router'
import { Divider, Text } from 'react-native-paper';

export default function App() {
  const menuItems: MenuItem[] = [
    { text: '  {Log Workout}', link: 'workout' },
    { text: '  Log Sleep', link: 'sleep' },
    { text: '  Log Food', link: 'food' },
  ]

  const todayWorkout = {
        date: new Date(2023, 2, 23),
        movements: [{
            name: "Bench Press",
            max: 240 * .9,
            sets: [
                {
                    reps: 5,
                    amrap: false,
                    percent: .75,
                }, {
                    reps: 3,
                    amrap: false,
                    percent: .85,
                }, {
                    reps: 1,
                    amrap: true,
                    percent: .95,
                }
            ]
        },]
    }

    const completeWorkout = {
          date: new Date(2023, 2, 23),
          complete: true,
          movements: [{
              name: "Bench Press",
              max: 240 * .9,
              sets: [
                  {
                      reps: 5,
                      amrap: false,
                      percent: .75,
                  }, {
                      reps: 3,
                      amrap: false,
                      percent: .85,
                  }, {
                      reps: 1,
                      amrap: true,
                      percent: .95,
                  }
              ]
          },]
      }

  return (
    <View style={styles.container}>
        <Stack.Screen options={{title: 'In Thickness',}}/>
        <Text>Today</Text>
        <Divider />
        <View style={styles.movement}>
            <LiftCard workout={todayWorkout}/>
            <LiftCard workout={completeWorkout}/>
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
    flex: 1,
  },
  movement: {
    // backgroundColor: 'black',
    alignItems: 'center',
  },
})
