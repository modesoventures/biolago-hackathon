import {
  ICommand,
  IDataTypeSchemaObject,
  IFeatureDefinitionXMLElement,
  IFeatureDefinitionXMLFeatureElement,
} from '../../types';
import { getElement, getElements, getTextElement } from '../xmlHelpers';
import extractDataType from './extractDataType';
import extractDefaults from './extractDefaults';

const extractSiLAElements = (
  featureDefinitionXMLElement: IFeatureDefinitionXMLElement,
  elementType: string
): IDataTypeSchemaObject => {
  const returnSchema: IDataTypeSchemaObject = {
    type: 'object',
    required: [],
    properties: {},
  };

  getElements(featureDefinitionXMLElement, elementType).forEach((parameter) => {
    returnSchema.required?.push(
      getTextElement(getElement(parameter, 'Identifier'))
    );
    returnSchema.properties[
      getTextElement(getElement(parameter, 'Identifier'))
    ] = {
      ...extractDefaults(parameter),
      ...extractDataType(getElement(parameter, 'DataType')),
    };
  });

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

const extractCommands = (
  featureDefinitionXMLFeatureElement: IFeatureDefinitionXMLFeatureElement
): Array<ICommand> =>
  getElements(featureDefinitionXMLFeatureElement, 'Command').map(
    (featureDefinitionXMLElement) => ({
      ...extractDefaults(featureDefinitionXMLElement),

      observable:
        getTextElement(
          getElement(featureDefinitionXMLElement, 'Observable')
        ) === 'Yes',

      parametersSchema: extractSiLAElements(
        featureDefinitionXMLElement,
        'Parameter'
      ),
      responsesSchema: extractSiLAElements(
        featureDefinitionXMLElement,
        'Response'
      ),
      intermediateResponsesSchema: extractSiLAElements(
        featureDefinitionXMLElement,
        'IntermediateResponse'
      ),

      definedExecutionErrorList: extractDefinedExecutionErrorList(
        featureDefinitionXMLElement
      ),
    })
  );

export default extractCommands;
