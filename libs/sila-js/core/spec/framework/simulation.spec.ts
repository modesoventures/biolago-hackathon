/* eslint prettier/prettier: ["warn"] */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
import {
  Get_SimulationMode_Parameters,
  SimulationController,
  SimulationSwitcher,
  StartRealMode_Parameters,
  StartSimulationMode_Parameters,
} from '../../src/framework/simulation';
import UnaryCallStub from './call';

const callbackMock = jest.fn();

class MockSwitcher implements SimulationSwitcher {
  simulation: boolean;
  real: boolean;

  constructor(simulation?: boolean, real?: boolean) {
    this.simulation = simulation || false;
    this.real = real || false;
  }

  switchToSimulationMode(): boolean {
    return this.simulation;
  }

  switchToRealMode(): boolean {
    return this.real;
  }
}

describe('Creating a SimulationController', () => {
  it('should return an instance', () => {
    const simulationSwitcher = new MockSwitcher();
    const actual = new SimulationController({ simulationSwitcher });

    expect(actual).toBeTruthy();
    expect(actual.simulationMode).toBeFalsy();
  });

  it('should return an instance with mode set', () => {
    const simulationSwitcher = new MockSwitcher();
    const actual = new SimulationController({
      simulationSwitcher,
      simulationMode: true,
    });

    expect(actual).toBeTruthy();
    expect(actual.simulationMode).toBeTruthy();
  });

  it('should return an instance with mode unset', () => {
    const simulationSwitcher = new MockSwitcher();
    const actual = new SimulationController({
      simulationSwitcher,
      simulationMode: false,
    });

    expect(actual).toBeTruthy();
    expect(actual.simulationMode).toBeFalsy();
  });
});

describe('Calling Get_SimulationMode', () => {
  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should return false', () => {
    const expectedResponse = {
      SimulationMode: { value: false },
    };
    const call = new UnaryCallStub<Get_SimulationMode_Parameters>({});
    const simulationSwitcher = new MockSwitcher();
    const controller = new SimulationController({ simulationSwitcher });

    controller.handler.Get_SimulationMode(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });

  it('should return true', () => {
    const expectedResponse = {
      SimulationMode: { value: true },
    };
    const call = new UnaryCallStub<Get_SimulationMode_Parameters>({});
    const simulationSwitcher = new MockSwitcher();
    const controller = new SimulationController({
      simulationSwitcher,
      simulationMode: true,
    });

    controller.handler.Get_SimulationMode(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });
});

describe('Calling StartSimulationMode', () => {
  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should set the simulation mode', () => {
    const call = new UnaryCallStub<StartSimulationMode_Parameters>({});
    const simulationSwitcher = new MockSwitcher(true);
    const controller = new SimulationController({
      simulationSwitcher,
      simulationMode: false,
    });

    controller.handler.StartSimulationMode(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, {});
    expect(controller.simulationMode).toBeTruthy();
  });

  it('should not set the simulation mode if not switched', () => {
    const call = new UnaryCallStub<StartSimulationMode_Parameters>({});
    const simulationSwitcher = new MockSwitcher(false);
    const controller = new SimulationController({
      simulationSwitcher,
      simulationMode: false,
    });

    controller.handler.StartSimulationMode(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, {});
    expect(controller.simulationMode).toBeFalsy();
  });

  it('should not unset the simulation mode if not switched', () => {
    const call = new UnaryCallStub<StartSimulationMode_Parameters>({});
    const simulationSwitcher = new MockSwitcher(false);
    const controller = new SimulationController({
      simulationSwitcher,
      simulationMode: true,
    });

    controller.handler.StartSimulationMode(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, {});
    expect(controller.simulationMode).toBeTruthy();
  });
});

describe('Calling StartRealMode', () => {
  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should unset the simulation mode', () => {
    const call = new UnaryCallStub<StartRealMode_Parameters>({});
    const simulationSwitcher = new MockSwitcher(false, true);
    const controller = new SimulationController({
      simulationSwitcher,
      simulationMode: true,
    });

    controller.handler.StartRealMode(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, {});
    expect(controller.simulationMode).toBeFalsy();
  });

  it('should not unset the simulation mode if not switched', () => {
    const call = new UnaryCallStub<StartRealMode_Parameters>({});
    const simulationSwitcher = new MockSwitcher(false, false);
    const controller = new SimulationController({
      simulationSwitcher,
      simulationMode: true,
    });

    controller.handler.StartRealMode(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, {});
    expect(controller.simulationMode).toBeTruthy();
  });

  it('should not set the simulation mode if switched', () => {
    const call = new UnaryCallStub<StartRealMode_Parameters>({});
    const simulationSwitcher = new MockSwitcher(false, true);
    const controller = new SimulationController({
      simulationSwitcher,
      simulationMode: false,
    });

    controller.handler.StartRealMode(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, {});
    expect(controller.simulationMode).toBeFalsy();
  });
});
