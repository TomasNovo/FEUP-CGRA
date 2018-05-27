class InvSphere extends CGFobject {

	constructor(scenes, slices, stacks) {
		super(scenes);
		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}

	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		this.angle = 2*Math.PI/(this.slices);
		this.angleH = (Math.PI/2)/this.stacks;

		var indCount = 0;

		for(var i = 0; i < this.slices; i++){
			var angleTeta = i * this.angle;

			for(var j = 0; j < this.stacks; j++){
				var x,y,z;
				if(j == 0){
					x = Math.sin(j*this.angleH) * Math.sin(angleTeta);
					y = Math.cos(j*this.angleH);
					z = Math.sin(j*this.angleH) * Math.cos(angleTeta);
					this.vertices.push(x,y,z);
					this.normals.push(-x,-y,-z);
					this.texCoords.push( (x+1)/2.0, ((z*(-1))+1)/2.0);


					x = Math.sin(j*this.angleH+this.angleH) * Math.sin(angleTeta);
					y = Math.cos(j*this.angleH+this.angleH);
					z = Math.sin(j*this.angleH+this.angleH) * Math.cos(angleTeta);
					this.vertices.push(x,y,z); 
					this.normals.push(-x,-y,-z);
					this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);


					x = Math.sin(j*this.angleH+this.angleH) * Math.sin(angleTeta+this.angle);
					y = Math.cos(j*this.angleH+this.angleH);
					z = Math.sin(j*this.angleH+this.angleH) * Math.cos(angleTeta+this.angle);
					this.vertices.push(x,y,z);
					this.normals.push(-x,-y,-z);
					this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);


					this.indices.push(indCount+2);
					this.indices.push(indCount + 1);
					this.indices.push(indCount);
					indCount+=3;
				}
				else {
					x = Math.sin(j*this.angleH) * Math.sin(angleTeta);
					y = Math.cos(j*this.angleH);
					z = Math.sin(j*this.angleH) * Math.cos(angleTeta);
					this.vertices.push(x,y,z);
					this.normals.push(-x,-y,-z);
					this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);


					x = Math.sin(j*this.angleH+this.angleH) * Math.sin(angleTeta);
					y = Math.cos(j*this.angleH+this.angleH);
					z = Math.sin(j*this.angleH+this.angleH) * Math.cos(angleTeta);
					this.vertices.push(x,y,z);
					this.normals.push(-x,-y,-z);
					this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);


					x = Math.sin(j*this.angleH) * Math.sin(angleTeta+this.angle);
					y = Math.cos(j*this.angleH);
					z = Math.sin(j*this.angleH) * Math.cos(angleTeta+this.angle);
					this.vertices.push(x,y,z);
					this.normals.push(-x,-y,-z);
					this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);


					x = Math.sin(j*this.angleH + this.angleH) * Math.sin(angleTeta+this.angle);
					y = Math.cos(j*this.angleH + this.angleH);
					z = Math.sin(j*this.angleH + this.angleH) * Math.cos(angleTeta+this.angle);
					this.vertices.push(x,y,z);
					this.normals.push(-x,-y,-z);
					this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);


					this.indices.push(indCount+2);
					this.indices.push(indCount + 1);
					this.indices.push(indCount);

					this.indices.push(indCount + 2);
					this.indices.push(indCount + 3);
					this.indices.push(indCount + 1);
					indCount+=4;
				}
			}
		}
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
}
