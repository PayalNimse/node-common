import axios, { AxiosInstance, AxiosResponse } from 'axios';


class HttpClientHelper {
    private axiosInstance: AxiosInstance;
  
    constructor(baseURL: string, timeout: number = 300000) {
      this.axiosInstance = axios.create({
        baseURL,
        timeout,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    private setHeaders(token?: string, orgUId?: string): void {
        if (token) {
          this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    
        if (orgUId) {
          this.axiosInstance.defaults.headers.common['OrganizationUId'] = orgUId;
        }
    
        // Assuming CommonCredentials is a global object containing security key and header key
        if (global.CommonCredentials?.apiSecurityKey && global.CommonCredentials?.apiSecurityHeaderKey) {
          this.axiosInstance.defaults.headers.common[global.CommonCredentials.apiSecurityHeaderKey] = global.CommonCredentials.apiSecurityKey;
        }
      }

      async makeGetRequest(endpoint: string, token: string = '', orgUId: string = ''): Promise<string> {
        this.setHeaders(token, orgUId);
        
        try {
          const response: AxiosResponse = await this.axiosInstance.get(endpoint);
          return response.data;
        } catch (error) {
          this.handleError(error);
        }
      }
    
      async makePostRequest(endpoint: string, data: any, token: string = '', orgUId: string = ''): Promise<string> {
        this.setHeaders(token, orgUId);
        
        try {
          const response: AxiosResponse = await this.axiosInstance.post(endpoint, data);
          return response.data;
        } catch (error) {
          this.handleError(error);
        }
      }

      // ------------ without authorization and orguid ------------- 

    //   async makeGetRequest(endpoint: string): Promise<string> {
    //     try {
    //       const response: AxiosResponse = await this.axiosInstance.get(endpoint);
    //       return response.data;
    //     } catch (error) {
    //       this.handleError(error);
    //     }
    //   }
    
    //   async makePostRequest(endpoint: string, data: any): Promise<string> {
    //     try {
    //       const response: AxiosResponse = await this.axiosInstance.post(endpoint, data);
    //       return response.data;
    //     } catch (error) {
    //       this.handleError(error);
    //     }
    //   }

      private handleError(error: any): void {
        if (error.response) {
          console.error('Response error:', error.response.data);
          throw new Error(`HTTP error: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
          console.error('Request error:', error.request);
          throw new Error('No response received');
        } else {
          console.error('General error:', error.message);
          throw new Error(error.message);
        }
      }
}


export default HttpClientHelper;

