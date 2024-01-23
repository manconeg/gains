import * as d3 from "d3"
import { useState, useRef, useEffect } from "react"
import { Svg, G, Path, Circle } from "react-native-svg"

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
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    // useEffect(() => {
    //     const resizeObserver = new ResizeObserver((event) => {
    //         // Depending on the layout, you may need to swap inlineSize with blockSize
    //         // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
    //         setWidth(event[0].contentBoxSize[0].inlineSize);
    //         setHeight(event[0].contentBoxSize[0].blockSize);
    //     });

    //     resizeObserver.observe(document.getElementById("graph"));
    // });

  const gx = useRef()
  const gy = useRef()
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight])
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop])
  const line = d3.line((d, i) => x(i), y)
  // useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x])
  // useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y])
  return (
    <Svg id="graph" style={{flex:1}}>
      <G ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <G ref={gy} transform={`translate(${marginLeft},0)`} />
      <Path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      <G fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<Circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </G>
    </Svg>
  )
}
