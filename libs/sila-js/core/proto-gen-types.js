const { exec } = require('child_process');

const command =
  'npx proto-loader-gen-types \
  --longs=String \
  --enums=String \
  --defaults \
  --oneofs \
  --grpcLib=@grpc/grpc-js \
  -I=src/framework/proto \
  -I=src/framework/protobuf/org.silastandard \
  --outDir=src/framework/static \
  AuthenticationService.proto \
  AuthorizationService.proto \
  CancelController.proto \
  LockController.proto \
  ObservableCommandController.proto \
  ParameterConstraintProvider.proto \
  SiLAService.proto \
  SimulationController.proto \
  SiLABinaryTransfer.proto \
  SiLAFramework.proto';

exec(command, (err) => {
  if (err) {
    console.log('ERROR:', err);
  }
});
