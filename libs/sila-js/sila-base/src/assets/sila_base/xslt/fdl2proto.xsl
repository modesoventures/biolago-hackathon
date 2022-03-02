<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sila="http://www.sila-standard.org"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.sila-standard.org https://gitlab.com/SiLA2/sila_base/raw/master/schema/FeatureDefinition.xsd">
    <xsl:import href="fdl2proto-service.xsl"/>
    <xsl:import href="fdl2proto-messages.xsl"/>
    <xsl:import href="fdl-validation.xsl"/>
    <xsl:output method="text" encoding="UTF-8"/>

    <!-- Root template -->
    <xsl:template match="/sila:Feature">
        <!-- Package identifier, e.g. 'sila2.org.silastandard.examples.greetingprovider.v1' -->
        <xsl:param name="category">
            <xsl:choose>
                <xsl:when test="@Category">
                    <xsl:value-of select="@Category"/>
                </xsl:when>
                <xsl:otherwise>
                    none
                </xsl:otherwise>
            </xsl:choose>
        </xsl:param>
        <xsl:param name="package">
            sila2.<xsl:value-of select="@Originator"/>.<xsl:value-of select="$category"/>.<xsl:value-of select="translate(sila:Identifier, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')"/>.v<xsl:value-of select="substring-before(@FeatureVersion, '.')"/>
        </xsl:param>
        <xsl:call-template name="detect-errors"/>

        syntax = "proto3";

        <xsl:if test="//sila:Basic | //sila:Metadata | //sila:Command[sila:Observable = 'Yes']">
            import "SiLAFramework.proto";
        </xsl:if>

        package<xsl:text> </xsl:text><xsl:value-of select="$package"/>;

        /* <xsl:value-of select="sila:Description"/> */
        service <xsl:value-of select="sila:Identifier"/> {
            <xsl:apply-templates select="sila:Command" mode="service">
                <xsl:with-param name="package" select="$package"/>
            </xsl:apply-templates>
            <xsl:apply-templates select="sila:Property" mode="service">
                <xsl:with-param name="package" select="$package"/>
            </xsl:apply-templates>
            <xsl:apply-templates select="sila:Metadata" mode="service">
                <xsl:with-param name="package" select="$package"/>
            </xsl:apply-templates>
        }

        <xsl:apply-templates select="sila:DataTypeDefinition">
            <xsl:with-param name="package" select="$package"/>
        </xsl:apply-templates>

        <xsl:apply-templates select="sila:Command" mode="message">
            <xsl:with-param name="package" select="$package"/>
        </xsl:apply-templates>

        <xsl:apply-templates select="sila:Property" mode="message">
            <xsl:with-param name="package" select="$package"/>
        </xsl:apply-templates>

        <xsl:apply-templates select="sila:Metadata" mode="message">
            <xsl:with-param name="package" select="$package"/>
        </xsl:apply-templates>
    </xsl:template>

    <!-- Input node: sila:Property; returns name of property, depending on observability (prefix Get_ or Subscribe_) -->
    <xsl:template name="PropertyName">
        <xsl:choose>
            <xsl:when test="sila:Observable = 'No'">Get_<xsl:value-of select="sila:Identifier"/></xsl:when>
            <xsl:when test="sila:Observable = 'Yes'">Subscribe_<xsl:value-of select="sila:Identifier"/></xsl:when>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>
