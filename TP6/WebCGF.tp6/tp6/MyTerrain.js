class MyTerrain extends Plane {
	constructor(scene, nDivs, altimetry) {
		super(scene, nDivs, altimetry);

		//Terrain Appearance
        	this.terrainAppearance = new CGFappearance(scene);
		this.terrainAppearance.loadTexture("../resources/images/terrain.jpg");
		this.terrainAppearance.setAmbient(1.0,1.0,1.0,1);
		this.terrainAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.terrainAppearance.setSpecular(1.0,1.0,1.0,1);
		this.terrainAppearance.setShininess(120);

		this.initBuffers();
	};
};
