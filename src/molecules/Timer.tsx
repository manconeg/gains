import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Card, Text, Icon } from "react-native-paper"

type TimerParams = {
    context: Context,
}

const millisInSecond = 1000

export function Timer({ context }: TimerParams) {
    const styles = makeStyles()
    const [secondsLeft, setSecondsLeft] = useState(context.startSeconds)

    useEffect(() => {
        if (context.active) {
            const interval = setInterval(() => setSecondsLeft(secondsLeft => secondsLeft + context.direction), millisInSecond)
            return () => clearInterval(interval)
        }
    }, [context.active])

    return (
        (context.active ? 
        <Card style={styles.timer}>
            <Card.Content style={{ flexDirection: 'row' }}>
                <Button onPress={context.onFailure}><Icon source="cancel" size={20} /></Button>
                <View style={{justifyContent: 'center',}}>
                    <View style={{ flexDirection: "row" }}>
                        <Text>{Math.floor(secondsLeft / 60)}:{Math.abs(secondsLeft) % 60}</Text>
                        {context.doneSeconds ? 
                        <Text>/{Math.floor(context.doneSeconds / 60)}:{Math.abs(context.doneSeconds) % 60}</Text>
                        :null}
                    </View>
                </View>
                <Button onPress={context.onSuccess}><Icon source="check" size={20} /></Button>
            </Card.Content>
        </Card> : '')
    )
}

enum Direction {
    UP = 1, DOWN = -1
}

type Context = {
    onSuccess: () => void,
    onFailure: () => void,
    direction: Direction,
    startSeconds: number,
    doneSeconds: number,
    active: boolean,
}

Timer.Direction = Direction

function makeStyles() {
    return StyleSheet.create({
        timer: {
            alignSelf: 'center',
            bottom: 16,
            position: 'absolute',
        },
    })
}