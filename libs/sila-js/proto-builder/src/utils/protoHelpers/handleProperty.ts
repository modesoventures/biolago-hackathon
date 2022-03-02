/* eslint-disable import/prefer-default-export */
import { IFeatureDefinition, IProperty } from '@sila-standard/fdl-parser';

import { packageNamespace } from '../packageNamespace';
import { createDataTypeMessage } from './createDataTypeMessage';

export const handleProperty = (
  featureDefinition: IFeatureDefinition,
  property: IProperty
): any => {
  const prefix = property.observable === true ? 'Subscribe' : 'Get';

  const serviceProperties = `
  // Property: ${property.displayName}
  /* ${property.description} */
  rpc ${prefix}_${property.title}(${packageNamespace(
    featureDefinition
  )}.${prefix}_${property.title}_Parameters) returns (${
    property.observable === true ? 'stream ' : ''
  }${packageNamespace(featureDefinition)}.${prefix}_${
    property.title
  }_Responses) {}
  `;

  const propertyDefinitions = `
message ${prefix}_${property.title}_Parameters {
  // Empty message
}

message ${prefix}_${property.title}_Responses {
  ${buildList(featureDefinition, property.propertySchema.properties, prefix)}
}
`;

  return {
    serviceProperties,
    propertyDefinitions,
  };
};

function buildList(
  featureDefinition: IFeatureDefinition,
  properties: any,
  prefix: string
) {
  let result = '';

  if (!properties) {
    return '  // Empty message';
  }

  let n = 0;

  for (const [, property] of Object.entries(properties)) {
    result += createDataTypeMessage(featureDefinition, property, {
      n: n + 1,
      prefix,
    });
    n += 1;
  }
  return result;
}
