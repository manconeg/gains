import { StyleSheet, View } from 'react-native';
import { Card, Divider, useTheme, Text } from 'react-native-paper';
import { Workout } from '@/data/types';
import { Instant, TemporalAdjusters, DayOfWeek, ChronoField, ZoneId, TemporalField, ChronoUnit, TemporalUnit, ZoneOffset } from '@js-joda/core'

type MiniCalendarParams = {
    workouts: Workout[],
    id: number,
}

export function MiniCalendar({workouts}: MiniCalendarParams) {
    
    const styles = makeStyles();
    const todayLocal = Instant.now().atZone(ZoneId.SYSTEM).truncatedTo(ChronoUnit.DAYS)
    const pastSunday = todayLocal.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY))
    const thisSaturday = todayLocal.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY))

    const activities: Workout[][] = [[], [], [], [], [], [], []]
    
    workouts
        .filter(workout => workout.date.isAfter(pastSunday.toInstant()))
        .filter(workout => workout.date.isBefore(thisSaturday.toInstant()))
        .forEach(workout => activities[workout.date.atZone(ZoneId.SYSTEM).get(ChronoField.DAY_OF_WEEK)].push(workout))

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