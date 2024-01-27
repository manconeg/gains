import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Card, Icon, useTheme } from 'react-native-paper'

export function MiniCalendar() {
    const styles = makeStyles();

    const activities = [null, null, "dl", null, "ohp", null, "bp"]

    return (
        <View>
          <View style={styles.week}>
            <View style={styles.day}><Text>S</Text></View>
            <View style={styles.day}><Text>M</Text></View>
            <View style={styles.day}><Text>T</Text></View>
            <View style={styles.day}><Text>W</Text></View>
            <View style={styles.day}><Text>T</Text></View>
            <View style={styles.day}><Text>F</Text></View>
            <View style={styles.day}><Text>S</Text></View>
          </View>
          <View style={styles.week}>
            {activities.map((activity, key) => <View key={key} style={styles.day}>
                {activity ? <Card style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Card.Content><Text>{activity}</Text></Card.Content>
                </Card> : null}
            </View>)}
          </View>
        </View>
    )
}

function makeStyles() {
    const theme = useTheme();

    return StyleSheet.create({
        week: {
            flexDirection: 'row',
        },
        day: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
        },
    })
}