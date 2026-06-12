import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useMembers, useItems } from '../../hooks/useItems';
import { FamilyMember, Item } from '../../types';
import styles from './index.module.scss';

const MemberDetailPage: React.FC = () => {
  const router = useRouter();
  const { getMemberById } = useMembers();
  const { items } = useItems();
  const [member, setMember] = useState<FamilyMember | null>(null);
  const [memberItems, setMemberItems] = useState<Item[]>([]);

  useEffect(() => {
    const { id } = router.params;
    if (id) {
      const foundMember = getMemberById(id);
      if (foundMember) {
        setMember(foundMember);
        const relatedItems = items.filter(item =>
          item.familyMembers.includes(id) || item.createdBy === id
        );
        setMemberItems(relatedItems);
      }
    }
  }, [router.params, getMemberById, items]);

  const handleItemClick = (itemId: string) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${itemId}` });
  };

  if (!member) {
    return (
      <View style={{ padding: '100rpx', textAlign: 'center' }}>
        <Text style={{ color: '#9B9590' }}>加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.header}>
        <Image className={styles.avatar} src={member.avatar} mode='aspectFill' />
        <Text className={styles.name}>{member.name}</Text>
        <Text className={styles.relation}>{member.relation}</Text>
        <Text className={styles.joinDate}>加入时间：{member.joinDate}</Text>
      </View>

      <View className={styles.infoSection}>
        <Text className={styles.sectionTitle}>成员信息</Text>
        <View className={styles.infoRow}>
          <Text className={styles.infoLabel}>姓名</Text>
          <Text className={styles.infoValue}>{member.name}</Text>
        </View>
        <View className={styles.infoRow}>
          <Text className={styles.infoLabel}>与我的关系</Text>
          <Text className={styles.infoValue}>{member.relation}</Text>
        </View>
        <View className={styles.infoRow}>
          <Text className={styles.infoLabel}>联系电话</Text>
          <Text className={styles.infoValue}>{member.phone || '未填写'}</Text>
        </View>
        <View className={styles.infoRow}>
          <Text className={styles.infoLabel}>加入时间</Text>
          <Text className={styles.infoValue}>{member.joinDate}</Text>
        </View>
      </View>

      <View className={styles.itemsSection}>
        <Text className={styles.sectionTitle}>关联物件 ({memberItems.length})</Text>
        {memberItems.length > 0 ? (
          <View className={styles.itemList}>
            {memberItems.map(item => (
              <View
                key={item.id}
                className={styles.itemCard}
                onClick={() => handleItemClick(item.id)}
              >
                <Image className={styles.itemImage} src={item.mainImage} mode='aspectFill' />
                <View className={styles.itemInfo}>
                  <Text className={styles.itemName}>{item.name}</Text>
                  <Text className={styles.itemEra}>{item.era}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyText}>暂无关联物件</Text>
          </View>
        )}
      </View>

      <View style={{ height: '100rpx' }} />
    </ScrollView>
  );
};

export default MemberDetailPage;
