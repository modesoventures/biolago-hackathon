export type IDataTypeSchemaAny =
  | IDataTypeSchema
  | IDataTypeSchemaArray
  | IDataTypeSchemaObject;

export type IDataTypeSchemaAnyWithID =
  | (IDataTypeSchema & IDataTypeSchemaID)
  | (IDataTypeSchemaArray & IDataTypeSchemaID)
  | (IDataTypeSchemaObject & IDataTypeSchemaID);
export interface IDataTypeSchemaID {
  title: string;
  description: string;
  displayName: string;
}
export interface IDataTypeSchema {
  type: string;
  linkedDataType?: string;
}

export interface IDataTypeSchemaArray {
  type: string;
  items: IDataTypeSchema;
}

export interface IDataTypeSchemaObject {
  type: string;
  required: string[];
  properties: { [key: string]: IDataTypeSchema | IDataTypeSchemaArray };
}

export interface ICommand {
  title: string;
  description: string;
  displayName: string;

  observable: boolean;

  parametersSchema: IDataTypeSchemaObject;
  responsesSchema: IDataTypeSchemaObject;
  intermediateResponsesSchema: IDataTypeSchemaObject;

  definedExecutionErrorList: Array<string>;
}

export interface IProperty {
  title: string;
  description: string;
  displayName: string;

  observable: boolean;

  propertySchema: IDataTypeSchemaObject;

  definedExecutionErrorList: Array<string>;
}

export interface IMetadata {
  title: string;
  description: string;
  displayName: string;

  metadataSchema: IDataTypeSchemaObject;

  definedExecutionErrorList: Array<string>;
}

export interface IDataTypeDefinition {
  title: string;
  description: string;
  displayName: string;

  dataTypeDefinitionSchema: IDataTypeSchemaObject;
}

export interface IDefinedExecutionError {
  title: string;
  description: string;
  displayName: string;
}

export interface IFeatureDefinition {
  sila2Version: string;
  featureVersion: string;
  originator: string;

  fullyQualifiedFeatureIdentifier: string;
  packageNamespace: string;

  locale: string;
  maturityLevel: string;
  category: string;

  title: string;
  description: string;
  displayName: string;

  commands: Array<ICommand>;
  properties: Array<IProperty>;
  metadata: Array<IMetadata>;
  dataTypeDefinitions: Array<IDataTypeDefinition>;
  definedExecutionErrors: Array<IDefinedExecutionError>;
}

export interface IFeatureDefinitionXMLElement {
  type: string;
  name: string;
  elements: Array<any>;
}

export interface IFeatureDefinitionXMLFeatureElement {
  type: string;
  name: string;
  attributes: {
    [key: string]: string | undefined;
    SiLA2Version: string;
    FeatureVersion: string;
    Originator: string;
    MaturityLevel?: string;
    Category?: string;
    Locale?: string;
    xmlns: string;
    'xmlns:xsi': string;
    'xsi:schemaLocation': string;
  };
  elements: Array<IFeatureDefinitionXMLElement>;
}

export interface IFeatureDefinitionXMLRoot {
  declaration?: { attributes: { version: string; encoding: string } };
  elements: Array<IFeatureDefinitionXMLFeatureElement>;
}
