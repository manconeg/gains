import { Link } from "expo-router"
import { View } from 'react-native'

export type MenuItem = {
  text: string,
  link: string,
  params?: object,
}

type MenuParams = {
  items: MenuItem[],
}

export function Menu(params: MenuParams) {
  return (
    <View>
      {params.items.map((item) => { return (<Link key={item.text} href={`/${item.link}?${params}`}>{item.text}</Link>) })}
    </View>
  )
}