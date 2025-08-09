import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, { Rect, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
// Types are now globally available from .d.ts files

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const { width: screenWidth } = Dimensions.get('window');

interface WeeklyChartProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
  height?: number;
  delay?: number;
}

export default function WeeklyChart({
  data,
  title,
  color = '#10B981',
  height = 200,
  delay = 0,
}: WeeklyChartProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const animatedValues = data.map(() => useSharedValue(0));

  const chartWidth = screenWidth - 48; // Account for padding
  const chartHeight = height - 60; // Account for labels
  const barWidth = (chartWidth - 40) / data.length - 8; // Account for margins
  const maxValue = Math.max(...data.map(d => d.value)) || 1;

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withSpring(1);
      scale.value = withSpring(1, { damping: 12, stiffness: 100 });
      
      // Animate bars with stagger
      animatedValues.forEach((animValue, index) => {
        setTimeout(() => {
          animValue.value = withTiming(data[index].value / maxValue, {
            duration: 800,
          });
        }, index * 100);
      });
    }, delay);
  }, [data, maxValue, delay]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const getDayAbbr = (label: string) => {
    const days: Record<string, string> = {
      'Monday': 'Mon',
      'Tuesday': 'Tue',
      'Wednesday': 'Wed',
      'Thursday': 'Thu',
      'Friday': 'Fri',
      'Saturday': 'Sat',
      'Sunday': 'Sun',
    };
    return days[label] || label.substring(0, 3);
  };

  return (
    <Animated.View 
      className="bg-[#18181B] rounded-2xl p-4 border border-gray-800/50"
      style={containerStyle}
    >
      <Text className="text-white text-lg font-bold mb-4">{title}</Text>
      
      <View style={{ height: chartHeight + 40 }}>
        <Svg width={chartWidth} height={chartHeight + 40}>
          <Defs>
            <LinearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={color} stopOpacity="0.3" />
            </LinearGradient>
          </Defs>
          
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <Line
              key={index}
              x1={40}
              y1={chartHeight * (1 - ratio)}
              x2={chartWidth - 20}
              y2={chartHeight * (1 - ratio)}
              stroke="#374151"
              strokeWidth={0.5}
              strokeOpacity={0.3}
            />
          ))}
          
          {/* Y-axis labels */}
          {[0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <SvgText
              key={index}
              x={35}
              y={chartHeight * (1 - ratio) + 4}
              fontSize={10}
              fill="#9CA3AF"
              textAnchor="end"
            >
              {formatValue(maxValue * ratio)}
            </SvgText>
          ))}
          
          {/* Bars */}
          {data.map((point, index) => {
            const x = 40 + index * (barWidth + 8);
            const barHeight = (point.value / maxValue) * chartHeight;
            
            return (
              <AnimatedRect
                key={index}
                x={x}
                y={chartHeight - barHeight}
                width={barWidth}
                height={barHeight}
                fill="url(#barGradient)"
                rx={4}
                ry={4}
                animatedProps={useAnimatedProps(() => {
                  const animatedHeight = animatedValues[index].value * chartHeight;
                  return {
                    height: animatedHeight,
                    y: chartHeight - animatedHeight,
                  };
                })}
              />
            );
          })}
          
          {/* X-axis labels */}
          {data.map((point, index) => {
            const x = 40 + index * (barWidth + 8) + barWidth / 2;
            return (
              <SvgText
                key={index}
                x={x}
                y={chartHeight + 20}
                fontSize={10}
                fill="#9CA3AF"
                textAnchor="middle"
              >
                {getDayAbbr(point.label)}
              </SvgText>
            );
          })}
        </Svg>
      </View>

      {/* Stats summary */}
      <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-800/50">
        <View className="items-center">
          <Text className="text-gray-400 text-xs">Average</Text>
          <Text className="text-white text-sm font-semibold">
            {formatValue(Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length))}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-400 text-xs">Best Day</Text>
          <Text className="text-white text-sm font-semibold">
            {formatValue(maxValue)}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-400 text-xs">Total</Text>
          <Text className="text-white text-sm font-semibold">
            {formatValue(data.reduce((sum, d) => sum + d.value, 0))}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}