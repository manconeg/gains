import { ParamListBase } from '@react-navigation/native';

export type StackedParams = ParamListBase & {
    Menu: MenuParams
  }
  
  type MenuParams = {
      title: string,
      items: string[]
  }