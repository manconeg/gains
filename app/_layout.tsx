import { WorkoutsProvider } from '@/contexts/WorkoutsContext'
import { LiftTimer } from '@/molecules'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useMemo } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { AnimatedFAB, Appbar, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, useTheme } from 'react-native-paper'
import { TimerProvider } from '@/contexts/TimerContext'
import { MD3Theme } from 'react-native-paper'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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
      <PaperProvider theme={paperTheme}>
        <WorkoutsProvider>
          <TimerProvider>
            {/* <View style={styles.backgroud}> */}
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
            {/* </View> */}
            <LiftTimer />
            {/* <AnimatedFAB
            icon={'plus'}
            label={'Add set'}
            extended={true}
            onPress={() => { }}
            visible={false}
            animateFrom={'right'}
            // iconMode={'static'}
            style={[styles.fabStyle]}
          /> */}
          </TimerProvider>
        </WorkoutsProvider>
        <StatusBar style="auto" />
      </PaperProvider>
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