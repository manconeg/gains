import Counter from 'react-native-counters';

type AdjustableParams = {
    number: number,
    formatFn?: (count: number) => string,
    onChange?: (number: number, type: string) => void,
    increment?: number,
  }

export function Adjustable(params: AdjustableParams) {
    return (
        <Counter max={1000} start={params.number} increment={params.increment} onChange={params.onChange} formatFn={params.formatFn} />
      )
  }