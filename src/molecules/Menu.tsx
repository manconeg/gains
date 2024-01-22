import { Text, View, Button } from 'react-native'
import { Link } from "expo-router"

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