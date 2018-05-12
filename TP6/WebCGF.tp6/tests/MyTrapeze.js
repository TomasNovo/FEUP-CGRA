class MyTrapeze extends CGFobject
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

		//como cada vertice tem 3 faces, é necessário criar 3 vertices multiplicados
		this.vertices =[this.v1_x,0,0, //0 
						this.v2_x, 0, 0, //1
						this.v3_x, this.h, 0, // 2
						this.v4_x, this.h, 0, // 3
						this.v1_x, 0,1, // 4 
						this.v2_x, 0, 1, // 5 
						this.v3_x, this.h, 1, //6
						this.v4_x, this.h, 1,  //7

						this.v1_x,0,0, //0
						this.v2_x, 0, 0, //1
						this.v3_x, this.h, 0, // 2
						this.v4_x, this.h, 0, // 3
						this.v1_x, 0,1, // 4 
						this.v2_x, 0, 1, // 5 
						this.v3_x, this.h, 1, //6
						this.v4_x, this.h, 1,  //7

						this.v1_x,0,0, //0
						this.v2_x, 0, 0, //1
						this.v3_x, this.h, 0, // 2
						this.v4_x, this.h, 0, // 3
						this.v1_x, 0,1, // 4 
						this.v2_x, 0, 1, // 5 
						this.v3_x, this.h, 1, //6
						this.v4_x, this.h, 1  //7	
						];

		this.indices = [ // face 1
						1,0,3,
						2,3,0, 
						4,5,6, // face 2
						7,6,5,
						0,4,2, // lateral esquerdo
						6,2,4,
						2,6,3, // cima
						7,3,6,
						5,1,7,// lateral direito
						3,7,1,
						1,5,0,//baixo
						4,0,5
						];

		this.normals = [0,0,-1,
						0,0,-1,
						0,0,-1,
						0,0,-1,
						0,0,1,
						0,0,1,
						0,0,1,
						0,0,1,

						0,1,0,
						0,1,0,
						0,1,0,
						0,1,0,
						0,1,0,
						0,1,0,
						0,1,0,
						0,1,0,
						];		
		
		//console.log(this.normals);
		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};


};
