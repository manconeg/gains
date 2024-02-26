import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { AnimatedFAB, MD3Theme, useTheme } from "react-native-paper";

export function DynamicFAB() {
    const theme = useTheme()
    const styles = makeStyles(theme)
    return (
        <AnimatedFAB
            icon={'plus'}
            label={'Add Workout'}
            extended={true}
            onPress={() => { router.navigate('workout/new') }}
            visible={true}
            animateFrom={'right'}
            // iconMode={'static'}
            style={[styles.fabStyle]}
        />
    )
}

function makeStyles(theme: MD3Theme) {
    return StyleSheet.create({
        header: {
            // borderBottomWidth: 0,
        },
        backgroud: {
            backgroundColor: theme.colors.background,
        },
        container: {
            paddingHorizontal: 1,
            // flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: theme.colors.background,
            marginHorizontal: 10,
        },
        fabStyle: {
            bottom: 16,
            right: 16,
            position: 'absolute',
        },
    })
}