var degToRad = Math.PI / 180.0;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	update(currTime) {
      		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
		if(this.deltaTime<1000) {
			this.checkKeys();
			this.vehicle.move(this.deltaTime);
			this.crane.updateCrane();
			this.crane.arm.updateArm();

		}
      		this.lastTime = currTime;
		//this.checkKeys();
                //this.vehicle.move();
                //this.crane.updateCrane();
                //this.crane.arm.updateArm();	
	};
	
	turnAxis() { //Turn ON/OFF Axis
		this.axisVisibility = !this.axisVisibility;
	}

	checkKeys() {
		var text = "Keys pressed: ";
                var keyPressed = false;

                if(this.gui.isKeyPressed("KeyW")) {
                        text +=  " W ";
                        keyPressed = true;
                        this.vehicle.moveWheels("f");
                }
                else if(this.gui.isKeyPressed("KeyS")) {
                        text += " S ";
                        keyPressed = true;
                        this.vehicle.moveWheels("b");
                }
                else
                        this.vehicle.moveWheels("");

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

		this.vehicleAppearance = new CGFappearance(this);
		this.vehicleAppearance.loadTexture("../resources/images/terrain.jpg");
		this.vehicleAppearance.setAmbient(1.0,1.0,1.0,1);
		this.vehicleAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.vehicleAppearance.setSpecular(1.0,1.0,1.0,1);
		this.vehicleAppearance.setShininess(120);

		this.vehicleAppearance2 = new CGFappearance(this);
        	this.vehicleAppearance2.loadTexture("../resources/images/tire.png");
        	this.vehicleAppearance2.setAmbient(1.0,1.0,1.0,1);
        	this.vehicleAppearance2.setDiffuse(1.0,1.0,1.0,1);
        	this.vehicleAppearance2.setSpecular(1.0,1.0,1.0,1);
        	this.vehicleAppearance2.setShininess(120);
		
		this.vehicleAppearances = [this.vehicleAppearance, this.vehicleAppearance2];
		this.vehicleAppearanceList = {
			'appearance1' : this.vehicleAppearances[0],
			'appearance2' : this.vehicleAppearances[1]
		}
		this.currVehicleAppearance = "appearance2";

		// Scene elements
		this.altimetry= [[ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 1.3 ,0],
				[ 2.0 , 3.0 , 2.0, 4.0, 7.5, 6.4, 4.3, 1.3 ,0],
				[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ,0],
				[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ,0],
				[ 0.0 , 0.0 , 2.0, 4.0, 2.5, 2.4, 0.0, 0.0 ,0],
				[ 0.0 , 0.0 , 2.0, 4.0, 3.5, 2.4, 0.0, 0.0 ,0],
				[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ,0],
				[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ,0],
				[ 2.0 , 3.0 , 2.0, 1.0, 2.5, 2.4, 2.3, 1.3 ,0]
    				];
		this.terrain = new MyTerrain(this, 8, this.altimetry);
		this.vehicle = new MyVehicle(this);
		this.crane = new MyCrane(this);

       		this.setUpdatePeriod(1000/60);
	}

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 50, 50), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
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
			//this.terrain.terrainAppearance.apply();
			this.vehicleAppearanceList[this.currVehicleAppearance].apply();
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.scale(50,50,1);
			this.terrain.display();
			this.popMatrix();

			//Vehicle
			this.pushMatrix();
			this.vehicleAppearanceList[this.currVehicleAppearance].apply();
			this.translate(14,0.5,5);
			this.vehicle.display();
			this.popMatrix();

			//Crane
                        this.pushMatrix();
                      	this.translate(0,2,0);
                     	this.crane.display();
                        this.popMatrix();
        

		// ---- END Scene drawing section


	};
};
