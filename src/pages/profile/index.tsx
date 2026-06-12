import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useMembers, useItems } from '../../hooks/useItems';
import { Item } from '../../types';
import styles from './index.module.scss';

const ProfilePage: React.FC = () => {
  const { getCurrentMember } = useMembers();
  const { getOverdueReminders, items } = useItems();
  const currentMember = getCurrentMember();
  const [reminders, setReminders] = useState<Item[]>([]);

  useEffect(() => {
    const overdue = getOverdueReminders();
    setReminders(overdue);
  }, [getOverdueReminders]);

  const itemCount = items.length;
  const familyCount = 4;

  const handleShare = () => {
    Taro.showModal({
      title: '分享档案',
      content: '选择要分享的物件或制作纪念卡分享给亲友',
      confirmText: '分享物件',
      cancelText: '制作纪念卡',
      success: (res) => {
        if (res.confirm) {
          Taro.switchTab({ url: '/pages/home/index' });
        } else if (res.cancel) {
          Taro.switchTab({ url: '/pages/home/index' });
        }
      }
    });
  };

  const handleReviewReminder = (itemId: string) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${itemId}` });
  };

  return (
    <ScrollView className={styles.container} scrollY enableBackToTop>
      <View className={styles.header}>
        <View className={styles.profileInfo}>
          <Image className={styles.avatar} src={currentMember.avatar} mode='aspectFill' />
          <View>
            <Text className={styles.profileName}>{currentMember.name}</Text>
            <Text className={styles.profileRelation}>{currentMember.relation}</Text>
          </View>
        </View>
        <View className={styles.statsRow}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{itemCount}</Text>
            <Text className={styles.statLabel}>物件总数</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{familyCount}</Text>
            <Text className={styles.statLabel}>家庭成员</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{reminders.length}</Text>
            <Text className={styles.statLabel}>待复查</Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>复查提醒</Text>
        {reminders.length > 0 ? (
          <View className={styles.reminderList}>
            {reminders.slice(0, 3).map(item => (
              <View
                key={item.id}
                className={styles.reminderItem}
                onClick={() => handleReviewReminder(item.id)}
              >
                <Image className={styles.reminderImage} src={item.mainImage} mode='aspectFill' />
                <View className={styles.reminderInfo}>
                  <Text className={styles.reminderName}>{item.name}</Text>
                  <Text className={styles.reminderDate}>已到期复查</Text>
                </View>
                <Text className={styles.menuArrow}>›</Text>
              </View>
            ))}
          </View>
        ) : (
          <View className={styles.emptyReminder}>
            <Text className={styles.emptyReminderText}>暂无待复查物件</Text>
          </View>
        )}
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>分享与导出</Text>
        <View className={styles.menuItem} onClick={handleShare}>
          <View className={styles.menuIcon}>
            <Text className={styles.menuIconText}>📤</Text>
          </View>
          <View className={styles.menuContent}>
            <Text className={styles.menuLabel}>分享物件</Text>
            <Text className={styles.menuDesc}>分享档案给亲友查看</Text>
          </View>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View className={styles.menuItem} onClick={() => Taro.switchTab({ url: '/pages/home/index' })}>
          <View className={styles.menuIcon}>
            <Text className={styles.menuIconText}>🎫</Text>
          </View>
          <View className={styles.menuContent}>
            <Text className={styles.menuLabel}>制作纪念卡</Text>
            <Text className={styles.menuDesc}>生成精美的单件纪念卡</Text>
          </View>
          <Text className={styles.menuArrow}>›</Text>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>设置</Text>
        <View className={styles.menuItem}>
          <View className={styles.menuIcon}>
            <Text className={styles.menuIconText}>🔔</Text>
          </View>
          <View className={styles.menuContent}>
            <Text className={styles.menuLabel}>复查提醒</Text>
            <Text className={styles.menuDesc}>每6个月提醒复查一次</Text>
          </View>
          <View className={styles.badge}>
            <Text className={styles.badgeText}>已开启</Text>
          </View>
        </View>
        <View className={styles.menuItem}>
          <View className={styles.menuIcon}>
            <Text className={styles.menuIconText}>👥</Text>
          </View>
          <View className={styles.menuContent}>
            <Text className={styles.menuLabel}>隐私设置</Text>
            <Text className={styles.menuDesc}>管理谁可以查看您的物件</Text>
          </View>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View className={styles.menuItem}>
          <View className={styles.menuIcon}>
            <Text className={styles.menuIconText}>ℹ️</Text>
          </View>
          <View className={styles.menuContent}>
            <Text className={styles.menuLabel}>关于我们</Text>
            <Text className={styles.menuDesc}>老物件档案 v1.0.0</Text>
          </View>
          <Text className={styles.menuArrow}>›</Text>
        </View>
      </View>

      <View style={{ height: '100rpx' }} />
    </ScrollView>
  );
};

export default ProfilePage;
