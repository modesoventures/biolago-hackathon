<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sila="http://www.sila-standard.org"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.sila-standard.org https://gitlab.com/SiLA2/sila_base/raw/master/schema/FeatureDefinition.xsd">
    <xsl:output method="text" encoding="UTF-8" indent="no"/>

    <!-- Service body for commands -->
    <xsl:template match="sila:Command" mode="service">
        <xsl:param name="package"/>
        <xsl:choose>
            <xsl:when test="sila:Observable = 'No'">
                <xsl:call-template name="ServiceCommandUnobservable">
                    <xsl:with-param name="package" select="$package"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="sila:Observable = 'Yes'">
                <xsl:call-template name="ServiceCommandObservable">
                    <xsl:with-param name="package" select="$package"/>
                </xsl:call-template>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

    <!-- Service body for unobservable commands -->
    <xsl:template name="ServiceCommandUnobservable">
        <xsl:param name="package"/>
        /* <xsl:value-of select="sila:Description"/> */
        rpc <xsl:value-of select="sila:Identifier"/> (<xsl:value-of select="$package"/>.<xsl:value-of select="sila:Identifier"/>_Parameters
        ) returns (<xsl:value-of select="$package"/>.<xsl:value-of select="sila:Identifier"/>_Responses) {}
    </xsl:template>

    <!-- Service body for observable commands -->
    <xsl:template name="ServiceCommandObservable">
        <xsl:param name="package"/>
        /* <xsl:value-of select="sila:Description"/> */
        rpc <xsl:value-of select="sila:Identifier"/> (<xsl:value-of select="$package"/>.<xsl:value-of select="sila:Identifier"/>_Parameters
        ) returns (sila2.org.silastandard.CommandConfirmation) {}
        /* Monitor the state of <xsl:value-of select="sila:Identifier"/> */
        rpc <xsl:value-of select="sila:Identifier"/>_Info (sila2.org.silastandard.CommandExecutionUUID
        ) returns (stream sila2.org.silastandard.ExecutionInfo) {}
        <xsl:if test="sila:IntermediateResponse">
            /* Retrieve intermediate responses of <xsl:value-of select="sila:Identifier"/> */
            rpc <xsl:value-of select="sila:Identifier"/>_Intermediate (sila2.org.silastandard.CommandExecutionUUID
            ) returns (stream<xsl:text> </xsl:text><xsl:value-of select="$package"/>.<xsl:value-of select="sila:Identifier"/>_IntermediateResponses) {}
        </xsl:if>
        /* Retrieve result of <xsl:value-of select="sila:Identifier"/> */
        rpc <xsl:value-of select="sila:Identifier"/>_Result(sila2.org.silastandard.CommandExecutionUUID
        ) returns (<xsl:value-of select="$package"/>.<xsl:value-of select="sila:Identifier"/>_Responses) {}
    </xsl:template>

    <!-- Service body for properties -->
    <xsl:template match="sila:Property" mode="service">
        <xsl:param name="package"/>
        /* <xsl:value-of select="sila:Description"/> */
        rpc <xsl:call-template name="PropertyName"/> (<xsl:value-of select="$package"/>.<xsl:call-template name="PropertyName"/>_Parameters
        ) returns (<xsl:if test="sila:Observable = 'Yes'">stream </xsl:if><xsl:value-of select="$package"/>.<xsl:call-template name="PropertyName"/>_Responses) {}
    </xsl:template>

    <!-- Service body for metadata -->
    <xsl:template match="sila:Metadata" mode="service">
        <xsl:param name="package"/>
        /* Get fully qualified identifiers of all features, commands and properties affected by <xsl:value-of select="sila:Identifier"/> */
        rpc Get_FCPAffectedByMetadata_<xsl:value-of select="sila:Identifier"/> (<xsl:value-of select="$package"/>.Get_FCPAffectedByMetadata_<xsl:value-of select="sila:Identifier"/>_Parameters
        ) returns (<xsl:value-of select="$package"/>.Get_FCPAffectedByMetadata_<xsl:value-of select="sila:Identifier"/>_Responses) {}
    </xsl:template>
</xsl:stylesheet>
