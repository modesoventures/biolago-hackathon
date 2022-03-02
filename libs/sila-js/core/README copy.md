# @sila-standard/core

## Generating gRPC stubs from protobuf

The src/framework/proto directory contains all the current SiLA2 protobuf files
(as copied from sila_python/development branch as of 2021-06-10).  To (re)generate
the gRPC stubs from these files:
* Install grpc-tools
```
$ npm install grpc-tools --save-dev
$ npm install grpc_tools_node_protoc_ts --save-dev
```
* Generate stubs
```
$ node proto-gen-types.js
or
$ yarn build:proto
```
