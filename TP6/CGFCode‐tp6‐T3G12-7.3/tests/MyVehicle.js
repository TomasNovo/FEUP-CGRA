/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var degToRad = Math.PI / 180.0;
class MyVehicle extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.scene = scene;
		this.initBuffers();
	};

	initBuffers() 
	{
		
		this.position = [0,0,0];

		this.wheel = new Wheel(this.scene);
		
		this.sphere = new Sphere(this.scene, 20,30);

		this.trapeze = new MyTrapeze(this.scene, 0 , 2 , 0.5 , 1.5, 1);

		this.cylinder = new MyCylinder(this.scene,12,12);

		this.quad = new MyQuad(this.scene);
		this.vertices = [];

		this.indices = [];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};


	display()
	{
		//chassis
		this.scene.pushMatrix(); //comprimento 4.5  largura 2.5
		this.scene.rotate( -Math.PI/2, 1,0,0);
		this.scene.scale(4.5,2.5,1);
		//this.scene.translate(0,0,2);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(-2.5,0,2.5);
		this.wheel.display(); //roda1
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(2.5,0,2.5);
		this.wheel.display(); //roda 2
		this.scene.popMatrix();
			
		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(-2.5,0,-3.5);
		this.wheel.display(); // roda 3 
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(2.5,0,-3.5);
		this.wheel.display();  // roda4
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(2.5,0.7,1);
		this.scene.translate(0,0.5,2.25);
		this.quad.display();  // para choques
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(3*Math.PI/2,0,1,0);
		this.scene.scale(2.5,0.7,1);
		this.scene.translate(0,0.5,2.25);
		this.quad.display();  // traseira
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(4.5,0.7,1);
		this.scene.translate(0,0.5,1.25);
		this.quad.display();  // lateral 1
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(4.5,0.7,1);
		this.scene.translate(0,0.5,1.25);
		this.quad.display();  // lateral 1
		this.scene.popMatrix();

		this.scene.pushMatrix(); //comprimento 4.5  largura 2.5
		this.scene.rotate( -Math.PI/2, 1,0,0);
		this.scene.scale(4.5,2.5,1);
		this.scene.translate(0,0,0.7);
		this.quad.display();
		this.scene.popMatrix();
		
		
		this.scene.pushMatrix();
		//this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(1.8,1,2.5);
		this.scene.translate(-0.74,0.7,-0.5);
		this.trapeze.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/3,1/3,1/3);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.translate(1.05,6.67,2);
		this.sphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/3,1/3,1/3);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.translate(1.05,6.67,-2);
		this.sphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(1/8,1/8,1/3);
		this.scene.translate(5,1.1,6.7);
		this.cylinder.display();
		this.scene.popMatrix();


	}
};
