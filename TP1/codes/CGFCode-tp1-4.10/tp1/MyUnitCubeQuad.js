/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.quad= new MyQuad(this.scene);
		this.quad.initBuffers();
	};


	display()
	{
		this.scene.translate(0,0,0.5);
		this.quad.display();

		this.scene.pushMatrix();
		this.scene.translate(0,0,-1);
		this.scene.rotate(-3.1415926536,1,0,0);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0.5,-0.5);
		this.scene.rotate(-1.5707963268,1,0,0);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,-0.5,-0.5);
		this.scene.rotate(1.5707963268,1,0,0);
		this.quad.display();
		this.scene.popMatrix();
	
		this.scene.pushMatrix();
		this.scene.translate(0.5,0,-0.5);
		this.scene.rotate(1.5707963268,0,1,0);
		this.quad.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,-0.5);
		this.scene.rotate(-1.5707963268,0,1,0);
		this.quad.display();
		this.scene.popMatrix();

	}
};
