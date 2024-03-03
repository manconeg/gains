import { DynamicFABProvider } from '@/contexts'
import { TimerProvider } from '@/contexts/TimerContext'
import { WorkoutsProvider } from '@/contexts'
import { LiftTimer } from '@/molecules'
import { DynamicFAB } from '@/molecules/DynamicFAB'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useMemo } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { Appbar, MD3DarkTheme, MD3LightTheme, MD3Theme, Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function HomeLayout() {
  const colorScheme = useColorScheme()
  const { theme } = useMaterial3Theme()

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  )

  const styles = makeStyles(paperTheme)

  return (
    <SafeAreaProvider style={styles.backgroud}>
      <QueryClientProvider client={queryClient}>
        <DynamicFABProvider>
          <PaperProvider theme={paperTheme}>
            <WorkoutsProvider>
              <TimerProvider>
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
                <LiftTimer />
                <DynamicFAB />
              </TimerProvider>
            </WorkoutsProvider>
            <StatusBar style="auto" />
          </PaperProvider>
        </DynamicFABProvider>
      </QueryClientProvider>
    </SafeAreaProvider>)
}

function makeStyles(theme: MD3Theme) {
  return StyleSheet.create({
    header: {
      // borderBottomWidth: 0,
    },
    backgroud: {
      backgroundColor: theme.colors.background,
    },
    container: {
      paddingHorizontal: 1,
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: theme.colors.background,
      marginHorizontal: 10,
    },
    fabStyle: {
      bottom: 16,
      right: 16,
      position: 'absolute',
    },
  })
}