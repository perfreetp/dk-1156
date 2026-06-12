import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useDidShow } from '@tarojs/taro';
import { useAppContext } from '../../store/AppContext';
import styles from './index.module.scss';

const ProfilePage: React.FC = () => {
  const { currentMember, items, members, getOverdueReminders, refreshData, switchUser } = useAppContext();
  const [reminders, setReminders] = useState<any[]>([]);

  useEffect(() => {
    const overdue = getOverdueReminders();
    setReminders(overdue);
  }, [getOverdueReminders]);

  useDidShow(() => {
    refreshData();
    const overdue = getOverdueReminders();
    setReminders(overdue);
  });

  const handleShare = () => {
    Taro.navigateTo({ url: '/pages/share/index' });
  };

  const handleReviewReminder = (itemId: string) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${itemId}` });
  };

  const handleSwitchUser = () => {
    Taro.showActionSheet({
      itemList: members.map(m => `${m.name} (${m.relation})`),
      success: (res) => {
        const selectedMember = members[res.tapIndex];
        if (selectedMember) {
          switchUser(selectedMember.id);
          Taro.showToast({ title: `已切换为${selectedMember.name}`, icon: 'success' });
        }
      }
    });
  };

  return (
    <ScrollView className={styles.container} scrollY enableBackToTop>
      <View className={styles.header}>
        <View className={styles.profileInfo}>
          <Image className={styles.avatar} src={currentMember?.avatar} mode='aspectFill' />
          <View>
            <Text className={styles.profileName}>{currentMember?.name}</Text>
            <Text className={styles.profileRelation}>{currentMember?.relation}</Text>
          </View>
        </View>
        <View className={styles.statsRow}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{items.length}</Text>
            <Text className={styles.statLabel}>可见物件</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{members.length}</Text>
            <Text className={styles.statLabel}>家庭成员</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{reminders.length}</Text>
            <Text className={styles.statLabel}>待复查</Text>
          </View>
        </View>
        <View className={styles.switchUserBtn} onClick={handleSwitchUser}>
          <Text className={styles.switchUserText}>切换成员身份</Text>
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
            <Text className={styles.menuDesc}>选择档案分享给亲友查看</Text>
          </View>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View className={styles.menuItem} onClick={() => Taro.switchTab({ url: '/pages/home/index' })}>
          <View className={styles.menuIcon}>
            <Text className={styles.menuIconText}>🎫</Text>
          </View>
          <View className={styles.menuContent}>
            <Text className={styles.menuLabel}>制作纪念卡</Text>
            <Text className={styles.menuDesc}>在物件详情中生成精美的单件纪念卡</Text>
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
