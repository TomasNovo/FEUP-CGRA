 
class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	
	initKeys() {
		this.scene.gui=this;
		this.processKeyboard= function(){};
		this.activeKeys = {};
	}

	processKeyDown(event) {
		this.activeKeys[event.code] = true;
	};

	processKeyUp(event) {
		this.activeKeys[event.code] = false;
	};

	isKeyPressed(keyCode) {
		return this.activeKeys[keyCode] || false;
	}

	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();

		//Eixos
		this.gui.add(this.scene, 'turnAxis');

		//Luzes
		var LightGroup = this.gui.addFolder("Luzes");
		LightGroup.add(this.scene, 'light1');
		LightGroup.add(this.scene, 'light2');
		LightGroup.add(this.scene, 'light3');
		LightGroup.add(this.scene, 'light4');

		//Vehicle Appearance drop-down menu
		this.gui.add(this.scene, 'currVehicleAppearance', ['appearance1', 'appearance2', 'appearance3' ]);

		
		this.initKeys(); 

		return true;
	};

};
