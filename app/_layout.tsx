import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PaperProvider, useTheme } from 'react-native-paper'

export default function HomeLayout() {
  const theme = useTheme();

  return (
    <PaperProvider>
      <Stack screenOptions={{
        headerStyle: {...styles.header, backgroundColor: theme.colors.primary},
        headerTintColor: theme.colors.primaryContainer,
        headerTitleStyle: {
          // fontWeight: 'bold',
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
    borderBottomWidth: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})