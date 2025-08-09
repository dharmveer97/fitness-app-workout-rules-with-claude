import { useRef, useState, useCallback, Dispatch, SetStateAction } from 'react'
import { Animated, useWindowDimensions, ViewToken } from 'react-native'

export const useOnboardingSlides = <T = any>({
  slidesLength,
  onLastSlide,
}: UseOnboardingSlidesProps): UseOnboardingSlidesReturn<T> => {
  const [currentIndex, setCurrentIndex]: [
    number,
    Dispatch<SetStateAction<number>>,
  ] = useState<number>(0)
  const scrollX: Animated.Value = useRef<Animated.Value>(
    new Animated.Value(0),
  ).current
  const slidesRef: any = useRef(null)

  const { width }: { width: number } = useWindowDimensions()

  const viewableItemsChanged: (info: { viewableItems: ViewToken[] }) => void =
    useRef(({ viewableItems }: { viewableItems: ViewToken[] }): void => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index)
      }
    }).current

  const viewConfig: { viewAreaCoveragePercentThreshold: number } = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current

  const scrollToNext: () => void = useCallback((): void => {
    if (currentIndex < slidesLength - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 })
    } else {
      onLastSlide?.()
    }
  }, [currentIndex, slidesLength, onLastSlide])

  const scrollToPrev: () => void = useCallback((): void => {
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
