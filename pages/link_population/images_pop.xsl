<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<!-- 	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/> -->
	<xsl:output method="text"/>
	<xsl:strip-space elements="*,text(),@*"/>
<xsl:template match="/"></xsl:template>
	<!-- 
	<xsl:template match="/PICS">
		<xsl:element name="html">
		
			<xsl:element name="head">
				<xsl:element name="title">
					<xsl:variable name="title_text">
						<xsl:text>		  Here's a population scheme for my pictures.
						</xsl:text>
					</xsl:variable>
					<xsl:value-of select="normalize-space($title_text)"/>
				</xsl:element>

				<xsl:element name="link">
					<xsl:attribute name="rel">
						<xsl:variable name="css_rel">
							<xsl:text>								  stylesheet 
							</xsl:text>
						</xsl:variable>
						<xsl:value-of select="normalize-space($css_rel)"/>
					</xsl:attribute>

					<xsl:attribute name="href">
						<xsl:variable name="css_link">
							<xsl:text>								  honeymoon-styles.css
							</xsl:text>
						</xsl:variable>
						<xsl:value-of select="normalize-space($css_link)"/>
					</xsl:attribute>

					<xsl:attribute name="type">
						<xsl:variable name="css_type">
							<xsl:text>								  text/css
							</xsl:text>
						</xsl:variable>
						<xsl:value-of select="normalize-space($css_type)"/>
					</xsl:attribute>
				</xsl:element>

				<xsl:element name="meta">
					<xsl:attribute name="charset">
						<xsl:variable name="char_set">
							<xsl:text>								 UTF-8 
							</xsl:text>
						</xsl:variable>
						<xsl:value-of select="normalize-space($char_set)"/>
					</xsl:attribute>
				</xsl:element>

				<xsl:element name="meta">
					<xsl:attribute name="name">
						<xsl:variable name="viewport_name">
							<xsl:text>								viewport
							</xsl:text>
						</xsl:variable>
						<xsl:value-of select="normalize-space($viewport_name)"/>
					</xsl:attribute>

					<xsl:attribute name="content">
						<xsl:variable name="viewport_scale">
							<xsl:text> width=device-width, initial-scale=1
							</xsl:text>
						</xsl:variable>
						<xsl:value-of select="normalize-space($viewport_scale)"/>
					</xsl:attribute>
				</xsl:element> 
			</xsl:element>
			<xsl:element name="body">
				<xsl:element name="h1">						 inputting an ENTITY like this:  &amp;backslash&#59; (would show a \ if backslash is defined in the Doctype DTD)
				</xsl:element>

				<xsl:element name="div">
					<xsl:attribute name="id">
						<xsl:variable name="container_id">
							<xsl:text>
								  container 
							</xsl:text>
						</xsl:variable>
						<xsl:value-of select="normalize-space($container_id)"/>
					</xsl:attribute>

					<xsl:element name="div">
						<xsl:attribute name="id">
							<xsl:variable name="main_id">
								<xsl:text>
								  main 
								</xsl:text>
							</xsl:variable>
							<xsl:value-of select="normalize-space($main_id)"/>
						</xsl:attribute>

						<xsl:for-each select="PIC">
							<xsl:element name="div">
								<xsl:attribute name="class">
									<xsl:variable name="class">
										<xsl:text>
								 slide_container 
										</xsl:text>
									</xsl:variable>
									<xsl:value-of select="normalize-space($class)"/>
								</xsl:attribute>
								<xsl:if test="contains( ./@URL ,'http')">
									<xsl:element name="a">
										<xsl:attribute name="href">
											<xsl:value-of select="normalize-space(./@URL)" />
										</xsl:attribute>
										<xsl:element name="img">
											<xsl:attribute name="src">
												<xsl:value-of select="normalize-space(./@URL)" />
											</xsl:attribute>
										</xsl:element>
									</xsl:element>
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
										</xsl:element>
									</xsl:element>
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
								</xsl:element>
							</xsl:element>
						</xsl:for-each>
					</xsl:element>
				</xsl:element>

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
				<xsl:element name="script">
					/*
					function reportMe(e){
						alert("some message you got there.");
					}
					//window.addEventListener("load", reportMe);
					*/
				</xsl:element> 
			</xsl:element>
		</xsl:element>
	</xsl:template>-->
</xsl:stylesheet>
