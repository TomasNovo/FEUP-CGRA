/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var degToRad = Math.PI / 180.0;
class MyVehicle extends CGFobject
{
	constructor(scene, currAppearance) 
	{
		super(scene);
		this.scene = scene;
		this.currAppearance = currAppearance;
		this.initBuffers();
	};

	initBuffers() 
	{
		//plate
		this.plateAppearance = new CGFappearance(this.scene);
		this.plateAppearance.loadTexture("../resources/images/matriculaa.png");
		this.plateAppearance.setAmbient(1.0,1.0,1.0,1);
		this.plateAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.plateAppearance.setSpecular(1.0,1.0,1.0,1);
		this.plateAppearance.setShininess(120);


		//glass appearance
		this.glassAppearance = new CGFappearance(this.scene);
		this.glassAppearance.loadTexture("../resources/images/glass.jpg");
		this.glassAppearance.setAmbient(1.0,1.0,1.0,1);
		this.glassAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.glassAppearance.setSpecular(1.0,1.0,1.0,1);
		this.glassAppearance.setShininess(120);

		//Glass for back appearance	
		this.glassBackAppearance= new CGFappearance(this.scene);
		this.glassBackAppearance.loadTexture("../resources/images/glass_back.jpg");
		this.glassBackAppearance.setAmbient(1.0,1.0,1.0,1);
		this.glassBackAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.glassBackAppearance.setSpecular(1.0,1.0,1.0,1);
		this.glassBackAppearance.setShininess(120);


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
		

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();

	};


	turnWheels(direction) {
		var maxAngle = 15; //Max inclination angle
		var turnAngle = 3; //Turn Angle in each interation
		var stabilizeAngle = 3; //Angle to stabilize wheels

		//console.log("Angle: " + this.wheelPosition);
		
		//Turning Wheels in accord with the direction specified or stabilizing them
		if(direction=="l" && this.wheelPosition<maxAngle ) //Left
			this.wheelPosition += turnAngle;
		else if(direction=="r" && this.wheelPosition>(-maxAngle))//Right
			this.wheelPosition -= turnAngle;
		else if(direction=="s" && this.wheelPosition<=(maxAngle) && this.wheelPosition>0) //Stabilize from Right
			this.wheelPosition -= stabilizeAngle;
		else if(direction=="s" && this.wheelPosition>=(-maxAngle) && this.wheelPosition<0) //Stabilize from Left
			this.wheelPosition += stabilizeAngle;

		//Defining rotation speed
		if(direction == "l" && this.velocity!=0)
			this.rotationSpeed = Math.PI/50;
		else if(direction == "r" && this.velocity!=0)
			this.rotationSpeed = -Math.PI/50;
		else
			this.rotationSpeed = 0;
				
	}

	moveWheels(direction,deltaTime) {
		var maxVelocity = 6; //Max value to velocity
		var maxRotation = 360; 
		var rotation = 180*this.velocity*(deltaTime/1000.0); //Max rotation to each interation
		var acceleration = 1; //Value to acceleration (increase velocity)

		if(direction=="f" && this.velocity<maxVelocity) //Increase Velocity
			this.velocity += acceleration;

		else if(direction=="b" && this.velocity>(-maxVelocity)) //Decrease Velocity
			this.velocity -= acceleration;


		this.wheelRotation += rotation;

		//When maxRotation is reached, restart process
		if(this.wheelRotation>(maxRotation))
			this.wheelRotation = 0;
		else if(this.wheelRotation<(-maxRotation))
			this.wheelRotation = 0;


		//console.log("Rotação : "+this.wheelRotation);
		//console.log("Velocidade : "+this.velocity);

	}

	move(deltaTime) { //Moving Car 
		this.moveWheels("",deltaTime); //Move Wheels activated
		
		this.rotY += this.rotationSpeed;

		this.position[0] += (deltaTime/1000)*this.velocity*Math.sin(this.rotY);
		this.position[2] += (deltaTime/1000)*this.velocity*Math.cos(this.rotY);
		//console.log("X carro : " + this.position[0]);
		
		//console.log("Z carro : " + this.position[2]);
	}

	changeAppearance(appearance) { //Function to update car appearance
		this.currAppearance = appearance;	
	}

	display()
	{
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
	
		//Wheel 1
		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(-2.5,0,2.5);
		this.scene.rotate(degToRad*this.wheelPosition,0,1,0); //Turn Left/Right
		this.scene.rotate(degToRad*this.wheelRotation, 0,0,1); //Rotate
		this.wheel.display(); //roda1
		this.scene.popMatrix();

		//Wheel 2
		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);

