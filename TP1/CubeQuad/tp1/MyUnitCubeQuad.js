/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.quad= new MyQuad(this.scene);
		this.quad.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				];

		this.indices = [
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	display()
	{
		
	}
};
