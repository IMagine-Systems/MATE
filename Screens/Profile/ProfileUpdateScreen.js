import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

import axios from "axios";
// firebase Storage 불러오기
import { getStorage, ref, uploadBytes } from "firebase/storage";
// 아이콘
import { AntDesign } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
// 폰트
import {
  useFonts,
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from "@expo-google-fonts/noto-sans-kr";
import { SafeAreaFrameContext } from "react-native-safe-area-context";
import {
  getProfileAxios,
  getProfileImgAxios,
  updateProfileAxios,
  BASE_URL,
} from "../../config/axiosAPI";

export default function ProfileUpdateScreen({ navigation, route }) {
  // http://www.godseun.com/member/profile/2a2b73fecb5c808dba3d64d861bb7e91.jpeg (GET 요청)

  //const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiY2FycG9vbCBhcHAiLCJpYXQiOjE2NjQxMjc0MzUsImV4cCI6MTY2NDIxMzgzNX0.mxtMKy-xVFF-DS--JxTcQpW1ZF9clDkQcxJbWR6Uvc_lQoIuXy2q8fTjpzH9fq6ROiW_AbRvQrdJH6sLZu0laA';

  const [memberData, setMemberData] = useState();

  // 드라이버 패신저 state
  const [selectDriverPassenger, setSelectDriverPassenger] = useState([]);

  const selectDriverPassengerList = ["드라이버", "패신저"];
  const tempAPI = useRef({});

  // 학번, 학과 state
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");

  // 등교 데이터 state
  const [goingSchoolDays, setGoingSchoolDays] = useState([]);
  const days = ["월", "화", "수", "목", "금"];

  // 이미지 state
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [profileImg, setProfileImg] = useState();

  // useRef
  const studentIdRef = useRef("");
  const departmentRef = useRef("");
  const goingSchoolDaysRef = useRef([]);
  const authRef = useRef("");
  const profileImgUriRef = useRef("");
  const memberDataRef = useRef();

  // 로딩
  const [loading, setLoading] = useState(true);
  const [imgClick, setImgClick] = useState(false);

  // FormData state
  const [formDataProfile, setFormDataProfile] = useState({});
  const formData = new FormData();

  // 사용자 토큰 useRef
  const userTokenRef = useRef(route.params.token);

  useEffect(async () => {
    console.log("profile 수정 사용자 토큰 값 : ", userTokenRef.current);
    /*
        const getRes = await axios.get(`http://www.godseun.com/member`, { 
            headers: {
                Authorization: `Bearer ${userTokenRef.current}`, 
            }
        });         
        */
    getProfileAxios(userTokenRef.current).then((res) => {
      console.log("마이페이지 수정 내정보 불러오기 res : ", res.data);
      res.data.area = "INDONG";
      setMemberData(res.data);
      memberDataRef.current = res.data;
      setGoingSchoolDays(res.data.memberTimeTable);
      //tempAPI.current = res.data;
      setLoading(false);
    });

    //console.log("user profile img : ", getUserImgRes);

    // setProfileImg(getUserImgRes.data);
  }, []);

  // 회원정보 객체 state
  const [userData, setUserData] = useState({
    email: "",
    studentId: "",
    department: "",
    goingSchoolDays: "",
    auth: "",
    profileImageURI: "",
  });

  const user = {
    email: "",
    studentId: "",
    department: "",
    goingSchoolDays: "",
    auth: "",
    profileImageURI: "",
  };

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;

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

      setFormDataProfile({
        uri: result.uri,
        type: "image/jpeg",
        name: `test.jpeg`,
      });

      user.profileImageURI = result.uri;
      profileImgUriRef.current = result.uri;
      setImgClick(true);
    }
  };

  const uploadImage = async () => {
    setUploading(true);

    //
    const storage = getStorage(); // 자신 firebase storage 경로
    const refs = ref(
      storage,
      `images/${userData.studentId}/${userData.name}.jpg`
    ); // firebase storage 경로에 넣을 ref 얻는다.
    console.log("fire storage ref : ", refs);

    // Convert Image to array of bytes.

    const img = await fetch(image);
    const bytes = await img.blob();

    uploadBytes(refs, bytes);

    setImage(null);
  };

  // 회원정보 입력 핸들러
  const onChangeTextStudentId = (text) => {
    setStudentId(text);
    studentIdRef.current = text;
  };

  const onChangeTextDepartment = (text) => {
    setDepartment(text);
    user.department = text;
    departmentRef.current = text;
  };

  const showProfileImg = () => {
    if (imgClick === false) {
      if (memberData.profileImage === null) {
        return (
          <Svg
            width={60}
            height={60}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30Z"
              fill="#D9D9D9"
            />
            <Path
              d="M39.45 20.95c0 5.494-4.455 9.949-9.95 9.949-5.495 0-9.95-4.455-9.95-9.95 0-5.495 4.455-9.949 9.95-9.949 5.495 0 9.95 4.454 9.95 9.95ZM45.505 42.579c0 5.495-7.166 6.92-16.005 6.92-8.84 0-16.006-1.425-16.006-6.92s7.166-9.95 16.006-9.95 16.005 4.455 16.005 9.95Z"
              fill="#fff"
            />
            <Path
              d="M60 50.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
              fill="#007AFF"
            />
            <Path
              d="M51.88 53.68h1.308v-2.544h2.424v-1.26h-2.424V47.32H51.88v2.556h-2.424v1.26h2.424v2.544Z"
              fill="#fff"
            />
          </Svg>
        );
      } else {
        return (
          <Image
            source={{
              uri: `${BASE_URL}/member/profile${memberData.profileImage}`,
            }}
            style={{ width: 60, height: 60, borderRadius: 50 }}
          />
        );
      }
    } else {
      if (image === "") {
        if (memberData.profileImage === null) {
          return (
            <Svg
              width={60}
              height={60}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30Z"
                fill="#D9D9D9"
              />
              <Path
                d="M39.45 20.95c0 5.494-4.455 9.949-9.95 9.949-5.495 0-9.95-4.455-9.95-9.95 0-5.495 4.455-9.949 9.95-9.949 5.495 0 9.95 4.454 9.95 9.95ZM45.505 42.579c0 5.495-7.166 6.92-16.005 6.92-8.84 0-16.006-1.425-16.006-6.92s7.166-9.95 16.006-9.95 16.005 4.455 16.005 9.95Z"
                fill="#fff"
              />
              <Path
                d="M60 50.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                fill="#007AFF"
              />
              <Path
                d="M51.88 53.68h1.308v-2.544h2.424v-1.26h-2.424V47.32H51.88v2.556h-2.424v1.26h2.424v2.544Z"
                fill="#fff"
              />
            </Svg>
          );
        }
      } else {
        return (
          <Image
            source={{
              uri: image,
            }}
            style={{ width: 60, height: 60, borderRadius: 50 }}
          />
        );
      }
    }
  };

  console.log(userData);
  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {loading === false ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileScreen", route.params)
                }
                style={{ width: 35, height: 35, justifyContent: "center" }}
              >
                <AntDesign name="left" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", width: "80%" }}>
              <Text style={{ fontSize: 16, color: "#575757" }}>
                내 정보 수정
              </Text>
            </View>
          </View>

          <View style={{ flex: deviceHeight < 700 ? 1 : 0.6 }}>
            <View>
              <View style={{ marginLeft: 5 }}>
                <Text
                  style={{ fontSize: 18, fontFamily: "NotoSansKR_400Regular" }}
                >
                  아래에 정보를 입력해주세요
                </Text>
              </View>
              <View style={{ marginTop: 2, marginLeft: 12 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#989595",
                    fontFamily: "NotoSansKR_400Regular",
                  }}
                >
                  *드라이버는 자차보유자를, 패신저는 승객(이용자)를 뜻해요!
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={styles.select_container}>
                  {selectDriverPassengerList.map((selectData) => {
                    if (loading === false) {
                      //tempAPI.current.auth
                      //selectDriverPassenger.push(memberData.auth === "DRIVER" ? "드라이버" : "패신저");
                      console.log("1확인 : ", memberDataRef.current);
                      const strAuth =
                        memberData.auth === "DRIVER" ? "드라이버" : "패신저";

                      const isSelected = strAuth === selectData;
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectDriverPassenger(([...prev]) => {
                              const id = prev.indexOf(selectData);

                              prev.splice(id, 1);
                              prev.push(selectData);

                              if (prev[0] === "드라이버") {
                                memberData.auth = "DRIVER";
                              } else {
                                prev[0] = "패신저";
                                memberData.auth = "PASSENGER";
                              }

                              user.auth = prev[0];
                              authRef.current = prev[0];
                              return prev;
                            });
                          }}
                          style={
                            isSelected
                              ? styles.select_container_active_btn
                              : styles.select_container_non_active_btn
                          }
                        >
                          <Text
                            style={
                              isSelected
                                ? {
                                    color: "#FFFFFF",
                                    fontFamily: "NotoSansKR_700Bold",
                                  }
                                : {
                                    color: "#007AFF",
                                    fontFamily: "NotoSansKR_700Bold",
                                  }
                            }
                          >
                            {selectData}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </View>
              </View>

              <View style={styles.profile_container}>
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.profile_container_input}
                >
                  {showProfileImg()}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginLeft: 5, marginTop: 15 }}>
              <View>
                <Text>요일</Text>
                <Text style={styles.message_container_text}>
                  9시까지 학교에 가야하는 날을 모두 선택해 주세요
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: Platform.OS === "ios" ? 44 : 0,
                }}
              >
                {days.map((day) => {
                  if (loading === false) {
                    const isSelected = memberData.memberTimeTable.filter(
                      (item) => {
                        return item.dayCode === day;
                      }
                    ).length;

                    console.log("확인 : ", isSelected);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setGoingSchoolDays(([...prev]) => {
                            console.log("prev : ", prev);
                            const id = prev.findIndex(
                              (days) => days.dayCode === day
                            );
                            console.log(id);
                            //console.log(id); // 날짜 있으면 id 값이 0, 없으면 -1(등교일 추가).
                            if (id > -1) {
                              prev.splice(id, 1);
                              memberData.memberTimeTable = prev;
                            } else {
                              prev.push({ dayCode: day });
                              console.log(prev);
                              setUserData((data) => ({
                                ...data,
                                ["memberTimeTable"]: prev,
                              }));
                              memberData.memberTimeTable = prev;
                            }
                            /*
                                    setGoingSchoolDays(([...prev]) => {
                                        console.log("prev : ", prev)
                                        const id = prev.findIndex((days) => days.dayCode === day);
                                        console.log(id);
                                        //console.log(id); // 날짜 있으면 id 값이 0, 없으면 -1(등교일 추가).
                                        if (id > -1) {
                                        prev.splice(id, 1);
                                        } else {
                                        prev.push({ dayCode: day });
                                        console.log(prev);
                                        setUserData((data) => ({
                                            ...data,
                                            ["memberTimeTable"]: prev,
                                        }));
        
                                        //console.log("등교일 입력후 userData 현황 : ", userData)
                                        }*/
                            return prev;
                          });
                        }}
                        style={{
                          backgroundColor: isSelected ? "#007AFF" : "#FFFFFF",
                          width: 35,
                          height: 35,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: isSelected ? 50 : 0,
                        }}
                      >
                        <Text
                          style={{
                            color: isSelected ? "#FFFFFF" : "#989595",
                            fontFamily: isSelected
                              ? "NotoSansKR_700Bold"
                              : "NotoSansKR_400Regular",
                          }}
                        >
                          {day}
                        </Text>
                      </TouchableOpacity>
                    );
                  } else {
                    setGoingSchoolDays;
                  }
                })}
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.button_container}>
              <TouchableOpacity
                style={styles.button_container_next_button}
                onPress={async () => {
                  setUserData({
                    email: "",
                    studentId: studentId,
                    department: department,
                    goingSchoolDays: goingSchoolDays,
                    auth: selectDriverPassenger[0],
                    profileImageURI: image,
                  });

                  if (image !== null) {
                    formData.append("image", formDataProfile);

                    memberData.memberTimeTable = goingSchoolDays;

                    formData.append("userData", {
                      string: JSON.stringify(memberData),
                      type: "application/json",
                    });

                    const res = await axios.post(
                      `${BASE_URL}/member/new`,
                      formData,
                      {
                        headers: {
                          Authorization: `Bearer ${userTokenRef.current}`,
                          "content-type": "multipart/form-data",
                        },
                      }
                    );

                    console.log("프로필 수정후 서버로 전송(확인용) : ", res);
                    if (res.status === 200) {
                      alert("프로필 수정 했습니다.");
                      navigation.navigate("ProfileScreen", route.params);
                    } else {
                      alert(res.status);
                    }
                  } else {
                    memberData.memberTimeTable = goingSchoolDays;
                    formData.append("userData", {
                      string: JSON.stringify(memberData),
                      type: "application/json",
                    });

                    const res = await axios.post(
                      `${BASE_URL}/member/new`,
                      formData,
                      {
                        headers: {
                          Authorization: `Bearer ${userTokenRef.current}`,
                          "content-type": "multipart/form-data",
                        },
                      }
                    );

                    console.log("프로필 수정후 서버로 전송(확인용) : ", res);
                    if (res.status === 200) {
                      alert("프로필 수정 했습니다.");
                      navigation.navigate("ProfileScreen", route.params);
                    } else {
                      alert(res.status);
                    }
                  }

                  /*
                                    const res = await axios.post(
                                        `http://www.godseun.com/member/new`,
                                        formData,
                                        {
                                            headers: {            
                                                Authorization: `Bearer ${token}`,
                                                "content-type": "multipart/form-data",
                                            },
                                        }
                                    );*/

                  //   updateProfileAxios(formData, userTokenRef.current)
                  //     .then((res) =>
                  //       console.log("프로필 수정후 서버로 전송 res : ", res)
                  //     )
                  //     .catch((error) => console.warn(error));

                  // console.log("프로필 수정후 서버로 전송 res : ", res);

                  //navigation.navigate("Main", userData);
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "NotoSansKR_700Bold",
                    fontSize: 23,
                  }}
                >
                  완료하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flex: 0.18,
    alignItems: "center",
    flexDirection: "row",
  },

  title_container: {
    marginTop: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "400",
  },

  stepbar_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  select_container: {
    borderColor: "#007AFF",
    borderWidth: 1,
    width: 312,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },

  select_container_active_btn: {
    width: 156,
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#d9d9d9",
  },

  select_container_non_active_btn: {
    width: 156,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  profile_container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  profile_container_input: {
    width: 60,
    height: 60,
    backgroundColor: "#d9d9d9",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  form_container_textinput: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    fontWeight: "400",
    paddingTop: 10,
    paddingBottom: 10,
  },

  footer: {
    flex: 0.18,
  },

  message_container: {
    justifyContent: "flex-end",
    paddingBottom: 20,
    marginTop: 5,
  },

  message_container_text: {
    fontSize: 10,
    marginTop: 10,
    color: "#989595",
    fontFamily: "NotoSansKR_400Regular",
  },

  button_container: {
    flex: 0.3,
    justifyContent: "center",
    marginBottom: 10,
  },

  button_container_next_button: {
    backgroundColor: "#007AFF",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
