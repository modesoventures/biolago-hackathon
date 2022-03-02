// Original file: src/framework/protobuf/org.silastandard/AuthenticationService.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Login_Parameters as _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters, Login_Parameters__Output as _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/authenticationservice/v1/Login_Parameters';
import type { Login_Responses as _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses, Login_Responses__Output as _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses__Output } from '../../../../../../sila2/org/silastandard/core/authenticationservice/v1/Login_Responses';
import type { Logout_Parameters as _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters, Logout_Parameters__Output as _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters__Output } from '../../../../../../sila2/org/silastandard/core/authenticationservice/v1/Logout_Parameters';
import type { Logout_Responses as _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses, Logout_Responses__Output as _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses__Output } from '../../../../../../sila2/org/silastandard/core/authenticationservice/v1/Logout_Responses';

export interface AuthenticationServiceClient extends grpc.Client {
  Login(argument: _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses__Output) => void): grpc.ClientUnaryCall;
  Login(argument: _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses__Output) => void): grpc.ClientUnaryCall;
  Login(argument: _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses__Output) => void): grpc.ClientUnaryCall;
  Login(argument: _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses__Output) => void): grpc.ClientUnaryCall;
  login(argument: _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses__Output) => void): grpc.ClientUnaryCall;
  login(argument: _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses__Output) => void): grpc.ClientUnaryCall;
  login(argument: _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses__Output) => void): grpc.ClientUnaryCall;
  login(argument: _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses__Output) => void): grpc.ClientUnaryCall;

  Logout(argument: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses__Output) => void): grpc.ClientUnaryCall;
  Logout(argument: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses__Output) => void): grpc.ClientUnaryCall;
  Logout(argument: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses__Output) => void): grpc.ClientUnaryCall;
  Logout(argument: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses__Output) => void): grpc.ClientUnaryCall;
  logout(argument: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses__Output) => void): grpc.ClientUnaryCall;
  logout(argument: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses__Output) => void): grpc.ClientUnaryCall;
  logout(argument: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses__Output) => void): grpc.ClientUnaryCall;
  logout(argument: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses__Output) => void): grpc.ClientUnaryCall;

}

export interface AuthenticationServiceHandlers extends grpc.UntypedServiceImplementation {
  Login: grpc.handleUnaryCall<_sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters__Output, _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses>;

  Logout: grpc.handleUnaryCall<_sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters__Output, _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses>;

}

export interface AuthenticationServiceDefinition extends grpc.ServiceDefinition {
  Login: MethodDefinition<_sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters, _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses, _sila2_org_silastandard_core_authenticationservice_v1_Login_Parameters__Output, _sila2_org_silastandard_core_authenticationservice_v1_Login_Responses__Output>
  Logout: MethodDefinition<_sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters, _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses, _sila2_org_silastandard_core_authenticationservice_v1_Logout_Parameters__Output, _sila2_org_silastandard_core_authenticationservice_v1_Logout_Responses__Output>
}
