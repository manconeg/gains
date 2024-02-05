import { WorkoutsProvider } from '@/contexts/WorkoutsContext'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useMemo } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { Appbar, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, useTheme } from 'react-native-paper'

export default function HomeLayout() {
  const colorScheme = useColorScheme()
  const { theme } = useMaterial3Theme()

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  )

  const styles = makeStyles()

  return (
    <PaperProvider theme={paperTheme}>
      <WorkoutsProvider>
        <Stack
          screenOptions={{
            // headerStyle: {...styles.header, backgroundColor: paperTheme.colors.primaryContainer},
            // headerTintColor: paperTheme.colors.primary,
            // headerTitleStyle: {
            //   // fontWeight: 'bold',
            // },
            header: (params) => (<Appbar.Header>
              {params.back ? <Appbar.BackAction onPress={() => params.navigation.goBack()} /> : ''}
              <Appbar.Content title={params.options.title} />
              {/* <Appbar.Action icon="calendar" onPress={() => {}} />
                <Appbar.Action icon="magnify" onPress={() => {}} /> */}
            </Appbar.Header>),
            contentStyle: styles.container,
          }} />
      </WorkoutsProvider>
      <StatusBar style="auto" />
    </PaperProvider>)
}

function makeStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    header: {
      // borderBottomWidth: 0,
    },
    container: {
      paddingHorizontal: 1,
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
  })
}