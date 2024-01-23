import Counter from 'react-native-counters';

type AdjustableParams = {
    number: number,
    formatFn?: (count: number) => string,
  }

export function Adjustable(params: AdjustableParams) {
    const onChange = (number: number, type: string) => {
      console.log(number, type) // 1, + or -
    }
    
    return (
        <Counter start={params.number} onChange={onChange} formatFn={params.formatFn} />
      )
  }