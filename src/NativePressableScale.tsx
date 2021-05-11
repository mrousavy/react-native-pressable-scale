import React, { useMemo } from 'react';
import { ViewProps } from 'react-native';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Reanimated, { cancelAnimation, delay, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PRESSABLE_IN_LIST_DELAY } from './Constants';

export interface NativePressableScaleProps extends ViewProps, Partial<Omit<Reanimated.WithSpringConfig, 'mass'>> {
	children: React.ReactNode;
	/**
	 * The value to scale to when the Pressable is being pressed.
	 * @default 0.95
	 */
	activeScale?: number;

	/**
	 * The onPress event.
	 */
	onPress: () => void;

	/**
	 * Set to `true` if this Pressable is contained in a list. This will automatically delay the scale animation.
	 * @default false
	 */
	isInList?: boolean;

	/**
	 * The weight physics of this button
	 * @default 'heavy'
	 */
	weight?: 'light' | 'medium' | 'heavy';

	/**
	 * Set to `true` to disable pressing
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Ref to the `TapGestureHandler`
	 */
	ref?: React.RefObject<TapGestureHandler>;
}

/**
 * A Pressable that scales down when pressed. Uses the native responder system from react-native-gesture-handler instead of the JS Pressability API.
 */
export function NativePressableScale(props: NativePressableScaleProps): React.ReactElement {
	const {
		activeScale = 0.95,
		isInList,
		damping = 15,
		weight = 'heavy',
		stiffness = 150,
		overshootClamping = true,
		restSpeedThreshold = 0.001,
		restDisplacementThreshold = 0.001,
		disabled = false,
		ref,
		style,
		onPress,
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

	const scale = useSharedValue(1);
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
	const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }), [scale]);

	const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
		{
			onStart: () => {
				cancelAnimation(scale);
				scale.value = isInList ? delay(PRESSABLE_IN_LIST_DELAY, withSpring(activeScale, springConfig)) : withSpring(activeScale, springConfig);
			},
			onEnd: () => {
				onPress();
			},
			onFinish: () => {
				cancelAnimation(scale);
				scale.value = withSpring(1, springConfig);
			},
		},
		[scale, isInList, activeScale, springConfig, onPress],
	);

	return (
		<TapGestureHandler ref={ref} onGestureEvent={onGestureEvent} enabled={!disabled} shouldCancelWhenOutside={true}>
			<Reanimated.View style={[style, animatedStyle]} {...passThroughProps} />
		</TapGestureHandler>
	);
}
