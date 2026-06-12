import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Input } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useItems, useMembers } from '../../hooks/useItems';
import { DAMAGE_OPTIONS, Item } from '../../types';
import styles from './index.module.scss';

const DetailPage: React.FC = () => {
  const router = useRouter();
  const { getItemById, updateItem, deleteItem } = useItems();
  const { getMemberById, getCurrentMember } = useMembers();
  const [item, setItem] = useState<Item | null>(null);
  const [newComment, setNewComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const { id } = router.params;
    if (id) {
      const foundItem = getItemById(id);
      if (foundItem) {
        setItem(foundItem);
      }
    }
  }, [router.params, getItemById]);

  const handleShare = () => {
    if (!item) return;

    Taro.showModal({
      title: '分享物件',
      content: `分享"${item.name}"给亲友查看`,
      confirmText: '生成分享链接',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '生成分享链接成功', icon: 'success' });
        }
      }
    });
  };

  const handleMakeCard = () => {
    if (!item) return;
    Taro.navigateTo({ url: `/pages/card/index?id=${item.id}` });
  };

  const handleAddComment = () => {
    if (!item || !newComment.trim()) return;

    const currentMember = getCurrentMember();
    const updatedItem = updateItem(item.id, {
      comments: [
        ...item.comments,
        {
          id: Date.now().toString(),
          memberId: currentMember.id,
          memberName: currentMember.name,
          content: newComment.trim(),
          createdAt: new Date().toISOString().split('T')[0]
        }
      ]
    });

    if (updatedItem) {
      setItem(updatedItem);
      setNewComment('');
      Taro.showToast({ title: '评论已添加', icon: 'success' });
    }
  };

  const handleDelete = () => {
    if (!item) return;

    Taro.showModal({
      title: '删除物件',
      content: `确定要删除"${item.name}"吗？此操作不可恢复`,
      confirmColor: '#C76D6D',
      success: (res) => {
        if (res.confirm) {
          deleteItem(item.id);
          Taro.showToast({ title: '删除成功', icon: 'success' });
          setTimeout(() => {
            Taro.navigateBack();
          }, 1500);
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

  const damageOption = DAMAGE_OPTIONS.find(d => d.value === item.damageLevel);

  const roomLabels: Record<string, string> = {
    livingRoom: '客厅',
    bedroom: '卧室',
    study: '书房',
    kitchen: '厨房',
    storage: '储藏室',
    other: '其他'
  };

  const permissionLabels: Record<string, string> = {
    all: '所有人可见',
    family: '仅家人可见',
    private: '仅自己可见'
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <View>
        <Image
          className={styles.mainImage}
          src={item.mainImage}
          mode='aspectFill'
        />
      </View>

      <View className={styles.infoSection}>
        <Text className={styles.name}>{item.name}</Text>

        <View className={styles.metaRow}>
          <View className={styles.metaItem}>
            <Text className={styles.metaIcon}>📅</Text>
            <Text className={styles.metaLabel}>年代</Text>
            <Text className={styles.metaValue}>{item.era}</Text>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.metaIcon}>📍</Text>
            <Text className={styles.metaLabel}>位置</Text>
            <Text className={styles.metaValue}>{roomLabels[item.room] || item.location}</Text>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.metaIcon}>👤</Text>
            <Text className={styles.metaLabel}>关联</Text>
            <Text className={styles.metaValue}>{item.relatedPerson}</Text>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.metaIcon}>📦</Text>
            <Text className={styles.metaLabel}>来源</Text>
            <Text className={styles.metaValue}>{item.origin}</Text>
          </View>
          <View className={styles.metaItem}>
            <View
              className={`${styles.damageBadge} ${styles[`damageBadge${item.damageLevel.charAt(0).toUpperCase() + item.damageLevel.slice(1)}`]}`}
            >
              <Text className={`${styles.damageBadgeText} ${styles[`damageText${item.damageLevel.charAt(0).toUpperCase() + item.damageLevel.slice(1)}`]}`}>
                {damageOption?.label}
              </Text>
            </View>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.metaIcon}>🔒</Text>
            <Text className={styles.metaLabel}>权限</Text>
            <Text className={styles.metaValue}>{permissionLabels[item.viewPermission]}</Text>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.metaIcon}>📝</Text>
            <Text className={styles.metaLabel}>建档</Text>
            <Text className={styles.metaValue}>{item.createdAt}</Text>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.metaIcon}>🔍</Text>
            <Text className={styles.metaLabel}>下次复查</Text>
            <Text className={styles.metaValue}>{item.nextReviewDate}</Text>
          </View>
        </View>
      </View>

      {item.story && (
        <View className={styles.storySection}>
          <Text className={styles.storyTitle}>
            <Text className={styles.storyTitleIcon}>📖</Text>
            物件故事
          </Text>
          <Text className={styles.storyContent}>{item.story}</Text>
        </View>
      )}

      {item.detailImages.length > 0 && (
        <View className={styles.detailImagesSection}>
          <Text className={styles.detailImagesTitle}>细节图 ({item.detailImages.length})</Text>
          <View className={styles.detailImages}>
            {item.detailImages.map((img, index) => (
              <Image
                key={index}
                className={styles.detailImage}
                src={img}
                mode='aspectFill'
              />
            ))}
          </View>
        </View>
      )}

      <View className={styles.commentsSection}>
        <Text className={styles.commentsTitle}>家人回忆 ({item.comments.length})</Text>

        {item.comments.length === 0 ? (
          <View className={styles.emptyComments}>
            <Text className={styles.emptyCommentsText}>还没有家人补充回忆，点击下方添加</Text>
          </View>
        ) : (
          item.comments.map(comment => {
            const member = getMemberById(comment.memberId);
            return (
              <View key={comment.id} className={styles.commentItem}>
                <Image
                  className={styles.commentAvatar}
                  src={member?.avatar || 'https://picsum.photos/id/64/200/200'}
                  mode='aspectFill'
                />
                <View className={styles.commentContent}>
                  <View className={styles.commentHeader}>
                    <Text className={styles.commentName}>{comment.memberName}</Text>
                    <Text className={styles.commentDate}>{comment.createdAt}</Text>
                  </View>
                  <Text className={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
            );
          })
        )}

        <View className={styles.addCommentBtn}>
          <Input
            style={{ width: '100%', textAlign: 'center' }}
            placeholder='添加回忆...'
            value={newComment}
            onInput={(e) => setNewComment(e.detail.value)}
            onConfirm={handleAddComment}
          />
        </View>
        {newComment && (
          <View
            className={styles.actionBtn}
            style={{ marginTop: '16rpx', backgroundColor: '#8B7355' }}
            onClick={handleAddComment}
          >
            <Text className={styles.actionText}>发布回忆</Text>
          </View>
        )}
      </View>

      <View className={styles.bottomBar}>
        <View className={`${styles.actionBtn} ${styles.shareBtn}`} onClick={handleShare}>
          <Text className={styles.actionText}>分享给亲友</Text>
        </View>
        <View className={`${styles.actionBtn} ${styles.cardBtn}`} onClick={handleMakeCard}>
          <Text className={styles.actionText}>制作纪念卡</Text>
        </View>
      </View>

      <View style={{ height: '100rpx' }} />
    </ScrollView>
  );
};

export default DetailPage;
