import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CollapsibleProps = {
  title: string;
  children: React.ReactNode;
};

export const Collapsible = ({ title, children }: CollapsibleProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginVertical: 8 }}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          {title} {open ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {open && <View style={{ marginTop: 6 }}>{children}</View>}
    </View>
  );
};