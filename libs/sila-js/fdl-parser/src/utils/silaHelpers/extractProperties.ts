import {
  IDataTypeSchemaObject,
  IFeatureDefinitionXMLElement,
  IFeatureDefinitionXMLFeatureElement,
  IProperty,
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

const extractDefinedExecutionErrorList = (
  featureDefinitionXMLElement: IFeatureDefinitionXMLElement
): Array<string> =>
  getElements(featureDefinitionXMLElement, 'DefinedExecutionErrors').map(
    (featureDefinitionXMLElementParameter) =>
      getTextElement(
        getElement(featureDefinitionXMLElementParameter, 'Identifier')
      )
  );

const extractProperties = (
  featureDefinitionXMLFeatureElement: IFeatureDefinitionXMLFeatureElement
): Array<IProperty> =>
  getElements(featureDefinitionXMLFeatureElement, 'Property').map(
    (featureDefinitionXMLElement) => ({
      ...extractDefaults(featureDefinitionXMLElement),

      observable:
        getTextElement(
          getElement(featureDefinitionXMLElement, 'Observable')
        ) === 'Yes',

      propertySchema: extractSiLAElement(featureDefinitionXMLElement),

      definedExecutionErrorList: extractDefinedExecutionErrorList(
        featureDefinitionXMLElement
      ),
    })
  );

export default extractProperties;
