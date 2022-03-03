import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, take } from 'rxjs';
import { IListItem } from '../interfaces/list-items.interface';
import { IServiceResponse } from '../interfaces/service.interface';

@Injectable({ providedIn: 'root' })
export class SilaIntegrationService {
  constructor(private http: HttpClient) {}

  public getServices(): Observable<IListItem[]> {
    return this.http.get<IListItem[]>('api/avalable/services').pipe(
      map((response: any) => {
        return response.map((service: any) => {
          return {
            id: service.serviceId,
            name: service.serviceName,
          };
        });
      })
    );
  }

  public getFeatures(serviceId: string): Observable<IListItem[]> {
    return this.http.get<IListItem[]>('api/features/' + serviceId).pipe(
      // filter(serviceId => serviceId),
      map((response: any) => {
        return response.map((service: any) => {
          console.log(service);
          return {
            id: service.featureDefinition.fullyQualifiedFeatureIdentifier,
            name: service.featureDefinition.displayName,
            payload: service,
          };
        });
      })
    );
  }

  public getCommands(
    serviceId: string,
    featureId: string,
    commandId: string
  ): Observable<IListItem[]> {
    return this.http
      .get<IListItem[]>(
        'api/call-feature-command/' +
          serviceId +
          '/' +
          featureId +
          '/' +
          commandId + '/' + '1'
      )
      .pipe(
        // filter(serviceId => serviceId),
        map((response: any) => {
          return response.map((service: any) => {
            console.log(service);

          });
        })
      );
  }
}
