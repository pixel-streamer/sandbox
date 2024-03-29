<?xml version="1.0" ?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:myNS="http://devedge.netscape.com/2002/en">
	<!-- with help from this page, the myNS namespace did the trick for FF:
	https://developer.mozilla.org/en-US/docs/Web/API/XSLTProcessor/Generating_HTML
	 -->
	<xsl:output method="html"/>
	<!-- <xsl:output method="html" indent="yes" encoding="UTF-8" /> -->
	<xsl:strip-space elements="*"/>
	<xsl:template match="/pics">
		<xsl:element name="html">

			<xsl:element name="head">
				<xsl:element name="title">
					<xsl:variable name="title_text">
						<xsl:text>		 Greecian Honeymoon, April 18th thru April 30th, 2005 
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
						<xsl:variable name="keywords">
							<xsl:text>								keywords 
							</xsl:text>
						</xsl:variable>
						<xsl:value-of select="normalize-space($keywords)"/>
					</xsl:attribute>
					<xsl:attribute name="content">
						<xsl:variable name="keywords_content">
							<xsl:text>								children's books, children's book illustrators, illustrator, artwork, logos, animation, Corel Painter IX, designs, Lightwave, Computer Generated Artwork, two-dimensional art, 2d Artwork, CG art, art ideas, cartoons, realism, humor, computer graphics, graphics, custom graphics 
							</xsl:text>
						</xsl:variable>
						<xsl:value-of select="normalize-space($keywords_content)"/>
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
				<xsl:comment >
					<xsl:element name="h1">						 inputting an ENTITY like this:  &amp;backslash&#59; (would show a \ if backslash is defined in the Doctype DTD)
					</xsl:element>
				</xsl:comment>
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


						<xsl:for-each select="pic">
							<!-- sort all the pictures before display -->
							<xsl:sort select="normalize-space(@location)" />
							<xsl:element name="div">
								<xsl:attribute name="class">
									<xsl:variable name="class">
										<xsl:text>
								 slide_container 
										</xsl:text>
									</xsl:variable>
									<xsl:value-of select="normalize-space($class)"/>
								</xsl:attribute>
								<xsl:if test="contains( ./@url ,'http')">
									<xsl:element name="a">
										<xsl:attribute name="class">
											<xsl:variable name="thumbclass2">
												<xsl:text>
													 thumb_link
												</xsl:text>
											</xsl:variable>
											<xsl:value-of select="normalize-space($thumbclass2)"/>
										</xsl:attribute>
										<xsl:attribute name="href">
											<xsl:variable name="ref2">
												<xsl:text>
														#
												</xsl:text>
											</xsl:variable>
											<xsl:value-of select="normalize-space($ref2)"/>
										</xsl:attribute>
										<xsl:attribute name="link">
											<xsl:value-of select="normalize-space(./@url)" />
										</xsl:attribute>

										<xsl:element name="img">
											<xsl:attribute name="src">
												<xsl:value-of select="normalize-space(./@url)" />
											</xsl:attribute>
										</xsl:element>
									</xsl:element>
								</xsl:if>
								<xsl:if test="not(contains( ./@url ,'http'))">
									<xsl:element name="a">
										<xsl:attribute name="class">
											<xsl:variable name="thumbclass">
												<xsl:text>
													 thumb_link
												</xsl:text>
											</xsl:variable>
											<xsl:value-of select="normalize-space($thumbclass)"/>
										</xsl:attribute>
										<xsl:attribute name="href">
											<xsl:variable name="ref">
												<xsl:text>
														#
												</xsl:text>
											</xsl:variable>
											<xsl:value-of select="normalize-space($ref)"/>
										</xsl:attribute>
										<xsl:attribute name="link">
											<xsl:value-of select="normalize-space(./..//@fullsize_base)" />
											<xsl:value-of select="normalize-space(./@url)" />
										</xsl:attribute>

										<xsl:element name="img">
											<xsl:attribute name="src">
												<xsl:value-of select="normalize-space(./..//@thumbnail_base)" />
												<xsl:value-of select="normalize-space(./thumb)" />
											</xsl:attribute>

											<xsl:attribute name="target">
												<xsl:variable name="target_new_tab">
													<xsl:text>
								 _blank 
													</xsl:text>
												</xsl:variable>
												<xsl:value-of select="normalize-space($target_new_tab)"/>
											</xsl:attribute>

										</xsl:element>
									</xsl:element>
								</xsl:if>

								<xsl:choose>
									<xsl:when test="normalize-space(./caption) != ''">
										<xsl:element name="p">
											<xsl:attribute name="class">
												<xsl:variable name="caption_class">
													<xsl:text>
														short_caption 
													</xsl:text>
												</xsl:variable>
												<xsl:value-of select="normalize-space($caption_class)"/>
											</xsl:attribute>
											<xsl:value-of select="normalize-space(./caption)" />
										</xsl:element>
									</xsl:when>
									<xsl:otherwise>
										<xsl:element name="p">
											<xsl:attribute name="class">
												<xsl:variable name="caption_class2">
													<xsl:text>
														short_caption 
													</xsl:text>
												</xsl:variable>
												<xsl:value-of select="normalize-space($caption_class2)"/>
											</xsl:attribute>
											<xsl:variable name="vacation_location">
												<xsl:value-of select="./@location" />
											</xsl:variable>
											<xsl:value-of select="normalize-space($vacation_location)"/>
										</xsl:element>
									</xsl:otherwise>
								</xsl:choose>

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
					<xsl:attribute name="src">
						<xsl:variable name="img_popjs">
							<xsl:text>
								image_pop.js
							</xsl:text>
						</xsl:variable>
						<xsl:value-of select="normalize-space($img_popjs)"/>
					</xsl:attribute>
				</xsl:element>
			</xsl:element>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>
