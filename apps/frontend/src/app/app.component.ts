import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@biolago-hackathon/api-interfaces';
import { Observable, of, take } from 'rxjs';
import { IListItem } from './interfaces/list-items.interface';
import { SilaIntegrationService } from './services/sila-integration.service';

@Component({
  selector: 'biolago-hackathon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hello$ = this.http.get<Message>('/api/hello');
  servicesNames: IListItem[] = [];
  featuresNames: IListItem[] = [];
  commandsNames: IListItem[] = [];
  selectedServiceId: string = '1';
  selectedFeatureId: string = '2';
  commandId: string = '3';

  commandResponse: any;

  services$: Observable<IListItem[]> = this.sila.getServices();
  features$: Observable<IListItem[]> = of([]);
  // command$: Observable<IListItem[]> = of([]);

  constructor(private http: HttpClient, private sila: SilaIntegrationService) {}

  ngOnInit() {
    //setting the structure of the init data/calls

    // getting all the features available in the controller.
    this.getAllFeatures();
  }

  selectCommand($event: any) {
    this.commandId = $event || '1';
  }

  execCommand() {
    this.sila
      .getCommands(
        this.selectedServiceId?.toString(),
        '2',
        this.commandId?.toString(),
      )
      .subscribe((response) => {
        this.commandResponse = response;
      });
  }

  onServiceSelect($event: any) {
    console.log('here');
    this.selectedServiceId = $event || '1';
    this.sila
      .getFeatures(this.selectedServiceId?.toString())
      .pipe(take(1))
      .subscribe((response) => {
        this.featuresNames = response;
      });
  }

  onFeatureSelect($event: any) {
    this.selectedFeatureId = $event || '1';
    this.commandsNames = this.featuresNames
      .find((feature) => feature.id === this.selectedFeatureId)
      ?.payload.featureDefinition.commands.map((command: any) => {
        return {
          id: command.title,
          name: command.displayName,
          payload: command,
        };
      });
  }

  getAllFeatures() {
    // this.http.get<string[]>('/api/').pipe((take(1))).subscribe((response) => {
    //   this.servicesNames= response;
    // });
    this.servicesNames = [
      {
        id: '0',
        name: 'test1',
        action: (serviceName: string) => {
          return this.getServiceFeatures(serviceName);
        },
      },
      {
        id: '2',
        name: 'test2',
        action: (serviceName: string) => {
          return this.getServiceFeatures(serviceName);
        },
      },
      {
        id: '3',
        name: 'test3',
        action: (serviceName: string) => {
          return this.getServiceFeatures(serviceName);
        },
      },
      {
        id: '4',
        name: 'test4',
        action: (serviceName: string) => {
          return this.getServiceFeatures(serviceName);
        },
      },
    ];
  }

  getServiceFeatures(serviceName: string) {
    // return this.http.get('/api/get-service-features/'+serviceName);
    this.featuresNames = [
      {
        id: '1',
        name: serviceName + ' feature1',
        action: (featureName: string) => {
          return this.getFeatureCommands(featureName);
        },
      },
      {
        id: '2',
        name: serviceName + ' feature2',
        action: (featureName: string) => {
          return this.getFeatureCommands(featureName);
        },
      },
      {
        id: '3',
        name: serviceName + ' feature3',
        action: (featureName: string) => {
          return this.getFeatureCommands(featureName);
        },
      },
    ];
  }

  getFeatureCommands(featureName: string) {
    this.commandsNames = [
      {
        id: '1',
        name: featureName + ' command1',
        action: (commandName: string) => {
          return this.executeFeatureCommand(commandName);
        },
      },
      {
        id: '2',
        name: featureName + ' command2',
        action: (commandName: string) => {
          return this.executeFeatureCommand(commandName);
        },
      },
      {
        id: '3',
        name: featureName + ' command3',
        action: (commandName: string) => {
          return this.executeFeatureCommand(commandName);
        },
      },
    ];
  }

  executeFeatureCommand(commandName: string) {
    return { uuid: '26bdbe8a-9af4-11ec-b909-0242ac120002' };
  }

  executeDeviceFeature(featureName: string) {
    return this.http.post('/api/execute-device-feature', {
      featureName: featureName,
    });
  }
  refreshDeviceFeatureValue(featureName: string, requestIdentifier: string) {
    return this.http.get(
      '/api/refresh-device/value/?featureName=' +
        featureName +
        '&featureId=' +
        requestIdentifier
    );
  }
}
