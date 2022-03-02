/* eslint-disable import/prefer-default-export */
import { IFeatureDefinition } from '../types';

export const packageNamespace = (
  featureDefinition: IFeatureDefinition
): string => {
  const featureVersionMajor = parseInt(
    featureDefinition.featureVersion.split('.')[0],
    10
  );

  return [
    'sila2',
    featureDefinition.originator.toLowerCase(),
    featureDefinition.category.toLowerCase(),
    featureDefinition.title.toLowerCase(),
    `v${featureVersionMajor}`,
  ].join('.');
};
