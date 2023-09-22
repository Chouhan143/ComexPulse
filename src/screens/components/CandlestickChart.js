import React from 'react';
import { View } from 'react-native';
import { Svg, Rect, Line } from 'react-native-svg';
import * as d3 from 'd3-scale'; // Import d3 like this

const CandlestickChart = ({ data, width, height }) => {
  // Define scales for x and y axis
  const xScale = d3.scaleBand().domain(data.map((d) => d.date)).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.high)]).range([height, 0]);

  return (
    <View>
      <Svg width={width} height={height}>
        {data.map((d, index) => (
          <View key={index}>
            <Line
              x1={xScale(d.date) + xScale.bandwidth() / 2}
              x2={xScale(d.date) + xScale.bandwidth() / 2}
              y1={yScale(d.low)}
              y2={yScale(d.high)}
              stroke="black"
            />
            <Rect
              x={xScale(d.date)}
              y={yScale(Math.max(d.open, d.close))}
              width={xScale.bandwidth()}
              height={Math.abs(yScale(d.open) - yScale(d.close))}
              fill={d.open > d.close ? 'red' : 'green'}
            />
          </View>
        ))}
      </Svg>
    </View>
  );
};

export default CandlestickChart;
