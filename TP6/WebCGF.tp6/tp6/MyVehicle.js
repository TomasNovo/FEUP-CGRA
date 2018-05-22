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
		
		//car appearance
		this.carAppearance = new CGFappearance(this.scene);
		this.carAppearance.loadTexture("../resources/images/red.png");
		this.carAppearance.setAmbient(1.0,1.0,1.0,1);
		this.carAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.carAppearance.setSpecular(1.0,1.0,1.0,1);
		this.carAppearance.setShininess(120);

		//glass appearance
		this.glassAppearance = new CGFappearance(this.scene);
		this.glassAppearance.loadTexture("../resources/images/glass.jpg");
		this.glassAppearance.setAmbient(1.0,1.0,1.0,1);
		this.glassAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.glassAppearance.setSpecular(1.0,1.0,1.0,1);
		this.glassAppearance.setShininess(120);

		this.position = [0,0,0];

		this.wheel = new Wheel(this.scene);
		
		this.sphere = new Sphere(this.scene, 20,30);

		this.trapeze = new MyTrapeze(this.scene, 0 , 2 , 0.5 , 1.5, 1,1);

		this.cylinder = new MyCylinder(this.scene,12,12);

		this.quad = new MyQuad(this.scene);
		this.vertices = [];

		this.indices = [];

		this.wheelPosition = 0; //variation from -90 (left) to 90 (right)
		this.velocity = 0; //Vehicle velocity from -50 (back) to 50(front)
		this.wheelRotation = 0; //Wheel Rotation from -2*pi to 2*pi
		this.rotY = 0; //Car rotation in axi Y
		this.rotationSpeed = 0;
		this.frontRotation = 0;

		/*this.posX = 0;
		this.posZ = 0;
		this.rotY = 0;
		this.wheelRotation = 0;
		this.velocity = 0;
		*/	
		

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();

	};


	turnWheels(direction) {
		var maxAngle = 15; //Max inclination angle
		var turnAngle = 0.5; //Turn Angle in each interation
		var stabilizeAngle = 0.5; //Angle to stabilize wheels
/*
		console.log("Angle: " + this.wheelPosition);
		if(direction=="l" && this.wheelPosition<maxAngle ) //Left
			this.wheelPosition += turnAngle;
		else if(direction=="r" && this.wheelPosition>(-maxAngle))//Right
			this.wheelPosition -= turnAngle;
		else if(direction=="s" && this.wheelPosition<=(maxAngle) && this.wheelPosition>0) //Stabilize from Right
			this.wheelPosition -= stabilizeAngle;
		else if(direction=="s" && this.wheelPosition>=(-maxAngle) && this.wheelPosition<0) //Stabilize from Left
			this.wheelPosition += stabilizeAngle;
			*/

		if(direction == "l")
			this.rotationSpeed = Math.PI/50;
		else if(direction == "r")
			this.rotationSpeed = -Math.PI/50;
		else
			this.rotationSpeed = 0;
				
	}

	moveWheels(direction) {
		var maxVelocity = 4; //Max value to velocity
		var maxRotation = 360; 
		var rotation = 2*this.velocity; //Max rotation to each interation
		var acceleration = 1; //Value to acceleration (increase velocity)

		if(direction=="f" && this.velocity<maxVelocity) //Increase Velocity
				this.velocity += acceleration;

		else if(direction=="b" && this.velocity>(-maxVelocity)) //Decrease Velocity
			this.velocity -= acceleration;


		//this.wheelRotation += rotation;

		//if(this.wheelRotation>(maxRotation))
			//this.wheelRotation = 0;
		//else if(this.wheelRotation<(-maxRotation))
			//this.wheelRotation = 0;


		//console.log("Rotação : "+this.wheelRotation);
		console.log("Velocidade : "+this.velocity); 

		//if (direction == "f")
			//this.velocity = 0.2;
		//else if (direction == "b")
			//this.velocity = -0.2;
		//else
			//this.velocity = 0;

	}

	move(deltaTime) { 
		//this.moveWheels(); //Move Wheels activated
		
		this.rotY += this.rotationSpeed;

		this.position[0] += (deltaTime/1000)*this.velocity*Math.sin(this.rotY);
		this.position[2] += (deltaTime/1000)*this.velocity*Math.cos(this.rotY);

		this.frontRotation += this.velocity/2;
	}


	display()
	{
		//Moving Car
		
		var coco = this.frontRotation;
		//console.log(coco);
		
		this.scene.translate(this.position[0], this.position[1], this.position[2]);

		this.scene.translate(+1.25,0,0);
		this.scene.rotate(this.rotY,0,1,0);
		this.scene.translate(-1.25,0,0);
		
		this.scene.rotate(Math.PI/2, 0, 1, 0);

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
		this.scene.rotate(degToRad*this.wheelPosition,0,1,0); //Turn Left/Right
		this.scene.rotate(degToRad*this.wheelRotation, 0,0,1); //Rotate
		this.wheel.display(); //roda1
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);

		this.scene.translate(2.5,0,2.5);
		this.scene.rotate(degToRad*this.wheelRotation, 0,0,1); //Rotate
		this.wheel.display(); //roda 2
		this.scene.popMatrix();
			
		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(-2.5,0,-3.5);
		this.scene.rotate(degToRad*this.wheelPosition,0,1,0); //Turn Left/Right
		this.scene.rotate(degToRad*this.wheelRotation, 0,0,1); //Rotate
		this.scene.rotate(this.frontRotation, 0, 0, 1);
		this.wheel.display(); // roda 3 
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(2.5,0,-3.5);
		this.scene.rotate(degToRad*this.wheelRotation, 0,0,1); //Rotate
		this.wheel.display();  // roda4
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(2.5,0.7,1);
		this.scene.translate(0,0.5,2.25);
		this.carAppearance.apply();
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
		this.scene.translate(-0.74,0.7,0);
		this.glassAppearance.apply();
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
