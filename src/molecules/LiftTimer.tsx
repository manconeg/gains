import { Timer } from '@/atoms'
import { StyleSheet, View } from "react-native"
import { Button, Card, Icon, Text } from "react-native-paper"
import { useState, useEffect } from 'react'
import { Adjustable } from '@/atoms'
import { Set } from '@/models/Workout'

type LiftTimerParams = {
    onComplete: (repsComplete: number) => void,
    active: boolean,
    set: Set,
}

export function LiftTimer({ active, onComplete, set }: LiftTimerParams) {
    const styles = makeStyles()
    const timerDirection = Timer.Direction.UP
    const [failedSet, setFailedSet] = useState(false)
    const [repsComplete, setRepsComplete] = useState(0)

    useEffect(() => {
        setRepsComplete(set.reps)
    }, [set])

    const failedSetAction = () => setFailedSet(true)

    return active && (
        <Card style={styles.timer}>
            {failedSet ? (
                <Card.Content>
                        <Text>Reps completed</Text>
                        <Adjustable number={repsComplete} onChange={setRepsComplete} />
                        <Button onPress={() => onComplete(repsComplete)}>Done</Button>
                </Card.Content>
            ) : (
                <Card.Content style={{ flexDirection: 'row' }}>
                    <Button onPress={failedSetAction}><Icon source="cancel" size={20} /></Button>
                    <View style={{ justifyContent: 'center' }}>
                        <Text>Lifting</Text>
                        <Timer start={0} stop={false} active={active} direction={timerDirection} />
                    </View>
                    <Button onPress={failedSetAction}><Icon source="check" size={20} /></Button>
                </Card.Content>
            )}
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