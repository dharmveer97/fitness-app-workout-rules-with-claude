import { useRef, useState, useCallback } from 'react'

import { Animated, useWindowDimensions, type ViewToken } from 'react-native'

export const useOnboardingSlides = <T = any>({
  slidesLength,
  onLastSlide,
}: UseOnboardingSlidesProps): UseOnboardingSlidesReturn<T> => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current
  const slidesRef = useRef<any>(null)

  const { width } = useWindowDimensions()

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index)
      }
    },
  ).current

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current

  const scrollToNext = useCallback(() => {
    if (currentIndex < slidesLength - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 })
    } else {
      onLastSlide?.()
    }
  }, [currentIndex, slidesLength, onLastSlide])

  const scrollToPrev = useCallback(() => {
    if (currentIndex > 0) {
      slidesRef.current?.scrollToIndex({ index: currentIndex - 1 })
    } else {
      onLastSlide?.()
    }
  }, [currentIndex, onLastSlide])

  return {
    currentIndex,
    scrollX,
    slidesRef,
    width,
    viewableItemsChanged,
    viewConfig,
    scrollToNext,
    scrollToPrev,
  }
}
