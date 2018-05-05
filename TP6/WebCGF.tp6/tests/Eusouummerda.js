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

		console.log("I AM NOOB");
		for ( var w = 0; w < this.stacks+1; w++) //Defining vertices, indices, normals and texCoords
		{

			for (var i = 0; i < this.slices; i++)
			{ 


				this.vertices.push(Math.cos(angle * i), Math.sin(angle * i), w/this.stacks);
				this.normals.push(Math.cos(angle*i) , Math.sin(angle*i),0);
				this.texCoords.push(texCoordX, texCoordY);
				texCoordX += 1/this.stacks;
			}

			texCoordX = 0;

			texCoordY += 1/this.stacks;

		}

		for(var i = 0; i<this.stacks;i++) {
			for(var j=0; j<this.slices;j++) {
				this.indices.push(i*this.slices+j,i*this.slices+((j+1)%this.slices),(i+1)*this.slices+(j+1)%this.slices);
				this.indices.push(i*this.slices+j,(i+1)*this.slices+((j+1)%this.slices),(i+1)*this.slices+j);
			}
		}

		this.initGLBuffers();
	};
};
