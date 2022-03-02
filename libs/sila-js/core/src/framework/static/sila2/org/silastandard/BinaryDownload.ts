// Original file: src/framework/protobuf/SiLABinaryTransfer.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { DeleteBinaryRequest as _sila2_org_silastandard_DeleteBinaryRequest, DeleteBinaryRequest__Output as _sila2_org_silastandard_DeleteBinaryRequest__Output } from '../../../sila2/org/silastandard/DeleteBinaryRequest';
import type { DeleteBinaryResponse as _sila2_org_silastandard_DeleteBinaryResponse, DeleteBinaryResponse__Output as _sila2_org_silastandard_DeleteBinaryResponse__Output } from '../../../sila2/org/silastandard/DeleteBinaryResponse';
import type { GetBinaryInfoRequest as _sila2_org_silastandard_GetBinaryInfoRequest, GetBinaryInfoRequest__Output as _sila2_org_silastandard_GetBinaryInfoRequest__Output } from '../../../sila2/org/silastandard/GetBinaryInfoRequest';
import type { GetBinaryInfoResponse as _sila2_org_silastandard_GetBinaryInfoResponse, GetBinaryInfoResponse__Output as _sila2_org_silastandard_GetBinaryInfoResponse__Output } from '../../../sila2/org/silastandard/GetBinaryInfoResponse';
import type { GetChunkRequest as _sila2_org_silastandard_GetChunkRequest, GetChunkRequest__Output as _sila2_org_silastandard_GetChunkRequest__Output } from '../../../sila2/org/silastandard/GetChunkRequest';
import type { GetChunkResponse as _sila2_org_silastandard_GetChunkResponse, GetChunkResponse__Output as _sila2_org_silastandard_GetChunkResponse__Output } from '../../../sila2/org/silastandard/GetChunkResponse';

export interface BinaryDownloadClient extends grpc.Client {
  DeleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  DeleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  DeleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  DeleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  deleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  deleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  deleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  deleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;

  GetBinaryInfo(argument: _sila2_org_silastandard_GetBinaryInfoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_GetBinaryInfoResponse__Output) => void): grpc.ClientUnaryCall;
  GetBinaryInfo(argument: _sila2_org_silastandard_GetBinaryInfoRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_GetBinaryInfoResponse__Output) => void): grpc.ClientUnaryCall;
  GetBinaryInfo(argument: _sila2_org_silastandard_GetBinaryInfoRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_GetBinaryInfoResponse__Output) => void): grpc.ClientUnaryCall;
  GetBinaryInfo(argument: _sila2_org_silastandard_GetBinaryInfoRequest, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_GetBinaryInfoResponse__Output) => void): grpc.ClientUnaryCall;
  getBinaryInfo(argument: _sila2_org_silastandard_GetBinaryInfoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_GetBinaryInfoResponse__Output) => void): grpc.ClientUnaryCall;
  getBinaryInfo(argument: _sila2_org_silastandard_GetBinaryInfoRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_GetBinaryInfoResponse__Output) => void): grpc.ClientUnaryCall;
  getBinaryInfo(argument: _sila2_org_silastandard_GetBinaryInfoRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_GetBinaryInfoResponse__Output) => void): grpc.ClientUnaryCall;
  getBinaryInfo(argument: _sila2_org_silastandard_GetBinaryInfoRequest, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_GetBinaryInfoResponse__Output) => void): grpc.ClientUnaryCall;

  GetChunk(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_sila2_org_silastandard_GetChunkRequest, _sila2_org_silastandard_GetChunkResponse__Output>;
  GetChunk(options?: grpc.CallOptions): grpc.ClientDuplexStream<_sila2_org_silastandard_GetChunkRequest, _sila2_org_silastandard_GetChunkResponse__Output>;
  getChunk(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_sila2_org_silastandard_GetChunkRequest, _sila2_org_silastandard_GetChunkResponse__Output>;
  getChunk(options?: grpc.CallOptions): grpc.ClientDuplexStream<_sila2_org_silastandard_GetChunkRequest, _sila2_org_silastandard_GetChunkResponse__Output>;

}

export interface BinaryDownloadHandlers extends grpc.UntypedServiceImplementation {
  DeleteBinary: grpc.handleUnaryCall<_sila2_org_silastandard_DeleteBinaryRequest__Output, _sila2_org_silastandard_DeleteBinaryResponse>;

  GetBinaryInfo: grpc.handleUnaryCall<_sila2_org_silastandard_GetBinaryInfoRequest__Output, _sila2_org_silastandard_GetBinaryInfoResponse>;

  GetChunk: grpc.handleBidiStreamingCall<_sila2_org_silastandard_GetChunkRequest__Output, _sila2_org_silastandard_GetChunkResponse>;

}

export interface BinaryDownloadDefinition extends grpc.ServiceDefinition {
  DeleteBinary: MethodDefinition<_sila2_org_silastandard_DeleteBinaryRequest, _sila2_org_silastandard_DeleteBinaryResponse, _sila2_org_silastandard_DeleteBinaryRequest__Output, _sila2_org_silastandard_DeleteBinaryResponse__Output>
  GetBinaryInfo: MethodDefinition<_sila2_org_silastandard_GetBinaryInfoRequest, _sila2_org_silastandard_GetBinaryInfoResponse, _sila2_org_silastandard_GetBinaryInfoRequest__Output, _sila2_org_silastandard_GetBinaryInfoResponse__Output>
  GetChunk: MethodDefinition<_sila2_org_silastandard_GetChunkRequest, _sila2_org_silastandard_GetChunkResponse, _sila2_org_silastandard_GetChunkRequest__Output, _sila2_org_silastandard_GetChunkResponse__Output>
}
