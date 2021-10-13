import axios from "axios"
import React from "react"

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_DOCPARSER_TEMPLATE_EDITOR_PDFCO_API_URL,
});

apiClient.interceptors.request.use((config) => {

  if (process.env.REACT_APP_DOCPARSER_TEMPLATE_EDITOR_EMBEDDED == 1 ) {
    // embedded editor
    return ({
      ...config,
      headers: {
        'X-USER-TOKEN': getCookie('userToken')
      },
    })
  }
  else {
    // standalone editor
    return ({
      ...config,
      headers: {
        'x-api-key': process.env.REACT_APP_DOCPARSER_TEMPLATE_EDITOR_API_KEY,
      },
    })    
  }
},
  error => Promise.reject(error)
);

apiClient.interceptors.response.use((response) => response,
  async (error) => {
    return Promise.reject(error.response.data);
  },
);

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export default apiClient
