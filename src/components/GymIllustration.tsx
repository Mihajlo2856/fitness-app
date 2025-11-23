import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

interface GymIllustrationProps {
  width?: number;
  height?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedG = Animated.createAnimatedComponent(G);

export default function GymIllustration({ width = 300, height = 225 }: GymIllustrationProps) {
  // Sparkle animations
  const sparkle1 = useRef(new Animated.Value(0.3)).current;
  const sparkle2 = useRef(new Animated.Value(0.3)).current;
  const sparkle3 = useRef(new Animated.Value(0.3)).current;
  const sparkle4 = useRef(new Animated.Value(0.3)).current;
  const sparkle5 = useRef(new Animated.Value(0.3)).current;
  const sparkle6 = useRef(new Animated.Value(0.3)).current;
  const sparkle7 = useRef(new Animated.Value(0.3)).current;
  const sparkle8 = useRef(new Animated.Value(0.3)).current;
  
  // Barbell pulse animation
  const barbellScale = useRef(new Animated.Value(1)).current;
  
  // Background circle pulse
  const bgPulse = useRef(new Animated.Value(1)).current;
  
  // Dumbbell rotations
  const leftDumbbellRotate = useRef(new Animated.Value(0)).current;
  const rightDumbbellRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sparkle animations with different timings
    const createSparkleAnimation = (animValue: Animated.Value, duration: number, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0.3,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Barbell subtle pulse
    const barbellPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(barbellScale, {
          toValue: 1.02,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(barbellScale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    // Background pulse
    const backgroundPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(bgPulse, {
          toValue: 1.1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(bgPulse, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    // Dumbbell subtle rotations
    const leftDumbbellAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(leftDumbbellRotate, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(leftDumbbellRotate, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    const rightDumbbellAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(rightDumbbellRotate, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(rightDumbbellRotate, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
        }),
      ])
    );

    // Start all sparkle animations
    createSparkleAnimation(sparkle1, 2000, 0).start();
    createSparkleAnimation(sparkle2, 2500, 500).start();
    createSparkleAnimation(sparkle3, 1800, 200).start();
    createSparkleAnimation(sparkle4, 2200, 800).start();
    createSparkleAnimation(sparkle5, 1900, 400).start();
    createSparkleAnimation(sparkle6, 2300, 600).start();
    createSparkleAnimation(sparkle7, 2100, 300).start();
    createSparkleAnimation(sparkle8, 1700, 700).start();
    
    barbellPulse.start();
    backgroundPulse.start();
    leftDumbbellAnim.start();
    rightDumbbellAnim.start();

    return () => {
      barbellPulse.stop();
      backgroundPulse.stop();
      leftDumbbellAnim.stop();
      rightDumbbellAnim.stop();
    };
  }, []);

  const leftDumbbellRotation = leftDumbbellRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-5deg', '5deg'],
  });

  const rightDumbbellRotation = rightDumbbellRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['5deg', '-5deg'],
  });

  return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={width} height={height} viewBox="0 0 400 300">
        <Defs>
          <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#1e293b" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </LinearGradient>
          
          <LinearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <Stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
          </LinearGradient>

          <LinearGradient id="plateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#475569" stopOpacity="1" />
            <Stop offset="100%" stopColor="#1e293b" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Animated background circle */}
        <AnimatedCircle 
          cx="200" 
          cy="150" 
          r="120" 
          fill="url(#bgGradient)" 
          opacity="0.4"
          scale={bgPulse}
        />
        
        {/* Barbell with pulse animation */}
        <AnimatedG scale={barbellScale} originX="200" originY="150">
          {/* Left weight plate (outer) */}
          <Rect x="40" y="130" width="30" height="40" rx="4" fill="url(#plateGradient)" />
          <Rect x="42" y="132" width="26" height="36" rx="3" fill="#334155" opacity="0.3" />
          
          {/* Left weight plate (inner) */}
          <Rect x="75" y="135" width="25" height="30" rx="3" fill="url(#plateGradient)" />
          <Rect x="77" y="137" width="21" height="26" rx="2" fill="#334155" opacity="0.3" />
          
          {/* Bar */}
          <Rect x="100" y="145" width="200" height="10" rx="5" fill="url(#blueGradient)" />
          <Rect x="100" y="145" width="200" height="3" rx="2" fill="#60a5fa" opacity="0.5" />
          
          {/* Right weight plate (inner) */}
          <Rect x="300" y="135" width="25" height="30" rx="3" fill="url(#plateGradient)" />
          <Rect x="302" y="137" width="21" height="26" rx="2" fill="#334155" opacity="0.3" />
          
          {/* Right weight plate (outer) */}
          <Rect x="330" y="130" width="30" height="40" rx="4" fill="url(#plateGradient)" />
          <Rect x="332" y="132" width="26" height="36" rx="3" fill="#334155" opacity="0.3" />
          
          {/* Grip indicators */}
          <Circle cx="180" cy="150" r="2" fill="#64748b" opacity="0.6" />
          <Circle cx="220" cy="150" r="2" fill="#64748b" opacity="0.6" />
        </AnimatedG>

        {/* Decorative elements - animated dumbbells */}
        <AnimatedG opacity="0.2" rotation={leftDumbbellRotation} origin="64, 95">
          <Rect x="60" y="80" width="8" height="15" rx="2" fill="#3b82f6" />
          <Rect x="56" y="88" width="16" height="6" rx="2" fill="#3b82f6" />
          <Rect x="60" y="94" width="8" height="15" rx="2" fill="#3b82f6" />
        </AnimatedG>
        
        <AnimatedG opacity="0.2" rotation={rightDumbbellRotation} origin="336, 213">
          <Rect x="332" y="200" width="8" height="15" rx="2" fill="#8b5cf6" />
          <Rect x="328" y="208" width="16" height="6" rx="2" fill="#8b5cf6" />
          <Rect x="332" y="214" width="8" height="15" rx="2" fill="#8b5cf6" />
        </AnimatedG>

        {/* Enhanced sparkle/energy effects */}
        <G>
          {/* Main sparkles around barbell */}
          <AnimatedCircle cx="150" cy="120" r="2.5" fill="#60a5fa" opacity={sparkle1} />
          <AnimatedCircle cx="250" cy="110" r="2.5" fill="#a78bfa" opacity={sparkle2} />
          <AnimatedCircle cx="200" cy="100" r="2.5" fill="#60a5fa" opacity={sparkle3} />
          <AnimatedCircle cx="170" cy="180" r="2.5" fill="#a78bfa" opacity={sparkle4} />
          <AnimatedCircle cx="230" cy="185" r="2.5" fill="#60a5fa" opacity={sparkle5} />
          
          {/* Additional sparkles for more effect */}
          <AnimatedCircle cx="120" cy="140" r="2" fill="#3b82f6" opacity={sparkle6} />
          <AnimatedCircle cx="280" cy="145" r="2" fill="#8b5cf6" opacity={sparkle7} />
          <AnimatedCircle cx="200" cy="190" r="2" fill="#60a5fa" opacity={sparkle8} />
          
          {/* Small accent dots */}
          <AnimatedCircle cx="130" cy="160" r="1.5" fill="#60a5fa" opacity={sparkle1} />
          <AnimatedCircle cx="270" cy="155" r="1.5" fill="#a78bfa" opacity={sparkle3} />
          <AnimatedCircle cx="190" cy="130" r="1.5" fill="#3b82f6" opacity={sparkle5} />
          <AnimatedCircle cx="210" cy="170" r="1.5" fill="#8b5cf6" opacity={sparkle7} />
        </G>
      </Svg>
    </View>
  );
}