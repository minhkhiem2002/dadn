import axios from "axios";

class Http {
  constructor() {
    this.apiV10 = axios.create({
      baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/v10/data",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "aio_wMxS78V2LYnzzEyQd31xPJCr8u6L",
      },
    });

    this.apiV11 = axios.create({
      baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/v11/data",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "aio_wMxS78V2LYnzzEyQd31xPJCr8u6L",
      },
    });
    this.apiV1 = axios.create({
      baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "aio_wMxS78V2LYnzzEyQd31xPJCr8u6L",
      },
    });
    this.apiV2 = axios.create({
      baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "aio_wMxS78V2LYnzzEyQd31xPJCr8u6L",
      },
    });
  }
}

const http = new Http();

export { http };
