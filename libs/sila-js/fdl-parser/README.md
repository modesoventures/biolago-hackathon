# @sila-standard/fdl-parser

### Dependencies
```
xml-js
```

### Create `featureDefinition` object from SiLA XML FeatureDefinition
```
const silaXML = fs.readFileSync('SiLAService.sila.xml', 'utf-8');

const featureDefinition: IFeatureDefinition = silaXMLtoFeatureDefinition(silaXML);

console.log(featureDefinition.fullyQualifiedFeatureIdentifier);
```

For further reference, see type definition for IFeatureDefinition in /src/types/index.ts
