<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE xsl:stylesheet
	[
 	<!ENTITY nbsp   "&#160;">
<!ENTITY copy   "&#169;">
<!ENTITY reg    "&#174;">
<!ENTITY trade  "&#8482;">
<!ENTITY mdash  "&#8212;">
<!ENTITY ldquo  "&#8220;">
<!ENTITY rdquo  "&#8221;">
<!ENTITY pound  "&#163;">
<!ENTITY yen    "&#165;">
<!ENTITY euro   "&#8364;">
<!ENTITY comma	"&#0044;">
<!ENTITY period	"&#0046;">
<!ENTITY spades	"&#9824;">
<!ENTITY clubs	"&#9827;">
<!ENTITY hearts	"&#9829;">
<!ENTITY diams	"&#9830;">
<!ENTITY apostrophy	"&#0039;">
<!ENTITY backslash	"&#92;">
<!ENTITY carriagereturn	"&#13;">
<!ENTITY less-than	"&#60;">
<!ENTITY greater-than	"&#62;">
<!-- Miscellaneous Symbols-->
<!ENTITY spades	"&#9824;"><!-- black spade suit, U+2660 ISOpub (black here seems to mean filled as opposed to hollow) -->
<!ENTITY clubs	"&#9827;"><!-- black club suit = shamrock, U+2663 ISOpub -->
<!ENTITY hearts	"&#9829;"><!-- black heart suit = valentine, U+2665 ISOpup -->
<!ENTITY diams	"&#9830;"><!-- black diamond suit, U+2666 ISOpub --> 
	]
>

<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="html"/>
	<xsl:strip-space elements="*,text(),@*"/>
	<xsl:template match="/PICS">

		<html>
			<head>
				<title>Here's a population scheme for my pictures.</title>
				<link rel="stylesheet" href="honeymoon-styles.css" type="text/css" />
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body>
				<h1>
					can an ENTITY like this: &backslash; -- by putting in &amp; backslash &#59; (in this particular case, backslash is defined in the Doctype DTD)
				</h1>
				<div id="container">
					<div id="main">
						<xsl:for-each select="PIC">
							<xsl:element name="div">
								<xsl:attribute name="class">
									<!-- 
strip the whitespace by making a variable named "class", and calling that with the normalize-space function

								 -->
									<xsl:variable name="class">
										<xsl:text>
								 slide_container 
										</xsl:text>
									</xsl:variable>
									<xsl:value-of select="normalize-space($class)"/>
								</xsl:attribute>								<!-- opening div -->
								<xsl:if test="contains( ./@URL ,'http')">
									<xsl:element name="a">
										<xsl:attribute name="href">
											<xsl:value-of select="normalize-space(./@URL)" />
										</xsl:attribute>
										<xsl:element name="img">											<!-- needs to shrink because it may be a large image (css)-->
											<xsl:attribute name="src">
												<xsl:value-of select="normalize-space(./@URL)" />
											</xsl:attribute>
										</xsl:element>										<!-- img tag -->
									</xsl:element>									<!--close "a" tag -->
								</xsl:if>
								<xsl:if test="not(contains( ./@URL ,'http'))">
									<xsl:element name="a">
										<xsl:attribute name="href">
											<xsl:value-of select="normalize-space(./..//@fullsize_base)" />
											<xsl:value-of select="normalize-space(./@URL)" />
										</xsl:attribute>
										<xsl:element name="img">
											<xsl:attribute name="src">
												<xsl:value-of select="normalize-space(./..//@thumbnail_base)" />
												<xsl:value-of select="normalize-space(./THUMB)" />
											</xsl:attribute>
										</xsl:element>										<!-- img tag -->
									</xsl:element>									<!--close "a" tag -->
								</xsl:if>
								<xsl:element name="p">
									<xsl:choose>
										<xsl:when test="normalize-space(./CAPTION) != ''">
											<xsl:value-of select="normalize-space(./CAPTION)" />
										</xsl:when>
										<xsl:otherwise>
											<xsl:value-of select="normalize-space(./@LOCATION)" />
										</xsl:otherwise>
									</xsl:choose>
									<!--
										and additionally,-->

									<!-- this spacing won't be wierd.  because of normalize-space(.) -->

								</xsl:element>
								<!--close caption tag -->
							</xsl:element>							<!-- h2 -->
						</xsl:for-each>
					</div>
				</div>

				<xsl:element name="div">
					<xsl:attribute name="id">
						<xsl:value-of select="normalize-space(./pages/page/calibration/@id)" />
					</xsl:attribute>
					<xsl:for-each select="./pages/page/calibration/div">
						<xsl:element name="div">
							<xsl:attribute name="class">
								<xsl:value-of select="normalize-space(@class)" />
							</xsl:attribute>
							<xsl:attribute name="style">
								<xsl:value-of select="normalize-space(@style)" />
							</xsl:attribute>
							<xsl:element name="p">
								<xsl:attribute name="class">
									<xsl:variable name="calibration_text">
										<xsl:text>
								 calibration_text 
										</xsl:text>
									</xsl:variable>
									<xsl:value-of select="normalize-space($calibration_text)"/>
								</xsl:attribute>
								<xsl:value-of select="normalize-space(./.)" />
							</xsl:element>
						</xsl:element>
					</xsl:for-each>
					<xsl:element name="p">
						<xsl:value-of select="normalize-space(./pages/page/calibration/footer_outro)" />
					</xsl:element>
				</xsl:element>
				<script>
					<!-- 
					function reportMe(e){
						alert("some message you got there.");
					}
					//window.addEventListener("load", reportMe);
					-->
				</script>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
