# XSLT Stylesheets
XSLT version 1.0 is used because many implementations lack support for later versions.

## fdl-validation.xsl
This stylesheet performs validation checks on the input feature definition, assuming the feature matches the XML schema.
If the feature definition is valid, no output is generated.
Else, the transformation will terminate with an error message.

## fdl2proto.xsl
Generates a protobuf file from a feature definition.

## Usage examples
Feel free to add more examples

### [xsltproc (libxslt)](http://xmlsoft.org/xslt/xsltproc2.html)
```shell
$ xsltproc fdl2proto.xsl Feature.sila.xml > Feature.proto
```

### [Xalan (Apache)](https://xalan.apache.org/)
```shell
xalan -xsl fdl2proto/fdl2proto.xsl -in test-fdl/Constrained.sila.xml -out Constrained.proto
```

### Python ([lxml](https://lxml.de/xpathxslt.html#xslt))
```python
from lxml import etree

xslt = etree.XSLT(etree.parse(open("fdl2proto.xsl")))
proto_string = str(xslt(etree.parse(open("Feature.sila.xml"))))
open("Feature.proto", "w").write(proto_string)
```

### C# ([XslCompiledTransform](https://docs.microsoft.com/en-us/dotnet/api/system.xml.xsl.xslcompiledtransform))
```c#
using System.Xml;
using System.Xml.Xsl;

var xslt = new XslCompiledTransform();
xslt.Load("fdl2proto.xsl", new XsltSettings(), new XmlUrlResolver());
xslt.Transform("Feature.sila.xml", "Feature.proto");
```
