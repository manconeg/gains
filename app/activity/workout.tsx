import { StyleSheet, Text, View } from 'react-native'
import { MenuItem, Menu } from '../../src/molecules/Menu'

export default function App() {
  return (
    <View>
        <View>Deadlift</View>
        <View>180 TM</View>
        <View>220 PR</View>
        <View>230 PR calc</View>
        <View><View>5/5/5</View><View>3/3/3</View><View>5x5</View></View>
        <View>
            <View>Upcoming Sets</View>
            <View>
                <View>100 50%</View>
                <View>x5</View>
                <View>45 35 25 1</View>
            </View>
            <View>
                <View>100 50%</View>
                <View>x5+</View>
                <View>PR 8</View>
                <View>Beat calc PR 8</View>
                <View>45 35 25 1</View>
            </View>
            <View>
                <View>New Set</View>
                <View>Weight Select</View>
                <View>Percent Slider</View>
                <View>Type weight</View>
                <View>Add</View>
            </View>
        </View>
        <View>
            <View>Complete Sets</View>
            <View>
                <View>Edit</View>
                <View>130 65%</View>
                <View>5 of 5</View>
            </View>
        </View>
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
})
