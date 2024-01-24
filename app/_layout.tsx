import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );
  
  return (
    <PaperProvider theme={paperTheme}>
      <Stack screenOptions={{
        // headerStyle: {...styles.header, backgroundColor: paperTheme.colors.primaryContainer},
        // headerTintColor: paperTheme.colors.primary,
        // headerTitleStyle: {
        //   // fontWeight: 'bold',
        // },
        header: (params) => <Appbar.Header>
            {params.back ? <Appbar.BackAction onPress={() => params.navigation.goBack()} /> : ''}
            <Appbar.Content title={params.options.title} />
            {/* <Appbar.Action icon="calendar" onPress={() => {}} />
            <Appbar.Action icon="magnify" onPress={() => {}} /> */}
          </Appbar.Header>,
        contentStyle: {...styles.container, backgroundColor: paperTheme.colors.background}
      }} />
      <StatusBar style="auto" />
    </PaperProvider>)
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