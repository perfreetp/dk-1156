import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { FamilyMember } from '../../types';
import styles from './index.module.scss';

interface MemberAvatarProps {
  member: FamilyMember;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  onClick?: () => void;
}

const MemberAvatar: React.FC<MemberAvatarProps> = ({
  member,
  size = 'medium',
  showName = false,
  onClick
}) => {
  const sizeClass = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large
  }[size];

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      Taro.navigateTo({ url: `/pages/member-detail/index?id=${member.id}` });
    }
  };

  return (
    <View className={styles.container} onClick={handleClick}>
      <Image
        className={`${styles.avatar} ${sizeClass}`}
        src={member.avatar}
        mode='aspectFill'
      />
      {showName && (
        <Text className={styles.name}>{member.name}</Text>
      )}
    </View>
  );
};

export default MemberAvatar;
