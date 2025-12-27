import React from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';

export const ThemedText = ({ style, ...rest }: TextProps) => {
  const colorScheme = useColorScheme();
  const color = colorScheme === 'dark' ? '#fff' : '#000';

  return <Text style={[{ color }, style]} {...rest} />;
};