/* eslint-disable max-statements */
import {
  ICommand,
  IDataTypeSchemaObject,
  IFeatureDefinition,
  IProperty,
} from '../types';

const resolveExternalDataTypesForSchema = (
  schema: IDataTypeSchemaObject,
  featureDefinition: IFeatureDefinition
) => {
  const returnSchema = schema;

  for (const [propertyName, property] of Object.entries(
    returnSchema.properties
  )) {
    if (property.type.startsWith('external:')) {
      const externalTypeIdentifier: string = property.type.split(':')[1];

      const externalDataTypeDefinition =
        featureDefinition.dataTypeDefinitions.find(
          (x) => x.title === externalTypeIdentifier
        );

      if (externalDataTypeDefinition) {
        const externalType: any =
          externalDataTypeDefinition.dataTypeDefinitionSchema.properties[
            externalTypeIdentifier
          ];

        const { title, description, displayName, ...reducedExternalType } =
          externalType;

        if (externalType) {
          returnSchema.properties[propertyName] = {
            ...property,
            ...reducedExternalType,
          };
        }
      }
    }
  }
  return returnSchema;
};

const resolveExternalDataTypes = (
  featureDefinition: IFeatureDefinition
): IFeatureDefinition => {
  featureDefinition.commands.map((command: ICommand) => {
    const returnCommand = command;

    returnCommand.parametersSchema = resolveExternalDataTypesForSchema(
      returnCommand.parametersSchema,
      featureDefinition
    );
    returnCommand.responsesSchema = resolveExternalDataTypesForSchema(
      returnCommand.responsesSchema,
      featureDefinition
    );
    returnCommand.intermediateResponsesSchema =
      resolveExternalDataTypesForSchema(
        returnCommand.intermediateResponsesSchema,
        featureDefinition
      );

    return returnCommand;
  });

  featureDefinition.properties.map((property: IProperty) => {
    const returnProperty = property;

    returnProperty.propertySchema = resolveExternalDataTypesForSchema(
      property.propertySchema,
      featureDefinition
    );

    return returnProperty;
  });
  return featureDefinition;
};

export default resolveExternalDataTypes;
