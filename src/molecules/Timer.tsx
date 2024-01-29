import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Card, Text, Icon } from "react-native-paper"

type TimerParams = {
    seconds: number,
}

const millisInSecond = 1000

export function Timer({ seconds }: TimerParams) {
    const styles = makeStyles()
    const [secondsLeft, setSecondsLeft] = useState(seconds)

    useEffect(() => {
        const interval = setInterval(() => setSecondsLeft(secondsLeft - 1), millisInSecond)
        return () => clearInterval(interval)
    })

    return (
        <Card style={styles.timer}>
            <Card.Content style={{ flexDirection: 'row' }}>
                <Button><Icon source="cancel" size={20} /></Button>
                <View style={{justifyContent: 'center',}}>
                    <View style={{ flexDirection: "row" }}>
                        <Text>{Math.floor(secondsLeft / 60)}:{secondsLeft % 60}</Text><Text>/1:30</Text>
                    </View>
                </View>
                <Button><Icon source="check" size={20} /></Button>
            </Card.Content>
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