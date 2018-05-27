var degToRad = Math.PI / 180.0;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	update(currTime) {
		//Time
      		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
	
		//Reading keyboard
		this.checkKeys();
		
		//Update Vehicle
		this.vehicle.move(this.deltaTime);
		this.vehicle.changeAppearance(this.vehicleAppearanceList[this.currVehicleAppearance]);

		//Update crane
		this.crane.move(this.deltaTime);
		this.crane.craneVehicleSet(this.vehicle);
		this.crane.updateCrane();
		this.crane.checkCarPosition(this.vehicle.position[0], this.vehicle.position[2], this.vehicle.velocity);
		
		this.lastTime = currTime; //Updating time

	};
	
	turnAxis() { //Turn ON/OFF Axis
		this.axisVisibility = !this.axisVisibility;
	}
	

	checkKeys() { //Reading pressed Keys
		var text = "Keys pressed: ";
                var keyPressed = false;

               
                if(this.gui.isKeyPressed("KeyW")) {
                        text +=  " W ";
                        keyPressed = true;
                        this.vehicle.moveWheels("f",this.deltaTime);
                }
                else if(this.gui.isKeyPressed("KeyS")) {
                        text += " S ";
                        keyPressed = true;
                        this.vehicle.moveWheels("b",this.deltaTime);
                }
                else
                        this.vehicle.moveWheels("",this.deltaTime);

                if(this.gui.isKeyPressed("KeyA")) {
                        text += " A ";
                        keyPressed = true;
                        this.vehicle.turnWheels("l");
                }
                else if(this.gui.isKeyPressed("KeyD")) {
                        text += " D ";
                        keyPressed = true;
                        this.vehicle.turnWheels("r");
                }
                else
                        this.vehicle.turnWheels("");




               if(this.gui.isKeyPressed("KeyI")) {
                        text +=  " I ";
                        keyPressed = true;
                        this.crane.moveArm("I",this.deltaTime);
                }
                else if(this.gui.isKeyPressed("KeyK")) {
                	text += " K ";
                	keyPressed = true;
                	this.crane.moveArm("K", this.deltaTime);
                }
                else if(this.gui.isKeyPressed("KeyJ")) {
                        text +=  " J ";
                        keyPressed = true;
                        this.crane.moveArm("J",this.deltaTime);
                }
                else if(this.gui.isKeyPressed("KeyL")) {
                	text += " L ";
                	keyPressed = true;
                	this.crane.moveArm("L", this.deltaTime);
                }
                else if(this.gui.isKeyPressed("KeyX"))
                {
                	text += " X ";
                	keyPressed = true;
                	this.crane.moveArm("X", this.deltaTime);
                }


                if(keyPressed)
                        console.log(text);
                else
                        this.vehicle.turnWheels("s");
	}

	init(application) 
	{
		

		super.init(application);
        	this.enableTextures(true); 
		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.529, 0.808, 0.922, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);
		
		//MyInterface
		this.light1 = true;
		this.light2 = true;
		this.light3 = true;
		this.light4 = true;
		this.axisVisibility = false; //Modified by function updateAxis


		//Appearances
		this.basicAppearance = new CGFappearance(this);
		this.basicAppearance.loadTexture("../resources/images/feup.png");
		this.basicAppearance.setAmbient(1.0,1.0,1.0,1);
		this.basicAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.basicAppearance.setSpecular(1.0,1.0,1.0,1);
		this.basicAppearance.setShininess(120);


		this.target1Appearance = new CGFappearance(this);
		this.target1Appearance.loadTexture("../resources/images/target1.png");
		this.target1Appearance.setAmbient(1.0,1.0,1.0,1);
		this.target1Appearance.setDiffuse(1.0,1.0,1.0,1);
		this.target1Appearance.setSpecular(1.0,1.0,1.0,1);
		this.target1Appearance.setShininess(120);
		
		this.target2Appearance = new CGFappearance(this);
		this.target2Appearance.loadTexture("../resources/images/target2.png");
		this.target2Appearance.setAmbient(1.0,1.0,1.0,1);
		this.target2Appearance.setDiffuse(1.0,1.0,1.0,1);
		this.target2Appearance.setSpecular(1.0,1.0,1.0,1);
		this.target2Appearance.setShininess(120);

		this.vehicleAppearance = new CGFappearance(this);
		this.vehicleAppearance.loadTexture("../resources/images/red.png");
		this.vehicleAppearance.setAmbient(1.0,1.0,1.0,1);
		this.vehicleAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.vehicleAppearance.setSpecular(1.0,1.0,1.0,1);
		this.vehicleAppearance.setShininess(120);

		this.vehicleAppearance2 = new CGFappearance(this);
        	this.vehicleAppearance2.loadTexture("../resources/images/blue-car.jpg");
        	this.vehicleAppearance2.setAmbient(1.0,1.0,1.0,1);
        	this.vehicleAppearance2.setDiffuse(1.0,1.0,1.0,1);
        	this.vehicleAppearance2.setSpecular(1.0,1.0,1.0,1);
        	this.vehicleAppearance2.setShininess(120);
		
		this.vehicleAppearance3 = new CGFappearance(this);
        	this.vehicleAppearance3.loadTexture("../resources/images/nosim-car.gif");
        	this.vehicleAppearance3.setAmbient(1.0,1.0,1.0,1);
        	this.vehicleAppearance3.setDiffuse(1.0,1.0,1.0,1);
        	this.vehicleAppearance3.setSpecular(1.0,1.0,1.0,1);
        	this.vehicleAppearance3.setShininess(120);
		
		this.vehicleAppearances = [this.vehicleAppearance, this.vehicleAppearance2, this.vehicleAppearance3];
		this.vehicleAppearanceList = {
			'appearance1' : this.vehicleAppearances[0],
			'appearance2' : this.vehicleAppearances[1],
			'appearance3' : this.vehicleAppearances[2]
		}
		this.currVehicleAppearance = "appearance1";

		//Altimetry for terrain
		this.altimetry= [[ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 1.3 ,0],
				[ 2.0 , 3.0 , 2.0, 4.0, 7.5, 0, 0.0, 0.0 ,0],
				[ 2.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ,0],
				[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ,0],
				[ 0.0 , 0.0 , 0.0, 0.0, 0, 0, 0.0, 0.0 ,0],
				[ 0.0 , 0.0 , 0.0, 0.0, 1.5, 1.5, 0.0, 0.0 ,0],
				[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 4.0 ,0],
				[ 2.0 , 2.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 4.0 ,0],
				[ 4.0 , 3.0 , 2.0, 2.0, 0.0, 0.0, 3.0, 0.0 ,0]
    				];

		// Scene Elements Initialization
		this.terrain = new MyTerrain(this, 8, this.altimetry);
		this.vehicle = new MyVehicle(this, this.vehicleAppearanceList[this.currVehicleAppearance]);
		this.crane = new MyCrane(this, this.vehicle);
		this.cylinder = new MyCylinder(this, 6, 1);
		this.sphere = new Sphere(this, 20, 20);
		this.trapeze = new MyTrapeze(this,0,2,0.5,1.5,1,1);
		this.target = new MyQuad(this, 0, 1, 0, 1);

		this.crane.craneVehicleSet(this.vehicle);

	       	this.setUpdatePeriod(100); //Defining update scene time
	}

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 50, 50), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0,0,0, 1);
		// Positions for four lights
		this.lights[0].setPosition(-12.5, 6, 12.5, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[1].setPosition(-12.5, 6.0, -12.5, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(12.5, 6.0, 12.5, 1.0);
                this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(12.5, 6, -12.5, 1);
                this.lights[3].setVisible(true);


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
                this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
                this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
                this.lights[3].setSpecular( 1.0, 1.0, 0, 1.0 );
                this.lights[3].enable();
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();

		//Update ON/OFF
		if(this.light1) //Light 1
			this.lights[0].enable();
		else
			this.lights[0].disable();

		if(this.light2) //Light 2
			this.lights[1].enable();
		else
			this.lights[1].disable();

		if(this.light3) //Light 3
			this.lights[2].enable();
		else
			this.lights[2].disable();

		if(this.light4) //Light 4 
			this.lights[3].enable();
		else
			this.lights[3].disable();

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
		if(this.axisVisibility)
			this.axis.display();

		//this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section
		
			//Terrain
			this.pushMatrix();
			this.terrain.terrainAppearance.apply();
			//this.vehicleAppearanceList[this.currVehicleAppearance].apply();
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.scale(50,50,1);
			this.terrain.display();
			this.popMatrix();

			//Vehicle
			this.pushMatrix();
			//this.vehicleAppearanceList[this.currVehicleAppearance].apply();
			this.translate(5,0.5,-1.7);
			this.rotate(Math.PI/2,0,1,0);
			if(this.crane.vehicleDisplay == 0)
			this.vehicle.display();
			this.popMatrix();

			////Crane
                            //this.pushMatrix();
                           //this.translate(5,1.5,7);
			////this.vehicleAppearanceList["appearance1"].apply();
                            //this.crane.display();
                            //this.popMatrix();
			
			////first Target x: [5 , 7.5]  y: [0,0]  z: [13.5,18.5]
			//this.pushMatrix();
			//this.translate(5,0.01,15.5);
			//this.rotate(-Math.PI/2,0,1,0);
			//this.rotate(Math.PI,1,0,0);
			//this.rotate(Math.PI/2,1,0,0);
			//this.scale(5,6,1);            //
			//this.target1Appearance.apply();
			//this.target.display();
			//this.popMatrix();

			////second Target
			//this.pushMatrix();
			//this.translate(5,0.1,-2);
			//this.rotate(-Math.PI/2,0,1,0);
			//this.rotate(Math.PI,1,0,0);
			//this.rotate(Math.PI/2,1,0,0);
			//this.scale(5,6,1);            //
			//this.target2Appearance.apply();
			//this.target.display();
			//this.popMatrix();

			////Basic Forms
			////Cylinder
			//this.pushMatrix();
			//this.rotate(Math.PI/2,1,0,0);
			//this.translate(20,0,-5);
			//this.rotate(Math.PI,0,0,1);
			//this.scale(1,1,5);
			//this.basicAppearance.apply();
			//this.cylinder.display();
			//this.popMatrix();

			////Trapeze
			//this.pushMatrix();
			//this.translate(20,0,-5);
			//this.scale(2,2,2);
			//this.basicAppearance.apply();
			//this.trapeze.display();
			//this.popMatrix();
		
			////Sphere
			//this.pushMatrix();
			//this.translate(20,0,-9);
			//this.scale(2,2,2);
			//this.basicAppearance.apply();
			//this.sphere.display();
			//this.popMatrix();
			
        

		// ---- END Scene drawing section


	};
};
