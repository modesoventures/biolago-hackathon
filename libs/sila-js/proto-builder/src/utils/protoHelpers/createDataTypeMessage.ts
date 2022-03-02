/* eslint-disable complexity */
/* eslint-disable import/prefer-default-export */

import { IFeatureDefinition } from '@sila-standard/fdl-parser';

import { packageNamespace } from '../packageNamespace';

function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Convert a SiLA Basic type to JSON schema type
const jsTypeToSiLABasicType = (jsType: string): string => {
  switch (jsType.toLocaleLowerCase()) {
    case 'number':
      return 'Real';
    default:
      return capitalizeFirstLetter(jsType.toLocaleLowerCase());
  }
};

/* eslint-disable max-statements */
export const createDataTypeMessage = (
  featureDefinition: IFeatureDefinition,
  param: any,
  {
    n = 1,
    indent = 1,
    modifier = '',
    customNamespace = false,
    datatype = false,
    prefix = 'Get',
    parenttitle = '',
    toptitle = '',
  } = {}
): any => {
  let response,
    subtypes = '';
  let nesting = 0;

  if (param.linkedDataType) {
    response = `
${'  '.repeat(indent)}// ${param.title}
${'  '.repeat(indent)}/* ${param.description} */
${'  '.repeat(indent)}${modifier ? `${modifier} ` : ''}${
      customNamespace || param.linkedDataType
        ? `${packageNamespace(featureDefinition)}`
        : 'sila2.org.silastandard'
    }.${`DataType_${param.linkedDataType}`} ${param.title} = ${n};`;
    return response;
  }

  switch (param.type) {
    case 'number':
    case 'integer':
    case 'boolean':
    case 'string':
      response = `
${'  '.repeat(indent)}// ${param.title}
${'  '.repeat(indent)}/* ${param.description} */
${'  '.repeat(indent)}${modifier ? `${modifier} ` : ''}${
        customNamespace || param.linkedDataType
          ? `${packageNamespace(featureDefinition)}`
          : 'sila2.org.silastandard'
      }.${
        param.linkedDataType
          ? `DataType_${param.linkedDataType}`
          : jsTypeToSiLABasicType(param.type)
      } ${param.title} = ${n};`;
      break;
    case 'array':
      response = `${'  '.repeat(indent)}${createDataTypeMessage(
        featureDefinition,
        {
          title: param.title,
          type: param.items.type,
          linkedDataType: param.items.linkedDataType,
          description: param.description,
          properties: param.items.properties,
        },
        {
          n,
          indent,
          modifier: 'repeated',
          customNamespace,
          prefix,
          parenttitle,
          toptitle,
        }
      )}`;
      break;
    case 'object':
      for (const [, property] of Object.entries(param.properties)) {
        subtypes += createDataTypeMessage(featureDefinition, property, {
          n: nesting + 1,
          indent: indent + 1,
          modifier: '',
          customNamespace,
          prefix,
          parenttitle: `${parenttitle ? `${parenttitle}.` : ''}${param.title}`,
          toptitle: indent === 1 ? param.title : toptitle,
        });
        subtypes += '\r\n';

        nesting += 1;
      }

      response = `${'  '.repeat(indent - 1)}message ${param.title}_Struct {
${subtypes}
${'  '.repeat(indent)}}

${'  '.repeat(indent)}// ${param.title}
${'  '.repeat(indent)}/* ${param.description} */
${'  '.repeat(indent)}${modifier ? `${modifier} ` : ''}${packageNamespace(
        featureDefinition
      )}.${
        datatype
          ? `DataType_${parenttitle ? parenttitle : param.title}`
          : `${prefix}_${indent === 1 ? param.title : toptitle}_Responses`
      }.${parenttitle ? `${parenttitle}_Struct.` : ''}${param.title}_Struct ${
        param.title
      } = ${n};`;
      break;
    default:
      response = `${'  '.repeat(indent)}// Empty message`;
  }

  return response;
};
