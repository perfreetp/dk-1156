import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Item } from '../../types';
import styles from './index.module.scss';

interface MemorialCardProps {
  item: Item;
}

const MemorialCard: React.FC<MemorialCardProps> = ({ item }) => {
  const roomLabels: Record<string, string> = {
    livingRoom: '客厅',
    bedroom: '卧室',
    study: '书房',
    kitchen: '厨房',
    storage: '储藏室',
    other: '其他'
  };

  return (
    <View className={styles.card}>
      <View className={styles.header}>
        <View className={styles.badge}>
          <Text className={styles.badgeText}>家庭纪念档案</Text>
        </View>
      </View>

      <Image
        className={styles.mainImage}
        src={item.mainImage}
        mode='aspectFill'
      />

      <View className={styles.info}>
        <Text className={styles.name}>{item.name}</Text>

        <View className={styles.row}>
          <View className={styles.item}>
            <Text className={styles.label}>年代</Text>
            <Text className={styles.value}>{item.era}</Text>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>来源</Text>
            <Text className={styles.value}>{item.origin}</Text>
          </View>
        </View>

        <View className={styles.row}>
          <View className={styles.item}>
            <Text className={styles.label}>保存位置</Text>
            <Text className={styles.value}>{roomLabels[item.room] || item.location}</Text>
          </View>
          <View className={styles.item}>
            <Text className={styles.label}>关联人物</Text>
            <Text className={styles.value}>{item.relatedPerson}</Text>
          </View>
        </View>

        {item.story && (
          <View className={styles.story}>
            <Text className={styles.storyLabel}>物件故事</Text>
            <Text className={styles.storyContent}>{item.story}</Text>
          </View>
        )}

        <View className={styles.footer}>
          <Text className={styles.date}>建档日期：{item.createdAt}</Text>
        </View>
      </View>

      <View className={styles.ornament}>
        <View className={styles.ornamentLine} />
        <Text className={styles.ornamentText}>传家宝</Text>
        <View className={styles.ornamentLine} />
      </View>
    </View>
  );
};

export default MemorialCard;
