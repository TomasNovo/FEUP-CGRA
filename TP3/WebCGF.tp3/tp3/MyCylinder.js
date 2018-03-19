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


        var angle = 2*3.14159/this.slices;
        var r = 1;
        var h = 1;

        var angleNormal = angle/2;
       	var count = 0;
        var j = 0;          

        
        var stack_size = 1/this.stacks;


        for ( var w = 0; w < this.stacks; w++)
        {
        	 
			for (var i = 0; i < this.slices; i++)
			{ 

			  
			   this.vertices.push(Math.cos(angle * i), Math.sin(angle * i), (w+1)*stack_size);
			   this.vertices.push(Math.cos(angle * i), Math.sin(angle * i),w*stack_size);
			   this.vertices.push(Math.cos(angle * (i+1)), Math.sin(angle * (i+1)),w*stack_size);
			   this.vertices.push(Math.cos(angle * (i+1)), Math.sin(angle * (i+1)),(w+1)*stack_size);


				this.indices.push(j, j + 1, j + 2); // 012
				this.indices.push(j+2, j+1, j); 
				this.indices.push(j, j + 2, j + 3); // 023
				this.indices.push(j+3, j+2, j);
				j = j + 4;

				this.normals.push(Math.cos(angle*i) , Math.sin(angle*i),0);
				this.normals.push(Math.cos(angle*i) , Math.sin(angle*i),0);
				this.normals.push(Math.cos(angle*i) , Math.sin(angle*i),0);
				this.normals.push(Math.cos(angle*i) , Math.sin(angle*i),0);

			}

        }

		this.initGLBuffers();
	};
};
