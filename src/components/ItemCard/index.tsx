import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Item, DAMAGE_OPTIONS } from '../../types';
import styles from './index.module.scss';

interface ItemCardProps {
  item: Item;
  onClick?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  const damageOption = DAMAGE_OPTIONS.find(d => d.value === item.damageLevel);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({ url: `/pages/detail/index?id=${item.id}` });
    }
  };

  return (
    <View className={styles.card} onClick={handleClick}>
      <Image
        className={styles.image}
        src={item.mainImage}
        mode='aspectFill'
      />
      <View className={styles.content}>
        <Text className={styles.name}>{item.name}</Text>
        <View className={styles.info}>
          <Text className={styles.era}>{item.era}</Text>
          <View
            className={styles.damageTag}
            style={{
              backgroundColor: damageOption?.value === 'none' ? '#E8F5E9' :
                              damageOption?.value === 'light' ? '#FFF3E0' :
                              damageOption?.value === 'medium' ? '#FFEBEE' : '#FFEBEE'
            }}
          >
            <Text
              className={styles.damageText}
              style={{
                color: damageOption?.value === 'none' ? '#4CAF50' :
                       damageOption?.value === 'light' ? '#FF9800' :
                       damageOption?.value === 'medium' ? '#E07B54' : '#F44336'
              }}
            >
              {damageOption?.label}
            </Text>
          </View>
        </View>
        <Text className={styles.person}>关联：{item.relatedPerson}</Text>
      </View>
    </View>
  );
};

export default ItemCard;
