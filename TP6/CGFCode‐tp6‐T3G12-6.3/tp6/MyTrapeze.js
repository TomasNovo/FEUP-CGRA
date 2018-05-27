class MyTrapeze extends CGFobject
{
	constructor(scene, v1_x, v2_x, v3_x, v4_x, h, w) 
	{
		super(scene);
		this.v1_x = v1_x;
		this.v2_x = v2_x;
		this.v3_x = v3_x;
		this.v4_x = v4_x;
		this.h = h;
		this.w = w;

		this.initBuffers();
		
	};

	initBuffers() 
	{
		this.vertices =[
			//Trapeze Front
			this.v1_x,0,this.w/2.0,
			this.v2_x,0,this.w/2.0,
			this.v3_x,this.h,this.w/2.0,
			this.v4_x,this.h,this.w/2.0,

			//Trapeze back
			this.v1_x,0,-this.w/2.0,
			this.v2_x,0,-this.w/2.0,
			this.v3_x,this.h,-this.w/2.0,
			this.v4_x,this.h,-this.w/2.0,

			//Roof
			this.v3_x,this.h,this.w/2.0,
			this.v4_x,this.h,this.w/2.0,
			this.v3_x,this.h,-this.w/2.0,
			this.v4_x,this.h,-this.w/2.0,

			//Floor
			this.v1_x,0,this.w/2.0,
			this.v2_x,0,this.w/2.0,
			this.v1_x,0,-this.w/2.0,
			this.v2_x,0,-this.w/2.0,

			//Right side
			this.v2_x,0,this.w/2.0,
			this.v4_x,this.h,this.w/2.0,
			this.v2_x,0,-this.w/2.0,
			this.v4_x,this.h,-this.w/2.0,

			//Left side
			this.v1_x,0,this.w/2.0,
			this.v3_x,this.h,this.w/2.0,
			this.v1_x,0,-this.w/2.0,
			this.v3_x,this.h,-this.w/2.0,

		];

		this.indices = [
			//Trapeze front
			0,1,2,
			1,3,2,

			//Trapeze back
			4,6,5,
			5,6,7,

			//Roof
			8,11,10,
			8,9,11,

			//Floor
			12,14,13,
			13,14,15,

			//Right Side
			16,19,17,
			16,18,19,

			//Left side
			20,21,22,
			21,23,22
		];
						
		
		this.normals = [
			//Trapeze front
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,

			//Trapeze back
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,

			//Roof
			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0,

			//Floor
			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,

			//Right Side
			1,1,0,
			1,1,0,
			1,1,0,
			1,1,0,

			//Left side
			-1,1,0,
			-1,1,0,
			-1,1,0,
			-1,1,0

		];		

		this.texCoords = [
			0,0,
			0,1,
			1,0,
			1,1,
			
			0,0,
			0,1,
			1,0,
			1,1,

			0,0,
			0,1,
			1,0,
			1,1,

			0,0,
			0,1,
			1,0,
			1,1,

			0,0,
			0,1,
			1,0,
			1,1,
			
			0,0,
			0,1,
			1,0,
			1,1,
		];




		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};


};
