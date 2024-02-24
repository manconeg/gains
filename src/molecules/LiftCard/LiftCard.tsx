import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Card, useTheme } from 'react-native-paper'
import React from 'react'
import { Left } from './Left'

type LiftCardParams = {
    href?: string,
    children: React.ReactNode,
    below?: React.ReactNode,
    mode?: 'elevated' | 'outlined' | 'contained',
}

function Content({ children }: {children: React.ReactNode}) {
    return (<View style={{ paddingLeft: 10, flex: 1 }}>
        {children}
    </View>)
}
Content.displayName = 'LiftCard.Content';

function Action({ children }: {children: React.ReactNode}) {
    return (
        <View style={{ justifyContent: 'center' }}>
            {children}
        </View>)
}
Action.displayName = 'LiftCard.Action';

function Below({ children }: {children: React.ReactNode}) {
    return (<>{children}</>)
}
Below.displayName = 'LiftCard.Below';

export function LiftCard({ href = '!', mode = 'elevated', children, below }: LiftCardParams) {
    const styles = makeStyles();

    const mainChildren: React.ReactNode[] = []
    const belowChildren: React.ReactNode[] = []

    React.Children.forEach(children, (element, i) => {
        if (element && (element.type.displayName == LiftCard.Below.displayName)) {
            belowChildren.push(element)
        } else {
            mainChildren.push(element)
        }
    })

    return (
        <Card mode={mode} style={styles.card} disabled={href == '!'} onPress={() => router.navigate(href)}>
            <Card.Content>
                <View style={styles.container}>
                    {mainChildren}
                </View>
                {belowChildren}
            </Card.Content>
        </Card>
    )
}

LiftCard.Left = Left

LiftCard.Content = Content

LiftCard.Action = Action

LiftCard.Below = Below

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