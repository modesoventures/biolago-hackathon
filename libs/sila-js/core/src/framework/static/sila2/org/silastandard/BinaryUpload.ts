// Original file: src/framework/protobuf/SiLABinaryTransfer.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateBinaryRequest as _sila2_org_silastandard_CreateBinaryRequest, CreateBinaryRequest__Output as _sila2_org_silastandard_CreateBinaryRequest__Output } from '../../../sila2/org/silastandard/CreateBinaryRequest';
import type { CreateBinaryResponse as _sila2_org_silastandard_CreateBinaryResponse, CreateBinaryResponse__Output as _sila2_org_silastandard_CreateBinaryResponse__Output } from '../../../sila2/org/silastandard/CreateBinaryResponse';
import type { DeleteBinaryRequest as _sila2_org_silastandard_DeleteBinaryRequest, DeleteBinaryRequest__Output as _sila2_org_silastandard_DeleteBinaryRequest__Output } from '../../../sila2/org/silastandard/DeleteBinaryRequest';
import type { DeleteBinaryResponse as _sila2_org_silastandard_DeleteBinaryResponse, DeleteBinaryResponse__Output as _sila2_org_silastandard_DeleteBinaryResponse__Output } from '../../../sila2/org/silastandard/DeleteBinaryResponse';
import type { UploadChunkRequest as _sila2_org_silastandard_UploadChunkRequest, UploadChunkRequest__Output as _sila2_org_silastandard_UploadChunkRequest__Output } from '../../../sila2/org/silastandard/UploadChunkRequest';
import type { UploadChunkResponse as _sila2_org_silastandard_UploadChunkResponse, UploadChunkResponse__Output as _sila2_org_silastandard_UploadChunkResponse__Output } from '../../../sila2/org/silastandard/UploadChunkResponse';

export interface BinaryUploadClient extends grpc.Client {
  CreateBinary(argument: _sila2_org_silastandard_CreateBinaryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_CreateBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  CreateBinary(argument: _sila2_org_silastandard_CreateBinaryRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_CreateBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  CreateBinary(argument: _sila2_org_silastandard_CreateBinaryRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_CreateBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  CreateBinary(argument: _sila2_org_silastandard_CreateBinaryRequest, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_CreateBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  createBinary(argument: _sila2_org_silastandard_CreateBinaryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_CreateBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  createBinary(argument: _sila2_org_silastandard_CreateBinaryRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_CreateBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  createBinary(argument: _sila2_org_silastandard_CreateBinaryRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_CreateBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  createBinary(argument: _sila2_org_silastandard_CreateBinaryRequest, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_CreateBinaryResponse__Output) => void): grpc.ClientUnaryCall;

  DeleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  DeleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  DeleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  DeleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  deleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  deleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  deleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;
  deleteBinary(argument: _sila2_org_silastandard_DeleteBinaryRequest, callback: (error?: grpc.ServiceError, result?: _sila2_org_silastandard_DeleteBinaryResponse__Output) => void): grpc.ClientUnaryCall;

  UploadChunk(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_sila2_org_silastandard_UploadChunkRequest, _sila2_org_silastandard_UploadChunkResponse__Output>;
  UploadChunk(options?: grpc.CallOptions): grpc.ClientDuplexStream<_sila2_org_silastandard_UploadChunkRequest, _sila2_org_silastandard_UploadChunkResponse__Output>;
  uploadChunk(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_sila2_org_silastandard_UploadChunkRequest, _sila2_org_silastandard_UploadChunkResponse__Output>;
  uploadChunk(options?: grpc.CallOptions): grpc.ClientDuplexStream<_sila2_org_silastandard_UploadChunkRequest, _sila2_org_silastandard_UploadChunkResponse__Output>;

}

export interface BinaryUploadHandlers extends grpc.UntypedServiceImplementation {
  CreateBinary: grpc.handleUnaryCall<_sila2_org_silastandard_CreateBinaryRequest__Output, _sila2_org_silastandard_CreateBinaryResponse>;

  DeleteBinary: grpc.handleUnaryCall<_sila2_org_silastandard_DeleteBinaryRequest__Output, _sila2_org_silastandard_DeleteBinaryResponse>;

  UploadChunk: grpc.handleBidiStreamingCall<_sila2_org_silastandard_UploadChunkRequest__Output, _sila2_org_silastandard_UploadChunkResponse>;

}

export interface BinaryUploadDefinition extends grpc.ServiceDefinition {
  CreateBinary: MethodDefinition<_sila2_org_silastandard_CreateBinaryRequest, _sila2_org_silastandard_CreateBinaryResponse, _sila2_org_silastandard_CreateBinaryRequest__Output, _sila2_org_silastandard_CreateBinaryResponse__Output>
  DeleteBinary: MethodDefinition<_sila2_org_silastandard_DeleteBinaryRequest, _sila2_org_silastandard_DeleteBinaryResponse, _sila2_org_silastandard_DeleteBinaryRequest__Output, _sila2_org_silastandard_DeleteBinaryResponse__Output>
  UploadChunk: MethodDefinition<_sila2_org_silastandard_UploadChunkRequest, _sila2_org_silastandard_UploadChunkResponse, _sila2_org_silastandard_UploadChunkRequest__Output, _sila2_org_silastandard_UploadChunkResponse__Output>
}
