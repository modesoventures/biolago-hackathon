import { Controller, Get, Param } from '@nestjs/common';
import Feature from '@sila-standard/feature';

import { Message } from '@biolago-hackathon/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('/avalable/services')
  public async getServices(): Promise<any> {
    try {
      return await this.appService.getServices();
    } catch (error) {
      console.error(error)
    }
  }

  @Get('/features/:serviceID')
  public async getFeatures(@Param('serviceID') serviceID: string): Promise<Feature[]> {
    try {
      return await this.appService.getFeatures(serviceID);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/get-properties/:serviceID/:feature/:property')
  public async getProperty(@Param('serviceID') serviceID: string, @Param('feature') feature: string, @Param('property') property: string): Promise<string> {

    try {
      return await this.appService.getProperty(serviceID, feature, property);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('/call-feature-command/:serviceID/:feature/:command/:args')
  public async callCommand(@Param('serviceID') serviceID: string, @Param('feature') feature: string, @Param('command') command: string, @Param('args') args: []): Promise<string>{
    try {
      return await this.appService.callCommand(serviceID, feature, command, args);
    } catch(error)  {
      console.error(error)
    }
  }

  @Get('/get-feature-commands/:serviceID/:featureName/:property')
  public async getCommands(@Param('serviceID') serviceId: string, @Param('featureName')  featureName: string, @Param('property') property: string) {
    try {
      return await this.appService.getProperty(serviceId, featureName, property);
    } catch (error){
      console.error(error);
    }
  }

  @Get('/check-request-status/:uuid')
  public async checkRequestStatus(@Param('uuid') uuid: string) {
    try {
      return await this.appService.checkRequestStatus(uuid)
    } catch (error) {
      console.error(error);
    }
  }


}
