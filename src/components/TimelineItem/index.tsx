import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Item } from '../../types';
import styles from './index.module.scss';

interface TimelineItemProps {
  item: Item;
  isFirst?: boolean;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, isFirst, isLast }) => {
  const handleClick = () => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${item.id}` });
  };

  return (
    <View className={styles.container}>
      {!isFirst && <View className={styles.lineTop} />}
      <View className={styles.dot} />
      {!isLast && <View className={styles.lineBottom} />}

      <View className={styles.content} onClick={handleClick}>
        <Image
          className={styles.image}
          src={item.mainImage}
          mode='aspectFill'
        />
        <View className={styles.info}>
          <Text className={styles.name}>{item.name}</Text>
          <Text className={styles.origin}>{item.origin}</Text>
          <Text className={styles.person}>关联：{item.relatedPerson}</Text>
        </View>
      </View>
    </View>
  );
};

export default TimelineItem;
