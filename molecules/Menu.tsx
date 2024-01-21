import { Text, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackedParams } from './types';

export default function Menu({navigation, route}: NativeStackScreenProps<StackedParams, 'Menu'>) {
  const params = route.params;
  return (
    <View>
      <Text>{params.title}</Text>
      {params.items.map((item) => { return (<Button title={item} onPress={() => navigation.navigate('Entry')}/>)})}
    </View>
  );
}