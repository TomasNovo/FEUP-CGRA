class MyTerrain extends CGFobject {
	constructor(scene, nDivs) {
		super(scene);
		this.nDivs = nDivs;
		this.initBuffers();
	};

	initBuffers() {
		this.terrain = new Plane(this.scene,this.nDivs);

		this.vertices = [];
		this.indices = [];

		//Terrain Appearance
        	this.terrainAppearance = new CGFappearance(this.scene);
		this.terrainAppearance.loadTexture("../resources/images/terrain.jpg");
		this.terrainAppearance.setAmbient(1.0,1.0,1.0,1);
		this.terrainAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.terrainAppearance.setSpecular(1.0,1.0,1.0,1);
		this.terrainAppearance.setShininess(120);

		this.initGLBuffers();
	};

	display() {
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(50,50,1);
		this.terrainAppearance.apply();
		this.terrain.display();
		this.scene.popMatrix();
	}
};
