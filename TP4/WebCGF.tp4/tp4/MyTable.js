class MyTable extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.table = new MyUnitCubeQuad(this.scene);
		this.table.initBuffers();

		
		this.scene.tableAppearance = new CGFappearance(this.scene);
                this.scene.tableAppearance.setAmbient(0.3,0.3,0.3,1);
                this.scene.tableAppearance.setDiffuse(0.9,0.9,0.9,1);
                this.scene.tableAppearance.setSpecular(0.2,0.2,0.2,0.5);
                this.scene.tableAppearance.setShininess(10);
                this.scene.tableAppearance.loadTexture("../resources/images/table.png");

		this.scene.tablelegs = new CGFappearance(this.scene);
		this.scene.tablelegs.setAmbient(0.3,0.3,0.3,1);
		this.scene.tablelegs.setDiffuse(0.4,0.4,0.4,1);
		this.scene.tablelegs.setSpecular(0.8,0.8,0.8,1);
		this.scene.tablelegs.setShininess(120);
	};

	display()
	{


		this.scene.pushMatrix();
		this.scene.scale(5,0.3,3);
		this.scene.tableAppearance.apply();
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2.2,-1.9,1.2);
		this.scene.scale(0.3,3.5,0.3);
		this.scene.tablelegs.apply();
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2.2,-1.9,-1.2);
		this.scene.scale(0.3,3.5,0.3);
		this.scene.tablelegs.apply();
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2.2,-1.9,1.2);
		this.scene.scale(0.3,3.5,0.3);
		this.scene.tablelegs.apply();
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2.2,-1.9,-1.2);
		this.scene.scale(0.3,3.5,0.3);
		this.scene.tablelegs.apply();
		this.table.display();
		this.scene.popMatrix();

	}

}
