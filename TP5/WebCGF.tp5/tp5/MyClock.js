class MyClock extends CGFobject
{
	
	constructor(scene)
     {
       super(scene);

       this.angle = 0;


		this.hpointer = new MyClockHand(this.scene);

		this.mpointer = new MyClockHand(this.scene);

		this.spointer = new MyClockHand(this.scene);


       this.hpointer.setAngle(0);
       this.mpointer.setAngle(270);
       this.spointer.setAngle(180);


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

		this.initGLBuffers();
	};

	
	update()
	{
      
		
	};



	display()
	{

		this.scene.pushMatrix();
		this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,1);
		this.circle.display();
		this.scene.popMatrix();
		
		

        	this.scene.pushMatrix();
		this.scene.rotate(this.hpointer.angle * degToRad, 0,0,1);
		this.scene.translate(0.3,0,1);
		this.scene.scale(1/3,1/20,1/20);
		this.hpointer.display();;
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(this.mpointer.angle * degToRad, 0,0,1);
		this.scene.translate(0.4,0,1);
		this.scene.scale(0.4,1/20,1/15);
		this.mpointer.display();;
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(this.spointer.angle * degToRad, 0,0,1);
		this.scene.translate(0.45,0,1);
		this.scene.scale(0.45,1/20,1/20);
		this.spointer.display();;
		this.scene.popMatrix();

	}

};
