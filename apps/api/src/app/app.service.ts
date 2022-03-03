import { Injectable } from '@nestjs/common';
import { Message, Service } from '@biolago-hackathon/api-interfaces';

import DynamicClient from '@sila-standard/dynamic-client';
import Feature from '@sila-standard/feature';
import path from 'path';

@Injectable()
export class AppService {
  // internally handle the clients Dict[serviceId, ClientObject] ?
  // woher nehmen?

  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  getServices(): Service[] {
    // assuming we have two services
    return [
      { serviceId: 's1', serviceName: 'Mock Service 1', endpoint: { hostname: 'localhost', port: 50051 }, uuid: '' },
      { serviceId: 's2', serviceName: 'Mock Service 2', endpoint: { hostname: 'localhost', port: 50051 }, uuid: '' }
    ];
  }

  async getFeatures(serviceID: string): Promise<Feature[]> {
    const services = this.getServices();
    const selectedService = services.find(service => service.serviceId === serviceID);

    //https://gitlab.com/SiLA2/sila_base/-/blob/master/feature_definitions/org/silastandard/core/SiLAService-v1_0.sila.xml
    const dynamicClient = new DynamicClient(selectedService.endpoint,  {
      protobufPath: path.join(__dirname, 'assets', 'protobuf'),
      silaBasePath:  path.join(__dirname, 'assets'),
    });
    const features = await dynamicClient.getImplementedFeatures();

    return features;
  }

  async getProperty(serviceID: string, feature: string, property: string): Promise<string>{
    const features = await this.getFeatures(serviceID);
    const targetFeature = features.find(feature => feature.featureDefinition.fullyQualifiedFeatureIdentifier);

    const resultProperty = await targetFeature.getProperty(property);

    return resultProperty;
  }

  async callCommand(serviceID: string, feature: string, command: string, args: []): Promise<string>{
    const features = await this.getFeatures(serviceID);
    const targetFeature = features.find(feature => feature.featureDefinition.fullyQualifiedFeatureIdentifier);

    const commandResult = await targetFeature.runCommand(command, args);

    return commandResult;
  }

  async checkRequestStatus(uuid: string):Promise<string>{


    return uuid;
  }
}
