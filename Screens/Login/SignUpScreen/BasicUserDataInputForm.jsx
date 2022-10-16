import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;

export default function BasicUserDataInputForm({
  userData,
  setUserData,
  setIsBasicUserDataAccepted,
}) {
  const handleOnNameTextChange = text => {
    setUserData(prev => ({ ...prev, memberName: text }));
  };

  const handleOnStudentIdTextChange = text => {
    setUserData(prev => ({
      ...prev,
      studentNumber: text,
      area: 'INDONG',
    }));
  };

  const handleOnDepartmentTextChange = text => {
    setUserData(prev => ({ ...prev, department: text }));
  };

  // 재확인 알림창 확인 버튼 클릭시 실행되는 함수
  const handleOnReconfirmAlertOKButtonPress = () => {
    userData.member = true;
    userData.auth = 'PASSENGER';
    console.log(userData);
    setIsBasicUserDataAccepted(true);
  };

  // Alert
  const reconfirmAlert = () =>
    Alert.alert(
      '입력하신 정보가 정확한가요?',
      '한번 입력하신 정보는 수정 및 변경 불가합니다.정확히 확인 후 입력해주세요!',
      [
        {
          text: '수정',
          style: 'destructive',
        },
        {
          text: '확인',
          onPress: handleOnReconfirmAlertOKButtonPress,
          style: 'defalut',
        },
      ],
      { cancelable: false },
    );

  const failAlert = () =>
    Alert.alert(
      '입력 안한 항목이 있습니다.',
      `이름, 학번, 학과 입력했는지${'\n'}확인 하시길 바랍니다.`,
      [
        {
          text: '확인',
          style: 'default',
        },
      ],
      { cancelable: false },
    );

  // 유저가 다음 버튼 눌렀을 때 유저 입력 정보 백엔드로 전송 처리하고, 페이지 이동시키는 함수
  const handleOnNextButtonPress = () => {
    // TODO 검증에 대해서 오류 메세지 세분화 작업 필요
    // TODO 로직이 이게 맞나 모르겠다.
    // TODO 유저 중복 체크 검증은 되어 있는지? -> 백엔드 팀과 협의
    if (
      userData.memberName?.length >= 2 &&
      userData.studentNumber?.length >= 9 &&
      userData.department?.length > 0
    ) {
      reconfirmAlert();
    } else {
      failAlert();
    }
  };

  // 유저 정보 DB 에 저장하는 것과 관련되어 보이는데...
  const imps = () => {
    // const res = await axios.post(`http://3.37.159.244:8080/member/new`, {
    //   EMAIL: route.params.kakao_account.email,
    //   STUDENT_ID: studentIdRef.current,
    //   DEPARTMENT: departmentRef.current,
    //   GOING_TO_SCHOOL_DAYS: goingSchoolDays.current,
    //   AUTH: authRef.current,
    //   PROFILE_IMAGE: profileImgUriRef.current,
    // });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { justifyContent: 'flex-end' }]}>
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 18, fontFamily: 'NotoSansKR_700Bold' }}>
            아래에 정보를 입력해주세요
          </Text>
        </View>
      </View>
      <View style={{ flex: deviceHeight < 700 ? 1 : 0.6 }}>
        <View style={{ marginLeft: 5, marginTop: 30 }}>
          <TextInput
            value={userData.memberName}
            onChangeText={handleOnNameTextChange}
            placeholder="이름"
            placeholderTextColor={'#2E2E2E'}
            style={styles.textInput}
          />
          <TextInput
            value={userData.studentNumber}
            onChangeText={handleOnStudentIdTextChange}
            placeholder="학번"
            placeholderTextColor={'#2E2E2E'}
            style={styles.textInput}
          />
          <TextInput
            value={userData.department}
            onChangeText={handleOnDepartmentTextChange}
            placeholder="학과"
            placeholderTextColor={'#2E2E2E'}
            style={styles.textInput}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.button_container}>
          <TouchableOpacity
            style={styles.button_container_next_button}
            onPress={handleOnNextButtonPress}>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'NotoSansKR_700Bold',
                fontSize: 23,
              }}>
              다음
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flex: 0.2,
  },

  textInput: {
    width: '50%',
    paddingBottom: 13,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },

  footer: {
    flex: 0.18,
  },

  button_container: {
    flex: 0.3,
    justifyContent: 'center',
    marginBottom: 10,
  },

  button_container_next_button: {
    backgroundColor: '#007AFF',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
