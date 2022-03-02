import { xml2js } from 'xml-js';

import {
  extractCommands,
  extractDataTypeDefinitions,
  extractDefaults,
  extractDefinedExecutionErrors,
  extractMetadata,
  extractProperties,
} from './utils/silaHelpers';
import { fullyQualifiedFeatureIdentifier } from './utils/fullyQualifiedFeatureIdentifier';
import { getAttribute, getFeatureElement } from './utils/xmlHelpers';
import {
  IFeatureDefinition,
  IFeatureDefinitionXMLFeatureElement,
  IFeatureDefinitionXMLRoot,
} from './types';
import { packageNamespace } from './utils/packageNamespace';
import resolveExternalDataTypes from './utils/resolveExternalDataTypes';

export * from './types';

// Convert a SiLA FDL XML string into FeatureDefinitionXMLRoot object
export const parseXML = (silaXML: string): IFeatureDefinitionXMLRoot =>
  xml2js(silaXML, { compact: false }) as IFeatureDefinitionXMLRoot;

// Convert a SiLA FDL XML string into a FeatureDefinition object
export const silaXMLtoFeatureDefinition = (
  silaXML: string
): IFeatureDefinition => {
  const featureDefinitionXMLRoot = parseXML(silaXML);
  const featureDefinitionXMLFeatureElement = getFeatureElement(
    featureDefinitionXMLRoot
  ) as IFeatureDefinitionXMLFeatureElement;
  let featureDefinition: IFeatureDefinition = {
    // mandatory elements
    sila2Version: getAttribute(
      featureDefinitionXMLFeatureElement,
      'SiLA2Version'
    ),
    featureVersion: getAttribute(
      featureDefinitionXMLFeatureElement,
      'FeatureVersion'
    ),
    originator: getAttribute(featureDefinitionXMLFeatureElement, 'Originator'),

    // to be assigned in a later step
    fullyQualifiedFeatureIdentifier: '',
    packageNamespace: '',

    // optional elements
    locale:
      getAttribute(featureDefinitionXMLFeatureElement, 'Locale') || 'en-us',
    maturityLevel:
      getAttribute(featureDefinitionXMLFeatureElement, 'MaturityLevel') ||
      'Draft',
    category:
      getAttribute(featureDefinitionXMLFeatureElement, 'Category') || 'None',

    // additional feature-specific elements
    ...extractDefaults(featureDefinitionXMLFeatureElement),
    commands: extractCommands(featureDefinitionXMLFeatureElement),
    properties: extractProperties(featureDefinitionXMLFeatureElement),
    metadata: extractMetadata(featureDefinitionXMLFeatureElement),
    dataTypeDefinitions: extractDataTypeDefinitions(
      featureDefinitionXMLFeatureElement
    ),
    definedExecutionErrors: extractDefinedExecutionErrors(
      featureDefinitionXMLFeatureElement
    ),
  };

  featureDefinition.fullyQualifiedFeatureIdentifier =
    fullyQualifiedFeatureIdentifier(featureDefinition);
  featureDefinition.packageNamespace = packageNamespace(featureDefinition);

  featureDefinition = resolveExternalDataTypes(featureDefinition);

  return featureDefinition;
};
