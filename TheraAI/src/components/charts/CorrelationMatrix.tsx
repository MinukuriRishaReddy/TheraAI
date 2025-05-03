import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';

interface CorrelationMatrixProps {
  data: Array<{
    x: string;
    y: string;
    value: number;
  }>;
  width: number;
  height: number;
}

const CorrelationMatrix: React.FC<CorrelationMatrixProps> = ({ data, width, height }) => {
  const uniqueX = useMemo(() => [...new Set(data.map(d => d.x))], [data]);
  const uniqueY = useMemo(() => [...new Set(data.map(d => d.y))], [data]);

  const cellWidth = width / uniqueX.length;
  const cellHeight = height / uniqueY.length;

  const colorScale = scaleLinear<string>({
    domain: [0, 0.5, 1],
    range: ['#fee2e2', '#fef9c3', '#bbf7d0'],
  });

  return (
    <svg width={width} height={height}>
      <Group>
        {data.map((d, i) => {
          const xIndex = uniqueX.indexOf(d.x);
          const yIndex = uniqueY.indexOf(d.y);

          return (
            <g key={`${d.x}-${d.y}`}>
              <rect
                x={xIndex * cellWidth}
                y={yIndex * cellHeight}
                width={cellWidth}
                height={cellHeight}
                fill={colorScale(d.value)}
                stroke="#fff"
                strokeWidth={1}
              />
              <text
                x={xIndex * cellWidth + cellWidth / 2}
                y={yIndex * cellHeight + cellHeight / 2}
                textAnchor="middle"
                dy=".3em"
                fontSize={10}
                fill="#1e293b"
              >
                {(d.value * 100).toFixed(0)}%
              </text>
            </g>
          );
        })}
      </Group>
    </svg>
  );
};

export default CorrelationMatrix;