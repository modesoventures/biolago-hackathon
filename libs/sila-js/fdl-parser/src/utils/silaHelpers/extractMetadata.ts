import {
  IDataTypeSchemaObject,
  IFeatureDefinitionXMLElement,
  IFeatureDefinitionXMLFeatureElement,
  IMetadata,
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

const extractMetadata = (
  featureDefinitionXMLFeatureElement: IFeatureDefinitionXMLFeatureElement
): Array<IMetadata> =>
  getElements(featureDefinitionXMLFeatureElement, 'Metadata').map(
    (featureDefinitionXMLElement) => ({
      ...extractDefaults(featureDefinitionXMLElement),

      metadataSchema: extractSiLAElement(featureDefinitionXMLElement),

      definedExecutionErrorList: extractDefinedExecutionErrorList(
        featureDefinitionXMLElement
      ),
    })
  );

export default extractMetadata;
