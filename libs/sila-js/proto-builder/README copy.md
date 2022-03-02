# @sila-standard/proto-builder

### Purpose
## Create .proto file from a `featureDefinition` object
```
const featureDefinition: IFeatureDefinition = ...;

fs.writeFileSync(`${featureDefinition.title}.proto`, protoFromFeatureDefinition(featureDefinition));

```

### Dependencies
```
@sila-standard/fdl-parser
```

