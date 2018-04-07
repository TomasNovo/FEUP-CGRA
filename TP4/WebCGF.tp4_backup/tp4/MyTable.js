class MyTable extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.table = new MyUnitCubeQuad(this.scene);
		this.table.initBuffers();
	};

	display()
	{

		this.scene.pushMatrix();
		this.scene.scale(5,0.3,3);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2.2,-1.9,1.2);
		this.scene.scale(0.3,3.5,0.3);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2.2,-1.9,-1.2);
		this.scene.scale(0.3,3.5,0.3);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2.2,-1.9,1.2);
		this.scene.scale(0.3,3.5,0.3);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2.2,-1.9,-1.2);
		this.scene.scale(0.3,3.5,0.3);
		this.table.display();
		this.scene.popMatrix();

	}

}
