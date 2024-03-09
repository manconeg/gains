import { Workout } from '@/models';
import { ChronoField, DayOfWeek, LocalDate, TemporalAdjusters } from '@js-joda/core';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { DndProvider, Droppable, Draggable, DndProviderProps } from '@mgcrea/react-native-dnd';
import { State } from "react-native-gesture-handler";

type MiniCalendarParams = {
    workouts: Workout[],
}

export function MiniCalendar({ workouts }: MiniCalendarParams) {
    const styles = makeStyles();
    const todayLocal = LocalDate.now()
    const pastSunday = todayLocal.with(TemporalAdjusters.previous(DayOfWeek.SATURDAY))
    const thisSaturday = todayLocal.with(TemporalAdjusters.next(DayOfWeek.SATURDAY))

    const activities: Workout[][] = [[], [], [], [], [], [], []]

    workouts
        .filter(workout => workout.date.isAfter(pastSunday))
        .filter(workout => workout.date.isBefore(thisSaturday))
        .forEach(workout => activities[workout.date.get(ChronoField.DAY_OF_WEEK) - 1].push(workout))

    activities.unshift(activities.pop()!)

    const handleDragEnd: DndProviderProps["onDragEnd"] = ({ active, over }) => {
      "worklet";
      if (over) {
        console.log(active)
        console.log(over)
        console.log("onDragEnd", { active, over });
      }
    };
  
    const handleBegin: DndProviderProps["onBegin"] = () => {
      "worklet";
      console.log("onBegin");
    };
  
    const handleFinalize: DndProviderProps["onFinalize"] = ({ state }) => {
      "worklet";
      console.log("onFinalize");
      if (state !== State.FAILED) {
        console.log("onFinalize");
      }
    };

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
            <DndProvider onBegin={handleBegin} onFinalize={handleFinalize} onDragEnd={handleDragEnd} style={styles.week}>
                {activities.map((workoutsOfDay, key) =>
                    <Droppable id={"day-" + key} data={{ accepts: ["card-" + key] }} key={key} style={styles.day}>
                        <Draggable id={"card-" + key} style={styles.day}>
                            <Link href='aniTest'>
                                {workoutsOfDay.length ?
                                    <Card style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                        <Card.Content><Text>{workoutsOfDay.length}</Text></Card.Content>
                                    </Card> : null}
                            </Link>
                        </Draggable>
                    </Droppable>
                )}
            </DndProvider>
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