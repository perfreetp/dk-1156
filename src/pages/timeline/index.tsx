import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import { useAppContext } from '../../store/AppContext';
import TimelineItem from '../../components/TimelineItem';
import styles from './index.module.scss';

const TimelinePage: React.FC = () => {
  const { getTimelineData, refreshData } = useAppContext();

  const timelineData = getTimelineData();

  useDidShow(() => {
    refreshData();
  });

  return (
    <ScrollView className={styles.container} scrollY enableBackToTop>
      <View className={styles.header}>
        <Text className={styles.title}>家庭时间轴</Text>
        <Text className={styles.subtitle}>按年代排列的家庭物件记忆</Text>
      </View>

      {timelineData.length === 0 ? (
        <View className={styles.emptyState}>
          <View className={styles.emptyIcon}>
            <Text style={{ fontSize: '80rpx', color: '#9B9590' }}>📅</Text>
          </View>
          <Text className={styles.emptyText}>暂无物件记录</Text>
          <Text className={styles.emptySubtext}>去建档页面记录您的第一件老物件</Text>
        </View>
      ) : (
        timelineData.map((eraData, eraIndex) => (
          <View key={eraData.era} className={styles.eraSection}>
            <View className={styles.eraTitle}>
              <View className={styles.eraBadge}>
                <Text className={styles.eraBadgeText}>{eraData.label}</Text>
              </View>
              <Text className={styles.eraCount}>共 {eraData.items.length} 件</Text>
            </View>

            <View className={styles.eraItems}>
              {eraData.items.map((item, itemIndex) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  isFirst={itemIndex === 0}
                  isLast={itemIndex === eraData.items.length - 1}
                />
              ))}
            </View>
          </View>
        ))
      )}

      <View style={{ height: '100rpx' }} />
    </ScrollView>
  );
};

export default TimelinePage;
