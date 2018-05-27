class MyTerrain extends Plane {
	constructor(scene, nDivs, altimetry) {
		super(scene, nDivs, true);
		this.altimetry = altimetry;
		this.initBuffers();
	};

	//Overriding initBuffers() from Plane to add support for altimetry
	initBuffers()
	{
		/* example for nrDivs = 3 :
		(numbers represent index of point in vertices array)
				y
				^
				|
		0    1  |  2    3
				|
		4	 5	|  6    7
		--------|--------------> x
		8    9  |  10  11
				|
		12  13  |  14  15    
		*/
		
		//Terrain Appearance 1
        	this.terrainAppearance = new CGFappearance(this.scene);
		this.terrainAppearance.loadTexture("../resources/images/terrain.jpg");
		this.terrainAppearance.setAmbient(1.0,1.0,1.0,1);
		this.terrainAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.terrainAppearance.setSpecular(1.0,1.0,1.0,1);
		this.terrainAppearance.setShininess(120);
		
		//Terrain Appearance 2
        	this.terrainAppearance2 = new CGFappearance(this.scene);
		this.terrainAppearance2.loadTexture("../resources/images/grass.jpg");
		this.terrainAppearance2.setAmbient(1.0,1.0,1.0,1);
		this.terrainAppearance2.setDiffuse(1.0,1.0,1.0,1);
		this.terrainAppearance2.setSpecular(1.0,1.0,1.0,1);
		this.terrainAppearance2.setShininess(120);
		
		//Terrain Appearance 3
        	this.terrainAppearance3 = new CGFappearance(this.scene);
		this.terrainAppearance3.loadTexture("../resources/images/money.jpg");
		this.terrainAppearance3.setAmbient(1.0,1.0,1.0,1);
		this.terrainAppearance3.setDiffuse(1.0,1.0,1.0,1);
		this.terrainAppearance3.setSpecular(1.0,1.0,1.0,1);
		this.terrainAppearance3.setShininess(120);


		// Generate vertices and normals 
		this.vertices = [];
		this.normals = [];
		
		// Uncomment below to init texCoords
		this.texCoords = [];
		var yCoord = 0.5;

		this.stepS = (this.maxS-this.minS)/this.nrDivs;
		this.stepT = (this.maxT-this.minT)/this.nrDivs;

		for (var j = 0; j <= this.nrDivs; j++) 
		{
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.vertices.push(xCoord, yCoord, this.altimetry[j][i]);
				
				// As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
				// So all the vertices will have the same normal, (0, 0, 1).
				
				this.normals.push(0,0,1);

				// texCoords should be computed here; uncomment and fill the blanks
				this.texCoords.push(i*this.stepS, j*this.stepT);

				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
		
		// Generating indices
		/* for nrDivs = 3 output will be 
			[
				 0,  4, 1,  5,  2,  6,  3,  7, 
					7,  4,
				 4,  8, 5,  9,  6, 10,  7, 11,
				   11,  8,
				 8, 12, 9, 13, 10, 14, 11, 15,
			]
		Interpreting this index list as a TRIANGLE_STRIP will draw rows of the plane (with degenerate triangles in between. */

		this.indices = [];
		var ind=0;


		for (var j = 0; j < this.nrDivs; j++) 
		{
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.indices.push(ind);
				this.indices.push(ind+this.nrDivs+1);

				ind++;
			}
			if (j+1 < this.nrDivs)
			{
				// Extra vertices to create degenerate triangles so that the strip can wrap on the next row
				// degenerate triangles will not generate fragments
				this.indices.push(ind+this.nrDivs);
				this.indices.push(ind);
			}
		}
		
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;

	/* Alternative with TRIANGLES instead of TRIANGLE_STRIP. More indices, but no degenerate triangles */
	/*
		for (var j = 0; j < this.nrDivs; j++) 
		{
			for (var i = 0; i < this.nrDivs; i++) 
			{
				this.indices.push(ind, ind+this.nrDivs+1, ind+1);
				this.indices.push(ind+1, ind+this.nrDivs+1, ind+this.nrDivs+2 );
				ind++;
			}
			ind++;
		}
		this.primitiveType = this.scene.gl.TRIANGLES;
	*/

		this.initGLBuffers();
	};
};
