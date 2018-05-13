var degToRad = Math.PI / 180.0;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	update(currTime) {
      //this.lastTime = this.lastTime || 0;
	//this.deltaTime = currTime - this.lastTime;
	//if(this.deltaTime<1000) {
		////this.lastTime = currTime;
		//this.clock.update(this.deltaTime);
	//}
      //this.lastTime = currTime;
		
		this.checkKeys();
		//this.vehicle.turnWheels("r");
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
		}

		if(this.gui.isKeyPressed("KeyS")) {
			text += " S ";
			keyPressed = true;
		}

		if(keyPressed)
			console.log(text);
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

		this.axis = new CGFaxis(this);
		
		//MyInterface
		this.light1 = true;
		this.light2 = true;
		this.light3 = true;
		this.light4 = true;
		this.axisVisibility = false; //Modified by function updateAxis

		// Scene elements
		this.terrain = new MyTerrain(this, 50);
		this.vehicle = new MyVehicle(this);

       		this.setUpdatePeriod(100);
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
			this.terrain.display();
			this.popMatrix();

			//Vehicle
			this.pushMatrix();
			this.translate(5,0.5,5);
			this.vehicle.display();
			this.popMatrix();
        

		// ---- END Scene drawing section


	};
};
