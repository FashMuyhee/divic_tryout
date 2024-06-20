import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {StackView, SearchIcon, CenterView} from 'components';
import {BORDER_RADIUS, COLORS, FONTS, SCREEN_PADDING} from 'utils';

export const Searchbar = () => {
  return (
    <StackView align="center" justify="space-between" style={styles.container}>
      <CenterView style={{marginLeft: '2%'}}>
        <SearchIcon />
      </CenterView>
      <TextInput selectionColor={COLORS.GREY} placeholderTextColor={COLORS.GREY} placeholder="Search" style={styles.input} />
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
  },
  input: {
    flex: 1,
    fontFamily: FONTS.REGULAR,
    color: COLORS.PRIMARY,
  },
});
