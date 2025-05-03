import React from 'react';
import { Arc } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';

interface ConfidenceGaugeProps {
  value: number;
  width: number;
  height: number;
}

const ConfidenceGauge: React.FC<ConfidenceGaugeProps> = ({ value, width, height }) => {
  const radius = Math.min(width, height) / 2;
  const thickness = radius * 0.2;

  const scale = scaleLinear({
    domain: [0, 1],
    range: [0, Math.PI],
  });

  return (
    <svg width={width} height={height}>
      <Group top={height / 2} left={width / 2}>
        {/* Background arc */}
        <Arc
          radius={radius}
          startAngle={0}
          endAngle={Math.PI}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={thickness}
        />
        {/* Value arc */}
        <Arc
          radius={radius}
          startAngle={0}
          endAngle={scale(value)}
          fill="none"
          stroke={value > 0.7 ? '#22c55e' : value > 0.4 ? '#eab308' : '#ef4444'}
          strokeWidth={thickness}
        />
        {/* Value text */}
        <text
          textAnchor="middle"
          dy=".3em"
          fontSize={radius * 0.3}
          fontWeight="bold"
          fill="#1e293b"
        >
          {Math.round(value * 100)}%
        </text>
      </Group>
    </svg>
  );
};

export default ConfidenceGauge;