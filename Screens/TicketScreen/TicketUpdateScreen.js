// 학번로그인 -> 회원가입 버튼 클릭하면 회원가입 페이지 화면으로 넘어간다.
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { Input } from 'react-native-elements';
import { db } from '../../Database/DatabaseConfig/firebase';
import { doc, getDoc, setDoc, upDateDoc, arrayUnion } from 'firebase/firestore';
// 기본 데이터 불러오기 (CarpoolTicket, TexiTicket)
import { CarpoolTicket } from'../../Database/Data/Ticket/carpoolData';
import { TaxiTicket } from '../../Database/Data/Ticket/taxiData';
// 회원정보 데이터
import { UserInfo } from'../../Database/Data/User/userInfo';

export default function TicketUpdateScreen({navigation}) {

    const [ studentNumber, SetStudentNumber ] = useState("");
    const [ arrivaltime, setArrivalTime ] = useState("");
    const [ departtime, setDepartTime ] = useState("");
    const [ startInputSelect, setStartInputSelect ] = useState([false, false, false, false]); // (인동, 옥계, 본관, 항공관)
    const [ endInputSelect, setEndInputSelect ] = useState([false, false, false, false]); // (인동, 옥계, 본관, 항공관)
    const [ rescruitmentButton, setRescruitmentButton ] = useState([false, false, false, false]);
    const [ openChatName, setOpenChatName ] = useState("");
    const [ openChatPassword, setOpenChatPassword ] = useState("");

    let ticket_infos;

    useEffect(() => {
        StartLocalSelectButtonColor();
        EndLocalSelectButtonColor();
        RecritmentShowColor();
    }, [])
    
    const SetStartLocalSelect = () => {
        const myDoc = doc(db, "CollectionNameCarpoolTicket", "TicketDocument");

        getDoc(myDoc)
            .then((snapshot) => {
                ticket_infos = snapshot.data();
            })
            .catch((error) => alert(error.message))
        
        if (button === 1) {
            setStartInputText('인동');
            setStartInputSelect([true, false, false, false]);
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
        else if (button === 2) {
            setStartInputText('옥계');
            setStartInputSelect([false, true, false, false]);
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
        else if (button === 3) {
            setStartInputText('본관');
            setStartInputSelect([false, false, true, false]);
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
        else if (button === 4) {
            setStartInputText('항공관');
            setStartInputSelect([false, false, false, true]);
            console.log('modal console 출발지: ', startInputText);
            console.log(button);
        }
    }

    const StartLocalSelectButtonColor = () => {
        const myDoc = doc(db, "CollectionNameCarpoolTicket", "TicketDocument");

        getDoc(myDoc)
            .then((snapshot) => {
                ticket_infos = snapshot.data();

                for (let i = 0; i < ticket_infos.CarpoolTicket.length; i++) {
                    if (ticket_infos.CarpoolTicket[i].student_number === UserInfo.Driver[0].student_number && ticket_infos.CarpoolTicket[i].nickname === UserInfo.Driver[0].nickname) {
                        if (ticket_infos.CarpoolTicket[i].arrival_area === '인동') {
                            setStartInputSelect([true, false, false, false]);
                        } else if (ticket_infos.CarpoolTicket[i].arrival_area === '옥계') {
                            setStartInputSelect([false, true, false, false]);
                        } else if (ticket_infos.CarpoolTicket[i].arrival_area === '본관') {
                            setStartInputSelect([false, false, true, false]);
                        } else if (ticket_infos.CarpoolTicket[i].arrival_area === '항공관') {
                            setStartInputSelect([false, false, false, true]);
                        }
                    }
                }
            })
            .catch((error) => alert(error.message))
    }

    const EndLocalSelectButtonColor = () => {
        const myDoc = doc(db, "CollectionNameCarpoolTicket", "TicketDocument");

        getDoc(myDoc)
            .then((snapshot) => {
                ticket_infos = snapshot.data();

                for (let i = 0; i < ticket_infos.CarpoolTicket.length; i++) {
                    if (ticket_infos.CarpoolTicket[i].student_number === UserInfo.Driver[0].student_number && ticket_infos.CarpoolTicket[i].nickname === UserInfo.Driver[0].nickname) {
                        if (ticket_infos.CarpoolTicket[i].depart_area === '인동') {
                            setEndInputSelect([true, false, false, false]);
                        } else if (ticket_infos.CarpoolTicket[i].depart_area === '옥계') {
                            setEndInputSelect([false, true, false, false]);
                        } else if (ticket_infos.CarpoolTicket[i].depart_area === '본관') {
                            setEndInputSelect([false, false, true, false]);
                        } else if (ticket_infos.CarpoolTicket[i].depart_area === '항공관') {
                            setEndInputSelect([false, false, false, true]);
                        }
                    }
                }
            })
            .catch((error) => alert(error.message))
    }

    const RecritmentShowColor = () => {
        const myDoc = doc(db, "CollectionNameCarpoolTicket", "TicketDocument");

        getDoc(myDoc)
            .then((snapshot) => {
                ticket_infos = snapshot.data();

                for (let i = 0; i < ticket_infos.CarpoolTicket.length; i++) {
                    if (ticket_infos.CarpoolTicket[i].student_number === UserInfo.Driver[0].student_number && ticket_infos.CarpoolTicket[i].nickname === UserInfo.Driver[0].nickname) {
                        if (ticket_infos.CarpoolTicket[i].recruitment_count === 1) {
                            setRescruitmentButton([true, false, false, false]);
                        } else if (ticket_infos.CarpoolTicket[i].recruitment_count === 2) {
                            setRescruitmentButton([false, true, false, false]);
                        } else if (ticket_infos.CarpoolTicket[i].recruitment_count === 3) {
                            setRescruitmentButton([false, false, true, false]);
                        } else if (ticket_infos.CarpoolTicket[i].recruitment_count === 4) {
                            setRescruitmentButton([false, false, false, true]);
                        }
                        setArrivalTime(ticket_infos.CarpoolTicket[i].arrival_time);
                        setOpenChatName(ticket_infos.CarpoolTicket[i].open_chat);
                        setOpenChatPassword(ticket_infos.CarpoolTicket[i].open_chat_password);
                    }
                }
            })
            .catch((error) => alert(error.message))
    }



    const SetEndLocalSelect = () => {
        if (button === 1) {
            setEndInputText('인동');
            setEndInputSelect([true, false, false, false]);
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
        else if (button === 2) {
            setEndInputText('옥계');
            setEndInputSelect([false, true, false, false]);
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
        else if (button === 3) {
            setEndInputText('본관');
            setEndInputSelect([false, false, true, false]);
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
        else if (button === 4) {
            setEndInputText('항공관');
            setEndInputSelect([false, false, false, true]);
            console.log('modal console 도착지: ', endInputText);
            console.log(button);
        }
    }
    
    const StartInputButtonOneColor = () => {
        if (startInputSelect[0] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }
    
    const StartInputButtonTwoColor = () => {
        if (startInputSelect[1] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const StartInputButtonThreeColor = () => {
        if (startInputSelect[2] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const StartInputButtonFourColor = () => {
        if (startInputSelect[3] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const EndInputButtonOneColor = () => {
        if (endInputSelect[0] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }
    
    const EndInputButtonTwoColor = () => {
        if (endInputSelect[1] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const EndInputButtonThreeColor = () => {
        if (endInputSelect[2] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const EndInputButtonFourColor = () => {
        if (endInputSelect[3] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    width: 55, 
                    height: 27, 
                    borderRadius: 30, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }
            );
        }
    }

    const RecruitmentButtonOneColor = () => {
        if (rescruitmentButton[0] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        }
    }

    const RecruitmentButtonTwoColor = () => {
        if (rescruitmentButton[1] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        }
    }

    const RecruitmentButtonThreeColor = () => {
        if (rescruitmentButton[2] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        }
    }

    const RecruitmentButtonFourColor = () => {
        if (rescruitmentButton[3] === true) {
            return (
                {
                    backgroundColor: '#315EFF',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        } else {
            return (
                {
                    backgroundColor: 'rgba(196, 196, 196, 0.31)',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            );
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={(Platform.OS === "ios") ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={{flexDirection : 'row', justifyContent:'space-evenly', alignItems: 'center', bottom: 10}}>
                            <FontAwesome style={{backgroundColor: 'white',}} name="circle" size={15} color="#587DFF" />
                            <Text>출발지</Text>
                            <TouchableOpacity onPress={() => { button = 1; setStartLocalSelect();}} style={StartInputButtonOneColor()}>
                                <Text style={startInputSelect[0] ? {color: 'white'} : {color: 'black'}}>인동</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 2; setStartLocalSelect();}} style={StartInputButtonTwoColor()}>
                                <Text style={startInputSelect[1] ? {color: 'white'} : {color: 'black'}}>옥계</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 3; setStartLocalSelect();}} style={StartInputButtonThreeColor()}>
                                <Text style={startInputSelect[2] ? {color: 'white'} : {color: 'black'}}>본관</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 4; setStartLocalSelect();}} style={StartInputButtonFourColor()}>
                                <Text style={startInputSelect[3] ? {color: 'white'} : {color: 'black'}}>항공관</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection : 'row', justifyContent:'space-evenly', alignItems: 'center', }}>
                            <FontAwesome style={{backgroundColor: 'white',}} name="circle" size={15} color="#587DFF" />
                            <Text>도착지</Text>
                            <TouchableOpacity onPress={() => { button = 1; setEndLocalSelect();}} style={EndInputButtonOneColor()}>
                                <Text style={endInputSelect[0] ? {color: 'white'} : {color: 'black'}}>인동</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 2; setEndLocalSelect();}} style={EndInputButtonTwoColor()}>
                                <Text style={endInputSelect[1] ? {color: 'white'} : {color: 'black'}}>옥계</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 3; setEndLocalSelect();}} style={EndInputButtonThreeColor()}>
                                <Text style={endInputSelect[2] ? {color: 'white'} : {color: 'black'}}>본관</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { button = 4; setEndLocalSelect();}} style={EndInputButtonFourColor()}>
                                <Text style={endInputSelect[3] ? {color: 'white'} : {color: 'black'}}>항공관</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <View style={{ flex:1, justifyContent : 'space-evenly',}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginRight: 35,}}>
                                <View style = {{borderRadius: 10, width: 55, height : 30, backgroundColor : "rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>모집인원</Text>
                                </View> 

                                <TouchableOpacity 
                                    onPress={() => {
                                                UserInfo.Driver[0].recruitment_count = 1;
                                                setRescruitmentButton([true, false, false, false]);
                                            }
                                        }
                                    style={RecruitmentButtonOneColor()}><Text style={rescruitmentButton[0] ? {color: 'white'} : {color: 'black'}}>1</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => {
                                                UserInfo.Driver[0].recruitment_count = 2;
                                                setRescruitmentButton([false, true, false, false]);
                                            }
                                        }
                                    style={RecruitmentButtonTwoColor()}><Text style={rescruitmentButton[1] ? {color: 'white'} : {color: 'black'}}>2</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => {
                                            UserInfo.Driver[0].recruitment_count = 3;
                                            setRescruitmentButton([false, false, true, false]);
                                        }
                                    }
                                    style={RecruitmentButtonThreeColor()}><Text style={rescruitmentButton[2] ? {color: 'white'} : {color: 'black'}}>3</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    onPress={() => {
                                            UserInfo.Driver[0].recruitment_count = 4;
                                            setRescruitmentButton([false, false, false, true]);
                                        }
                                    }
                                    style={RecruitmentButtonFourColor()}><Text style={rescruitmentButton[3] ? {color: 'white'} : {color: 'black'}}>4</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <View style = {{borderRadius: 10, width: 55, height : 30, backgroundColor :"rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>출발시간</Text>
                                </View> 
                                <Input 
                                    containerStyle={{width: '65%', }} 
                                    value={arrivaltime}
                                    onChangeText={(text) => setArrivalTime(CarpoolTicket.CarpoolTicket[0].arrival_time = text)}
                                />
                            </View>

                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <View style = {{borderRadius: 10, width: 55, height : 30, backgroundColor : "rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>오픈채팅</Text>
                                </View> 
                                <Input 
                                    containerStyle={{width: '65%', }}
                                    value={openChatName}
                                    onChangeText={(text) => CarpoolTicket.CarpoolTicket[0].open_chat = text} 
                                />    
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                
                                <View style = {{borderRadius: 10, width: 55, height : 30, backgroundColor : "rgba(196, 196, 196, 0.31)", justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>비밀번호</Text>
                                </View> 
                                <Input 
                                    containerStyle={{width: '65%', }}
                                    value={openChatPassword}
                                    onChangeText={(text) => CarpoolTicket.CarpoolTicket[0].open_chat_password = text}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity 
                                onPress={() => { 
                                    if (startInputText != "" && endInputText != "" && arrivaltime != "" && CarpoolTicket.CarpoolTicket[0].open_chat_password != "" && CarpoolTicket.CarpoolTicket[0].open_chat != "") {
                                        
                                        Create();
                                        console.log('학번:', studentNumber);
                                        CarpoolTicket.CarpoolTicket[0].student_number = UserInfo.Driver[0].student_number;
                                        closeModal();
                                        alert("티켓 생성 하였습니다.");
                                    } else {
                                        alert("입력 항목 작성 안한 부분 있습니다.");
                                    }
                                }} 
                                style={
                                    {
                                        backgroundColor: 'white', borderRadius: 10, borderWidth: 2, borderColor: 'black', width: 337, height: 60, alignItems :'center', justifyContent: 'center' 
                                    }
                                }>
                                    <Text style={{color: 'black'}}>수정완료</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
    
    
}
const styles = StyleSheet.create({
        container: {
            flex: 1,
        },

        header: {
            flex: 0.2,
            justifyContent: 'flex-end'
        },

        body: {
            flex: 0.6,
        },
        
        footer: {
            flex: 0.2,
            justifyContent: 'center'
        },

    }
);