import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

type LayoutParams = {
  input: string
}

export default function HomeLayout() {
  const params = useLocalSearchParams<LayoutParams>()

  return (
    <View>
      <View style={styles.header}><Text>{params.input ?? 'Gains'}</Text></View>
      <View style={styles.container}><Slot /></View>
      <StatusBar style="auto" />
    </View>)
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})