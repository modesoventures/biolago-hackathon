import {
  IDefinedExecutionError,
  IFeatureDefinitionXMLFeatureElement,
} from '../../types';
import { getElements } from '../xmlHelpers';
import extractDefaults from './extractDefaults';

const extractDefinedExecutionErrors = (
  featureDefinitionXMLFeatureElement: IFeatureDefinitionXMLFeatureElement
): Array<IDefinedExecutionError> =>
  getElements(featureDefinitionXMLFeatureElement, 'DefinedExecutionError').map(
    (featureDefinitionXMLElement) => ({
      ...extractDefaults(featureDefinitionXMLElement),
    })
  );

export default extractDefinedExecutionErrors;
