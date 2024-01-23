import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { PaperProvider, useTheme } from 'react-native-paper'
import { TitleContext } from '../src/TitleContext'

type LayoutParams = {
  input: string
}

export default function HomeLayout() {
  const params = useLocalSearchParams<LayoutParams>()
  const theme = useTheme();
  const context = useContext(TitleContext)

  return (
    <PaperProvider>
      <Stack screenOptions={{
        headerStyle: {...styles.header, backgroundColor: theme.colors.primary},
        headerTintColor: theme.colors.primaryContainer,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {...styles.container, backgroundColor: theme.colors.secondary}
      }} />
      <StatusBar style="auto" />
    </PaperProvider>)
    // return (
    //   <PaperProvider>
    //     <View>
    //       <View style={{...styles.header, backgroundColor: theme.colors.primary}}><Text>{context ?? 'Gains'}</Text></View>
    //       <View style={{...styles.container, backgroundColor: theme.colors.secondary}}><Slot /></View>
    //       <StatusBar style="auto" />
    //     </View>
    //   </PaperProvider>)
}

const styles = StyleSheet.create({
  header: {
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})