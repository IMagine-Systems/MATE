import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import BasicUserDataInputForm from './BasicUserDataInputForm';
import NoProfileImageSvg from './components/NoProfileImageSvg';

// firebase Storage 불러오기
import { getStorage, ref, uploadBytes } from 'firebase/storage';

// 아이콘
import { AntDesign } from '@expo/vector-icons';

// 폰트
import {
  useFonts,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from '@expo-google-fonts/noto-sans-kr';

// API 모듈
import { memberAxios } from '../../../config/axiosAPI';

const USER_CATEGORY = ['드라이버', '패신저'];
const WEEKDAYS = ['월', '화', '수', '목', '금'];

export default function SignUpScreen({ navigation, route }) {
  // Base64 선언 및 할당
  window.btoa = require('Base64').btoa;

  // 등교 데이터 state
  const [goingSchoolDays, setGoingSchoolDays] = useState([]);

  // 드라이버 패신저 state
  const [selectDriverPassenger, setSelectDriverPassenger] = useState([
    '패신저',
  ]);

  // 이미지 state
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // useRef
  const studentIdRef = useRef('');
  const departmentRef = useRef('');
  const goingSchoolDaysRef = useRef([]);
  const authRef = useRef('');
  const profileImgUriRef = useRef('');

  // 회원정보 객체 state
  const [userData, setUserData] = useState(route.params);

  // 다음 버튼 state
  const [isBasicUserDataAccepted, setIsBasicUserDataAccepted] = useState(false);

  const deviceHeight = Dimensions.get('window').height;

  // FormData state
  const [formDataProfile, setFormDataProfile] = useState({});
  const formData = new FormData();

  //const formData = new FormData(); 전역변수ㅜㅜ

  // 폰트 설정
  let [fontLoaded] = useFonts({
    NotoSansKR_500Medium,
    NotoSansKR_400Regular,
    NotoSansKR_700Bold,
    NotoSansKR_900Black,
  });

  if (!fontLoaded) {
    return null;
  }

  const onSignUp = async () => {
    const storage = getStorage();

    const response = await fetch(image);

    //const mountainsRef = ref(storage, String(image));
    uploadImage();
  };

  // 프로필이미지 입력창 클릭시 실행
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      console.log('이미지 uri check : ', result.uri);

      // key 값 image -> 협의 해서 정해야함. 이강우님, 김재용님 협의 필요.

      setFormDataProfile({
        uri: result.uri,
        type: 'image/jpeg',
        name: 'test.jpeg',
      });

      // const variables = {
      //   studentNumber: "K12312LK",
      //   department: "computer",
      //   memberName: "김재용",
      //   phoneNumber: "01022223333",
      //   auth: "DRIVER",
      //   area: "GYUNGOON",
      //   memberTimeTable: [
      //     {
      //       dayCode: "월",
      //     },
      //     {
      //       dayCode: "토",
      //     },
      //   ],
      // };

      // formData.append("userData", {
      //   "string": JSON.stringify(variables),
      //   type: 'application/json'
      // });

      //   console.log(
      //     "확인1 : ",
      //     new Blob([JSON.stringify(variables)], { type: "application/json" })
      //   );

      // 이미지, json 같이 보내고자 한다. blob으로 해서 보내줘야함. 해결 안됨.(패키지 조사!!)
      //   const res = await axios.post(
      //     `http://www.godseun.com/member/img`,
      //     formData,
      //     {
      //       headers: {
      //         Accept: 'application/json',
      //         Authorization: `Bearer ${userData.token}`,
      //         "content-type": "multipart/form-data",
      //       },
      //     }
      //   );

      /*
    // 프로필 선택후 서버로 전송. 일단 테스트
    const res = await axios.post(
        `http://www.godseun.com/member/new`,
        formData,
        {
            headers: {            
                Authorization: `Bearer ${userData.token}`,
                "content-type": "multipart/form-data",
            },
        }
        );
      */

      //setUserData((prev) => ({ ...prev, ["profileImage"]: result.uri }));
    }
  };

  const uploadImage = async () => {
    setUploading(true);

    const storage = getStorage(); // 자신 firebase storage 경로
    const refs = ref(
      storage,
      `images/${userData.studentId}/${userData.name}.jpg`,
    ); // firebase storage 경로에 넣을 ref 얻는다.
    console.log('fire storage ref : ', refs);

    // Convert Image to array of bytes.

    const img = await fetch(image);
    const bytes = await img.blob();

    uploadBytes(refs, bytes);

    setImage(null);
  };

  const handleOnBackArrowPress = () => {
    setIsBasicUserDataAccepted(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      {isBasicUserDataAccepted ? (
        <View style={styles.container}>
          <View style={[styles.header, { justifyContent: 'flex-end' }]}>
            <TouchableOpacity
              onPress={handleOnBackArrowPress}
              style={{
                width: 35,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="left" size={25} color="black" />
            </TouchableOpacity>
            <View style={{ marginLeft: 5, justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, fontFamily: 'NotoSansKR_700Bold' }}>
                아래에 정보를 입력해주세요
              </Text>
            </View>
          </View>
          <View style={{ flex: deviceHeight < 700 ? 1 : 0.6 }}>
            <View>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.select_container}>
                  {USER_CATEGORY.map(selectData => {
                    const isSelected =
                      selectDriverPassenger.includes(selectData);
                    return (
                      <TouchableOpacity
                        key={selectData}
                        onPress={() => {
                          setSelectDriverPassenger(([...prev]) => {
                            const id = prev.indexOf(selectData);

                            prev.splice(id, 1);
                            prev.push(selectData);
                            console.log(prev);
                            setUserData(data => {
                              if (prev[0] === '드라이버') {
                                prev[0] = '드라이버';
                                return { ...data, ['auth']: 'DRIVER' };
                              } else {
                                prev[0] = '패신저';
                                return { ...data, ['auth']: 'PASSENGER' };
                              }
                            });
                            return prev;
                          });
                        }}
                        style={
                          isSelected
                            ? styles.select_container_active_btn
                            : styles.select_container_non_active_btn
                        }>
                        <Text
                          style={
                            isSelected
                              ? {
                                  color: '#FFFFFF',
                                  fontFamily: 'NotoSansKR_700Bold',
                                }
                              : {
                                  color: '#007AFF',
                                  fontFamily: 'NotoSansKR_700Bold',
                                }
                          }>
                          {selectData}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={{ marginTop: 12, marginLeft: 12 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#989595',
                    fontFamily: 'NotoSansKR_400Regular',
                  }}>
                  카풀에 운행 가능한 차량이 있다면 ‘드라이버’를 선택해 주세요
                </Text>
              </View>
              <View style={styles.profile_container}>
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.profile_container_input}>
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 60, height: 60, borderRadius: 50 }}
                    />
                  ) : (
                    <NoProfileImageSvg />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginLeft: 5 }}>
              <View>
                <Text>요일</Text>
                <Text style={styles.message_container_text}>
                  9시까지 학교에 가야하는 날을 모두 선택해 주세요
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  marginTop: Platform.OS === 'ios' ? 44 : 0,
                }}>
                {WEEKDAYS.map(day => {
                  const isSelected = goingSchoolDays.filter(item => {
                    return item.dayCode === day;
                  }).length;

                  console.log('확인 : ', isSelected);
                  return (
                    <TouchableOpacity
                      key={day}
                      onPress={() => {
                        setGoingSchoolDays(([...prev]) => {
                          console.log('prev : ', prev);
                          const id = prev.findIndex(
                            days => days.dayCode === day,
                          );
                          console.log(id);
                          //console.log(id); // 날짜 있으면 id 값이 0, 없으면 -1(등교일 추가).
                          if (id > -1) {
                            prev.splice(id, 1);
                          } else {
                            prev.push({ dayCode: day });
                            console.log(prev);
                            setUserData(data => ({
                              ...data,
                              ['memberTimeTable']: prev,
                            }));

                            //console.log("등교일 입력후 userData 현황 : ", userData)
                          }
                          return prev;
                        });
                      }}
                      style={{
                        backgroundColor: isSelected ? '#007AFF' : '#FFFFFF',
                        width: 35,
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: isSelected ? 50 : 0,
                      }}>
                      <Text
                        style={{
                          color: isSelected ? '#FFFFFF' : '#989595',
                          fontFamily: isSelected
                            ? 'NotoSansKR_700Bold'
                            : 'NotoSansKR_400Regular',
                        }}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.button_container}>
              <TouchableOpacity
                style={styles.button_container_next_button}
                onPress={async () => {
                  // 학번, 학과, 등교일 입력 했는지 검증

                  if (userData.memberTimeTable.length > 0) {
                    console.log('meber/new 경로로 서버에게 전송 : ', {
                      ...userData,
                    });

                    //formData.append('userData', userData)
                    console.log(
                      '서버 전송전 이미지 url 확인 : ',
                      formDataProfile,
                    );
                    formData.append('image', formDataProfile);

                    formData.append('userData', {
                      string: JSON.stringify(userData),
                      type: 'application/json',
                    });

                    // http://www.godseun.com/member/img
                    // http://www.godseun.com/member/new
                    // `http://3.37.159.244:8080/member/new`

                    //오류 404, 500
                    /*
                        const res = await axios.post(
                          `http://www.godseun.com/member/new`,
                          formData,
                          {
                              headers: {            
                                  Authorization: `Bearer ${userData.token}`,
                                  "content-type": "multipart/form-data",
                              },
                          }
                        );*/

                    memberAxios(formData, userData)
                      .then(res => {
                        console.log('회원가입 res : ', res);
                        alert('회원가입 성공 하였습나다.');
                        navigation.navigate('Main', userData);
                      })
                      .catch(error => console.warn(error));

                    /*
                        const res = await axios.post(
                          `http://www.godseun.com/member/new`,
                          userData,
                          {
                            headers: {
                              Authorization: `Bearer ${userData.token}`,
                            },
                          }
                        );
                        //console.log("서버로 받은 결과 : ", res);
                        */
                  }

                  //navigation.navigate("Main", route.params.token);
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'NotoSansKR_700Bold',
                    fontSize: 23,
                  }}>
                  완료하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <BasicUserDataInputForm
          userData={userData}
          setUserData={setUserData}
          setIsBasicUserDataAccepted={setIsBasicUserDataAccepted}
        />
      )}
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

  title_container: {
    marginTop: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '400',
  },

  stepbar_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  select_container: {
    borderColor: '#007AFF',
    borderWidth: 1,
    width: 312,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  select_container_active_btn: {
    width: 156,
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#d9d9d9',
  },

  select_container_non_active_btn: {
    width: 156,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profile_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  profile_container_input: {
    width: 60,
    height: 60,
    backgroundColor: '#d9d9d9',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form_container_textinput: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    fontWeight: '400',
    paddingTop: 10,
    paddingBottom: 10,
  },

  footer: {
    flex: 0.18,
  },

  message_container: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
    marginTop: 5,
  },

  message_container_text: {
    fontSize: 10,
    marginTop: 10,
    color: '#989595',
    fontFamily: 'NotoSansKR_400Regular',
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
