class MyTrapeze2D extends CGFobject
{
	constructor(scene, v1_x, v2_x, v3_x, v4_x, h) 
	{
		super(scene);
		this.v1_x = v1_x;
		this.v2_x = v2_x;
		this.v3_x = v3_x;
		this.v4_x = v4_x;
		this.h = h;

		this.initBuffers();
		
	};

	initBuffers() 
	{
		this.vertices =[
			this.v1_x,0,0,
			this.v2_x,0,0,
			this.v3_x,this.h,0,
			this.v4_x,this.h,0
		];

		this.indices = [
			0,1,2,
			1,3,2
		];
						
		
		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1
		];		

		this.texCoords = [
			0,0,
			0,1,
			1,0,
			1,1
		];




		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};


};
