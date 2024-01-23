import { StyleSheet, Text, View } from 'react-native';
import { MenuItem, Menu }  from '@/molecules'

export default function App() {
  const menuItems: MenuItem[] = [
    { text: '  {Planned Activity}', link: 'activity' },
    { text: '  {adhoc Activity}', link: 'activity' },
    { text: '  Log Sleep', link: 'sleep' },
    { text: '  Log Food', link: 'food' },
  ]
  return (
    <View>
        <Text>Today</Text>
        <Menu items={menuItems} />
        <Text>This week</Text>
        <Text>This cycle</Text>
        <Text> New Cycle</Text>
        <Text>Stats</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
