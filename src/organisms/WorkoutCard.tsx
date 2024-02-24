import { TopSet } from '@/atoms'
import { Workout } from '@/models'
import { LiftCard } from '@/molecules'
import { LocalDate } from '@js-joda/core'
import { StyleSheet } from 'react-native'
import { MovementCard } from './MovementCard'
import { Icon, Text, useTheme } from 'react-native-paper'
import Animated from 'react-native-reanimated'


type LiftCardParams = {
    workout: Workout,
    big: boolean,
}

function WorkoutSummary({ workout }: { workout: Workout }) {
    return (
        <Text>
            {workout.movements.map((movement, key) => `${movement.name}${key < (workout.movements.length - 1) ? ", " : ""}`)}
        </Text>
    )
}

export function WorkoutCard({ workout, big }: LiftCardParams) {
    const styles = makeStyles();

    const isToday = LocalDate.now().equals(workout.date)

    return (
        <Animated.View sharedTransitionTag={`workout/${workout.id}`}>
            <LiftCard href={`workout/${workout.id}`} mode={workout.complete ? 'contained' : 'elevated'}>
                <LiftCard.Left>
                    <Icon source="camera" size={isToday ? 50 : 30} />
                </LiftCard.Left>
                <LiftCard.Content>
                    <Text style={big && {fontSize: 35}}>{workout.program} {workout.variation} {workout.day}</Text>
                    { !big && (isToday ? workout.movements.map((movement, key) => <TopSet large={isToday} key={key} movement={movement} />) : <WorkoutSummary workout={workout} />)}
                </LiftCard.Content>
                { big && <LiftCard.Below>
                    {workout.movements.map((movement, key) => <MovementCard key={key} workoutId={workout.id} movement={movement} />)}
                </LiftCard.Below>}
                <LiftCard.Action>
                { !big && <Text>{workout.complete ? 'Complete ' : ''}&gt;</Text>}
                </LiftCard.Action>
            </LiftCard>
        </Animated.View>
    )
}

function makeStyles() {
    const theme = useTheme();

    return StyleSheet.create({
    })
}