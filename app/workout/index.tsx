import { StyleSheet, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Graph } from '@/molecules'
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Adjustable } from '@/atoms';
import { Set } from '@/molecules';
import { useLocalSearchParams } from 'expo-router'

type WorkoutParams = {
  id: string
}

export default function Workout() {
  const params = useLocalSearchParams<WorkoutParams>()

  const [trainingMax, setTrainingMax] = useState(180)
  const [useTrainingMax, setUseTrainingMax] = useState(true)
  
  return (
    <ScrollView>
        <Stack.Screen options={{title: 'Deadlift',}}/>
        <View style={{flexDirection: 'row'}}>
          <Text>Training Max</Text>
          <Adjustable number={trainingMax} onChange={(number, type) => setTrainingMax(number)} />
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
            <Set weight={{max: trainingMax, percent: .5}} reps={5} amrap={false} />
            <Set weight={110} reps={5} amrap={false} />
            <Set weight={120} reps={3} amrap={false} />
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
