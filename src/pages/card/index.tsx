import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useItems } from '../../hooks/useItems';
import { Item } from '../../types';
import MemorialCard from '../../components/MemorialCard';
import styles from './index.module.scss';

const CardPage: React.FC = () => {
  const router = useRouter();
  const { getItemById } = useItems();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const { id } = router.params;
    if (id) {
      const foundItem = getItemById(id);
      if (foundItem) {
        setItem(foundItem);
      }
    }
  }, [router.params, getItemById]);

  const handleSave = () => {
    Taro.showToast({ title: '已保存到相册', icon: 'success' });
  };

  const handleShare = () => {
    Taro.showModal({
      title: '分享纪念卡',
      content: `分享"${item?.name}"的纪念卡给亲友`,
      confirmText: '生成分享',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '生成分享链接成功', icon: 'success' });
        }
      }
    });
  };

  if (!item) {
    return (
      <View style={{ padding: '100rpx', textAlign: 'center' }}>
        <Text style={{ color: '#9B9590' }}>加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.preview}>
        <View className={styles.previewCard}>
          <MemorialCard item={item} />
        </View>
      </View>

      <View className={styles.actions}>
        <View className={`${styles.actionBtn} ${styles.saveBtn}`} onClick={handleSave}>
          <Text className={styles.actionText}>保存到相册</Text>
        </View>
        <View className={`${styles.actionBtn} ${styles.shareBtn}`} onClick={handleShare}>
          <Text className={styles.actionText}>分享给亲友</Text>
        </View>
      </View>

      <View className={styles.tip}>
        <Text className={styles.tipText}>长按纪念卡可保存图片</Text>
      </View>

      <View style={{ height: '100rpx' }} />
    </ScrollView>
  );
};

export default CardPage;
