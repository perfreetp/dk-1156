import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useMembers } from '../../hooks/useItems';
import styles from './index.module.scss';

const FamilyPage: React.FC = () => {
  const { members } = useMembers();

  const handleInvite = () => {
    Taro.showModal({
      title: '邀请家人',
      content: '可以通过微信分享邀请家人加入家庭档案',
      confirmText: '分享邀请',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '即将打开分享', icon: 'none' });
        }
      }
    });
  };

  const handleMemberClick = (memberId: string) => {
    Taro.navigateTo({ url: `/pages/member-detail/index?id=${memberId}` });
  };

  return (
    <ScrollView className={styles.container} scrollY enableBackToTop>
      <View className={styles.header}>
        <Text className={styles.title}>家庭成员</Text>
        <Text className={styles.subtitle}>记录每一份珍贵的家庭回忆</Text>
      </View>

      <View className={styles.inviteCard}>
        <View className={styles.inviteContent}>
          <Text className={styles.inviteTitle}>邀请家人加入</Text>
          <Text className={styles.inviteDesc}>一起记录和分享家庭物件故事</Text>
        </View>
        <View className={styles.inviteBtn} onClick={handleInvite}>
          <Text className={styles.inviteBtnText}>邀请</Text>
        </View>
      </View>

      <Text className={styles.sectionTitle}>家庭成员 ({members.length})</Text>

      {members.length === 0 ? (
        <View className={styles.emptyState}>
          <View className={styles.emptyIcon}>
            <Text style={{ fontSize: '80rpx', color: '#9B9590' }}>👨‍👩‍👧‍👦</Text>
          </View>
          <Text className={styles.emptyText}>暂无家庭成员</Text>
        </View>
      ) : (
        <View className={styles.memberList}>
          {members.map(member => (
            <View
              key={member.id}
              className={styles.memberCard}
              onClick={() => handleMemberClick(member.id)}
            >
              <Image className={styles.avatar} src={member.avatar} mode='aspectFill' />
              <View className={styles.memberInfo}>
                <Text className={styles.memberName}>{member.name}</Text>
                <Text className={styles.memberRelation}>{member.relation}</Text>
                <View className={styles.memberStats}>
                  <View className={styles.statsItem}>
                    <Text className={styles.statsIcon}>📦</Text>
                    <Text className={styles.statsText}>{member.itemCount} 件物件</Text>
                  </View>
                  <View className={styles.statsItem}>
                    <Text className={styles.statsIcon}>📅</Text>
                    <Text className={styles.statsText}>{member.joinDate} 加入</Text>
                  </View>
                </View>
              </View>
              <Text className={styles.arrow}>›</Text>
            </View>
          ))}
        </View>
      )}

      <View style={{ height: '100rpx' }} />
    </ScrollView>
  );
};

export default FamilyPage;
