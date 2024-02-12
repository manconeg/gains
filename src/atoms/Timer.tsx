import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

const millisInSecond = 1000

function padStart(number: Number) {
    return String(number).padStart(2, '0')
}

export function Timer({ start, stop, direction, active }: { start: number, stop: number | false, direction: Direction, active: boolean }) {
    const styles = makeStyles()
    const [secondsLeft, setSecondsLeft] = useState(start)
    useEffect(() => {
        if (active) {
            setSecondsLeft(start)
            const interval = setInterval(() => setSecondsLeft(secondsLeft => secondsLeft + direction), millisInSecond)
            return () => clearInterval(interval)
        }
    }, [active])

    return (
        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
            <Text>{Math.floor(secondsLeft / 60)}:{padStart(Math.abs(secondsLeft) % 60)}</Text>
            {stop && <Text>/{Math.floor(stop / 60)}:{padStart(Math.abs(stop) % 60)}</Text>}
        </View>
    )
}

enum Direction {
    UP = 1, DOWN = -1
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