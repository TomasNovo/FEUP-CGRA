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

		//this.normals = [];

		var angle = (360/this.slices) * (Math.PI/180);


		//Making vertices
		for(var j = 0; j<2; j++) { //2 Vertices declared 
			for(var i = 0; i<this.slices;i++) { //Front
				this.vertices.push(Math.cos(angle*i), Math.sin(angle*i), 0.5);	
			}

			for(var i = 0; i<this.slices;i++) { //Back
				this.vertices.push(Math.cos(angle*i), Math.sin(angle*i), -0.5);			
			}
		}

		//Making indices
		for(var i = 0; i<this.slices; i++) {
			console.log(i);
			if(i!=(this.slices-1)) {
				this.indices.push(i, i+1+this.slices, i+1); //anticlockwise
				this.indices.push(i+1, i+1+this.slices, i); //clockwise
				this.indices.push(i, i+this.slices, i+1+this.slices); //anticlockwise
				this.indices.push(i+1+this.slices, i+this.slices, i);
			}
			else {
				this.indices.push(i, i+1, 0); //anticlockwise
				this.indices.push(0, i+1, i); //clockwise
				this.indices.push(i, i+this.slices, i+1); //anticlockwise
				this.indices.push(i+1, i+this.slices, i); //clockwise
			}

		}

		console.log(this.vertices);
		console.log("IND: "+this.indices);

		//Making Indices



		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

};
