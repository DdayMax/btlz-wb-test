import { WbApiResponse } from "#types/wb.js";
import axios, { AxiosError, AxiosInstance } from "axios";
import axiosRetry from "axios-retry";

interface WbApiClientOptions {
    wbApiUrl: string;
    token: string;
    timeout?: number;
}

class WbApiClient {
    private client: AxiosInstance;

    constructor(options: WbApiClientOptions) {
        this.client = axios.create({
            baseURL: options.wbApiUrl,
            timeout: options.timeout ?? 10000,
            headers: {
                "Content-Type": "application/json",
                Authorization: options.token,
            },
        });

        axiosRetry(this.client, {
            retries: 3,
            retryDelay: axiosRetry.exponentialDelay,
            retryCondition: (error) => {
                return axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error);
            },
        });

        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response) {
                    const status = error.response.status;
                    const data = error.response.data;
                    throw new Error(`WB API error ${status}: ${JSON.stringify(data)}`);
                }

                if (error.code === "ECONNABORTED") {
                    throw new Error("WB API request timeout");
                }

                throw new Error(`WB API network error: ${error.message}`);
            },
        );
    }

    async getBoxTariffs(date: Date): Promise<WbApiResponse> {
        const response = await this.client.get<WbApiResponse>(`/tariffs/box?date=${date}`);
        return response.data;
    }
}

export default WbApiClient;
