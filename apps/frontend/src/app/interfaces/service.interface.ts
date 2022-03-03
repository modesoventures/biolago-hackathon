//{ serviceId: 's1', serviceName: 'Mock Service 1', endpoint: { hostname: '', port: 123 }, uuid: '' }

export interface IEndPoint {
  hostname: string;
  port: number;
}

export interface IServiceResponse {
  serviceId: string;
  serviceName: string;
  uuid: string;
  endpoint: IEndPoint;
}
