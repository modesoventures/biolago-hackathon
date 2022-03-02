import { IDataTypeSchemaID, IFeatureDefinitionXMLElement } from '../../types';
import { getElement, getTextElement } from '../xmlHelpers';

const extractDefaults = (
  featureDefinitionXMLElement: IFeatureDefinitionXMLElement
): IDataTypeSchemaID => ({
  title: getTextElement(getElement(featureDefinitionXMLElement, 'Identifier')),
  description: getTextElement(
    getElement(featureDefinitionXMLElement, 'Description')
  ),
  displayName: getTextElement(
    getElement(featureDefinitionXMLElement, 'DisplayName')
  ),
});

export default extractDefaults;
