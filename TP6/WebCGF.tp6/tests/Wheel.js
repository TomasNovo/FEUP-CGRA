class Wheel extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		
		this.cylinder = new MyCylinder(this.scene, 12, 1);
		this.circle = new MyCircle(this.scene, 50,1);

		this.vertices = [];
		this.indices = [];
		
		//Tires appearance
		this.tireAppearance = new CGFappearance(this.scene);
		this.tireAppearance.loadTexture("../resources/images/tire.png");
		this.tireAppearance.setAmbient(1.0,1.0,1.0,1);
		this.tireAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.tireAppearance.setSpecular(1.0,1.0,1.0,1);
		this.tireAppearance.setShininess(120);

		//Side Tire Appearance
		this.sideTireAppearance = new CGFappearance(this.scene);
		this.sideTireAppearance.loadTexture("../resources/images/sideTire.png");
		this.sideTireAppearance.setAmbient(1.0,1.0,1.0,1);
		this.sideTireAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.sideTireAppearance.setSpecular(1.0,1.0,1.0,1);
		this.sideTireAppearance.setShininess(120);

		this.initGLBuffers();
	}

	display() {
		this.scene.pushMatrix();
		this.tireAppearance.apply();
		this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.sideTireAppearance.apply();
		this.scene.rotate(Math.PI, 0,1,0);
		this.circle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.sideTireAppearance.apply();
		this.scene.translate(0,0,1);
		this.circle.display();
		this.scene.popMatrix();
	}
}
