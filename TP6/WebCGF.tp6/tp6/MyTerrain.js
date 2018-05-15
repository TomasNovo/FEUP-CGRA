class MyTerrain extends Plane {
	constructor(scene, nDivs) {
		super(scene, nDivs);

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
