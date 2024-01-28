import { Workout } from '@/data/types';
import { ChronoField, ChronoUnit, DayOfWeek, TemporalAdjusters, LocalDate } from '@js-joda/core';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text, useTheme } from 'react-native-paper';

type MiniCalendarParams = {
    workouts: Workout[],
}

export function MiniCalendar({ workouts }: MiniCalendarParams) {
    const styles = makeStyles();
    const todayLocal = LocalDate.now()
    const pastSunday = todayLocal.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY))
    const thisSaturday = todayLocal.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY))

    const activities: Workout[][] = [[], [], [], [], [], [], []]

    workouts
        .filter(workout => workout.date.isAfter(pastSunday))
        .filter(workout => workout.date.isBefore(thisSaturday))
        .forEach(workout => activities[workout.date.get(ChronoField.DAY_OF_WEEK)].push(workout))

    return (
        <View>
            <Divider />
            <View style={styles.week}>
                <View style={styles.day}><Text>S</Text></View>
                <View style={styles.day}><Text>M</Text></View>
                <View style={styles.day}><Text>T</Text></View>
                <View style={styles.day}><Text>W</Text></View>
                <View style={styles.day}><Text>T</Text></View>
                <View style={styles.day}><Text>F</Text></View>
                <View style={styles.day}><Text>S</Text></View>
            </View>
            <View style={styles.week}>
                {activities.map((workoutsOfDay, key) => <View key={key} style={styles.day}>
                    {workoutsOfDay.length ? <Card style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <Card.Content><Text>{workoutsOfDay.length}</Text></Card.Content>
                    </Card> : null}
                </View>)}
            </View>
        </View>
    )
}

function makeStyles() {
    const theme = useTheme();

    return StyleSheet.create({
        week: {
            flexDirection: 'row',
        },
        day: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
        },
    })
}