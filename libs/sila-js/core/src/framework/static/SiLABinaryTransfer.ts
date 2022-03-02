import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { BinaryDownloadClient as _sila2_org_silastandard_BinaryDownloadClient, BinaryDownloadDefinition as _sila2_org_silastandard_BinaryDownloadDefinition } from './sila2/org/silastandard/BinaryDownload';
import type { BinaryUploadClient as _sila2_org_silastandard_BinaryUploadClient, BinaryUploadDefinition as _sila2_org_silastandard_BinaryUploadDefinition } from './sila2/org/silastandard/BinaryUpload';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  sila2: {
    org: {
      silastandard: {
        Any: MessageTypeDefinition
        Binary: MessageTypeDefinition
        BinaryDownload: SubtypeConstructor<typeof grpc.Client, _sila2_org_silastandard_BinaryDownloadClient> & { service: _sila2_org_silastandard_BinaryDownloadDefinition }
        BinaryTransferError: MessageTypeDefinition
        BinaryUpload: SubtypeConstructor<typeof grpc.Client, _sila2_org_silastandard_BinaryUploadClient> & { service: _sila2_org_silastandard_BinaryUploadDefinition }
        Boolean: MessageTypeDefinition
        CommandConfirmation: MessageTypeDefinition
        CommandExecutionUUID: MessageTypeDefinition
        CreateBinaryRequest: MessageTypeDefinition
        CreateBinaryResponse: MessageTypeDefinition
        Date: MessageTypeDefinition
        DefinedExecutionError: MessageTypeDefinition
        DeleteBinaryRequest: MessageTypeDefinition
        DeleteBinaryResponse: MessageTypeDefinition
        Duration: MessageTypeDefinition
        ExecutionInfo: MessageTypeDefinition
        FrameworkError: MessageTypeDefinition
        GetBinaryInfoRequest: MessageTypeDefinition
        GetBinaryInfoResponse: MessageTypeDefinition
        GetChunkRequest: MessageTypeDefinition
        GetChunkResponse: MessageTypeDefinition
        Integer: MessageTypeDefinition
        Real: MessageTypeDefinition
        SiLAError: MessageTypeDefinition
        String: MessageTypeDefinition
        Time: MessageTypeDefinition
        Timestamp: MessageTypeDefinition
        Timezone: MessageTypeDefinition
        UndefinedExecutionError: MessageTypeDefinition
        UploadChunkRequest: MessageTypeDefinition
        UploadChunkResponse: MessageTypeDefinition
        ValidationError: MessageTypeDefinition
      }
    }
  }
}

