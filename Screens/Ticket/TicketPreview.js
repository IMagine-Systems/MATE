import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function TicketPreview({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <AntDesign name='left' size={25} color='black' />
                </TouchableOpacity>
            </View>
            <View style={styles.address}>
                <View style={{ width: '56%', alignItems: 'flex-end' }}>
                    <Text style={styles.address_text}>출발지</Text>
                </View>
                <View style={{ width: '30%', alignItems: 'center' }}>
                    <AntDesign name='arrowright' size={24} color='black' />
                </View>
                <View style={{ alignItems: 'flex-start', width: '56%' }}>
                    <Text style={styles.address_text}>도착지</Text>
                </View>
            </View>
            <View style={styles.text_view}>
                <View style={styles.ticket}>
                    <View style={styles.profile_image}></View>
                    <Text style={styles.ticket_text}>티켓 생성자 이름</Text>
                    <AntDesign style={styles.ticket_arrow} name='right' size={20} color='black' />
                </View>
            </View>
            <View style={styles.text_view}>
                <Text style={styles.common_text}>8월 29일 / 오전 11시</Text>
            </View>
            <View style={styles.text_view}>
                <Text style={styles.common_text}>탑승 인원</Text>
            </View>
            <View style={styles.text_view}>
                <Text style={styles.price_text}>유료</Text>
            </View>
            <View style={styles.footer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <View style={styles.button_cancel}>
                            <Text style={styles.button_text_cancel}>취소</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.button_confirm}>
                            <Text style={styles.button_text_confirm}>확인</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 20,
        paddingRight: 20
    },
    header: {
        height: 120,
        flexDirection: 'row',
        alignItems: 'center'
    },

    common_text: {
        paddingLeft: 15,
        paddingTop: 40,
        paddingBottom: 20
    },

    ticket_text: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 9,
        paddingBottom: 20
    },

    price_text: {
        color: 'red',
        paddingLeft: 15,
        paddingTop: 40,
        paddingBottom: 20
    },

    text_view: {
        flexDirection: 'row',
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        marginRight: 20,
        marginLeft: 20
    },

    button_confirm: {
        marginRight: 20,
        marginLeft: 20,

        paddingRight: 50,
        paddingLeft: 50,
        backgroundColor: '#007AFF',
        height: 55,
        justifyContent: 'center',
        borderRadius: 30
    },

    button_cancel: {
        marginRight: 20,
        marginLeft: 20,
        paddingRight: 50,
        paddingLeft: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#007AFF',
        height: 55,
        justifyContent: 'center',
        borderRadius: 30
    },

    profile_image: {
        width: 35,
        height: 35,
        backgroundColor: '#D9D9D9',
        borderRadius: 20
    },

    ticket: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 5
    },

    ticket_arrow: {
        color: '#909090',
        marginTop: 9,
        marginLeft: 130
    },

    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20
    },

    address: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 100
    },

    address_text: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    button_text_confirm: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18
    },

    button_text_cancel: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 18
    }
});
