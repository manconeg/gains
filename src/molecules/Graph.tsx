import * as d3 from "d3"
import { useLayoutEffect, useRef, useState } from "react"
import { View } from "react-native"
import { Circle, G, Path, Svg } from "react-native-svg"

export type GraphParams = {
  data: number[],
  marginTop: number,
  marginRight: number,
  marginBottom: number,
  marginLeft: number,
}

export function Graph({
  data,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}: GraphParams) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const gs = useRef<View>(null)

  useLayoutEffect(() => {
    gs.current?.measureInWindow((x, y, width, height) => {
      setWidth(width)
      setHeight(height)
    })
  });

  const gx = useRef<G>()
  const gy = useRef<G>()
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight])
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop])
  const line = d3.line((d, i) => x(i), y)
  // useEffect(() => d3.axisBottom(x)(new Selection([[gx.current]], root)), [gx, x])
  // useEffect(() => d3.axisLeft(y)(new Selection([[gy.current]], root)), [gy, y])
  return (
    <View ref={gs} style={{ flex: 1 }}>
      <Svg>
        <G ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <G ref={gy} transform={`translate(${marginLeft},0)`} />
        <Path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
        <G fill="white" stroke="currentColor" strokeWidth="1.5">
          {data.map((d, i) => (<Circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
        </G>
      </Svg>
    </View>
  )
}
