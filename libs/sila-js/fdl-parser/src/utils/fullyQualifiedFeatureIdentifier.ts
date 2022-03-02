/* eslint-disable import/prefer-default-export */
import { IFeatureDefinition } from '../types';

export const fullyQualifiedFeatureIdentifier = (
  featureDefinition: IFeatureDefinition
): string => {
  if (typeof featureDefinition === 'undefined') return '';

  const featureVersionMajor = parseInt(
    featureDefinition.featureVersion.split('.')[0],
    10
  );

  return [
    featureDefinition.originator,
    featureDefinition.category,
    featureDefinition.title,
    `v${featureVersionMajor}`,
  ].join('/');
};
