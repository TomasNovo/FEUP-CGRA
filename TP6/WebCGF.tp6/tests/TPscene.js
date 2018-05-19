class TPscene extends CGFscene
{
    constructor()
    {
        super();
    }


    init(application) 
    {
        super.init(application);

	this.enableTextures(true);

        this.initCameras();

        this.initLights();


        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis=new CGFaxis(this);
        //this.sphere = new Sphere(this, 20, 6);
	//this.terrain = new MyTerrain(this);
	this.trapeze = new MyTrapeze(this,-0.75,0.75,-0.25,0.25,1,1);

	this.option1 = true;
	this.option2 = false;
	this.speed = 3;

	
		this.terrainAppearance = new CGFappearance(this);
		this.terrainAppearance.loadTexture("../resources/images/terrain.jpg");
		this.terrainAppearance.setAmbient(1.0,1.0,1.0,1);
		this.terrainAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.terrainAppearance.setSpecular(1.0,1.0,1.0,1);
		this.terrainAppearance.setShininess(120);
    };

	doSomething() {
		console.log("Doing Something...");
	}

    initLights() 
    {

        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
        this.lights[0].enable();
        this.lights[0].update();
    
    };

    initCameras() 
    {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 50, 50), vec3.fromValues(0, 0, 0));
    };

    setDefaultAppearance() 
    {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);	
    };

    display() 
    {
        // ---- BEGIN Background, camera and axis setup
        
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        this.setDefaultAppearance();
        
        // ---- END Background, camera and axis setup

        
        // ---- BEGIN Geometric transformation section

        // Multiplication of the previous transformations
        //this.multMatrix(this.tra);     // GT = GT * tra
        //this.multMatrix(this.rot);     // GT = GT * rot
        //this.multMatrix(this.sca);     // GT = GT * sca

        // ---- END Geometric transformation section
        

        // ---- BEGIN Primitive drawing section

        //this.obj.display();
	this.pushMatrix();
	//this.scale(5,5,5);
	this.terrainAppearance.apply();
	this.trapeze.display();
	//this.terrain.display();
	this.popMatrix();
        
        // ---- END Primitive drawing section

    };

};
