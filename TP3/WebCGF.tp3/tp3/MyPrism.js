/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices =[];

		this.indices = [];

		this.normals = [];
	
		var angle = (360/this.slices) * (Math.PI/180);
		

		//Making vertices
		for(var i = 0; i<this.slices;i++) { //Front
			for(var j = 0; j<2; j++) //2 Vertices declared 
				this.vertices.push(Math.cos(angle*i), Math.sin(angle*i), 0.5);			
		}

		for(var i = 0; i<this.slices;i++) { //Back
			for(var j = 0; j<2; j++) //2 Vertices declared 
				this.vertices.push(Math.cos(angle*i), Math.sin(angle*i), -0.5);			
		}

		console.log(this.vertices);

		//Making Indices
		

		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
