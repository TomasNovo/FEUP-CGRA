class MyCrane extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.scene = scene;
		this.initBuffers();
	};

	initBuffers() 
	{
	    this.cylinder = new MyCylinder(this.scene,12,12);
	    this.circle = new MyCircle(this.scene,12,12);
		this.angle = Math.PI/6;;

		this.arm = new MyArm(this.scene,12,12);
	};


	updateCrane()
	{
		this.angle += Math.PI/100 ;
	}

	display()
	{

        //this.scene.rotate(this.angle,0,1,0);

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.translate(0,0,1);
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/6,0,1,0);
        this.scene.scale(1/3,1/3,7);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3,6,-1/2);
        this.arm.display();
        this.scene.popMatrix();

       
	};

};