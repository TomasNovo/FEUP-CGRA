class MyArm extends CGFobject
{

	constructor(scene, slices, stacks)
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}

	initBuffers()  
	{
		this.vertices = [];

		this.indices = [];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.normals = [];

		this.texCoords = [];

        this.cylinder = new MyCylinder(this.scene, this.slices, this.stacks);
		this.circle = new MyCircle(this.scene, this.slices, this.stacks);
		
		var angle = 2*3.14159/this.slices;
		var texCoordX = 0;
		var texCoordY = 0;


		for ( var w = 0; w < this.stacks+1; w++) //Defining vertices, indices, normals and texCoords
		{

			for (var i = 0; i < this.slices; i++)
			{ 


				this.vertices.push(Math.cos(angle * i), Math.sin(angle * i), w/this.stacks);
				this.normals.push(Math.cos(angle*i) , Math.sin(angle*i),0);
				this.texCoords.push(texCoordX, texCoordY);
				if(w!=this.stacks) {
					this.indices.push(w*this.slices+i,w*this.slices+((i+1)%this.slices),(w+1)*this.slices+(i+1)%this.slices);
					this.indices.push(w*this.slices+i,(w+1)*this.slices+((i+1)%this.slices),(w+1)*this.slices+i);
				}
				texCoordX += 1/this.stacks;
			}

			texCoordX = 0;

			texCoordY += 1/this.stacks;

		}
		
		this.angle = 0;


		this.initGLBuffers();
	};

    updateArm()
	{

		if(this.angle < Math.PI/4)
			this.angle += Math.PI/50;
		/*else
			this.up = 1;*/

	}

	display()
	{
        //this.scene.rotate(this.angle,0,0,1);

	    this.scene.pushMatrix();
	    this.cylinder.display();
	    this.scene.popMatrix();


	    this.scene.pushMatrix();
	    this.scene.translate(0,0,1);
	    this.circle.display();
	    this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,0,1,0);
        this.circle.display();
	    this.scene.popMatrix();

	    this.scene.pushMatrix();
	    this.scene.rotate(Math.PI/2,0,1,0);
	    this.scene.translate(-1/2,1/4,1/2);
	    this.scene.scale(1/2,1/2,5);
	    this.cylinder.display();
	    this.scene.popMatrix();

        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(-1/2,1/4,5.5);
        this.scene.scale(1/2,1/2,1);
        this.circle.display()
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(5.1,1/2,0);
        this.scene.scale(1/8,1/8,3);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(5.1,1/2,3);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.translate(5.1,-1/2,-3);
        this.circle.display();
        this.scene.popMatrix();

	    
	}

};
