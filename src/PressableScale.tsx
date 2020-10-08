import React, { useCallback, useMemo } from 'react';
import { GestureResponderEvent, TouchableWithoutFeedbackProps, TouchableWithoutFeedback, View } from 'react-native';
import Reanimated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export interface PressableScaleProps extends TouchableWithoutFeedbackProps, Partial<Omit<Reanimated.WithSpringConfig, 'mass'>> {
	children: React.ReactNode;
	/**
	 * The value to scale to when the Pressable is being pressed.
	 * @default 0.95
	 */
	activeScale?: number;

	/**
	 * The weight physics of this button
	 * @default 'heavy'
	 */
	weight?: 'light' | 'medium' | 'heavy';
}

const ReanimatedTouchableWithoutFeedback = Reanimated.createAnimatedComponent(TouchableWithoutFeedback);

/**
 * A Pressable that scales down when pressed. Uses the JS Pressability API.
 */
export default function PressableScale(props: PressableScaleProps): React.ReactElement {
	const {
		activeScale = 0.95,
		weight = 'heavy',
		damping = 15,
		stiffness = 150,
		overshootClamping = true,
		restSpeedThreshold = 0.001,
		restDisplacementThreshold = 0.001,
		style,
		onPressIn: _onPressIn,
		onPressOut: _onPressOut,
		delayPressIn = 0,
		children,
		...passThroughProps
	} = props;

	const mass = useMemo(() => {
		switch (weight) {
			case 'light':
				return 0.15;
			case 'medium':
				return 0.2;
			case 'heavy':
			default:
				return 0.3;
		}
	}, [weight]);

	const isPressedIn = useSharedValue(false);

	const springConfig = useMemo<Reanimated.WithSpringConfig>(
		() => ({
			damping,
			mass,
			stiffness,
			overshootClamping,
			restSpeedThreshold,
			restDisplacementThreshold,
		}),
		[damping, mass, overshootClamping, restDisplacementThreshold, restSpeedThreshold, stiffness],
	);
	const touchableStyle = useAnimatedStyle(() => ({ transform: [{ scale: withSpring(isPressedIn.value ? activeScale : 1, springConfig) }] }), [
		activeScale,
		isPressedIn,
		springConfig,
	]);

	const onPressIn = useCallback(
		(event: GestureResponderEvent) => {
			isPressedIn.value = true;
			_onPressIn?.(event);
		},
		[_onPressIn, isPressedIn],
	);
	const onPressOut = useCallback(
		(event: GestureResponderEvent) => {
			isPressedIn.value = false;
			_onPressOut?.(event);
		},
		[_onPressOut, isPressedIn],
	);

	return (
		<ReanimatedTouchableWithoutFeedback
			delayPressIn={delayPressIn}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			style={touchableStyle}
			{...passThroughProps}>
			<View style={style}>{children}</View>
		</ReanimatedTouchableWithoutFeedback>
	);
}
