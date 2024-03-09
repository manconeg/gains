import { FloatingAction } from '@/contexts';
import { LiftCard } from '@/molecules';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { List, TextInput } from 'react-native-paper';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import workouts from '@/../assets/workouts/data.json'
import { MiniCalendar } from '@/organisms';
import { LocalDate } from '@js-joda/core';
import { randomUUID } from 'expo-crypto';
const images = require.context('../../assets/workouts', true, /\.png$/);


export default function Workout() {
    const [date, setDate] = useState(new Date() as DateType)
    const [name, setName] = useState("")

    let icons = new Map<string, string>()
    
    console.log(images.keys())

    workouts.movements.forEach(element => {
        console.log()
                // const icon = useAssets([require(element.image)])
            // icons.set(element.uuid, uri)
    })

    console.log(workouts)
    // const lifts = JSON.parse(workouts[0].)

    return (
        <>
            <LiftCard>
                <LiftCard.Content>
                    <TextInput
                        label="Workout Name (Optional)"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <List.Section title="Excercises">
                        <List.Accordion
                            title="Exercise"
                            left={props => <List.Icon {...props} icon="folder" />}>
                                {workouts.movements.map(movement =>
                                <List.Item key={movement.uuid} title={movement.name}
                                    left={props => <List.Icon {...props} icon={images(`./${movement.image}`)} />}/>)}
                        </List.Accordion>
                    </List.Section>
                    <MiniCalendar workouts={[{
                        date: LocalDate.now().minusDays(0),
                        id: randomUUID(),
                        program: '',
                        variation: '',
                        day: '',
                        movements: [],
                        complete: false,
                        },{
                            date: LocalDate.now().minusDays(1),
                            id: randomUUID(),
                            program: '',
                            variation: '',
                            day: '',
                            movements: [],
                            complete: false,
                            },{
                                date: LocalDate.now().plusDays(1),
                                id: randomUUID(),
                                program: '',
                                variation: '',
                                day: '',
                                movements: [],
                                complete: false,
                                }]}/>
                    {/* <DateTimePicker
                        mode="single"
                        date={date}
                        onChange={(params) => setDate(params.date)} /> */}
                </LiftCard.Content>
            </LiftCard>
            <FloatingAction
                icon={'plus'}
                label={'Create'}
                onPress={() => { router.navigate('workout/new') }}
                visible={true}
            />
        </>
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
