# @sila-standard/dynamic-client

### Purpose
## Connect to a SiLA server and call remote functions
```
import DynamicClient from '@sila-standard/dynamic-client;
import Endpoint from '@sila-standard/client;

const endpoint: Endpoint = {
  hostname: '127.0.0.1',
  port: 50051,
};

const dynamicClient = new DynamicClient(endpoint);

await dynamicClient.initSiLAFeatures();

await dynamicClient.getImplementedFeatures();

const response = await dynamicClient
    .useFeature('org.silastandard/core/SiLAService/v1')
    .getProperty('ServerName');

console.log(response.value);

```
