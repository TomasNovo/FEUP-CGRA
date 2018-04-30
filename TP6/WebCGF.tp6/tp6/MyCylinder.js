class MyCylinder extends CGFobject
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


		var angle = 2*3.14159/this.slices;
		var texCoordX = 0;
		var texCoordY = 0;


		for ( var w = 0; w < this.stacks+1; w++) //Defining vertices, normals and texCoords
		{

			for (var i = 0; i < this.slices; i++)
			{ 


				this.vertices.push(Math.cos(angle * i), Math.sin(angle * i), i/this.stacks);
				this.normals.push(Math.cos(angle*i) , Math.sin(angle*i),0);
				this.texCoords.push(texCoordX, texCoordY);
				texCoordX += 1/this.stacks;
			}

			texCoordX = 0;

			texCoordY += 1/this.stacks;

		}



		this.initGLBuffers();
	};
};
