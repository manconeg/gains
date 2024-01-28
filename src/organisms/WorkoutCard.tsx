import { TopSet } from '@/atoms'
import { Workout } from '@/data/types'
import { LiftCard } from '@/molecules'
import { LocalDate } from '@js-joda/core'
import { StyleSheet } from 'react-native'
import { Icon, Text, useTheme } from 'react-native-paper'

type LiftCardParams = {
    workout: Workout,
    id: number,
}

function WorkoutSummary({ workout }: { workout: Workout }) {
    return (
        <Text>
            {workout.movements.map((movement, key) => `${movement.name}${key < (workout.movements.length - 1) ? ", " : ""}`)}
        </Text>
    )
}

export function WorkoutCard({ id, workout }: LiftCardParams) {
    const styles = makeStyles();

    const isToday = LocalDate.now().equals(workout.date)

    return (
        <LiftCard href={`workout/${id}`} mode={workout.complete ? 'contained' : 'elevated'}>
            <LiftCard.Left>
                <Icon source="camera" size={isToday ? 50 : 30} />
            </LiftCard.Left>
            <LiftCard.Content>
                <Text>{workout.program} {workout.variation} {workout.day}</Text>
                {isToday ? workout.movements.map((movement, key) => <TopSet large={isToday} key={key} movement={movement} />) : <WorkoutSummary workout={workout} />}
            </LiftCard.Content>
            <LiftCard.Action>
                <Text>{workout.complete ? 'Complete ' : ''}&gt;</Text>
            </LiftCard.Action>
        </LiftCard>
    )
}

function makeStyles() {
    const theme = useTheme();

    return StyleSheet.create({
    })
}