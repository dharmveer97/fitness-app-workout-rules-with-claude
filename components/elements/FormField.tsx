import React, { forwardRef } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import { Input, InputProps } from '../atoms/Input';
import { Text } from '../atoms/Text';
import { Badge } from '../atoms/Badge';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export interface FormFieldProps extends InputProps {
  label?: string;
  required?: boolean;
  error?: string;
  success?: string;
  hint?: string;
  badge?: string;
  tooltip?: string;
  showTooltip?: boolean;
  onTooltipPress?: () => void;
  containerClassName?: string;
  animated?: boolean;
}

export const FormField = forwardRef<TextInput, FormFieldProps>(
  (
    {
      label,
      required,
      error,
      success,
      hint,
      badge,
      tooltip,
      showTooltip = false,
      onTooltipPress,
      containerClassName = '',
      animated = true,
      ...inputProps
    },
    ref
  ) => {
    const [isTooltipVisible, setIsTooltipVisible] = React.useState(showTooltip);

    const handleTooltipPress = () => {
      setIsTooltipVisible(!isTooltipVisible);
      onTooltipPress?.();
    };

    const FieldWrapper = animated ? Animated.View : View;
    const animationProps = animated
      ? { entering: FadeIn.duration(300), exiting: FadeOut.duration(300) }
      : {};

    return (
      <FieldWrapper
        className={cn('w-full', containerClassName)}
        {...animationProps}
      >
        {(label || badge || tooltip) && (
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center flex-1">
              {label && (
                <Text variant="label" color="gray">
                  {label}
                </Text>
              )}
              {required && (
                <Text color="error" className="ml-1">
                  *
                </Text>
              )}
              {tooltip && (
                <TouchableOpacity
                  onPress={handleTooltipPress}
                  className="ml-2"
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={16}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              )}
            </View>
            {badge && (
              <Badge variant="primary" size="sm">
                {badge}
              </Badge>
            )}
          </View>
        )}

        {isTooltipVisible && tooltip && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            className="bg-dark-700 p-3 rounded-lg mb-2 border border-dark-600"
          >
            <Text variant="caption" color="gray">
              {tooltip}
            </Text>
          </Animated.View>
        )}

        <Input
          ref={ref}
          error={error}
          {...inputProps}
        />

        {success && !error && (
          <View className="flex-row items-center mt-2">
            <Ionicons name="checkmark-circle" size={14} color="#10B981" />
            <Text variant="caption" color="success" className="ml-1">
              {success}
            </Text>
          </View>
        )}

        {hint && !error && !success && (
          <Text variant="caption" color="gray" className="mt-2">
            {hint}
          </Text>
        )}

        {error && (
          <View className="flex-row items-center mt-2">
            <Ionicons name="alert-circle" size={14} color="#EF4444" />
            <Text variant="caption" color="error" className="ml-1">
              {error}
            </Text>
          </View>
        )}
      </FieldWrapper>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;