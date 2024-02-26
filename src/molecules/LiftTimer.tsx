import { Adjustable, Timer } from '@/atoms'
import { SetStatus, useTimer } from '@/contexts/TimerContext'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from "react-native"
import { Button, Card, Icon, Text } from "react-native-paper"

export function LiftTimer() {
    const { onTimerComplete, onRecordResult, state, initialReps, } = useTimer()
    const styles = makeStyles()
    const timerDirection = Timer.Direction.UP
    const [reset, resetTimer] = useState(true)
    const [repsComplete, setRepsComplete] = useState(initialReps)

    useEffect(() => { resetTimer(true) }, [state])

    return state != SetStatus.NONE && (
        <Card style={styles.timer}>
            {state == SetStatus.TIMING &&
                <Card.Content style={{ flexDirection: 'row' }}>
                    <Button onPress={() => onTimerComplete()}><Icon source="cancel" size={20} /></Button>
                    <View style={{ justifyContent: 'center' }}>
                        <Text>Lifting</Text>
                        <Timer start={0} stop={false} reset={reset} direction={timerDirection} />
                    </View>
                    <Button onPress={() => { onTimerComplete() }}><Icon source="check" size={20} /></Button>
                </Card.Content>
            }
            {state == SetStatus.RECORDING &&
                <Card.Content>
                    <Text>Reps completed</Text>
                    <Adjustable number={initialReps} onChange={setRepsComplete} />
                    <Button onPress={() => onRecordResult(repsComplete, 0)}>Done</Button>
                </Card.Content>
            }
        </Card>
    )
}

function makeStyles() {
    return StyleSheet.create({
        timer: {
            alignSelf: 'center',
            bottom: 16,
            position: 'absolute',
        },
    })
}