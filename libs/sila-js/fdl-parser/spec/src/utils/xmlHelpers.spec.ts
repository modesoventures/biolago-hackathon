import {
  getAttribute,
  getElement,
  getFeatureElement,
} from '../../../src/utils/xmlHelpers';

describe('utils/xmlHelpers', () => {
  describe('+ getAttribute', () => {
    it('should get an attribute from XML root', () => {
      const result = getAttribute(
        {
          type: 'element',
          name: 'Feature',
          attributes: {
            SiLA2Version: '1.0',
            FeatureVersion: '1.0',
            MaturityLevel: 'Normative',
            Originator: 'org.silastandard',
            Category: 'core',
            xmlns: 'http://www.sila-standard.org',
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            'xsi:schemaLocation':
              'http://www.sila-standard.org https://gitlab.com/SiLA2/sila_base/raw/master/schema/FeatureDefinition.xsd',
          },
          elements: [
            { type: 'element', name: 'Identifier', elements: [] },
            { type: 'element', name: 'DisplayName', elements: [] },
          ],
        },
        'SiLA2Version'
      );

      expect(result).toStrictEqual('1.0');
    });
  });

  describe('+ getFeatureElement', () => {
    it('should get the feature element from XML root', () => {
      const result = getFeatureElement({
        declaration: { attributes: { version: '1.0', encoding: 'utf-8' } },
        elements: [
          {
            type: 'element',
            name: 'Feature',
            attributes: {
              SiLA2Version: '1.0',
              FeatureVersion: '1.0',
              MaturityLevel: 'Normative',
              Originator: 'org.silastandard',
              Category: 'core',
              xmlns: 'http://www.sila-standard.org',
              'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
              'xsi:schemaLocation':
                'http://www.sila-standard.org https://gitlab.com/SiLA2/sila_base/raw/master/schema/FeatureDefinition.xsd',
            },
            elements: [
              {
                type: 'element',
                name: 'Identifier',
                elements: [{ type: 'text', text: 'My Identifier' }],
              },
              {
                type: 'element',
                name: 'DisplayName',
                elements: [{ type: 'text', text: 'My DisplayName' }],
              },
            ],
          },
        ],
      });

      expect(result).toStrictEqual({
        type: 'element',
        name: 'Feature',
        attributes: {
          SiLA2Version: '1.0',
          FeatureVersion: '1.0',
          MaturityLevel: 'Normative',
          Originator: 'org.silastandard',
          Category: 'core',
          xmlns: 'http://www.sila-standard.org',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation':
            'http://www.sila-standard.org https://gitlab.com/SiLA2/sila_base/raw/master/schema/FeatureDefinition.xsd',
        },
        elements: [
          {
            type: 'element',
            name: 'Identifier',
            elements: [{ type: 'text', text: 'My Identifier' }],
          },
          {
            type: 'element',
            name: 'DisplayName',
            elements: [{ type: 'text', text: 'My DisplayName' }],
          },
        ],
      });
    });
  });

  describe('+ getElement', () => {
    it('should get an element from inside XML tree', () => {
      const result = getElement(
        {
          type: 'element',
          name: 'Feature',
          elements: [
            { type: 'element', name: 'Identifier', elements: [] },
            { type: 'element', name: 'DisplayName', elements: [] },
          ],
        },
        'Identifier'
      );

      expect(result).toStrictEqual({
        type: 'element',
        name: 'Identifier',
        elements: [],
      });
    });
  });
});
