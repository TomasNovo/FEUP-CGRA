class MyUnitCube extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
				0.5, -0.5, 0.5, //+x-y+z
				-0.5, -0.5, 0.5, //-x-y+z
				-0.5,-0.5, -0.5, //-x-y-z
				0.5, -0.5, -0.5, //+x-y-z
				0.5, 0.5, 0.5, //+x+y+z
				-0.5, 0.5, 0.5, //-x+y+z
				-0.5, 0.5, -0.5,// -x+y-z
				0.5, 0.5, -0.5 //+x+y-z
				];

		this.indices = [
				0, 1, 2,
				0, 2, 3,//Bottom
				6, 5, 4,
				4, 7, 6,//Top
				5, 6, 2,
				2, 1, 5,//Left
				0, 3, 4,
				3, 7, 4,//Right
				0, 4, 5,
				5, 1, 0,//Front
				2, 6, 7,
				7, 3, 2//Back
				];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