		this.scene.translate(2.5,0,2.5);
		this.scene.rotate(degToRad*this.wheelRotation, 0,0,1); //Rotate
		this.wheel.display(); //roda 2
		this.scene.popMatrix();
			
		//Wheel 3
		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(-2.5,0,-3.5);
		this.scene.rotate(degToRad*this.wheelPosition,0,1,0); //Turn Left/Right
		this.scene.rotate(degToRad*this.wheelRotation, 0,0,1); //Rotate
		//this.scene.rotate(this.frontRotation, 0, 0, 1);
		this.wheel.display(); // roda 3 
		this.scene.popMatrix();

		//Wheel 4
		this.scene.pushMatrix();
		this.scene.scale(1/2,1/2,1/2);
		this.scene.translate(2.5,0,-3.5);
		this.scene.rotate(degToRad*this.wheelRotation, 0,0,1); //Rotate
		this.wheel.display();  // roda4
		this.scene.popMatrix();

		//traseira
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(2.5,0.7,1);
		this.scene.translate(0,0.5,2.25);
		this.currAppearance.apply();
		this.quad.display();  // traseira
		this.scene.popMatrix();

		//matricula 
		this.scene.pushMatrix();
		this.scene.translate(2.27,0.3,0.5);
		this.scene.scale(1/2,1/2,1);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.plateAppearance.apply();
		this.quad.display();  // traseira
		this.scene.popMatrix();


		//para-choques
		this.scene.pushMatrix();
		this.scene.rotate(3*Math.PI/2,0,1,0);
		this.scene.scale(2.5,0.7,1);
		this.scene.translate(0,0.5,2.25);
		this.currAppearance.apply();
		this.quad.display();  // para-choques
		this.scene.popMatrix();
		
		//lateral 1
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(4.5,0.7,1);
		this.scene.translate(0,0.5,1.25);
		this.quad.display();  // lateral 1
		this.scene.popMatrix();

		//lateral 2
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
		
		//espelho retrovisor 1
		this.scene.pushMatrix();
		this.scene.translate(-0.7,0.9,1.25);
		this.scene.scale(1/8,1/8,0.5);
		this.cylinder.display(); //espelho1
		this.scene.popMatrix();


		//espelho retrovisor 2
		this.scene.pushMatrix();
		this.scene.translate(-0.7,0.9,-1.25);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(1/8,1/8,0.5);
		this.cylinder.display(); //espelho2
		this.scene.popMatrix();
		
		//base
		this.scene.pushMatrix();
		//this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(1.8,1,2.5);
		this.scene.translate(-0.74,0.7,0);
		this.currAppearance.apply();
		//this.glassAppearance.apply();
		this.trapeze.display();
		this.scene.popMatrix();

		//farol 1
		this.scene.pushMatrix();
		this.scene.scale(1/3,1/3,1/3);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.translate(1.05,6.67,2);
		this.glassAppearance.apply();
		this.sphere.display(); //farol
		this.scene.popMatrix();

		//farol 2
		this.scene.pushMatrix();
		this.scene.scale(1/3,1/3,1/3);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.translate(1.05,6.67,-2);
		this.glassAppearance.apply();
		this.sphere.display(); //farol
		this.scene.popMatrix();

		//descarga
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(1/8,1/8,1/3);
		this.scene.translate(5,1.1,6.7);
		this.cylinder.display(); //descarga
		this.scene.popMatrix();

		//back glass
		this.scene.pushMatrix();
		this.scene.translate(2.17,0.9,1.2);
		this.scene.rotate(Math.PI/4,0,0,1);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(1.2,1,0);
		//this.scene.translate(-5,0,34);
		this.glassBackAppearance.apply();
		this.trapeze.display();
		this.scene.popMatrix();

		//Right glass
		this.scene.pushMatrix();
		this.scene.translate(-0.7,0.8,-1.3);
		this.scene.scale(1.2,0.8,0.01);
		this.trapeze.display();
		this.scene.popMatrix();

		//Left glass
		this.scene.pushMatrix();
		this.scene.translate(-0.7,0.8,1.3);
		this.scene.scale(1.2,0.8,0.01);
		this.trapeze.display();
		this.scene.popMatrix();

		//Front glass
		this.scene.pushMatrix();
		this.scene.translate(-1.32,0.8,0);
		this.scene.rotate(-Math.PI/4,0,0,1);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(2.5,2.5,1);
		//this.scene.translate(-5,0,34);
		this.glassBackAppearance.apply();
		this.quad.display();
		this.scene.popMatrix();

	}
};
