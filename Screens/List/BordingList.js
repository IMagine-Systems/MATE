// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  Alert,
} from "react-native";

// 아이콘
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// 폰트
import {
  useFonts,
  NotoSansKR_400Regular,
  NotoSansKR_500Mediu,
  NotoSansKR_100Thin,
  NotoSansKR_300Light,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  NotoSansKR_900Black,
} from "@expo-google-fonts/noto-sans-kr";

//SVG
import Svg, { Path, G, Mask, Rect } from "react-native-svg";

// 클립보드
import * as Clipboard from "expo-clipboard";
import {
  deleteTicketAxios,
  getBordingListAxios,
  updateTicketAxios,
} from "../../config/axiosAPI";

export default function BordingList({ navigation, route }) {
  // useRef
  const userTokenRef = useRef(route.params.token);
  const [ticketList, setTicketList] = useState();
  //const ticketListRef = useRef();

  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    getBordingListAxios(userTokenRef.current)
      .then((res) => {
        console.log("탑승리스트 res : ", res.data);
        setTicketList(res.data);
        //ticketListRef.current = res.data;
        setLoading(false);
      })
      .catch((error) => console.warn(error));
  }, []);

  // state
  const [copiedText, setCopiedText] = React.useState("");

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;

  const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaXNzIjoiY2FycG9vbCBhcHAiLCJpYXQiOjE2NjQxMDk0MDAsImV4cCI6MTY2NDE5NTgwMH0.Go0keCeAKi3fTzsB3RNhHMVBAZupn_MCkuT0FC-vbnXYRjSB0ik88xbUGzWovx-Bgx4x8if9LfwRbMFIb-V0GA`;

  // font 설정
  let [fontLoaded] = useFonts({
    NotoSansKR_500Medium,
    NotoSansKR_400Regular,
    NotoSansKR_700Bold,
    NotoSansKR_900Black,
  });

  if (!fontLoaded) {
    return null;
  }

  // 티켓 삭제 Alert창 보여주는 함수
  const ticketDeleteAlert = () =>
    Alert.alert(
      "카풀 삭제 하시겠습니까?",
      `드라이버의 일방적 삭제로 인한${"\n"}신고가 3회 이상 누적되면${"\n"}서비스 이용에 제한이 있을 수 있습니다.카풀을 삭제하시겠습니까?`,
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: () => {
            console.log("ticket id : ", ticketList);
            updateTicketAxios(userTokenRef.current, 8)
              .then((res) => {
                console.log("ticket delecte res : ", res);
                navigation.navigate("Main", route.params);
              })
              .catch((error) => console.warn(error));
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );

  // 운행 종료 Alert창 보여주는
  const driveFinishAlert = () =>
    Alert.alert(
      "운행 종료하겠습니까?",
      `유료 운행의 경우 오전 7~9시,${"\n"}오후 6~8시까지 운행을 종료해야 합니다.${"\n"}${"\n"}운행 종료하시겠습니까?`,
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "종료",
          onPress: () => {
            navigation.navigate("Main");
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );

  // 클립보드 핸들러

  const copyToClipboard = async () => {
    Clipboard.setString("https://open.kakao.com/o/gB1fw7Ae");
    alert("오픈채팅 링크 복사 하였습니다.");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.container}>
        <View
          style={
            Platform.OS === "ios"
              ? [styles.header, { flex: deviceHeight >= 700 ? 0.17 : 0.15 }]
              : {
                  flex: 0.12,
                  justifyContent: "flex-end",
                  justifyContent: "center",
                  paddingLeft: 20,
                  paddingRight: 20,
                }
          }
        >
          <View style={styles.navbar}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Main", route.params);
              }}
              style={styles.backIcon}
            >
              <AntDesign name="left" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={
            Platform.OS === "ios"
              ? { flex: deviceHeight >= 700 ? 0.62 : 0.7 }
              : { flex: 0.7 }
          }
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#D9D9D9",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 50,
              }}
            >
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 20,
                  fontFamily: "NotoSansKR_700Bold",
                }}
              >
                인동
              </Text>
              <View>
                <Ionicons name="arrow-forward" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontFamily: "NotoSansKR_700Bold",
                }}
              >
                경운대학교
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Octicons
                  name="calendar"
                  size={deviceHeight >= 700 ? 32 : 28}
                  color="#D9D9D9"
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontFamily: "NotoSansKR_700Bold",
                    color: "#989595",
                  }}
                >
                  8월 28일 (화)
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <MaterialIcons
                  name="access-time"
                  size={deviceHeight >= 700 ? 32 : 28}
                  color="#D9D9D9"
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: "#007AFF",
                    fontFamily: "NotoSansKR_700Bold",
                  }}
                >
                  오전 8시 30분
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => copyToClipboard()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 15,
                marginLeft: 40,
                marginTop: 20,
                marginBottom: 15,
                borderColor: "#3A1D1D",
                borderWidth: 1,
              }}
            >
              <Svg
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="23px"
                height="23px"
                viewBox="0 0 442.761 442.762"
                fill="#3A1D1D"
                style={{
                  enableBackground: "new 0 0 442.761 442.762",
                }}
                xmlSpace="preserve"
              >
                <G>
                  <Path d="M237.082,31.617c-113.596,0-205.681,84.96-205.681,189.764c0,28.473,6.809,55.473,18.986,79.711L1.735,389.064 c-2.703,4.887-2.215,10.916,1.239,15.307c2.673,3.396,6.721,5.299,10.912,5.299c1.223,0,2.457-0.162,3.674-0.498l106.505-29.232 c32.435,19.719,71.269,31.205,113.017,31.205c113.594,0,205.68-84.959,205.68-189.764 C442.761,116.577,350.675,31.617,237.082,31.617z" />
                </G>
              </Svg>
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: "NotoSansKR_400Regular",
                  color: "#2E2E2E",
                }}
              >
                1:1 오픈 채팅 참여하기
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={Platform.OS === "ios" ? { marginTop: 20 } : { marginTop: 5 }}
          >
            <View style={styles.carpool_list_display}>
              <View style={{ marginBottom: 8, marginLeft: 20 }}>
                <Text style={{ color: "#D9D9D9" }}>드라이버</Text>
              </View>
              <View style={styles.carpool_list_display_title}>
                <View
                  style={{
                    width: 120,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="person-circle-sharp"
                    size={45}
                    color="#d9d9d9"
                  />
                  <Text style={styles.carpool_list_ticket_display_title_text}>
                    최수정
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.carpool_list_display}>
              <View style={{ marginBottom: 8, marginLeft: 20 }}>
                <Text style={{ color: "#D9D9D9" }}>패신저 (3/3)</Text>
              </View>

              <View style={styles.carpool_list_display_title}>
                <View
                  style={{
                    width: 120,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="person-circle-sharp"
                    size={45}
                    color="#d9d9d9"
                  />
                  <Text style={styles.carpool_list_ticket_display_title_text}>
                    김수지
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DiclationScreen", route.params)
                  }
                  style={styles.carpool_list_ticket_display_title_pesinger}
                >
                  <Feather name="bell" size={24} color="#d8d7d7" />
                  <Text style={styles.complaint_text}>신고</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.carpool_list_display_title}>
                <View
                  style={{
                    width: 120,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="person-circle-sharp"
                    size={45}
                    color="#d9d9d9"
                  />
                  <Text style={styles.carpool_list_ticket_display_title_text}>
                    박지우
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("DiclationScreen")}
                  style={styles.carpool_list_ticket_display_title_pesinger}
                >
                  <Feather name="bell" size={24} color="#d8d7d7" />
                  <Text style={styles.complaint_text}>신고</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.carpool_list_display_title}>
                <View
                  style={{
                    width: 120,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="person-circle-sharp"
                    size={45}
                    color="#d9d9d9"
                  />
                  <Text style={styles.carpool_list_ticket_display_title_text}>
                    이정민
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("DiclationScreen")}
                  style={styles.carpool_list_ticket_display_title_pesinger}
                >
                  <Feather name="bell" size={24} color="#d8d7d7" />
                  <Text style={styles.complaint_text}>신고</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.finish_button_container}>
            <TouchableOpacity
              onPress={ticketDeleteAlert}
              style={[
                styles.finish_button_container_cancle_button,
                { marginRight: 15 },
              ]}
            >
              <Text
                style={{ color: "#007AFF", fontWeight: "bold", fontSize: 15 }}
              >
                티켓 삭제
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={driveFinishAlert}
              style={styles.finish_button_container_button}
            >
              <Text
                style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 15 }}
              >
                운행 종료
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 0.15,
    justifyContent: "flex-end",
    justifyContent: "center",
  },

  navbar: {
    flexDirection: "row",
    marginTop: 15,
  },

  backIcon: {
    width: 35,
    height: 35,
    justifyContent: "center",
  },

  startPointEndPointText: {
    alignItems: "center",
    width: "80%",
  },

  kakaoOpenChatLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  form_container: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
  },

  form_label_text: {
    fontWeight: "bold",
    width: 60,
  },

  startpoint_first_dropmenu: {
    width: 80,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },

  endpoin_first_dropmenu: {
    width: 80,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },

  selectListContainer: {
    width: 105,
  },

  second_dropmenu: {
    width: 130,
    borderColor: "gray",
    borderBottomWidth: 1,
  },

  form_input: {
    width: 250,
    borderColor: "gray",
    borderBottomWidth: 1,
  },

  carpool_list_display: {
    marginBottom: 10,
  },

  carpool_list_display_title: {
    flexDirection: "row",
    width: "87%",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },

  carpool_list_ticket_display_title_driver: {
    width: 37,
    height: 21,
    backgroundColor: "#e31e1e",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  carpool_list_ticket_display_title_pesinger: {
    height: 21,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  complaint_text: {
    color: "#d8d7d7",
    fontWeight: "bold",
    marginLeft: 5,
  },

  profile_image: {
    width: 35,
    height: 35,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
  },

  footer: {
    flex: 0.18,

    justifyContent: "flex-end",
    paddingBottom: 30,
  },

  message_container: {
    flex: 0.2,
    justifyContent: "center",
  },

  message_container_text: {
    fontSize: 10,
    color: "#989595",
  },

  button_container: {
    justifyContent: "center",
    marginBottom: 10,
  },

  finish_button_container: {
    justifyContent: "center",
    flexDirection: "row",
  },

  button_container_next_button: {
    backgroundColor: "#007AFF",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginLeft: 15,
    marginRight: 15,
  },

  finish_button_container_button: {
    backgroundColor: "#007AFF",
    height: 55,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },

  finish_button_container_cancle_button: {
    backgroundColor: "#FFFFFF",
    height: 55,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
});
