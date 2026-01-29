import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Text, TouchableOpacity, View } from 'react-native';
import { deleteConfirmModalStyles as styles } from '../../../styles/discounts/DeleteConfirmModal.styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  colors: any;
}

export const DeleteConfirmModal = ({
  visible,
  onClose,
  onConfirm,
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
            <Text style={styles.icon}>⚠️</Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>
            Delete Discount?
          </Text>

          <Text
            style={[styles.description, { color: colors.textSecondary }]}
          >
            This action cannot be undone. The discount will be permanently
            removed.
          </Text>

          <TouchableOpacity
            onPress={onConfirm}
            style={[styles.primaryButton, { backgroundColor: '#ef4444' }]}
          >
            <Text style={styles.primaryText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={[
              styles.secondaryButton,
              { borderColor: colors.border },
            ]}
          >
            <Text
              style={[styles.secondaryText, { color: colors.text }]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
