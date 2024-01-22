import { StyleSheet, Text, View } from 'react-native'
import { MenuItem, Menu } from '../../src/molecules/Menu'

export default function App() {
  const menuItems: MenuItem[] = [
    { text: 'Too little', link: '' },
    { text: 'About enough', link: '' },
    { text: 'Plenty', link: '' }, 
    { text: 'Still asleep', link: '' },
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
