import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { readInquiryAxios } from '../../config/axiosAPI';

export default function Inquiry({ navigation }) {
    const [ inquiryData, setInquiryData ] = useState();
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiY2FycG9vbCBhcHAiLCJpYXQiOjE2NjQxMTkyMTgsImV4cCI6MTY2NDIwNTYxOH0.Bj8EXmegwMJKNFLZOfo5tUQbU19DbTJTAyJMQNf9tkoi0osGn2NN8YwVCxet8liCjwN_--7hvq3nNaR_iKFGOg'                
    // state
    // QuestionBord API State
    const [ questionBoardData, setQuestionBoardData ] = useState();
    
    useEffect(() => {
       readInquiryAxios(token)
       .then((res) => {
           console.log("문의 데이터 확인 : ", res.data);
           setQuestionBoardData(res.data);
       })
       .catch((error) => console.warn(error));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <AntDesign name='left' size={25} color='black' />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>문의내역</Text>
            {/* 문의내역 데이터 없을 경우 */}

            {/* <View style={[styles.item_view, styles.item_empty]}>
                <Text style={styles.empty_inquiry}>최근 문의 내역이 없어요</Text>
            </View> */}

            {
                (
                    () => {
                        if (questionBoardData) {
                            console.log("1",questionBoardData)
                            return (
                                <View style={[styles.item_view, styles.item_exist]}>
                                    {
                                        questionBoardData.map(data => (                                            
                                            <View style={styles.item_wrapper}>
                                                <Text style={styles.item_date}>{`${data.createDate.slice(0,10).split('-')[0]}.${data.createDate.slice(0,10).split('-')[1]}.${data.createDate.slice(0,10).split('-')[2]}`}</Text>
                                                <Text style={styles.item_title}>{`${data.title}`}</Text>
                                                <Text>{data.content}</Text>
                                            </View>                                                                                          
                                        ))
                                    }
                                </View>
                            );
                        } else {
                            return (
                                <View style={[styles.item_view, styles.item_empty]}>
                                    <Text style={styles.empty_inquiry}>최근 문의 내역이 없어요</Text>
                                </View>
                            );
                        }
                    }
                )
                ()
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    header: {
        paddingTop: 45,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },

    title: {
        paddingTop: 48,
        position: 'absolute',
        alignSelf: 'center'
    },

    item_view: {
        backgroundColor: '#E0E0E0',
        flex: 1
    },

    item_empty: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    empty_inquiry: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    item_exist: {
        padding: 20
    },

    item_wrapper: {
        marginBottom: 15,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15
    },

    item_date: {
        color: '#404040',
        textAlign: 'right'
    },

    item_title: {
        fontSize: 16,
        paddingBottom: 10
    }
});
