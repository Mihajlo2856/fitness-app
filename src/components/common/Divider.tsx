import { View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function Divider({
  width = 1,
  space = 16,
}) {
  const { dividers } = useTheme();
  
  return (
    <View
      style={{
        height: width,
        backgroundColor: dividers,
        marginVertical: space
      }}
    />
  );
}