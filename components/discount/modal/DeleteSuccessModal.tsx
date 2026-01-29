import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Text, TouchableOpacity, View } from 'react-native';
import { deleteSuccessModalStyles as styles } from '../../../styles/discounts/DeleteSuccessModal.styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  colors: any;
}

export const DeleteSuccessModal = ({
  visible,
  onClose,
  colors,
}: Props) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: visible ? 1 : 0,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modal,
            {
              backgroundColor: colors.card,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✓</Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            Discount Deleted!
          </Text>

          <Text
            style={[styles.description, { color: colors.textSecondary }]}
          >
            The discount has been successfully removed.
          </Text>

          <TouchableOpacity
            onPress={onClose}
            style={[
              styles.primaryButton,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.primaryText}>Done</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
