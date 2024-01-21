import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackedParams } from './types';

export default function Entry({navigation, route}: NativeStackScreenProps<StackedParams, 'Entry'>) {
  return (
    <View>
      <Text>yo</Text>
    </View>
  );
}