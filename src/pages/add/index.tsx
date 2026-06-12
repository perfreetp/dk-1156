import React, { useState } from 'react';
import { View, Text, Input, Textarea, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '../../store/AppContext';
import { ERA_OPTIONS, ROOM_OPTIONS, DAMAGE_OPTIONS, VIEW_PERMISSION_OPTIONS } from '../../types';
import styles from './index.module.scss';

const AddPage: React.FC = () => {
  const { addItem, currentMember } = useAppContext();

  const [formData, setFormData] = useState({
    name: '',
    era: '1990-2010',
    room: 'livingRoom',
    origin: '',
    location: '',
    relatedPerson: '',
    story: '',
    mainImage: '',
    detailImages: [] as string[],
    damageLevel: 'none' as 'none' | 'light' | 'medium' | 'heavy',
    viewPermission: 'family' as 'all' | 'family' | 'private'
  });

  const handleChooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setFormData(prev => ({
          ...prev,
          mainImage: res.tempFilePaths[0]
        }));
      },
      fail: () => {
        Taro.showToast({ title: '请选择图片', icon: 'none' });
      }
    });
  };

  const handleChooseDetailImage = () => {
    const remainCount = 5 - formData.detailImages.length;
    if (remainCount <= 0) {
      Taro.showToast({ title: '最多5张细节图', icon: 'none' });
      return;
    }

    Taro.chooseImage({
      count: remainCount,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setFormData(prev => ({
          ...prev,
          detailImages: [...prev.detailImages, ...res.tempFilePaths].slice(0, 5)
        }));
      },
      fail: () => {
        Taro.showToast({ title: '请选择图片', icon: 'none' });
      }
    });
  };

  const handleDeleteDetailImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      detailImages: prev.detailImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Taro.showToast({ title: '请输入物件名称', icon: 'none' });
      return;
    }
    if (!formData.mainImage) {
      Taro.showToast({ title: '请上传主图', icon: 'none' });
      return;
    }

    const today = new Date();
    const nextReview = new Date(today);
    nextReview.setMonth(nextReview.getMonth() + 6);

    addItem({
      ...formData,
      createdBy: currentMember.id,
      familyMembers: [currentMember.id],
      lastReviewDate: today.toISOString().split('T')[0],
      nextReviewDate: nextReview.toISOString().split('T')[0],
      comments: []
    });

    Taro.showToast({ title: '建档成功', icon: 'success' });

    setTimeout(() => {
      Taro.switchTab({ url: '/pages/home/index' });
    }, 1500);
  };

  return (
    <ScrollView className={styles.container} scrollY>
      <View className={styles.form}>
        <View className={styles.imageSection}>
          <Text className={styles.sectionTitle}>上传照片</Text>
          <Text className={styles.currentUser}>当前建档人：{currentMember?.name || '未知'}</Text>

          <View className={styles.mainImage} onClick={handleChooseImage}>
            {formData.mainImage ? (
              <Image
                className={styles.mainImagePreview}
                src={formData.mainImage}
                mode='aspectFill'
              />
            ) : (
              <View className={styles.addImageIcon}>
                <Text className={styles.addIconText}>📷</Text>
                <Text className={styles.addIconLabel}>点击上传主图</Text>
              </View>
            )}
          </View>

          <View className={styles.detailImages}>
            {formData.detailImages.map((img, index) => (
              <View key={index} className={styles.detailImageItem}>
                <Image className={styles.detailImage} src={img} mode='aspectFill' />
                <View
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteDetailImage(index)}
                >
                  <Text className={styles.deleteText}>×</Text>
                </View>
              </View>
            ))}
            {formData.detailImages.length < 5 && (
              <View className={styles.addDetailBtn} onClick={handleChooseDetailImage}>
                <Text className={styles.addDetailText}>+</Text>
                <Text className={styles.addDetailLabel}>细节图</Text>
              </View>
            )}
          </View>
          <Text className={styles.imageHint}>可上传最多5张细节图</Text>
        </View>

        <View className={styles.section}>
          <View className={styles.inputGroup}>
            <Text className={styles.label}>物件名称 *</Text>
            <Input
              className={styles.input}
              placeholder='请输入物件名称'
              value={formData.name}
              onInput={(e) => setFormData(prev => ({ ...prev, name: e.detail.value }))}
            />
          </View>

          <View className={styles.inputGroup}>
            <Text className={styles.label}>年代</Text>
            <View className={styles.selectGroup}>
              {ERA_OPTIONS.map(option => (
                <View
                  key={option.value}
                  className={`${styles.selectItem} ${formData.era === option.value ? styles.selectItemActive : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, era: option.value }))}
                >
                  <Text className={`${styles.selectText} ${formData.era === option.value ? styles.selectTextActive : ''}`}>
                    {option.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className={styles.inputGroup}>
            <Text className={styles.label}>保存位置</Text>
            <View className={styles.selectGroup}>
              {ROOM_OPTIONS.map(option => (
                <View
                  key={option.value}
                  className={`${styles.selectItem} ${formData.room === option.value ? styles.selectItemActive : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, room: option.value }))}
                >
                  <Text className={`${styles.selectText} ${formData.room === option.value ? styles.selectTextActive : ''}`}>
                    {option.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className={styles.inputGroup}>
            <Text className={styles.label}>来源</Text>
            <Input
              className={styles.input}
              placeholder='如：结婚时的嫁妆'
              value={formData.origin}
              onInput={(e) => setFormData(prev => ({ ...prev, origin: e.detail.value }))}
            />
          </View>

          <View className={styles.inputGroup}>
            <Text className={styles.label}>详细位置</Text>
            <Input
              className={styles.input}
              placeholder='如：客厅角落柜子里'
              value={formData.location}
              onInput={(e) => setFormData(prev => ({ ...prev, location: e.detail.value }))}
            />
          </View>

          <View className={styles.inputGroup}>
            <Text className={styles.label}>关联人物</Text>
            <Input
              className={styles.input}
              placeholder='与该物件相关的人物'
              value={formData.relatedPerson}
              onInput={(e) => setFormData(prev => ({ ...prev, relatedPerson: e.detail.value }))}
            />
          </View>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>物件故事</Text>
          <Textarea
            className={styles.textarea}
            placeholder='记录这个物件的故事和回忆...'
            value={formData.story}
            onInput={(e) => setFormData(prev => ({ ...prev, story: e.detail.value }))}
          />
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>破损程度</Text>
          <View className={styles.damageSelect}>
            {DAMAGE_OPTIONS.map(option => (
              <View
                key={option.value}
                className={`${styles.damageOption} ${formData.damageLevel === option.value ? styles.damageOptionActive : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, damageLevel: option.value as any }))}
              >
                <View className={`${styles.damageDot} ${styles[`damageDot${option.value.charAt(0).toUpperCase() + option.value.slice(1)}`]}`} />
                <View>
                  <Text className={styles.damageLabel}>{option.label}</Text>
                  <Text className={styles.damageDesc}>
                    {option.value === 'none' && '完好无损'}
                    {option.value === 'light' && '轻微磨损'}
                    {option.value === 'medium' && '部分损坏'}
                    {option.value === 'heavy' && '需要修复'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>谁可查看</Text>
          <View className={styles.permissionGroup}>
            {VIEW_PERMISSION_OPTIONS.map(option => (
              <View
                key={option.value}
                className={`${styles.permissionItem} ${formData.viewPermission === option.value ? styles.permissionItemActive : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, viewPermission: option.value as any }))}
              >
                <Text className={`${styles.permissionText} ${formData.viewPermission === option.value ? styles.permissionTextActive : ''}`}>
                  {option.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.submitBtn} onClick={handleSubmit}>
          <Text className={styles.submitText}>保存档案</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddPage;
