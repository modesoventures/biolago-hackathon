// Original file: src/framework/protobuf/org.silastandard/CancelController.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Cancel_Parameters as _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters, Cancel_Parameters__Output as _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/cancelcontroller/v1/Cancel_Parameters';
import type { Cancel_Responses as _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses, Cancel_Responses__Output as _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses__Output } from '../../../../../../sila2/org/silastandard/core/cancelcontroller/v1/Cancel_Responses';

export interface CancelControllerClient extends grpc.Client {
  Cancel(argument: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses__Output) => void): grpc.ClientUnaryCall;
  Cancel(argument: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses__Output) => void): grpc.ClientUnaryCall;
  Cancel(argument: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses__Output) => void): grpc.ClientUnaryCall;
  Cancel(argument: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses__Output) => void): grpc.ClientUnaryCall;
  cancel(argument: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses__Output) => void): grpc.ClientUnaryCall;
  cancel(argument: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses__Output) => void): grpc.ClientUnaryCall;
  cancel(argument: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses__Output) => void): grpc.ClientUnaryCall;
  cancel(argument: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses__Output) => void): grpc.ClientUnaryCall;

}

export interface CancelControllerHandlers extends grpc.UntypedServiceImplementation {
  Cancel: grpc.handleUnaryCall<_sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters__Output, _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses>;

}

export interface CancelControllerDefinition extends grpc.ServiceDefinition {
  Cancel: MethodDefinition<_sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters, _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses, _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Parameters__Output, _sila2_org_silastandard_core_cancelcontroller_v1_Cancel_Responses__Output>
}
