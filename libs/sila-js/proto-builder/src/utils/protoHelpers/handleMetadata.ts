/* eslint-disable import/prefer-default-export */
import { IFeatureDefinition, IMetadata } from '@sila-standard/fdl-parser';

import { packageNamespace } from '../packageNamespace';
import { createDataTypeMessage } from './createDataTypeMessage';

export const handleMetadata = (
  featureDefinition: IFeatureDefinition,
  metadata: IMetadata
): any => {
  let serviceMetadata = `
  // Metadata: ${metadata.displayName}
  /* ${metadata.description} */
`;

  serviceMetadata += `  rpc Get_FCPAffectedByMetadata_${
    metadata.title
  }(${packageNamespace(featureDefinition)}.Get_FCPAffectedByMetadata_${
    metadata.title
  }_Parameters) returns (${packageNamespace(
    featureDefinition
  )}.Get_FCPAffectedByMetadata_${metadata.title}_Responses) {}
`;

  const message = buildList(
    featureDefinition,
    metadata.metadataSchema.properties
  );

  let metadataDefinitions = `message Get_FCPAffectedByMetadata_${metadata.title}_Parameters {
  // Empty message
}

message Get_FCPAffectedByMetadata_${metadata.title}_Responses {
  repeated sila2.org.silastandard.String AffectedCalls = 1;
}
`;

  metadataDefinitions += `message Metadata_${metadata.title} {
${message}
}
`;

  return {
    serviceMetadata,
    metadataDefinitions,
  };
};

function buildList(featureDefinition: IFeatureDefinition, properties: any) {
  let result = '';

  if (!properties) {
    return '  // Empty message';
  }

  let n = 0;

  for (const [, property] of Object.entries(properties)) {
    result += createDataTypeMessage(featureDefinition, property, { n: n + 1 });
    n += 1;
  }
  return result;
}
