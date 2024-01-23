import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { MenuItem, Menu } from '../../src/molecules/Menu'
import { Graph } from '@/molecules'
import { Stack } from 'expo-router';
import { Adjustable } from '@/atoms';
import { Set } from '@/molecules';

export default function App() {
  return (
    <ScrollView>
        <Stack.Screen options={{title: 'Deadlift',}}/>
        <View style={{flexDirection: 'row'}}>
          <Text>Training Max</Text>
          <Adjustable number={180} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>220 PR </Text>
          <Text>230 PR calc</Text>
        </View>
        <View>
          <Text>Progress</Text>
          <Graph data={[5, 2, 8, 2, 6, 8, 9, 10]}/>
        </View>
        <View>
            <Text>Upcoming Sets</Text>
            <Set weight={100} percent={.5} reps={5} amrap={false} />
            <Set weight={110} percent={.6} reps={5} amrap={false} />
            <Set weight={120} percent={.7} reps={3} amrap={false} />
            <View>
                <Text>New Set</Text>
                <Text>Weight Select</Text>
                <Text>Percent Slider</Text>
                <Text>Type weight</Text>
                <Text>Add</Text>
            </View>
        </View>
        <View>
            <Text>Complete Sets</Text>
            <View>
                <Text>Edit</Text>
                <Text>130 65%</Text>
                <Text>5 of 5</Text>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
