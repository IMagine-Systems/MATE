// 모듈 불러오는 부분, 현재 수정중
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

// 아이콘(원격주소) 불러오기
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import Svg, { Path } from "react-native-svg";

import {
  getMemberAxios,
  getTicketListAxios,
  readPromiseAxios,
} from "../../config/axiosAPI";

export default function Main({ navigation, route }) {
  // state
  const [areaData, setAreaData] = useState();
  const [carpoolList, setCarpoolList] = useState([]);
  const [memberData, setMemberData] = useState({});
  const [loading, setLoading] = useState(false);
  const [promise, setPromise] = useState(null);

  // route params 상태 유지.
  //const [ paramsTest, setParamsTest ] = useState("사용자토큰");

  // 사용자 토큰 값 useRef -> state로 관리 가능함.

  const userTokenRef = useRef(route.params.token); // member token으로 상태관리 할 예정.
  const memberDataRef = useRef();
  const carpoolListRef = useRef();

  const isFocused = useIsFocused();
  /*
    const [ testList, setTestList ] = useState([{
        startArea: "인동",
        endArea: "경운대학교",
        ticketPrice: "무료",
        startDtime: "8월 24일, 오전 8시 30분",
        recruitPerson: 1,
    }, {
        startArea: "옥계",
        endArea: "경운대학교",
        ticketPrice: "유료",
        startDtime: "8월 25일, 오전 8시 30분",
        recruitPerson: 1,
    }, {
        startArea: "경운대학교",
        endArea: "옥계",
        ticketPrice: "무료",
        startDtime: "8월 26일, 오전 8시 30분",
        recruitPerson: 2,
    }]);
    */
  /* 카풀리스트 티켓 클릭 하면 티켓 정보 보여주는 코드
    testList.map(item => (
        <TouchableOpacity
            onPress={() => navigation.navigate('TicketDetail', item)}
            style={styles.carpool_list_ticket_display}>
            <View style={styles.profile_image}></View>
            <View style={styles.carpool_list_ticket_display_title}>
                <View style={styles.carpool_list_ticket_content}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{item.startArea}</Text>
                        <Text>{' / '}</Text>
                        <Text style={{ color: '#007AFF', fontWeight: '600' }}>
                            {item.ticketPrice}
                        </Text>
                    </View>
                    <Text style={styles.carpool_list_ticket_time}>
                        {item.startDtime}
                    </Text>
                </View>
                <View style={styles.carpool_list_passenger_chip}>
                    <Text style={styles.carpool_list_passenger_chip_text}>{item.recruitPerson}/4</Text>
                </View>
            </View>
        </TouchableOpacity>
    ))
   */

  // 임시로 토큰 변수 선언 하였다. -> userTokenRef 이용 하면 된다.

  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoiY2FycG9vbCBhcHAiLCJpYXQiOjE2NjQxMDk0MDAsImV4cCI6MTY2NDE5NTgwMH0.Go0keCeAKi3fTzsB3RNhHMVBAZupn_MCkuT0FC-vbnXYRjSB0ik88xbUGzWovx-Bgx4x8if9LfwRbMFIb-V0GA';
  useEffect(() => {
    // console.log("사용자 토큰 확인 : ", userTokenRef.current);
    // const res = await getMemberAxios(userTokenRef.current)
    // memberDataRef.current = res.data;
    // console.log("main promise res : ", memberDataRef.current);

    const get = async () => {
      setLoading(true);
      const res = await getMemberAxios(userTokenRef.current);
      const res2 = await getTicketListAxios(userTokenRef.current);
      readPromiseAxios(userTokenRef.current)
        .then((res) => {
          console.log("예약 res : ", res.data);
          setPromise(res.data);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setPromise(null);
          }
        });

      console.log(res.data);
      setMemberData(res.data);
      setCarpoolList(res2.data);
      console.log("카풀목록 조회 : ", res2.data);
      setLoading(false);
    };

    get();

    /*  
        
        // 1. 지역 설정 API
        // 지역설정 api 호출 부분 area: "인동"(default 값)
        // 지역을 설정 했으면 그 지역으로 할당 되야 한다. 다시 로그인 하면 설정한 지역으로 받아야함. 사용자(멤버)테이블에 지역설정 멤버가 있어야 될것 같다.

        const resArea = axios.get('http://3.37.159.244:8080/area', {
            memberEmail: "zonins3@gmail.com",
        });
        
        setAreaData(resArea);

        //const areaRes = axios.get('http://3.37.159.244:8080/area');
        */

    // 2. 카풀리스트
    // const list = await getTicketListAxios(userTokenRef.current)
    // //setCarpoolList(list.data);
    // carpoolListRef.current = list.data
    // console.log("티켓 리스트 조회 res : ", carpoolList.current);
    // console.log(carpoolListRef.current.length);
    // setLoading(false);

    /*
        const carpoolListRes = axios.get('카풀리스트 url');
        setCarpoolList(carpoolListRes);
        */

    // 3. 예약된 카풀 어떤 url에 있는 곳인지 모르겠음. 사용자(member)테이블에 예약된 카풀이 있는지 관련 멤버가 있어야 될것 같다.
  }, [isFocused]);

  const [ticketList, setTicketList] = useState(10);
  return (
    <View style={styles.container}>
      {loading === false ? (
        <View>
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logo_text}>MATE</Text>
            </View>
            <View style={{ width: 120 }} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileScreen", route.params)
                }
              >
                <Ionicons
                  name="md-person-circle-outline"
                  size={30}
                  color="#909090"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Setting", route.params)}
              >
                <Feather name="settings" size={24} color="#909090" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("LocalSettingFirst", route.params)
                }
                style={styles.local_setting}
              >
                <View style={styles.local_display}>
                  <MaterialCommunityIcons
                    name="map-marker-outline"
                    size={24}
                    color="#007AFF"
                  />
                  <Text style={styles.local_display_text}>지역설정</Text>
                  <Text style={styles.local_name}>{memberData.area}</Text>
                  <AntDesign name="right" size={24} color="#909090" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.carpool_section}
                onPress={() => {
                  if (memberData.auth === "DRIVER") {
                    navigation.navigate("TicketScreen", route.params);
                  } else {
                    alert("티켓 생성 권한 없습니다.");
                  }
                }}
              >
                <View style={styles.local_display}>
                  <Ionicons name="car-outline" size={24} color="#007AFF" />
                  <Text style={styles.carpool_display_text}>카풀 모집하기</Text>
                  <View style={{ width: 65, alignItems: "flex-end" }}>
                    <AntDesign name="right" size={24} color="#909090" />
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.carpool_list_section}>
                <View style={styles.local_display}>
                  <Svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 3H17C17.5523 3 18 3.44772 18 4V7H21C21.5523 7 22 7.44772 22 8V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V4C2 3.44772 2.44772 3 3 3ZM4 5V18C4 18.5523 4.44772 19 5 19H16.1707C16.0602 18.6872 16 18.3506 16 18V8V5H4ZM18 9V18C18 18.5523 18.4477 19 19 19C19.5523 19 20 18.5523 20 18V9H18ZM6 8C6 7.44772 6.44772 7 7 7H13C13.5523 7 14 7.44772 14 8C14 8.55228 13.5523 9 13 9H7C6.44772 9 6 8.55228 6 8ZM9 11C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11H9Z"
                      fill="#007AFF"
                    />
                  </Svg>
                  <Text style={styles.carpool_list_display_text}>
                    카풀 목록
                  </Text>
                </View>
              </View>
            </View>
            {carpoolList.length === 0 ? (
              <View
                style={{
                  height: 230,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  오후 9시에 카풀 목록이 업데이트 됩니다.
                </Text>
              </View>
            ) : (
              <ScrollView style={{ height: 275 }}>
                <View style={styles.carpool_list}>
                  {loading === false
                    ? carpoolList.map((item) => (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("TicketDetail", {
                              ...item,
                              ["userData"]: route.params,
                            })
                          }
                          style={styles.carpool_list_ticket_display}
                        >
                          <View style={styles.profile_image}></View>
                          <View
                            style={styles.carpool_list_ticket_display_title}
                          >
                            <View style={styles.carpool_list_ticket_content}>
                              <View style={{ flexDirection: "row" }}>
                                <Text>{item.startArea}</Text>
                                <Text>{" / "}</Text>
                                <Text
                                  style={{
                                    color: "#007AFF",
                                    fontWeight: "600",
                                  }}
                                >
                                  {item.ticketPrice ? item.ticketPrice : "무료"}
                                </Text>
                              </View>
                              <Text style={styles.carpool_list_ticket_time}>
                                {item.startDtime}
                              </Text>
                            </View>
                            <View style={styles.carpool_list_passenger_chip}>
                              <Text
                                style={styles.carpool_list_passenger_chip_text}
                              >
                                0/{item.recruitPerson}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))
                    : null}
                </View>
              </ScrollView>
            )}
            {/* <View style={styles.footer}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("BordingList")}
                        style={styles.list_container}>
                        <Text>리스트</Text>
                        <View style={styles.list_container_text_container}>
                            <Text>내역</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            <View style={styles.footer}>
              {promise === null ? (
                <TouchableOpacity
                  style={styles.footer_button}
                  onPress={() => {
                    if (memberData.auth === "DRIVER") {
                      navigation.navigate("BordingList", route.params);
                    } else {
                      navigation.navigate("PassengerBordingList", route.params);
                    }
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    예약된 카풀이 없어요!
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#007AFF",
                    height: 55,
                    justifyContent: "center",
                    borderRadius: 35,
                    marginBottom: 20,
                  }}
                  onPress={() => {
                    if (memberData.auth === "DRIVER") {
                      navigation.navigate("BordingList", route.params);
                    } else {
                      navigation.navigate("PassengerBordingList", route.params);
                    }
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#D9D9D9",
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                      }}
                    ></View>
                    <View>
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {`${promise.startDtime[4]}월 ${promise.startDtime.slice(
                          5,
                          7
                        )}일, ${promise.startDtime.slice(
                          9,
                          11
                        )}시 ${promise.startDtime.slice(11, 13)}분 예약`}
                      </Text>
                      <View style={{ width: 170 }}>
                        <Text
                          style={{ color: "#FFFFFF" }}
                        >{`${promise.startArea} 출발`}</Text>
                      </View>
                    </View>
                    <View>
                      <AntDesign name="right" size={24} color="#FFFFFF" />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
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
    backgroundColor: "#ecf0f1",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 100,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },

  logo: {},

  logo_text: {
    fontSize: 35,
    color: "#007AFF",
    fontWeight: "bold",
  },

  local_setting: {
    backgroundColor: "#FFFFFF",
    height: 60,
    paddingLeft: 20,
    paddingRight: 17,
    borderRadius: 20,
  },

  local_display: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
  },

  local_display_text: {
    width: 70,
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: "600",
  },

  carpool_display_text: {
    width: 210,
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: "600",
  },

  carpool_list_display_text: {
    width: 250,
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: "600",
  },

  ticket_create: {
    backgroundColor: "#FFFFFF",
    height: 69,
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 27,
    borderRadius: 20,
    marginTop: 17,
  },

  carpool_list: {
    backgroundColor: "#FFFFFF",
    paddingLeft: 37,
    paddingRight: 17,
    paddingTop: 27,
  },

  carpool_list_title: {
    marginBottom: 27,
  },

  carpool_list_ticket_display: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
  },

  profile_image: {
    width: 40,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
  },

  carpool_list_ticket_display_title: {
    flexDirection: "row",
    width: 255,
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
  },

  carpool_list_ticket_display_title_driver: {
    width: 37,
    height: 21,
    backgroundColor: "#3B67FF",
  },

  carpool_list_ticket_display_title_Passenger: {
    width: 37,
    height: 21,
    backgroundColor: "#A8BBFF",
  },

  list_container: {
    backgroundColor: "#FFFFFF",
    flex: 0.3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  list_container_text_container: {
    backgroundColor: "#D9D9D9",
    height: 25,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  DriverPassengerModal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },

  DriverPassengerModalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: SCREEN_HEIGHT - 320,
    shadowColor: "#000",
    //그림자의 영역 지정
    shadowOffset: {
      width: 0,
      height: 2,
    },
    //불투명도 지정
    shadowOpacity: 0.25,
    //반경 지정
    shadowRadius: 3.84,
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    paddingLeft: 20,
    paddingRight: 20,
  },

  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: SCREEN_HEIGHT - 320,
    shadowColor: "#000",
    //그림자의 영역 지정
    shadowOffset: {
      width: 0,
      height: 2,
    },
    //불투명도 지정
    shadowOpacity: 0.25,
    //반경 지정
    shadowRadius: 3.84,
  },

  carpool_section: {
    backgroundColor: "#FFFFFF",
    height: 60,
    paddingLeft: 20,
    paddingRight: 17,
    borderRadius: 20,
    marginTop: 5,
  },

  carpool_list_section: {
    height: 60,
    paddingLeft: 20,
    paddingRight: 17,
    borderRadius: 20,
    marginTop: 5,
  },

  carpool_people: {
    width: 20,
  },

  carpool_unit: {
    fontSize: 15,
    paddingRight: 10,
  },

  local_name: {
    fontSize: 15,
    textAlign: "right",
    paddingRight: 10,
    width: 180,
  },

  carpool_list_passenger_chip: {
    backgroundColor: "#007AFF",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 20,
  },

  carpool_list_passenger_chip_full: {
    backgroundColor: "#D9D9D9",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 20,
  },

  carpool_list_passenger_chip_text: {
    color: "white",
    fontWeight: "600",
  },

  carpool_list_ticket_content: {
    paddingLeft: 5,
  },

  carpool_list_ticket_time: {
    fontSize: 15,
  },

  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 100,
  },

  footer_button: {
    backgroundColor: "#2E2E2EE5",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginBottom: 20,
  },
});
