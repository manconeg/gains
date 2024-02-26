import { LiftCard } from '@/molecules';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';

export default function Workout() {
    const [date, setDate] = useState(new Date() as DateType)
    const [name, setName] = useState("")

    return (
        <>
            <LiftCard>
                <LiftCard.Content>
                    <TextInput
                        label="Workout Name (Optional)"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                    <DateTimePicker
                        mode="single"
                        date={date}
                        onChange={(params) => setDate(params.date)} />
                </LiftCard.Content>
            </LiftCard>
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
