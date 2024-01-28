import { WorkoutContext } from '@/contexts/WorkoutContext';
import { LiftCard } from '@/molecules';
import { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RectProps } from 'react-native-svg';

export default function Workout() {
    const workouts = useContext(WorkoutContext);

    const commitsData = [
        { date: "2017-01-02", count: 1 },
        { date: "2017-01-03", count: 2 },
        { date: "2017-01-04", count: 3 },
        { date: "2017-01-05", count: 4 },
        { date: "2017-01-06", count: 5 },
        { date: "2017-01-30", count: 2 },
        { date: "2017-01-31", count: 3 },
        { date: "2017-03-01", count: 2 },
        { date: "2017-04-02", count: 4 },
        { date: "2017-03-05", count: 2 },
        { date: "2017-02-30", count: 4 }
    ];
    let rectProps: RectProps = {}
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 3 }}>
            {/* <Card>
                <Card.Content>
                    <View><Text>Squats</Text></View>
                    <ContributionGraph
                        // style={{backgroundColor: 'red'}}
                        tooltipDataAttrs={(value) => rectProps}
                        values={commitsData}
                        endDate={new Date("2017-04-01")}
                        numDays={105}
                        width={200}
                        height={220}
                        // classForValue={() => 'red'}
                        chartConfig={{
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                        }}
                    />
                </Card.Content>
            </Card> */}
            <LiftCard>
                <LiftCard.Left>
                    <Text>squat</Text>
                    <Text>deadlift</Text>
                    <Text>ohp</Text>
                    <Text>row</Text>
                </LiftCard.Left>
                <LiftCard.Content>
                    <View style={{ flexDirection: 'row', flex: 1}}>
                        <View style={{ backgroundColor: '#00ff00', flex: 1 }} />
                        <View style={{ backgroundColor: '#00aa00', flex: 1 }} />
                        <View style={{ backgroundColor: '#008800', flex: 1 }} />
                        <View style={{ backgroundColor: '#006600', flex: 1 }} />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1}}>
                        <View style={{ backgroundColor: '#00aa00', flex: 1 }} />
                        <View style={{ backgroundColor: '#008800', flex: 1 }} />
                        <View style={{ backgroundColor: '#006600', flex: 1 }} />
                        <View style={{ backgroundColor: '#008800', flex: 1 }} />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1}}>
                        <View style={{ backgroundColor: '#008800', flex: 1 }} />
                        <View style={{ backgroundColor: '#006600', flex: 1 }} />
                        <View style={{ backgroundColor: '#008800', flex: 1 }} />
                        <View style={{ backgroundColor: '#00aa00', flex: 1 }} />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1}}>
                        <View style={{ backgroundColor: '#00aa00', flex: 1 }} />
                        <View style={{ backgroundColor: '#008800', flex: 1 }} />
                        <View style={{ backgroundColor: '#006600', flex: 1 }} />
                        <View style={{ backgroundColor: '#008800', flex: 1 }} />
                    </View>
                </LiftCard.Content>
            </LiftCard>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // padding: 0,
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
})
