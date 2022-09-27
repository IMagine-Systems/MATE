import axios from "axios";

const KIM_BASE_URL = `http://www.godseun.com`; // 김재용 백엔드 url
const JANG_BASE_URL = `http://3.37.159.244:8080`; // 장건영 백엔드 url

// 로그인 후 백엔드로 보낸 응답 데이터
/*
{
  "area": null,
  "auth": null,
  "department": null,
  "email": "zonins3@gmail.com",
  "member": true,
  "memberName": "손민석",
  "memberTimeTable": null,
  "phoneNumber": null,
  "profileImage": null,
  "studentNumber": null,
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaXNzIjoiY2FycG9vbCBhcHAiLCJpYXQiOjE2NjQxODgzMzQsImV4cCI6MTY2NDI3NDczNH0.Y2-MW_GaKTeUvTSK7YWaMdKD2FQ2LnIyn-RZC7VGLq0pfaHFixUMSG6DrEth77gxuaaQL4CMB7akmHq2KXdkLQ",
}
*/

// 회원가입
export function memberAxios(formData, userData) {
  return axios.post(`${KIM_BASE_URL}/member/new`, formData, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      "content-type": "multipart/form-data",
    },
  });
}

// Main 화면
/*
data": Object {
    "area": Object {
      "name": "인동",
    },
    "auth": "PASSENGER",
    "department": "항공소프트웨어공학과",
    "email": "zonins3@gmail.com",
    "member": true,
    "memberName": "손민석",
    "memberTimeTable": Array [
      Object {
        "dayCode": "월",
      },
      Object {
        "dayCode": "화",
      },
      Object {
        "dayCode": "수",
      },
    ],
    "phoneNumber": "01022223333",
    "profileImage": "/1/bb1469ad3d21a04760cf719a86f2e7be.jpeg",
    "studentNumber": "201702003",
    "token": null,
  }
*/
// main 내 정보들 불러오기 위 형식처럼 보내진다.
export async function getMemberAxios(token) {
  return await axios.get(`${KIM_BASE_URL}/member`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 마이페이지
export function getProfileAxios(token) {
  return axios.get(`${KIM_BASE_URL}/member/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 마이페이지 수정
export function updateProfileAxios(formData, token) {
  return axios.post(`${KIM_BASE_URL}/member`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
}
// 자신의 이미지 불러오기
export function getProfileImgAxios(token) {
  return axios.get(
    `${KIM_BASE_URL}/member/profile/2a2b73fecb5c808dba3d64d861bb7e91.jpeg`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// 카풀 티켓 생성
export function createTicketAxios(
  token,
  memberId,
  status,
  startArea,
  endArea,
  startDtime,
  kakaoOpenChartUrl,
  recruitPerson
) {
  return axios.post(
    `${JANG_BASE_URL}/ticket/new`,
    {
      memberId: memberId,
      status: status,
      startArea: startArea,
      endArea: endArea,
      startDtime: startDtime,
      kakaoOpenChatUrl: kakaoOpenChartUrl,
      recruitPerson: recruitPerson,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// 카풀 티켓 리스트 조회
/*
    티켓 상세 정보 조회 res :  Object {
    "endArea": Object {
        "name": "경운대",
    },
    "id": 5,
    "kakaoOpenChatTitle": null,
    "kakaoOpenChatUrl": "test url",
    "passengerList": null,
    "profileImage": null,
    "recruitPerson": "3",
    "startArea": Object {
        "name": "인동",
    },
    "startDtime": "202209241530",
    "status": "BEFORE",
    "ticketPrice": null,
    }
*/
export function getTicketListAxios(token) {
    return axios.get(
        `${JANG_BASE_URL}/ticket/list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    )
}

// 카풀 상세 정보 보기
export function readTicketAxios(token, ticketId) {
    return (
        axios.get(`${JANG_BASE_URL}/ticket/read/${ticketId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    )
}

// 카풀 티켓리스트 삭제
export function deleteTicketAxios(token, ticketId) {
    return axios.get(
      `${JANG_BASE_URL}/ticket/delete/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  
// 탑승 리스트
/*
    // 탑승 리스트 성공하면 밑에 형식처럼 되어 있다.
    "data": Array [
        Object {
          "endArea": Object {
            "name": "경운대",
          },
          "id": 2,
          "kakaoOpenChatTitle": null,
          "kakaoOpenChatUrl": "test url",
          "passengerList": null,
          "profileImage": null,
          "recruitPerson": "3",
          "startArea": Object {
            "name": "인동",
          },
          "startDtime": "202209241530",
          "status": "BEFORE",
          "ticketPrice": null,
        },
        Object {
          "endArea": Object {
            "name": "경운대",
          },
          "id": 3,
          "kakaoOpenChatTitle": null,
          "kakaoOpenChatUrl": "test url",
          "passengerList": null,
          "profileImage": null,
          "recruitPerson": "3",
          "startArea": Object {
            "name": "인동",
          },
          "startDtime": "202209241530",
          "status": "BEFORE",
          "ticketPrice": null,
        },
      ]
    */

// 탑승 목록 조회 uri 변경
export function getBordingListAxios(token) {
  return axios.get(`${JANG_BASE_URL}/ticket/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 1:1 문의
export function setInquiryAxios(token, email, title, etcContent) {
  return axios.post(
    `${JANG_BASE_URL}/QuestionBoard/new`,
    {
      writerStudentId: "201702003",
      writerEmail: email,
      title: title,
      content: etcContent,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// 문의내역
export function readInquiryAxios(token) {
  return axios.get(`${JANG_BASE_URL}/QuestionBoard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// 신고 하기 
export function setDiclationAxios(token, writerStudentId, writerEmail, reportStudentId, content) {
  return axios.post(`${JANG_BASE_URL}/ReportBoard/new`, {
    writerStudentId: writerStudentId,
    writerEmail: writerEmail,
    reportStudentId: reportStudentId,
    content: content,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}