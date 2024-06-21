import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {StackView, SearchIcon, CenterView, IconButton} from 'components';
import {BORDER_RADIUS, COLORS, FONTS, SCREEN_PADDING} from 'utils';
import {useToggle} from 'hooks';
import {CancelIcon} from 'components/icons/cancel';

export const Searchbar = () => {
  const [isFocused, onToggleFocus] = useToggle(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <StackView align="center" justify="space-between" style={[styles.container, {borderWidth: isFocused ? 1 : 0}]}>
      <CenterView style={{marginLeft: '2%'}}>
        <SearchIcon color={isFocused ? COLORS.ROYAL_BLUE : COLORS.LIGHT_GREY} />
      </CenterView>
      <TextInput
        onFocus={onToggleFocus}
        onBlur={onToggleFocus}
        selectionColor={COLORS.BLACK}
        placeholderTextColor={COLORS.GREY}
        placeholder="Search"
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery && <IconButton icon={<CancelIcon />} onPress={() => setSearchQuery('')} />}
    </StackView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingHorizontal: 10,
    columnGap: 10,
    backgroundColor: COLORS.DIRT_GREY,
    borderRadius: BORDER_RADIUS,
    marginTop: 20,
    marginHorizontal: SCREEN_PADDING,
    borderColor: COLORS.PRIMARY,
    color: COLORS.PRIMARY,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.REGULAR,
    color: COLORS.PRIMARY,
  },
});
