import { Text, View, Button } from 'react-native';
import { Link } from "expo-router";

type MenuParams = {
  title: string,
  items: string[]
}

export default function Menu(params: MenuParams) {
  return (
    <View>
      <Text>{params.title}</Text>
      {params.items.map((item) => { return (<Link key={item} href="/other?input=testtttt">{item}</Link>) })}
    </View>
  );
}