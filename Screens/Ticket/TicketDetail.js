import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { readTicketAxios, setRidingAxios } from "../../config/axiosAPI";

export default function TicketDetail({ navigation, route }) {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  console.log("티켓 상세 정보 중에 사용자 토큰 확인 : ", route.params);
  useEffect(() => {
    readTicketAxios(route.params.userData.token, route.params.id)
      .then((res) => {
        console.log("티켓 상세 정보 조회 res : ", res.data);
        setDetail(res.data);
        setLoading(false);
      })
      .catch((error) => console.warn(error));
  }, []);

  return (
    <View style={styles.container}>
      {loading === false ? (
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Main", route.params.userData)}
            >
              <AntDesign name="left" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.address}>
            <View style={{ width: "56%", alignItems: "flex-end" }}>
              <Text style={styles.address_text}>{detail.startArea}</Text>
            </View>
            <View style={{ width: "30%", alignItems: "center" }}>
              <AntDesign name="arrowright" size={24} color="black" />
            </View>
            <View style={{ alignItems: "flex-start", width: "56%" }}>
              <Text style={styles.address_text}>{detail.endArea}</Text>
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.form_container}>
              <View style={styles.text_view}>
                <View style={styles.ticket}>
                  <View style={styles.profile_image}></View>
                  <Text style={styles.ticket_text}>티켓 생성자 이름</Text>
                  <AntDesign
                    style={styles.ticket_arrow}
                    name="right"
                    size={20}
                    color="black"
                  />
                </View>
              </View>
              <View style={styles.text_view}>
                <Text style={styles.common_text}>8월 29일 / 오전 11시</Text>
              </View>
              <View style={styles.text_view}>
                <Text style={styles.common_text}>탑승 인원</Text>
              </View>
              <View style={styles.text_view}>
                <Text style={styles.price_text}>1500원</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            
            onPress={() => setRidingAxios("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiY2FycG9vbCBhcHAiLCJpYXQiOjE2NjQzNzAzOTksImV4cCI6MTY2NDQ1Njc5OX0.UFhS1n1bbcnTkLPPCjeOSyl7njSGz5LtCPswDoymou8o1QV1bTt7GkSLdzEubl7yZFbyN-5tOW9CR-DYu8kdcQ").then(res => console.log("탑승하기 클릭시 서버로 전송 : ", res))}
            style={styles.footer}
          >
            <View style={styles.button_container_next_button}>
              <Text
                style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 18 }}
              >
                탑승하기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    height: 120,
    flexDirection: "row",
    alignItems: "center",
  },

  common_text: {
    paddingLeft: 15,
    paddingTop: 40,
    paddingBottom: 20,
  },

  ticket_text: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 9,
    paddingBottom: 20,
  },

  price_text: {
    color: "red",
    paddingLeft: 15,
    paddingTop: 40,
    paddingBottom: 20,
  },

  text_view: {
    flexDirection: "row",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    marginRight: 20,
    marginLeft: 20,
  },

  button_container_next_button: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 80,
    backgroundColor: "#007AFF",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },

  profile_image: {
    width: 35,
    height: 35,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
  },

  ticket: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingBottom: 5,
  },

  ticket_arrow: {
    color: "#909090",
    marginTop: 9,
    marginLeft: 130,
  },

  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },

  address: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 100,
  },

  address_text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
