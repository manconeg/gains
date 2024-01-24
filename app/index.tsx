import { StyleSheet, Text, View } from 'react-native';
import { LiftCard } from '@/atoms';
import { MenuItem, Menu }  from '@/molecules'
import { Slot, Stack } from 'expo-router'

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
        <Text style={styles.header}>Today</Text>
        <LiftCard workout={todayWorkout}/>
        <Text style={styles.header}>Complete</Text>
        <LiftCard workout={completeWorkout}/>
        <Menu items={menuItems} />
        <Text style={styles.header}>This week</Text>
        <Text style={styles.header}>This cycle</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    borderColor: 'black',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    width: '100%',
  },
})
