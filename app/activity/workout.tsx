import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { MenuItem, Menu } from '../../src/molecules/Menu'
import { Graph } from '../../src/molecules/Graph'
import { Stack } from 'expo-router';
import { Counterr } from '../../src/atoms/Counter';
import { Movement } from '../../src/molecules/Movement';

export default function App() {
  return (
    <ScrollView style={{flex: 1}}>
        <Stack.Screen options={{title: 'Deadlift',}}/>
        <View>
          <Text>Training Max</Text>
          <Counterr number={180} />
        </View>
        <Text>220 PR</Text>
        <Text>230 PR calc</Text>
        <Graph data={[5, 2, 8, 2, 6, 8, 9, 10]}/>
        <View><Text>5/5/5</Text><Text>3/3/3</Text><Text>5x5</Text></View>
        <View>
            <Text>Upcoming Sets</Text>
            <Movement weight={100} percent={.5} reps={5} amrap={false} />
            <Movement weight={110} percent={.6} reps={5} amrap={false} />
            <Movement weight={120} percent={.7} reps={3} amrap={false} />
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
