import { StyleSheet, Text, View } from 'react-native'
import { MenuItem, Menu } from '../../src/molecules/Menu'

export default function App() {
  const menuItems: MenuItem[] = [
    { text: 'Lift', link: 'activity/workout' },
    { text: 'Sweat', link: '' },
  ]

  return (
    <View>
        <Menu items={menuItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
