
<div align="center">
  <h2>react-native-pressable-scale</h2>
</div>

### `<PressableScale>`

> Requires `react-native-reanimated` (v2)

A component for responding to touches using a React Native `<TouchableWithoutFeedback>`

```jsx
<PressableScale onPress={onBuyPressed} style={styles.buyButton}>
  <Text>Buy this Product</Text>
</PressableScale>
```

The following props are supported:

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Explanation</th>
    <th>Required</th>
    <th>Default Value</th>
  </td>
  <tr>
    <td><code>activeScale</code></td>
    <td><code>number</code></td>
    <td>The scale to animate to use when the <code>&lt;PressableScale&gt;</code> is in a pressed state. Ranges from <code>0</code> to <code>1</code></td>
    <td>❌</td>
    <td><code>0.95</code></td>
  </tr>
  <tr>
    <td><code>weight</code></td>
    <td><code>'light' | 'medium' | 'heavy'</code></td>
    <td>The weight to use for the spring animation. This should act as a predefined preset for the <code>mass</code> property of the spring config.</td>
    <td>❌</td>
    <td><code>'heavy'</code></td>
  </tr>
  <tr>
    <td>All <code>TouchableWithoutFeedback</code> props</td>
    <td><a href="https://reactnative.dev/docs/touchablewithoutfeedback"><code>TouchableWithoutFeedbackProps</code></a></td>
    <td>All properties from the React Native <code>TouchableWithoutFeedback</code> component such as <code>onPress</code>, <code>delayPressIn</code> or <code>style</code>.
    <td>❌</td>
    <td><code>{ delayPressIn: 0 }</code></td>
  </tr>
</table>


### `<NativePressableScale>`

**A supercharged `<PressableScale>`.**

> Requires `react-native-gesture-handler` and `react-native-reanimated` (v2)

A component for responding to touches using the native [`TapGestureHandler`](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-tap/) without ever going over the JS Bridge. Use this component if you want your Pressables to be able to receive touches, respond to touches, show visual animated feedback (scale down/scale up) and dispatch a callback to JS without using the React Native Thread at all. This component will always be pressable, even when the React Native (JS) Thread freezes because of a heavy JS computation.

> ⚠️ Warning: This does not work in Modals on Android devices. See [software-mansion/react-native-gesture-handler issue #139](https://github.com/software-mansion/react-native-gesture-handler/issues/139)

```jsx
<NativePressableScale onPress={onBuyPressed} style={styles.buyButton}>
  <Text>Buy this Product</Text>
</NativePressableScale>
```

The following props are supported:

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Explanation</th>
    <th>Required</th>
    <th>Default Value</th>
  </td>
  <tr>
    <td><code>activeScale</code></td>
    <td><code>number</code></td>
    <td>The scale to animate to use when the <code>&lt;PressableScale&gt;</code> is in a pressed state. Ranges from <code>0</code> to <code>1</code></td>
    <td>❌</td>
    <td><code>0.95</code></td>
  </tr>
  <tr>
    <td><code>weight</code></td>
    <td><code>'light' | 'medium' | 'heavy'</code></td>
    <td>The weight to use for the spring animation. This should act as a predefined preset for the <code>mass</code> property of the spring config.</td>
    <td>❌</td>
    <td><code>'heavy'</code></td>
  </tr>
  <tr>
    <td><code>onPress</code></td>
    <td><code>() => void</code></td>
    <td>The event to fire after the <code>&lt;PressableScale&gt;</code> has been pressed by the user.</td>
    <td>✅</td>
    <td><code>undefined</code></td>
  </tr>
  <tr>
    <td><code>isInList</code></td>
    <td><code>boolean</code></td>
    <td>A flag indicating whether this <code>&lt;PressableScale&gt;</code> is rendered in a ScrollView, FlatList or any other component that uses a swipe gesture. This will delay the animation for <code>50ms</code> so swipe gestures don't immediately trigger scale changes</td>
    <td>❌</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>disabled</code></td>
    <td><code>boolean</code></td>
    <td>A flag indicating whether this <code>&lt;PressableScale&gt;</code> should be disabled and therefore stop receiving touch events.</td>
    <td>❌</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><code>ref</code></td>
    <td><code>React.RefObject&lt;TapGestureHandler&gt;</code></td>
    <td>A reference to the <code>&lt;TapGestureHandler&gt;</code> component.</td>
    <td>❌</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>All <code>View</code> props</td>
    <td><a href="https://reactnative.dev/docs/view"><code>ViewProps</code></a></td>
    <td>All properties from the React Native <code>View</code> component such as <code>style</code> or <code>children</code>.
    <td>❌</td>
    <td><code>{}</code></td>
  </tr>
  <tr>
    <td>All <code>WithSpringConfig</code> props</td>
    <td><a href="https://docs.swmansion.com/react-native-reanimated/docs/next/api/withSpring#options-object"><code>WithSpringConfig</code></a></td>
    <td>All properties from the react-native-reanimated <code>withSpring</code> options parameter such as <code>Easing</code> or <code>duration</code>.
    <td>❌</td>
    <td><code>{ duration: 50, easing: Easing.linear }</code></td>
  </tr>
</table>
