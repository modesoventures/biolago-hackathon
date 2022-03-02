/* eslint-disable import/prefer-default-export */
import {
  IDataTypeDefinition,
  IFeatureDefinition,
} from '@sila-standard/fdl-parser';

import { createDataTypeMessage } from './createDataTypeMessage';

export const handleDataTypeDefinition = (
  featureDefinition: IFeatureDefinition,
  dataTypeDefinition: IDataTypeDefinition
): any => {
  const message = buildList(
    featureDefinition,
    dataTypeDefinition.dataTypeDefinitionSchema.properties
  );

  const dataTypeDefinitions = `
message DataType_${dataTypeDefinition.title} {
  ${message}
}
`;

  return {
    dataTypeDefinitions,
  };
};

function buildList(featureDefinition: IFeatureDefinition, properties: any) {
  let result = '';

  if (!properties) {
    return '  // Empty message';
  }

  let n = 0;

  for (const [, property] of Object.entries(properties)) {
    result += createDataTypeMessage(featureDefinition, property, {
      n: n + 1,
      datatype: true,
    });
    n += 1;
  }
  return result;
}
