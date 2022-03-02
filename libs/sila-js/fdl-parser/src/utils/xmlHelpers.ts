import {
  IFeatureDefinitionXMLElement,
  IFeatureDefinitionXMLFeatureElement,
  IFeatureDefinitionXMLRoot,
} from '../types';

// Return featureElement from XML root element
export const getFeatureElement = (
  parentElement: IFeatureDefinitionXMLRoot
): IFeatureDefinitionXMLFeatureElement =>
  parentElement.elements.find(({ name }) => name === 'Feature') || {
    type: 'empty',
    name: '',
    attributes: {
      SiLA2Version: '',
      FeatureVersion: '',
      Originator: '',

      xmlns: '',
      'xmlns:xsi': '',
      'xsi:schemaLocation': '',
    },
    elements: [],
  };

// Extract a string attribute property from SiLA XML element
export const getAttribute = (
  element: IFeatureDefinitionXMLFeatureElement,
  name: string
): string => element.attributes[name] || '';

// Return sub-element from a parentElement SiLA XML file.
// parentElement can be the feature element or another sub-element
export const getElement = (
  element: IFeatureDefinitionXMLFeatureElement | IFeatureDefinitionXMLElement,
  elementName: string
): IFeatureDefinitionXMLElement =>
  element.elements.find(({ name }) => name === elementName) || {
    type: 'empty',
    name: '',
    elements: [],
  };

// Return array of sub-elements from a parentElement SiLA XML file.
// parentElement can be the feature element or another sub-element
export const getElements = (
  element: IFeatureDefinitionXMLFeatureElement | IFeatureDefinitionXMLElement,
  elementName: string
): Array<IFeatureDefinitionXMLElement> =>
  element.elements.filter(({ name }) => name === elementName) || [];

export const getTextElement = (
  element: IFeatureDefinitionXMLFeatureElement | IFeatureDefinitionXMLElement
): string =>
  typeof element.elements !== 'undefined'
    ? element.elements.find((searchElement) => searchElement.type === 'text')
        .text || ''
    : '';
