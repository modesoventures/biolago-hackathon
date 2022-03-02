import {
  IDataTypeDefinition,
  IDataTypeSchemaObject,
  IFeatureDefinitionXMLElement,
  IFeatureDefinitionXMLFeatureElement,
} from '../../types';
import { getElement, getElements, getTextElement } from '../xmlHelpers';
import extractDataType from './extractDataType';
import extractDefaults from './extractDefaults';

const extractSiLAElement = (
  featureDefinitionXMLElement: IFeatureDefinitionXMLElement
): IDataTypeSchemaObject => {
  const returnSchema: IDataTypeSchemaObject = {
    type: 'object',
    required: [],
    properties: {},
  };

  returnSchema.required?.push(
    getTextElement(getElement(featureDefinitionXMLElement, 'Identifier'))
  );
  returnSchema.properties[
    getTextElement(getElement(featureDefinitionXMLElement, 'Identifier'))
  ] = {
    ...extractDefaults(featureDefinitionXMLElement),
    ...extractDataType(getElement(featureDefinitionXMLElement, 'DataType')),
  };

  return returnSchema;
};

const extractDataTypeDefinitions = (
  featureDefinitionXMLFeatureElement: IFeatureDefinitionXMLFeatureElement
): Array<IDataTypeDefinition> =>
  getElements(featureDefinitionXMLFeatureElement, 'DataTypeDefinition').map(
    (featureDefinitionXMLElement) => ({
      ...extractDefaults(featureDefinitionXMLElement),

      dataTypeDefinitionSchema: extractSiLAElement(featureDefinitionXMLElement),
    })
  );

export default extractDataTypeDefinitions;
