import { Text as RNText, TextProps } from 'react-native';
import { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface WriteProps extends TextProps {
  children?: ReactNode;
}

export default function Write({ children, style, ...props }: WriteProps) {
  const { colors } = useTheme();

  return (
    <RNText style={[{ color: colors.text, fontFamily: 'regular' }, style]} {...props}>
      {children}
    </RNText>
  );
}