import axios from "axios";

class Http {
  constructor() {
    this.apiV10 = axios.create({
      baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/v10/data",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "aio_anYd50xKhUxoeaPA1UKsmtbuyxpG",
      },
    });

    this.apiV11 = axios.create({
      baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/v11/data",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "aio_anYd50xKhUxoeaPA1UKsmtbuyxpG",
      },
    });
    this.apiV1 = axios.create({
      baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "aio_anYd50xKhUxoeaPA1UKsmtbuyxpG",
      },
    });
    this.apiV2 = axios.create({
      baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "aio_anYd50xKhUxoeaPA1UKsmtbuyxpG",
      },
    });
    this.apiV3 = axios.create({
      baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "aio_anYd50xKhUxoeaPA1UKsmtbuyxpG",
      },
    });
    this.apiV4 = axios.create({
      baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "aio_anYd50xKhUxoeaPA1UKsmtbuyxpG",
      },
    });
  }
}

const http = new Http();

export { http };
