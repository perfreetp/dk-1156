import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { FilterOptions, ERA_OPTIONS, ROOM_OPTIONS } from '../../types';
import styles from './index.module.scss';

interface FilterBarProps {
  filter: FilterOptions;
  onFilterChange: (filter: FilterOptions) => void;
  showSearch?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  showSearch = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState(filter.searchText || '');

  const handleSearch = () => {
    onFilterChange({ ...filter, searchText });
  };

  const handleEraSelect = (era: string) => {
    const newEra = filter.era === era ? undefined : era;
    onFilterChange({ ...filter, era: newEra });
  };

  const handleRoomSelect = (room: string) => {
    const newRoom = filter.room === room ? undefined : room;
    onFilterChange({ ...filter, room: newRoom });
  };

  const handleClearFilter = () => {
    onFilterChange({});
    setSearchText('');
  };

  const hasActiveFilter = filter.era || filter.room || filter.searchText;

  return (
    <View className={styles.container}>
      {showSearch && (
        <View className={styles.searchBar}>
          <View className={styles.searchInput}>
            <Text className={styles.searchIcon}>搜索</Text>
            <View className={styles.inputWrapper}>
              {Taro.getEnv() === Taro.ENV_TYPE.WEB ? (
                <input
                  type='text'
                  placeholder='搜索物件名称、故事...'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onBlur={handleSearch}
                  className={styles.input}
                />
              ) : (
                <View className={styles.input}>搜索物件名称、故事...</View>
              )}
            </View>
          </View>
        </View>
      )}

      <View className={styles.filterToggle} onClick={() => setIsExpanded(!isExpanded)}>
        <Text className={styles.filterTitle}>筛选</Text>
        <Text className={styles.toggleIcon}>{isExpanded ? '收起' : '展开'}</Text>
      </View>

      {isExpanded && (
        <View className={styles.filterPanel}>
          <View className={styles.filterSection}>
            <Text className={styles.filterLabel}>年代</Text>
            <ScrollView scrollX className={styles.tagScroll}>
              <View className={styles.tagList}>
                {ERA_OPTIONS.map(option => (
                  <View
                    key={option.value}
                    className={`${styles.tag} ${filter.era === option.value ? styles.tagActive : ''}`}
                    onClick={() => handleEraSelect(option.value)}
                  >
                    <Text className={`${styles.tagText} ${filter.era === option.value ? styles.tagTextActive : ''}`}>
                      {option.label}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className={styles.filterSection}>
            <Text className={styles.filterLabel}>房间</Text>
            <ScrollView scrollX className={styles.tagScroll}>
              <View className={styles.tagList}>
                {ROOM_OPTIONS.map(option => (
                  <View
                    key={option.value}
                    className={`${styles.tag} ${filter.room === option.value ? styles.tagActive : ''}`}
                    onClick={() => handleRoomSelect(option.value)}
                  >
                    <Text className={`${styles.tagText} ${filter.room === option.value ? styles.tagTextActive : ''}`}>
                      {option.label}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {hasActiveFilter && (
            <View className={styles.clearBtn} onClick={handleClearFilter}>
              <Text className={styles.clearText}>清除筛选</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default FilterBar;
