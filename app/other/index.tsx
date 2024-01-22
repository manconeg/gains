import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Menu from '../../molecules/Menu'

type OtherParams = {
  input: string
}

export default function App() {
  const params = useLocalSearchParams<OtherParams>();

  return (
    <View>
        <Menu title={params.input || 'missing'} items={['input']} />
        <StatusBar style="auto" />
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
});
