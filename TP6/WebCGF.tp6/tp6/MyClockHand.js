class MyClockHand extends CGFobject
{
	
	constructor(scene)
     {
       super(scene);

       this.angle = 0;

       this.initBuffers();
     }

	initBuffers()  
	{
		this.cylinder = new MyCylinder(this.scene, 12, 1);
        
        this.vertices = this.cylinder.vertices;
        this.indices = this.cylinder.indices;
        this.normals = this.cylinder.normals;
        this.texCoords = this.cylinder.texCoords;
       
		this.initGLBuffers();
	};

    setAngle(ang)
    {
	
	  this.angle = ang;
    }
};
