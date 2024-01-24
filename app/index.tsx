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
  return (
    <View style={styles.container}>
        <Stack.Screen options={{title: 'In Thickness',}}/>
        <Text style={styles.header}>Today</Text>
        <LiftCard />
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
