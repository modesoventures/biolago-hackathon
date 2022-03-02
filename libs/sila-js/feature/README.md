# @sila-standard/feature

### Purpose
## Instanciate a SiLA Feature
```
const featureDefinition: IFeatureDefinition = ...;

fs.writeFileSync(`${featureDefinition.title}.proto`, protoFromFeatureDefinition(featureDefinition));

```

### Dependencies
```
@sila-standard/fdl-parser
```

