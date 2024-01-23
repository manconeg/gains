import Counter from 'react-native-counters';

type CounterParams = {
    number: number,
  }

export function Counterr(params: CounterParams) {
    const onChange = (number: number, type: string) => {
      console.log(number, type) // 1, + or -
    }
    
    return (
        <Counter start={params.number} onChange={onChange} />
      )
  }