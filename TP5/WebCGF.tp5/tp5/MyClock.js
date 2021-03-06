class MyClock extends CGFobject
{
	
	constructor(scene, )
     {
       super(scene);

       this.angle = 0;


		this.hpointer = new MyClockHand(this.scene);

		this.mpointer = new MyClockHand(this.scene);

		this.spointer = new MyClockHand(this.scene);

		this.today = new Date();
        	this.currTime = this.today.getTime()/1000;
		console.log("TESTE2 : " + this.currTime);	
	     	console.log("HOURS: " + this.today.getHours());
		this.hpointer.setAngle(-this.currTime  *(6/60/60) - 2160*60*(6/60/60) );
		this.mpointer.setAngle(-this.currTime*(6/60));
		this.spointer.setAngle(-this.currTime*6);
		

		this.initBuffers();
		this.display();
     }

	initBuffers()  
	{
        
		this.cylinder = new MyCylinder(this.scene, 12, 1);
		this.circle = new MyCircle(this.scene, 12);
		//this.clock = new MyCylinderWTop(this.scene, 12, 1);
		this.vertices =[];
		this.indices = [];
		
		this.contTime = 0;

		//clockAppearance
        	this.clockAppearance = new CGFappearance(this.scene);
		this.clockAppearance.loadTexture("../resources/images/clock.png");
		this.clockAppearance.setAmbient(1.0,1.0,1.0,1);
		this.clockAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.clockAppearance.setSpecular(1.0,1.0,1.0,1);
		this.clockAppearance.setShininess(120);

		this.initGLBuffers();
	};

	
	update(deltaTime)
	{
      		console.log("AAAAAAAA "+this.hpointer.angle);
		this.time = deltaTime/1000;
			this.hpointer.setAngle(this.hpointer.angle-(6/60/60)*this.time);
			this.mpointer.setAngle(this.mpointer.angle-(6/60)*this.time);
			this.spointer.setAngle(this.spointer.angle-6*this.time);
		
	};



	display()
	{

		this.scene.pushMatrix();
		this.scene.scale(1,1,0.5);
		this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.clockAppearance.apply();
		this.circle.display();
		this.scene.popMatrix();
		
		

        	this.scene.pushMatrix();
		this.scene.rotate(this.hpointer.angle * degToRad+90*degToRad, 0,0,1);
		this.scene.translate(0.3,0,0.5);
		this.scene.scale(1/3,1/20,1/20);
		this.hpointer.display();;
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(this.mpointer.angle * degToRad+90*degToRad, 0,0,1);
		this.scene.translate(0.4,0,0.5);
		this.scene.scale(0.4,1/20,1/15);
		this.mpointer.display();;
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(this.spointer.angle * degToRad+90*degToRad, 0,0,1);
		this.scene.translate(0.45,0,0.5);
		this.scene.scale(0.45,1/20,1/20);
		this.spointer.display();;
		this.scene.popMatrix();

	}

};
