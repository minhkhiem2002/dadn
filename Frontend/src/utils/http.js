import axios from "axios";

class Http {
    constructor() {
        this.apiV10 = axios.create({
            baseURL:
                "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/v10/data",
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
                "X-AIO-Key": "aio_dWpx06cXhokXlnCX8xKaUjd5Ldby",
            },
        });

        this.apiV11 = axios.create({
            baseURL:
                "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/v11/data",
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
                "X-AIO-Key": "aio_dWpx06cXhokXlnCX8xKaUjd5Ldby",
            },
        });
        this.apiV1 = axios.create({
            baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/",
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
                "X-AIO-Key": "aio_dWpx06cXhokXlnCX8xKaUjd5Ldby",
            },
        });
        this.apiV2 = axios.create({
            baseURL: "https://io.adafruit.com/api/v2/leminhkhiem110/feeds/",
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
                "X-AIO-Key": "aio_dWpx06cXhokXlnCX8xKaUjd5Ldby",
            },
        });
    }
}

const http = new Http();

export { http };
