import axios from "axios";
import curlirize from "axios-curlirize";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-simple-toast";

class Request {
  constructor() {
    axios.defaults.baseURL = "http://www.godseun.com";

    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.put["Content-Type"] = "application/json";
    axios.defaults.headers.patch["Content-Type"] = "application/json";

    curlirize(axios);
  }

  async _getToken() {
    return await AsyncStorage.getItem("token");
  }

  async _makeFormData(form, params) {
    for (const [key, value] of Object.entries(params)) {
      form.append(key.toString(), value.toString());
    }
  }

  async _autoSaveToken(response) {
    try {
      const { data } = response;

      if ("token" in data) {
        const { token } = data;
        AsyncStorage.setItem("token", token);
      }
    } catch (err) {
      console.log(`[Request] parse token error -> ${err}`);
    }
  }

  async _autoSetToken() {
    // TODO expireTime에 따라 Token 유효성 검사하기
    const token = await this._getToken();

    if (token && token.length > 0) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }

    console.log(`[Header] ${JSON.stringify(axios.defaults.headers.common)}`);
  }

  _handleError(err) {
    if ("response" in err) {
      console.log(`[Request] failed. no status -> ${err}`);
      Toast.show("서버와의 연결에 실패했습니다.");
      return;
    }

    const { data, status, header } = err.response;

    console.log(`[Request] failed. status -> ${err}`);

    if (status === 401) {
      // TODO 로그인 모드 일 때 토스트 띄우기
      // Toast.show('인증에 실패했습니다.');

      return;
    }

    Toast.show("서버와의 연결에 실패했습니다.");
  }

  async get(route, params = {}) {
    await this._autoSetToken();

    try {
      const response = await axios.get(route, {
        params,
      });

      return response.data;
    } catch (err) {
      this._handleError(err);
    }
  }

  async postFORM(route, params = {}) {
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    await this._autoSetToken();

    try {
      const data = new FormData();
      this._makeFormData(data, params);

      const response = await axios.post(route, data);

      this._autoSaveToken(response);

      return response.data;
    } catch (err) {
      this._handleError(err);
    }
  }

  async postJSON(route, params = {}) {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    await this._autoSetToken();

    try {
      const response = await axios.post(route, {
        params,
      });

      this._autoSaveToken(response);

      return response.data;
    } catch (err) {
      this._handleError(err);
    }
  }
}

const request = new Request();
export default request;
