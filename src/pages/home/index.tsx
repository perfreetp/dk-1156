import React, { useCallback } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import { useItems } from '../../hooks/useItems';
import ItemCard from '../../components/ItemCard';
import FilterBar from '../../components/FilterBar';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const { filteredItems, filter, setFilter, getOverdueReminders } = useItems();
  const [reminderCount, setReminderCount] = React.useState(0);

  useDidShow(() => {
    const overdue = getOverdueReminders();
    setReminderCount(overdue.length);
  });

  const handleRefresh = useCallback(() => {
    const overdue = getOverdueReminders();
    setReminderCount(overdue.length);
  }, [getOverdueReminders]);

  return (
    <ScrollView
      className={styles.container}
      scrollY
      enableBackToTop
      onScrollToLower={handleRefresh}
    >
      <View className={styles.header}>
        <Text className={styles.title}>老物件档案</Text>
        <Text className={styles.subtitle}>珍藏家庭记忆，传承岁月故事</Text>
      </View>

      {reminderCount > 0 && (
        <View className={styles.reminderBanner}>
          <View className={styles.reminderIcon}>
            <Text style={{ color: '#fff', fontSize: '40rpx' }}>⏰</Text>
          </View>
          <View className={styles.reminderText}>
            <Text className={styles.reminderTitle}>复查提醒</Text>
            <Text className={styles.reminderCount}>有 {reminderCount} 件物件需要复查</Text>
          </View>
          <Text className={styles.reminderArrow}>›</Text>
        </View>
      )}

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        showSearch={true}
      />

      {filteredItems.length === 0 ? (
        <View className={styles.emptyState}>
          <View className={styles.emptyIcon}>
            <Text style={{ fontSize: '80rpx', color: '#9B9590' }}>📦</Text>
          </View>
          <Text className={styles.emptyText}>还没有录入任何物件</Text>
          <Text className={styles.emptySubtext}>点击下方"建档"按钮，记录您的第一件老物件</Text>
        </View>
      ) : (
        <View className={styles.itemGrid}>
          {filteredItems.map(item => (
            <View key={item.id} className={styles.itemWrapper}>
              <ItemCard item={item} />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default HomePage;
