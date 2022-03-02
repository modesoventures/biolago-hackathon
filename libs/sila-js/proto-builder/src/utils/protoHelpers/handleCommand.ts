/* eslint-disable import/prefer-default-export */
import { ICommand, IFeatureDefinition } from '@sila-standard/fdl-parser';

import { packageNamespace } from '../packageNamespace';
import { createDataTypeMessage } from './createDataTypeMessage';

// eslint-disable-next-line max-statements
export const handleCommand = (
  featureDefinition: IFeatureDefinition,
  command: ICommand
): any => {
  let serviceCommands = `
  // Command: ${command.displayName}
  /* ${command.description} */
`;

  if (!command.observable) {
    serviceCommands += `  rpc ${command.title}(${packageNamespace(
      featureDefinition
    )}.${command.title}_Parameters) returns (${packageNamespace(
      featureDefinition
    )}.${command.title}_Responses) {}
`;
  } else {
    serviceCommands += `  rpc ${command.title}(${packageNamespace(
      featureDefinition
    )}.${
      command.title
    }_Parameters) returns (sila2.org.silastandard.CommandConfirmation) {}`;

    if (
      Object.keys(command.intermediateResponsesSchema.properties).length > 0
    ) {
      serviceCommands += `
  rpc ${
    command.title
  }_Intermediate(sila2.org.silastandard.CommandExecutionUUID) returns (stream ${packageNamespace(
        featureDefinition
      )}.${command.title}_IntermediateResponses) {}`;
    }
    serviceCommands += `
  rpc ${
    command.title
  }_Info(sila2.org.silastandard.CommandExecutionUUID) returns (stream sila2.org.silastandard.ExecutionInfo) {}
  rpc ${
    command.title
  }_Result(sila2.org.silastandard.CommandExecutionUUID) returns (${packageNamespace(
      featureDefinition
    )}.${command.title}_Responses) {}
`;
  }

  let commandDefinitions = `message ${command.title}_Parameters {
${buildList(featureDefinition, command.parametersSchema.properties)}
}

message ${command.title}_Responses {
${buildList(featureDefinition, command.responsesSchema.properties)}
}
`;

  if (Object.keys(command.intermediateResponsesSchema.properties).length > 0) {
    commandDefinitions += `message ${command.title}_IntermediateResponses {
${buildList(featureDefinition, command.intermediateResponsesSchema.properties)}
}
`;
  }

  return {
    serviceCommands,
    commandDefinitions,
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
