var configuration = require("../../config");
const info = configuration.log.debugMode;

class APIInvoker {
  getAPIHeader = () => {
    return {
      "Content-Type": "application/json",
      authorization: window.localStorage.getItem("token"),
    };
  };

  invokeGET = (url, okCallBack, failCallBack) => {
    let params = {
      method: "get",
      headers: this.getAPIHeader(),
    };
    this.invoke(url, okCallBack, failCallBack, params);
  };

  invokePUT = (url, body, okCallBack, failCallBack) => {
    let params = {
      method: "put",
      headers: this.getAPIHeader(),
      body: JSON.stringify(body),
    };
    this.invoke(url, okCallBack, failCallBack, params);
  };

  invokePOST = (url, body, okCallBack, failCallBack) => {
    let params = {
      method: "post",
      headers: this.getAPIHeader(),
      body: JSON.stringify(body),
    };
    this.invoke(url, okCallBack, failCallBack, params);
  };

  invoke = (url, okCallBack, failCallBack, params) => {
    fetch(`https://minitwitterapi.reactiveprogramming.io${url}`, params)
      .then((response) => {
        if (info) {
          console.log("Invoke Response => ", response);
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.ok) {
          okCallBack(responseData);
        } else {
          failCallBack(responseData);
        }
      });
  };
}

export default new APIInvoker();
