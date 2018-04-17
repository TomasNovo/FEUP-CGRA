class MyCircle extends CGFobject
{
	
	constructor(scene, slices)
     {
       super(scene);
       this.slices = slices;
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

		for(var i=0; i<this.slices; i++) {
			this.vertices.push(Math.cos(i*angle), Math.sin(i*angle), 0);
			this.normals.push(0,0,1);
			this.texCoords.push((Math.cos(i*angle)+1)/2,(-Math.sin(i*angle)+1)/2);
		}

		for(var i=0; i<(this.slices-2); i++) {
			this.indices.push(0,i+1,i+2);
		}
        

		this.initGLBuffers();
	};
};
