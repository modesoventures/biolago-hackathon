/* eslint-disable max-statements */
import {
  IDataTypeSchema,
  IDataTypeSchemaAny,
  IDataTypeSchemaAnyWithID,
  IDataTypeSchemaArray,
  IDataTypeSchemaObject,
  IFeatureDefinitionXMLElement,
} from '../../types';
import { getElement, getElements, getTextElement } from '../xmlHelpers';

// Extract a Constraint structure and map it to JSON schema
// Types which are not supported by JSON schema are converted into a "silaConstraint<xyz>" object.
// TODO: https://docs.google.com/document/d/1nGGEwbx45ZpKeKYH18VnNysREbr1EXH6FqlCo03yASM/edit#bookmark=id.rkdmr5obm2un
const extractConstraints = (constraints: any): any => {
  const result: any = {};

  constraints.elements.forEach((c: any) => {
    if (c.name === 'Constraints') {
      // nested structure
      result.push(extractConstraints(c));
    } else {
      switch (c.name) {
        case 'Unit':
          result.silaConstraintUnit = {
            label: getTextElement(getElement(c, 'Label')),
            factor: getTextElement(getElement(c, 'Factor')),
            offset: getTextElement(getElement(c, 'Offset')),
            unitComponent: {
              sIUnit: getTextElement(
                getElement(getElement(c, 'UnitComponent'), 'SIUnit')
              ),
              exponent: getTextElement(
                getElement(getElement(c, 'UnitComponent'), 'Exponent')
              ),
            },
          };
          break;
        case 'FullyQualifiedIdentifier':
          result.silaConstraintFullyqualifiedidentifier = getTextElement(c);
          break;
        case 'Schema':
          result.silaConstraintSchema = {
            type: getTextElement(getElement(c, 'Type')),
            url: getTextElement(getElement(c, 'Url')),
          };
          break;
        case 'Length':
          result.minLength = getTextElement(c);
          result.maxLength = getTextElement(c);
          break;
        case 'MinimalLength':
          result.minLength = getTextElement(c);
          break;
        case 'MaximalLength':
          result.maxLength = getTextElement(c);
          break;
        case 'Pattern':
          result.pattern = getTextElement(c);
          break;
        default:
          result.silaConstraint = c.name;
      }
    }
  });
  return result;
};

// Convert a SiLA Basic type to JSON schema type
const silaBasicTypeToJSType = (silaBasicType: string): string => {
  switch (silaBasicType) {
    case 'Real':
      return 'number';
    default:
      return silaBasicType.toLocaleLowerCase();
  }
};

const extractDataType = (
  element: IFeatureDefinitionXMLElement,
  constraints?: any
): IDataTypeSchemaAny => {
  let dataType: IDataTypeSchema = {
    type: '',
  };

  if (getElement(element, 'DataTypeIdentifier').type !== 'empty') {
    dataType.type = `external:${getTextElement(
      getElement(element, 'DataTypeIdentifier')
    )}`;
    dataType.linkedDataType = getTextElement(
      getElement(element, 'DataTypeIdentifier')
    );
  }

  if (getElement(element, 'Basic').type !== 'empty') {
    dataType.type = silaBasicTypeToJSType(
      getTextElement(getElement(element, 'Basic'))
    );

    if (typeof constraints !== 'undefined') {
      dataType = { ...dataType, ...extractConstraints(constraints) };
    }
  }

  if (getElement(element, 'List').type !== 'empty') {
    const dataTypeArray: IDataTypeSchemaArray = {
      type: 'array',
      items: { type: '' },
    };

    getElements(element, 'List').forEach((dt) => {
      dataTypeArray.items = extractDataType(getElement(dt, 'DataType'));
    });
    return dataTypeArray;
  }

  if (getElement(element, 'Constrained').type !== 'empty') {
    getElements(element, 'Constrained').forEach((constrained) => {
      const newconstraints = getElement(constrained, 'Constraints');

      dataType = {
        ...{ type: 'to be overwritten' },
        ...extractDataType(getElement(constrained, 'DataType'), newconstraints),
      };
    });
    return dataType;
  }

  if (getElement(element, 'Structure').type !== 'empty') {
    const dataTypeObject: IDataTypeSchemaObject = {
      type: 'object',
      required: [],
      properties: {},
    };

    getElements(element, 'Structure').forEach((ele) => {
      getElements(ele, 'Element').forEach((dt) => {
        const dataTypeElement: IDataTypeSchemaAnyWithID = {
          ...extractDataType(getElement(dt, 'DataType')),
          ...{
            title: getTextElement(getElement(dt, 'Identifier')),
            description: getTextElement(getElement(dt, 'Description')),
            displayName: getTextElement(getElement(dt, 'DisplayName')),
          },
        };

        dataTypeObject.required?.push(dataTypeElement.title);

        dataTypeObject.properties[dataTypeElement.title] = dataTypeElement;
      });
    });

    return dataTypeObject;
  }

  return dataType;
};

export default extractDataType;
