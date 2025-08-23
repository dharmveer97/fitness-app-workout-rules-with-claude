import React, { useEffect } from 'react'

import { View, Dimensions } from 'react-native'

import { Text } from '@/components/ui/text'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated'
import Svg, {
  Rect,
  Line,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg'
// Types are now globally available from /types/components.d.ts

const AnimatedRect = Animated.createAnimatedComponent(Rect)
const { width: screenWidth } = Dimensions.get('window')

export default function WeeklyChart({
  data,
  title,
  color = '#10B981',
  height = 200,
  delay = 0,
}: WeeklyChartProps) {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0)

  // Create individual shared values to avoid hook rule violations (supporting up to 7 data points)
  const animValue0 = useSharedValue(0)
  const animValue1 = useSharedValue(0)
  const animValue2 = useSharedValue(0)
  const animValue3 = useSharedValue(0)
  const animValue4 = useSharedValue(0)
  const animValue5 = useSharedValue(0)
  const animValue6 = useSharedValue(0)

  const animatedValues = [
    animValue0,
    animValue1,
    animValue2,
    animValue3,
    animValue4,
    animValue5,
    animValue6,
  ]

  // Create individual animated props to avoid hook rule violations
  // We'll support up to 7 bars (typical for weekly data)
  const animatedProps0 = useAnimatedProps(() => {
    if (animatedValues.length > 0) {
      const animatedHeight = animatedValues[0].value * chartHeight
      return { height: animatedHeight, y: chartHeight - animatedHeight }
    }
    return { height: 0, y: chartHeight }
  })
  const animatedProps1 = useAnimatedProps(() => {
    if (animatedValues.length > 1) {
      const animatedHeight = animatedValues[1].value * chartHeight
      return { height: animatedHeight, y: chartHeight - animatedHeight }
    }
    return { height: 0, y: chartHeight }
  })
  const animatedProps2 = useAnimatedProps(() => {
    if (animatedValues.length > 2) {
      const animatedHeight = animatedValues[2].value * chartHeight
      return { height: animatedHeight, y: chartHeight - animatedHeight }
    }
    return { height: 0, y: chartHeight }
  })
  const animatedProps3 = useAnimatedProps(() => {
    if (animatedValues.length > 3) {
      const animatedHeight = animatedValues[3].value * chartHeight
      return { height: animatedHeight, y: chartHeight - animatedHeight }
    }
    return { height: 0, y: chartHeight }
  })
  const animatedProps4 = useAnimatedProps(() => {
    if (animatedValues.length > 4) {
      const animatedHeight = animatedValues[4].value * chartHeight
      return { height: animatedHeight, y: chartHeight - animatedHeight }
    }
    return { height: 0, y: chartHeight }
  })
  const animatedProps5 = useAnimatedProps(() => {
    if (animatedValues.length > 5) {
      const animatedHeight = animatedValues[5].value * chartHeight
      return { height: animatedHeight, y: chartHeight - animatedHeight }
    }
    return { height: 0, y: chartHeight }
  })
  const animatedProps6 = useAnimatedProps(() => {
    if (animatedValues.length > 6) {
      const animatedHeight = animatedValues[6].value * chartHeight
      return { height: animatedHeight, y: chartHeight - animatedHeight }
    }
    return { height: 0, y: chartHeight }
  })

  const barAnimatedProps = [
    animatedProps0,
    animatedProps1,
    animatedProps2,
    animatedProps3,
    animatedProps4,
    animatedProps5,
    animatedProps6,
  ]

  const chartWidth = screenWidth - 48 // Account for padding
  const chartHeight = height - 60 // Account for labels
  const barWidth = (chartWidth - 40) / data.length - 8 // Account for margins
  const maxValue = Math.max(...data.map((d) => d.value)) || 1

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withSpring(1)
      scale.value = withSpring(1, { damping: 12, stiffness: 100 })

      // Animate bars with stagger
      animatedValues.forEach((animValue, index) => {
        setTimeout(() => {
          animValue.value = withTiming(data[index].value / maxValue, {
            duration: 800,
          })
        }, index * 100)
      })
    }, delay)
  }, [data, maxValue, delay])

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  const getDayAbbr = (label: string) => {
    const days: Record<string, string> = {
      Monday: 'Mon',
      Tuesday: 'Tue',
      Wednesday: 'Wed',
      Thursday: 'Thu',
      Friday: 'Fri',
      Saturday: 'Sat',
      Sunday: 'Sun',
    }
    return days[label] || label.substring(0, 3)
  }

  return (
    <Animated.View
      className='rounded-2xl border border-gray-800/50 bg-[#18181B] p-4'
      style={containerStyle}
    >
      <Text className='mb-4 text-lg font-bold text-white'>{title}</Text>

      <View style={{ height: chartHeight + 40 }}>
        <Svg width={chartWidth} height={chartHeight + 40}>
          <Defs>
            <LinearGradient id='barGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <Stop offset='0%' stopColor={color} stopOpacity='0.8' />
              <Stop offset='100%' stopColor={color} stopOpacity='0.3' />
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
              stroke='#374151'
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
              fill='#9CA3AF'
              textAnchor='end'
            >
              {formatValue(maxValue * ratio)}
            </SvgText>
          ))}

          {/* Bars */}
          {data.map((point, index) => {
            const x = 40 + index * (barWidth + 8)
            const barHeight = (point.value / maxValue) * chartHeight

            return (
              <AnimatedRect
                key={index}
                x={x}
                y={chartHeight - barHeight}
                width={barWidth}
                height={barHeight}
                fill='url(#barGradient)'
                rx={4}
                ry={4}
                animatedProps={barAnimatedProps[index]}
              />
            )
          })}

          {/* X-axis labels */}
          {data.map((point, index) => {
            const x = 40 + index * (barWidth + 8) + barWidth / 2
            return (
              <SvgText
                key={index}
                x={x}
                y={chartHeight + 20}
                fontSize={10}
                fill='#9CA3AF'
                textAnchor='middle'
              >
                {getDayAbbr(point.label)}
              </SvgText>
            )
          })}
        </Svg>
      </View>

      {/* Stats summary */}
      <View className='mt-4 flex-row justify-between border-t border-gray-800/50 pt-4'>
        <View className='items-center'>
          <Text className='text-xs text-gray-400'>Average</Text>
          <Text className='text-sm font-semibold text-white'>
            {formatValue(
              Math.round(
                data.reduce((sum, d) => sum + d.value, 0) / data.length,
              ),
            )}
          </Text>
        </View>
        <View className='items-center'>
          <Text className='text-xs text-gray-400'>Best Day</Text>
          <Text className='text-sm font-semibold text-white'>
            {formatValue(maxValue)}
          </Text>
        </View>
        <View className='items-center'>
          <Text className='text-xs text-gray-400'>Total</Text>
          <Text className='text-sm font-semibold text-white'>
            {formatValue(data.reduce((sum, d) => sum + d.value, 0))}
          </Text>
        </View>
      </View>
    </Animated.View>
  )
}
