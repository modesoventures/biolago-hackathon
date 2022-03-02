/* eslint prettier/prettier: ["warn"] */
import {
  SiLAServiceRoot,
  SimulationControllerRoot,
  standardFeatureDefinitionDir,
} from '../../src/framework/framework';

describe('SiLAServiceRoot', () => {
  it('gives access to SiLAService gRPC types', () => {
    expect(
      SiLAServiceRoot.sila2.org.silastandard.core.silaservice.v1.SiLAService
        .service
    ).toBeTruthy();
  });
});

describe('SimulationControllerRoot', () => {
  it('gives access to SimulationController gRPC types', () => {
    expect(
      SimulationControllerRoot.sila2.org.silastandard.core.simulationcontroller
        .v1.SimulationController.service
    ).toBeTruthy();
  });
});

describe('standardFeatureDefinitionDir', () => {
  it('returns the path to the standard feature definition directory', () => {
    expect(standardFeatureDefinitionDir).toContain(
      'framework/feature_definitions/org/silastandard'
    );
  });
});
