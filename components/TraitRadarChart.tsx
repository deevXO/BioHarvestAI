"use client";
import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface TraitImpact {
  trait: string;
  impact: number;
}

interface TraitRadarChartProps {
  data: TraitImpact[];
  size?: number;
  className?: string;
}

export default function TraitRadarChart({ data, size = 300, className = "" }: TraitRadarChartProps) {
  const center = size / 2;
  const maxRadius = (size / 2) - 40;
  
  // Calculate points for radar chart
  const points = useMemo(() => {
    const angleStep = (2 * Math.PI) / data.length;
    return data.map((item, index) => {
      const angle = -Math.PI / 2 + index * angleStep; // Start from top
      const radius = item.impact * maxRadius;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      return { x, y, angle, ...item };
    });
  }, [data, center, maxRadius]);

  // Create background grid circles
  const gridCircles = [0.2, 0.4, 0.6, 0.8, 1.0];
  
  // Create grid lines (axes)
  const gridLines = useMemo(() => {
    const angleStep = (2 * Math.PI) / data.length;
    return data.map((_, index) => {
      const angle = -Math.PI / 2 + index * angleStep;
      const x2 = center + Math.cos(angle) * maxRadius;
      const y2 = center + Math.sin(angle) * maxRadius;
      return { x2, y2, angle, label: data[index].trait };
    });
  }, [data, center, maxRadius]);

  // Create path for the filled area
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  // Get trait colors
  const getTraitColor = (trait: string) => {
    const colors = {
      'Drought Tolerance': '#3B82F6', // blue
      'Salt Tolerance': '#8B5CF6',    // purple
      'Cold Tolerance': '#06B6D4',    // cyan
      'Heat Tolerance': '#F97316',    // orange
      'Pest Resistance': '#EF4444',   // red
      'Yield Enhancement': '#10B981', // emerald
      'Water Use Efficiency': '#14B8A6', // teal
      'Root Development': '#D97706',  // amber
      'Osmotic Adjustment': '#6366F1', // indigo
      'Nutritional Value': '#EC4899'  // pink
    };
    return colors[trait as keyof typeof colors] || '#6B7280';
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background grid circles */}
        {gridCircles.map((scale, index) => (
          <circle
            key={index}
            cx={center}
            cy={center}
            r={maxRadius * scale}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}
        
        {/* Grid lines (axes) */}
        {gridLines.map((line, index) => (
          <g key={index}>
            <line
              x1={center}
              y1={center}
              x2={line.x2}
              y2={line.y2}
              stroke="#E5E7EB"
              strokeWidth="1"
              opacity={0.3}
            />
            {/* Axis labels */}
            <text
              x={center + Math.cos(line.angle) * (maxRadius + 20)}
              y={center + Math.sin(line.angle) * (maxRadius + 20)}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-xs font-medium fill-slate-600"
              transform={`rotate(${(line.angle * 180 / Math.PI)}, ${center + Math.cos(line.angle) * (maxRadius + 20)}, ${center + Math.sin(line.angle) * (maxRadius + 20)})`}
            >
              {line.label}
            </text>
          </g>
        ))}
        
        {/* Filled area */}
        <motion.path
          d={pathData}
          fill="url(#radarGradient)"
          stroke="#10B981"
          strokeWidth="2"
          opacity={0.3}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={getTraitColor(point.trait)}
            stroke="white"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            className="drop-shadow-sm"
          >
            <title>{`${point.trait}: ${(point.impact * 100).toFixed(1)}%`}</title>
          </motion.circle>
        ))}
        
        {/* Scale labels */}
        {[20, 40, 60, 80, 100].map((value, index) => (
          <text
            key={value}
            x={center + 5}
            y={center - (maxRadius * (value / 100))}
            className="text-xs fill-slate-400"
            textAnchor="start"
          >
            {value}%
          </text>
        ))}
        
        {/* Gradient definitions */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#14B8A6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}