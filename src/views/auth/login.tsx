import {Modal, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, IS_ANDROID, SCREEN_PADDING, SCREEN_WIDTH} from 'utils';
import {Button, ChevronLeftIcon, Text, TextInput} from 'components';
import {useForm} from 'hooks';
import {LoginForm} from './api/type';
import {useLogin} from './api/service';
import {useAuth} from 'contexts';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export const LoginScreen = ({isVisible, onClose}: Props) => {
  const {values, errors, register, handleSubmit} = useForm<LoginForm>({
    validationRule: {pwd: 'password', usr: 'email', url: 'url'},
  });

  const {login} = useAuth();

  const {mutate, isPending} = useLogin();

  const onLogin = (v: LoginForm) => {
    //  mutate(v) will replace login if API were to be working
    // mutate(v);
    login({email: v.usr, id: 'user12334', username: 'Johnson'}, 'sdsdhskdhk');
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="slide" transparent>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <View style={styles.modalStack} />
        <View style={styles.modalWrapper}>
          <View style={styles.handles} />
          <Pressable onPress={onClose} style={styles.cancelBtn} accessibilityLabel="close modal">
            <ChevronLeftIcon />
            <Text fontSize={17} color="#4561DB">
              Cancel
            </Text>
          </Pressable>
          <View style={{paddingHorizontal: SCREEN_PADDING, flex: 1}}>
            <ScrollView keyboardDismissMode="interactive" contentContainerStyle={{flex: 1}}>
              <Text fontWeight="bold" fontSize={34}>
                Login
              </Text>
              <Text fontSize={17} style={{marginTop: 10, marginBottom: 38}} color="#757281">
                Please enter your website url,email or username and password to login
              </Text>

              <TextInput inputType="url" mb={27} errorMessage={errors?.url} value={values?.url} onChangeText={v => register({value: v, name: 'url'})} placeholder="URL" />
              <TextInput inputType="email" mb={27} errorMessage={errors?.usr} value={values?.usr} onChangeText={v => register({value: v, name: 'usr'})} placeholder="Username/email" />
              <TextInput inputType="password" errorMessage={errors?.pwd} value={values?.pwd} onChangeText={v => register({value: v, name: 'pwd'})} placeholder="Password" />
              <View style={{flex: 1}} />
              <Button isLoading={isPending} style={{marginBottom: 50}} text="Login" disabled={!values} onPress={() => handleSubmit(onLogin)} />
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStack: {
    width: SCREEN_WIDTH - 20,
    height: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.PRIMARY,
    marginBottom: -10,
    marginTop: IS_ANDROID ? 20 : 60,
    alignSelf: 'center',
  },
  modalWrapper: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    flex: 1,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  handles: {
    height: 5,
    width: 35,
    backgroundColor: COLORS.LIGHT_GREY,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 2.5,
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    marginHorizontal: 10,
    height: 44,
  },
});
