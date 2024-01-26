import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'

type LiftCardParams = {
    href?: string,
    children: React.ReactNode,
    mode: 'elevated' | 'outlined' | 'contained',
}

export function LiftCard({ href = '!', mode = 'elevated', children }: LiftCardParams) {
    const styles = makeStyles();

    return (
        <Card mode={mode} style={styles.card} disabled={href == '!'} onPress={() => router.navigate(href)}>
            <Card.Content style={styles.container}>
                {children}
            </Card.Content>
        </Card>
    )
}

LiftCard.Left = ({children}) => {
    return (<View style={{ justifyContent: 'center' }}>
        {children}
    </View>)
}

LiftCard.Content = ({children}) => {
    return (<View style={{ paddingLeft: 10}}>
        {children}
    </View>)
}

LiftCard.Action = ({children}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {children}
            </View>
        </View>)
}

function makeStyles() {
    const theme = useTheme();

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
        },
        link: {
            // width: '100%',
            marginTop: 5,
            backgroundColor: 'red',
            // flexDirection: 'column',
            // flexBasis: 'auto',
            // flexShrink: 0,
            // display: 'flex',
            // alignItems: 'stretch',
            // position: 'relative',
            // zIndex: 0,
            // justifyContent: 'flex-end',
        },
        card: {
            // position: 'relative',
            // width: '100%',
            // flex: 1,
            // flexGrow: 1,
            // flexShrink: 0,
            // flexBasis: '100%',
            marginTop: 5,
            // backgroundColor: 'blue',
        },
    })
}