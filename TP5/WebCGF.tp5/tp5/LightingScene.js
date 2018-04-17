var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var PRISM_SLICES = 8;
var PRISM_STACKS = 20;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	update(currTime)
	{
      this.lastTime = this.lastTime || 0;

      this.deltaTime = currTime - this.lastTime;
      
      this.lastTime = currTime;

      //this.clock.update(this.deltaTime);


	};

	init(application) 
	{
		

		super.init(application);
        this.enableTextures(true); // 1.2
		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.table = new MyTable(this);
		
		this.wall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
		
		this.floor = new MyQuad(this,0,10,0,12);

		this.boardA = new Plane(this, BOARD_A_DIVISIONS);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);
		
		this.prism = new MyPrism(this, PRISM_SLICES, PRISM_STACKS);
		
		this.clock = new MyClock(this);

		this.teste = new MyCircle(this, 12);
		
		// Materials
		this.materialDefault = new CGFappearance(this);
		
		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);	
		this.materialB.setShininess(120);


		this.tableAppearence = new CGFappearance(this);
		this.tableAppearence.setDiffuse(0.8,0.8,0.8,1);
		this.tableAppearence.setSpecular(0.1,0.1,0.1,1);
		this.tableAppearence.setShininess(120);
		this.tableAppearence.loadTexture("../resources/images/table.png");

		this.floorAppearence = new CGFappearance(this);
		this.floorAppearence.loadTexture("../resources/images/floor.png");
		this.floorAppearence.setAmbient(0.1,0.1,0.1,1);
		this.floorAppearence.setDiffuse(0.5,0.5,0.5,1);
		this.floorAppearence.setSpecular(0.7,0.7,0.7,1);
		this.floorAppearence.setShininess(120);
		this.floorAppearence.setTextureWrap('REPEAT','REPEAT');

		this.wallAppearance = new CGFappearance(this);
		
		this.windowAppearance = new CGFappearance(this);
		this.windowAppearance.loadTexture("../resources/images/window.png");
        this.windowAppearance.setAmbient(0.1,0.1,0.1,1);
        this.windowAppearance.setDiffuse(0.5,0.5,0.5,1);
        this.windowAppearance.setSpecular(0.7,0.7,0.7,1);
        this.windowAppearance.setShininess(120);
        this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

        this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.loadTexture("../resources/images/slides.png");
        this.slidesAppearance.setAmbient(0.1,0.1,0.1,1);
        this.slidesAppearance.setDiffuse(0.5,0.5,0.5,1);
        this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
        this.slidesAppearance.setShininess(10);
        //this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		
		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.loadTexture("../resources/images/board.png");
        this.boardAppearance.setAmbient(0.1,0.1,0.1,1);
        this.boardAppearance.setDiffuse(0.1,0.1,0.1,1);
        this.boardAppearance.setSpecular(0.6,0.6,0.6,1);
        this.boardAppearance.setShininess(200);
        //	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		
		this.prismAppearance = new CGFappearance(this);
		this.prismAppearance.loadTexture("../resources/images/ui.png");
        this.prismAppearance.setAmbient(0.8,0.8,0.8,1);
        this.prismAppearance.setDiffuse(0.1,0.1,0.1,1);
        this.prismAppearance.setSpecular(0.6,0.6,0.6,1);
        this.prismAppearance.setShininess(100);
        this.prismAppearance.setTextureWrap('REPEAT','REPEAT');

        //clockAppearance
        //this.clockAppearance = new CGFappearance(this);
		//this.clockAppearance.loadTexture("../resources/images/clock.png");
        //this.clockAppearance.setAmbient(0.8,0.8,0.8,1);
      ////  this.clockAppearance.setDiffuse(0.1,0.1,0.1,1);
       //// this.clockAppearance.setSpecular(0.6,0.6,0.6,1);
        //this.clockAppearance.setShininess(100);


        
	}

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
	//	this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
		this.setGlobalAmbientLight(0,0,0, 1);
		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
                this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 6, 5, 1);
                this.lights[3].setVisible(true);

		//this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		//this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular( 1.0, 1.0, 0, 1.0 );
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
                this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular( 1.0, 1.0, 1.0, 1.0 );
		this.lights[2].setConstantAttenuation(0); // kc
		this.lights[2].setLinearAttenuation(1.0); // kl
		this.lights[2].setQuadraticAttenuation(0); // kq
                this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
                this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
                this.lights[3].setSpecular( 1.0, 1.0, 0, 1.0 );
		this.lights[3].setConstantAttenuation(0); // kc
                this.lights[3].setLinearAttenuation(0); // kl
                this.lights[3].setQuadraticAttenuation(0.2); // kq<Paste>
                this.lights[3].enable();
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


	display() 
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearence.apply();
		this.floor.display();
		this.popMatrix();

		// Left Wall
		this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.wall.display();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallAppearance.apply();
		this.wall.display();
		this.popMatrix();

		// First Table
		this.tableAppearence.apply();
		this.pushMatrix();
		this.translate(5, 3.5, 8);
		this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
		this.translate(12, 3.5, 8);
		this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	    this.slidesAppearance.apply();
		this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	    this.boardAppearance.apply();
		this.boardB.display();
		this.popMatrix();

		//Prism
		this.pushMatrix();
		this.translate(12, 7, 12);
		this.rotate(Math.PI/2,1,0,0);
		this.scale(1, 1, 8);
	    //this.prismAppearance.apply();
		//this.prism.display();
		this.popMatrix();
		
		//Clock
        	this.pushMatrix();
	        this.translate(7.25, 7, 0);
	        this.rotate(0/2,1,0,0);
	        // this.scale(1, 1, 0);
	        this.clock.display();
	        this.popMatrix();

        

		// ---- END Scene drawing section


		this.setUpdatePeriod(100)
	};
};
