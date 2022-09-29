// Web View import
import { useEffect, useState, useRef } from "react";
import { View } from 'react-native'
import { WebView } from 'react-native-webview';
import { BASE_URL }from '../../config/axiosAPI';

export default function KakaoWebView({navigation}) {

  const [ kakaoLoginData, setKakaoLoginData ] = useState({});

  //const [ stateChange, setStateChange ] = useState("");
  //const stateChange = useRef("");
  
  // useEffect(async () => {
  //   const res = await axios.get('http://3.37.159.244:8080/kakaoLoginOK');
  //   console.slog("kakao Webview res : ", res.data);
  // }, [])
  
  // https://kauth.kakao.com/oauth/authorize?client_id=235fc02960c0239e43b70d9e3fd2c9e6&redirect_uri=http://3.37.159.244:8080/kakaoLogin&response_type=code
  // http://kauth.kakao.com/oauth/authorize?client_id=8763097c83420044eeea901b962072ab&redirect_uri=http://3.37.159.244:8080/kakaoLogin&client_secret=QQP9e4kuegEA1ZQLUSDFINBknLcDoL8R&response_type=code

  // 웹뷰에서 데이터를 받을 때 필요한 함수입니다. 
  const handleOnMessage = ({ nativeEvent: { data } }) => {
    // data에 웹뷰에서 보낸 값이 들어옵니다.
    console.log("handle messaege : ",  data);
    
  };

  return (
    <View style={{flex:1}}>            
      <WebView         
        onMessage={handleOnMessage}
        onNavigationStateChange={(event) => {        
          console.log("WebView에서 상태 데이터 : ", event);
          if (event.url.includes("?code=")) {                                
            navigation.navigate("StudendNumberLoginScreen", { url : event.url });
          }
        }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        javaScriptEnabled={true} // 235fc02960c0239e43b70d9e3fd2c9e6(파트장님)  8763097c83420044eeea901b962072ab(재용 개발자)
        source={{uri : `https://kauth.kakao.com/oauth/authorize?client_id=235fc02960c0239e43b70d9e3fd2c9e6&redirect_uri=${BASE_URL}/kakaoLoginTo&response_type=code`}}        
        onHttpError={(e) => console.log("onHttpError : ", e)}
      />              
    </View>
  );
}