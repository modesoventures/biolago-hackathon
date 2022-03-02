/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
import { SiLAServiceClient } from '@sila-standard/core';

export default class SiLAServiceClientWrapper {
  private serviceClient: SiLAServiceClient;

  constructor(serviceClient: SiLAServiceClient) {
    this.serviceClient = serviceClient;
  }

  GetFeatureDefinition(...args: any): void {
    this.serviceClient.GetFeatureDefinition(args[0], args[1]);
  }

  Get_ImplementedFeatures(...args: any): void {
    this.serviceClient.Get_ImplementedFeatures(args[0], args[1]);
  }

  Get_ServerDescription(...args: any): void {
    this.serviceClient.Get_ServerDescription(args[0], args[1]);
  }

  Get_ServerName(...args: any): void {
    this.serviceClient.Get_ServerName(args[0], args[1]);
  }

  Get_ServerType(...args: any): void {
    this.serviceClient.Get_ServerType(args[0], args[1]);
  }

  Get_ServerUUID(...args: any): void {
    this.serviceClient.Get_ServerUUID(args[0], args[1]);
  }

  Get_ServerVendorURL(...args: any): void {
    this.serviceClient.Get_ServerVendorURL(args[0], args[1]);
  }

  Get_ServerVersion(...args: any): void {
    this.serviceClient.Get_ServerVersion(args[0], args[1]);
  }

  SetServerName(...args: any): void {
    this.serviceClient.SetServerName(args[0], args[1]);
  }
}
