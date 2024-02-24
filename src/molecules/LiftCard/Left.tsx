import { View } from 'react-native'

export function Left({ children }: {children: React.ReactNode}) {
    return (<View style={{ justifyContent: 'center' }}>
        {children}
    </View>)
}

Left.displayName = 'LiftCard.Left';