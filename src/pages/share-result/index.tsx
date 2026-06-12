import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useAppContext } from '../../store/AppContext';
import { Item, DAMAGE_OPTIONS } from '../../types';
import styles from './index.module.scss';

const ShareResultPage: React.FC = () => {
  const router = useRouter();
  const { items, members } = useAppContext();
  const [sharedItems, setSharedItems] = useState<Item[]>([]);

  useEffect(() => {
    const ids = router.params.ids;
    if (ids) {
      const idArray = ids.split(',');
      const foundItems = items.filter(item => idArray.includes(item.id));
      setSharedItems(foundItems);
    }
  }, [router.params.ids, items]);

  const handleShare = () => {
    if (sharedItems.length === 0) return;

    const shareTitle = sharedItems.length === 1
      ? `来看看这件老物件：${sharedItems[0].name}`
      : `来看看 ${sharedItems.length} 件老物件档案`;

    Taro.showModal({
      title: '分享档案',
      content: `${shareTitle}\n\n点击确定生成分享链接`,
      confirmText: '确定',
      success: () => {
        Taro.showToast({ title: '分享链接已复制', icon: 'success' });
      }
    });
  };

  const handleBack = () => {
    Taro.navigateBack();
  };

  const roomLabels: Record<string, string> = {
    livingRoom: '客厅',
    bedroom: '卧室',
    study: '书房',
    kitchen: '厨房',
    storage: '储藏室',
    other: '其他'
  };

  if (sharedItems.length === 0) {
    return (
      <View className={styles.container}>
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>📭</Text>
          <Text className={styles.emptyText}>未找到分享的档案</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.header}>
        <Text className={styles.headerIcon}>🎁</Text>
        <Text className={styles.headerTitle}>家庭档案分享</Text>
        <Text className={styles.headerSubtitle}>
          共 {sharedItems.length} 件老物件档案
        </Text>
      </View>

      <View className={styles.content}>
        {sharedItems.map(item => (
          <View key={item.id} className={styles.itemCard}>
            <Image
              className={styles.itemImage}
              src={item.mainImage}
              mode='aspectFill'
            />
            <View className={styles.itemContent}>
              <Text className={styles.itemName}>{item.name}</Text>

              <View className={styles.itemMeta}>
                <View className={styles.metaItem}>
                  <Text className={styles.metaIcon}>📅</Text>
                  <Text className={styles.metaText}>{item.era}</Text>
                </View>
                <View className={styles.metaItem}>
                  <Text className={styles.metaIcon}>📍</Text>
                  <Text className={styles.metaText}>{roomLabels[item.room] || item.location}</Text>
                </View>
                <View className={styles.metaItem}>
                  <Text className={styles.metaIcon}>👤</Text>
                  <Text className={styles.metaText}>{item.relatedPerson}</Text>
                </View>
              </View>

              {item.story && (
                <View>
                  <Text className={styles.storyLabel}>物件故事</Text>
                  <Text className={styles.itemStory}>{item.story}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: '120rpx' }} />

      <View className={styles.actionBar}>
        <View className={`${styles.actionBtn} ${styles.backBtn}`} onClick={handleBack}>
          <Text className={`${styles.actionText} ${styles.actionTextDark}`}>返回</Text>
        </View>
        <View className={`${styles.actionBtn} ${styles.shareBtn}`} onClick={handleShare}>
          <Text className={styles.actionText}>分享给好友</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ShareResultPage;
