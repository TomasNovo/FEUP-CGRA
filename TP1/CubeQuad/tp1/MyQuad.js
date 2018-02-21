/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyQuad extends CGFobject
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
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
