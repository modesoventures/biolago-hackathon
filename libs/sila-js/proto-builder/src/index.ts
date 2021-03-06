import { IFeatureDefinition } from '@sila-standard/fdl-parser';

import {
  handleCommand,
  handleDataTypeDefinition,
  handleMetadata,
  handleProperty,
} from './utils/protoHelpers';
import { packageNamespace } from './utils/packageNamespace';

// eslint-disable-next-line import/prefer-default-export
export const protoFromFeatureDefinition = (
  featureDefinition: IFeatureDefinition
): string => {
  const date = new Date();

  let serviceCommands = '',
    serviceProperties = '',
    commandDefinitions = '',
    propertyDefinitions = '',
    dataTypeDefinitions = '',
    serviceMetadata = '',
    metadataDefinitions = '';

  featureDefinition.commands.forEach((command) => {
    const res = handleCommand(featureDefinition, command);

    serviceCommands += res.serviceCommands;
    commandDefinitions += res.commandDefinitions;
  });

  featureDefinition.properties.forEach((property) => {
    const res = handleProperty(featureDefinition, property);

    serviceProperties += res.serviceProperties;
    propertyDefinitions += res.propertyDefinitions;
  });

  featureDefinition.dataTypeDefinitions.forEach((dataType) => {
    const res = handleDataTypeDefinition(featureDefinition, dataType);

    dataTypeDefinitions += res.dataTypeDefinitions;
  });

  featureDefinition.metadata.forEach((metaData) => {
    const res = handleMetadata(featureDefinition, metaData);

    serviceMetadata += res.serviceMetadata;
    metadataDefinitions += res.metadataDefinitions;
  });

  const str = `// This file is automatically generated by @sila_standard/proto-builder
// :generation date: ${date.toISOString()}
//
// ---- PLEASE DO NOT MODIFY MANUALLY !! ---

syntax = "proto3";
import "SiLAFramework.proto";
package ${packageNamespace(featureDefinition)};

// Feature: ${featureDefinition.displayName}
/* ${featureDefinition.description} */
service ${featureDefinition.title} {

${serviceCommands}

${serviceProperties}

${serviceMetadata}
}

// ----------------- Data Type definitions -----------------
${dataTypeDefinitions}

// ------ Command Parameter and Response definitions -------
${commandDefinitions}
${propertyDefinitions}

// ----------------- Metadata Definitions ------------------
${metadataDefinitions}
`;

  return str;
};
