#!/usr/bin/env python3

import os
import re
import glob

from lxml import etree

out_dir = "generated-proto"
reference_dir = "reference-proto"
invalid_dir = "invalid-fdl"
valid_dir = "valid-fdl"
os.makedirs(out_dir, exist_ok=True)

fdl2proto = etree.XSLT(etree.parse(open("../fdl2proto.xsl")))
fdl_validation = etree.XSLT(etree.parse(open("../fdl-validation.xsl")))
parser = etree.XMLParser(schema=etree.XMLSchema(etree.parse("../../schema/FeatureDefinition.xsd")))


def apply_transformation(xslt: etree.XSLT, feature_filename: str) -> str:
    return str(xslt(etree.parse(feature_filename, parser)))


def normalize_proto(proto_str: str) -> str:
    # strip leading and trailing whitespace
    proto_str = proto_str.strip()

    # collapse multiple whitespaces into one
    proto_str = re.sub(r"\s+", " ", proto_str)

    # strip whitespace around special characters
    for sep in [";", r"\(", r"\)", r"\{", r"\}", "=", r"\."]:
        proto_str = re.sub(r"\s*" + sep + r"\s*", sep.lstrip("\\"), proto_str)

    return proto_str


def test_invalid_fdl(feature_filename: str) -> bool:
    try:
        apply_transformation(fdl_validation, feature_filename)
        return False
    except (etree.XMLSyntaxError, etree.XSLTApplyError):
        return True


# test valid fdl files for correct proto generation
def test_valid_fdl(feature_filename: str) -> bool:
    feature_id = os.path.basename(feature_filename).split(".")[0]

    try:
        generated_proto_str = apply_transformation(fdl2proto, feature_filename)
    except Exception as e:
        print(f"Error during transformation: {e}")
        return False

    open(os.path.join(out_dir, feature_id + ".proto"), "w").write(generated_proto_str)

    reference_proto_str = open(os.path.join(reference_dir, feature_id + ".proto")).read()

    return normalize_proto(reference_proto_str) == normalize_proto(generated_proto_str)


if __name__ == '__main__':
    errors = 0
    for file in glob.glob(f"{invalid_dir}/*.sila.xml"):
        if test_invalid_fdl(file):
            print(f"Test successful: {file}")
        else:
            print(f"Test failed: {file}")
            errors += 1

    for file in glob.glob(f"{valid_dir}/*.sila.xml"):
        if test_valid_fdl(file):
            print(f"Test successful: {file}")
        else:
            print(f"Test failed: {file}")
            errors += 1

    exit(errors)
