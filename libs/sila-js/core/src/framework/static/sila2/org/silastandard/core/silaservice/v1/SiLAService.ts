// Original file: src/framework/protobuf/org.silastandard/SiLAService.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetFeatureDefinition_Parameters as _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters, GetFeatureDefinition_Parameters__Output as _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/GetFeatureDefinition_Parameters';
import type { GetFeatureDefinition_Responses as _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses, GetFeatureDefinition_Responses__Output as _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/GetFeatureDefinition_Responses';
import type { Get_ImplementedFeatures_Parameters as _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters, Get_ImplementedFeatures_Parameters__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ImplementedFeatures_Parameters';
import type { Get_ImplementedFeatures_Responses as _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses, Get_ImplementedFeatures_Responses__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ImplementedFeatures_Responses';
import type { Get_ServerDescription_Parameters as _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters, Get_ServerDescription_Parameters__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerDescription_Parameters';
import type { Get_ServerDescription_Responses as _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses, Get_ServerDescription_Responses__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerDescription_Responses';
import type { Get_ServerName_Parameters as _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters, Get_ServerName_Parameters__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerName_Parameters';
import type { Get_ServerName_Responses as _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses, Get_ServerName_Responses__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerName_Responses';
import type { Get_ServerType_Parameters as _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters, Get_ServerType_Parameters__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerType_Parameters';
import type { Get_ServerType_Responses as _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses, Get_ServerType_Responses__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerType_Responses';
import type { Get_ServerUUID_Parameters as _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters, Get_ServerUUID_Parameters__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerUUID_Parameters';
import type { Get_ServerUUID_Responses as _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses, Get_ServerUUID_Responses__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerUUID_Responses';
import type { Get_ServerVendorURL_Parameters as _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters, Get_ServerVendorURL_Parameters__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerVendorURL_Parameters';
import type { Get_ServerVendorURL_Responses as _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses, Get_ServerVendorURL_Responses__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerVendorURL_Responses';
import type { Get_ServerVersion_Parameters as _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters, Get_ServerVersion_Parameters__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerVersion_Parameters';
import type { Get_ServerVersion_Responses as _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses, Get_ServerVersion_Responses__Output as _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/Get_ServerVersion_Responses';
import type { SetServerName_Parameters as _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters, SetServerName_Parameters__Output as _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/SetServerName_Parameters';
import type { SetServerName_Responses as _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses, SetServerName_Responses__Output as _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses__Output } from '../../../../../../sila2/org/silastandard/core/silaservice/v1/SetServerName_Responses';

export interface SiLAServiceClient extends grpc.Client {
  GetFeatureDefinition(argument: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses__Output) => void): grpc.ClientUnaryCall;
  GetFeatureDefinition(argument: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses__Output) => void): grpc.ClientUnaryCall;
  GetFeatureDefinition(argument: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses__Output) => void): grpc.ClientUnaryCall;
  GetFeatureDefinition(argument: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses__Output) => void): grpc.ClientUnaryCall;
  getFeatureDefinition(argument: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses__Output) => void): grpc.ClientUnaryCall;
  getFeatureDefinition(argument: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses__Output) => void): grpc.ClientUnaryCall;
  getFeatureDefinition(argument: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses__Output) => void): grpc.ClientUnaryCall;
  getFeatureDefinition(argument: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses__Output) => void): grpc.ClientUnaryCall;

  Get_ImplementedFeatures(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ImplementedFeatures(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ImplementedFeatures(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ImplementedFeatures(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses__Output) => void): grpc.ClientUnaryCall;
  getImplementedFeatures(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses__Output) => void): grpc.ClientUnaryCall;
  getImplementedFeatures(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses__Output) => void): grpc.ClientUnaryCall;
  getImplementedFeatures(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses__Output) => void): grpc.ClientUnaryCall;
  getImplementedFeatures(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses__Output) => void): grpc.ClientUnaryCall;

  Get_ServerDescription(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerDescription(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerDescription(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerDescription(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerDescription(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerDescription(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerDescription(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerDescription(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses__Output) => void): grpc.ClientUnaryCall;

  Get_ServerName(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerName(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerName(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerName(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerName(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerName(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerName(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerName(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses__Output) => void): grpc.ClientUnaryCall;

  Get_ServerType(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerType(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerType(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerType(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerType(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerType(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerType(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerType(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses__Output) => void): grpc.ClientUnaryCall;

  Get_ServerUUID(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerUUID(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerUUID(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerUUID(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerUuid(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerUuid(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerUuid(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerUuid(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses__Output) => void): grpc.ClientUnaryCall;

  Get_ServerVendorURL(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerVendorURL(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerVendorURL(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerVendorURL(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerVendorUrl(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerVendorUrl(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerVendorUrl(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerVendorUrl(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses__Output) => void): grpc.ClientUnaryCall;

  Get_ServerVersion(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerVersion(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerVersion(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses__Output) => void): grpc.ClientUnaryCall;
  Get_ServerVersion(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerVersion(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerVersion(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerVersion(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses__Output) => void): grpc.ClientUnaryCall;
  getServerVersion(argument: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses__Output) => void): grpc.ClientUnaryCall;

  SetServerName(argument: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  SetServerName(argument: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  SetServerName(argument: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  SetServerName(argument: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  setServerName(argument: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  setServerName(argument: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  setServerName(argument: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses__Output) => void): grpc.ClientUnaryCall;
  setServerName(argument: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses__Output) => void): grpc.ClientUnaryCall;

}

export interface SiLAServiceHandlers extends grpc.UntypedServiceImplementation {
  GetFeatureDefinition: grpc.handleUnaryCall<_sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses>;

  Get_ImplementedFeatures: grpc.handleUnaryCall<_sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses>;

  Get_ServerDescription: grpc.handleUnaryCall<_sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses>;

  Get_ServerName: grpc.handleUnaryCall<_sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses>;

  Get_ServerType: grpc.handleUnaryCall<_sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses>;

  Get_ServerUUID: grpc.handleUnaryCall<_sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses>;

  Get_ServerVendorURL: grpc.handleUnaryCall<_sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses>;

  Get_ServerVersion: grpc.handleUnaryCall<_sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses>;

  SetServerName: grpc.handleUnaryCall<_sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses>;

}

export interface SiLAServiceDefinition extends grpc.ServiceDefinition {
  GetFeatureDefinition: MethodDefinition<_sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters, _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses, _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_GetFeatureDefinition_Responses__Output>
  Get_ImplementedFeatures: MethodDefinition<_sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters, _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses, _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ImplementedFeatures_Responses__Output>
  Get_ServerDescription: MethodDefinition<_sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters, _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses, _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerDescription_Responses__Output>
  Get_ServerName: MethodDefinition<_sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters, _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses, _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerName_Responses__Output>
  Get_ServerType: MethodDefinition<_sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters, _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses, _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerType_Responses__Output>
  Get_ServerUUID: MethodDefinition<_sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters, _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses, _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerUUID_Responses__Output>
  Get_ServerVendorURL: MethodDefinition<_sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters, _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses, _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerVendorURL_Responses__Output>
  Get_ServerVersion: MethodDefinition<_sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters, _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses, _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_Get_ServerVersion_Responses__Output>
  SetServerName: MethodDefinition<_sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters, _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses, _sila2_org_silastandard_core_silaservice_v1_SetServerName_Parameters__Output, _sila2_org_silastandard_core_silaservice_v1_SetServerName_Responses__Output>
}