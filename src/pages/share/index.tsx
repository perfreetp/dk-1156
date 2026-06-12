import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useAppContext } from '../../store/AppContext';
import { Item } from '../../types';
import styles from './index.module.scss';

const SharePage: React.FC = () => {
  const router = useRouter();
  const { items, currentMember } = useAppContext();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ids = router.params.ids;
    if (ids) {
      const idArray = ids.split(',');
      setSelectedIds(new Set(idArray));
    }
  }, [router.params.ids]);

  const shareableItems = items.filter(item => {
    if (item.viewPermission === 'all') return true;
    if (item.viewPermission === 'family') {
      return item.familyMembers.includes(currentMember?.id || '') || item.createdBy === currentMember?.id;
    }
    return item.createdBy === currentMember?.id;
  });

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleShare = () => {
    if (selectedIds.size === 0) {
      Taro.showToast({ title: '请选择要分享的物件', icon: 'none' });
      return;
    }

    const idsString = Array.from(selectedIds).join(',');
    Taro.navigateTo({
      url: `/pages/share-result/index?ids=${idsString}`
    });
  };

  const permissionLabels: Record<string, string> = {
    all: '所有人可见',
    family: '仅家人可见',
    private: '仅自己可见'
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.header}>
        <Text className={styles.title}>分享物件</Text>
        <Text className={styles.subtitle}>选择要分享给亲友查看的物件</Text>
      </View>

      <View className={styles.selectTip}>
        <Text className={styles.selectTipText}>
          提示：仅"所有人可见"和"家人可见"的物件可以分享
        </Text>
      </View>

      {shareableItems.length === 0 ? (
        <View className={styles.emptyState}>
          <View className={styles.emptyIcon}>
            <Text style={{ fontSize: '64rpx', color: '#9B9590' }}>📭</Text>
          </View>
          <Text className={styles.emptyText}>暂无可分享的物件</Text>
        </View>
      ) : (
        <View className={styles.itemList}>
          {shareableItems.map(item => (
            <View
              key={item.id}
              className={`${styles.itemCard} ${selectedIds.has(item.id) ? styles.itemCardSelected : ''}`}
              onClick={() => toggleSelect(item.id)}
            >
              <View className={`${styles.checkbox} ${selectedIds.has(item.id) ? styles.checkboxChecked : ''}`}>
                {selectedIds.has(item.id) && (
                  <Text className={styles.checkIcon}>✓</Text>
                )}
              </View>
              <Image className={styles.itemImage} src={item.mainImage} mode='aspectFill' />
              <View className={styles.itemInfo}>
                <Text className={styles.itemName}>{item.name}</Text>
                <Text className={styles.itemEra}>{item.era}</Text>
                <Text className={styles.itemPermission}>{permissionLabels[item.viewPermission]}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={{ height: '120rpx' }} />

      <View className={styles.bottomBar}>
        <Text className={styles.selectedCount}>
          已选择 <Text className={styles.selectedCountText}>{selectedIds.size}</Text> 件
        </Text>
        <View className={styles.actionBtn} onClick={handleShare}>
          <Text className={styles.actionText}>生成分享</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SharePage;
