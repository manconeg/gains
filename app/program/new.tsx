import { fiveThreeOne } from '@/contexts/ProgramContext';
import { ProgramTemplate } from '@/models';
import { useState } from 'react';
import { LayoutChangeEvent, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { Stack } from 'expo-router';

function ProgramTemplateCard({ programTemplate, width }: { programTemplate: ProgramTemplate, width: number }) {
    return (
        <Card style={{ width: width }}>
            <Card.Content>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{programTemplate.name}</Text>
                <Text>Experience level: Intermediate/Advanced</Text>
                <Text>Repeats every: {programTemplate.daysBetweenSameWorkout} days</Text>
                {programTemplate.workoutStructure.map((structure, key) =>
                    <View>
                        <Text key={key}>{structure.name}</Text>
                        {structure.variations.map((variation, key) =>
                            <View key={key}>
                                <Text>{variation.name}</Text>
                                {variation.workouts.map((workout, key) =>
                                    <View key={key}>
                                        <Text>{workout.name}</Text>
                                        {workout.movements.map((movement, key) =>
                                            <View key={key}>
                                                <Text>{movement.type}</Text>
                                                {movement.sets.map((set, key) =>
                                                    <View key={key}>
                                                        <Text>{set.sets}x{set.reps}{set.amrap ? '+' : ''}</Text>
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                )}
            </Card.Content>
        </Card>
    )
}

export default function NewProgram() {
    const programs = [fiveThreeOne];
    const styles = makeStyles();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const update = (event: LayoutChangeEvent) => {
        setWidth(event.nativeEvent.layout.width)
        setHeight(event.nativeEvent.layout.height)
    }

    return (
        <>
            <ScrollView horizontal onLayout={update} style={styles.container}>
                {/* <View style={[styles.container, {height: height, width: width * 4}]}> */}
                <ProgramTemplateCard width={width} programTemplate={programs[0]} />
                <ProgramTemplateCard width={width} programTemplate={programs[0]} />
                <ProgramTemplateCard width={width} programTemplate={programs[0]} />
                <ProgramTemplateCard width={width} programTemplate={programs[0]} />
                <ProgramTemplateCard width={width} programTemplate={programs[0]} />
                {/* </View> */}
            </ScrollView>
            <Stack.Screen options={{ title: 'Create Program', }} />
        </>
    );
}

function makeStyles() {
    const theme = useTheme();

    return StyleSheet.create({
        header: {
        },
        container: {
            // flex: 1,
            // backgroundColor: 'red',
            // flexDirection: 'row',
        },
    })
}
