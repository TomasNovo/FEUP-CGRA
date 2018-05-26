class MyCrane extends CGFobject
{
	constructor(scene, car) 
	{
		super(scene);
		this.scene = scene;
		this.car = car;
		this.initBuffers();
	};

	
	moveArm(direction,deltaTime) {
	

		if(direction=="I" )
			{
				this.armAngle += Math.PI/100;
				this.craneControl = 1
			}

		else if(direction=="K")
			{
				this.armAngle -= Math.PI/100;
				this.craneControl = 1
			}
		
		else if(direction=="L") 
			{
				this.angle += Math.PI/100;
				this.craneControl = 1
			}
		
		else if(direction=="J")
			{
				this.angle -= Math.PI/100;
				this.craneControl = 1
			}
		else if(direction == "X")
			{
				this.craneControl = 2;
			}

	}

	move(deltaTime) { 
		this.moveArm("",deltaTime); 

		}


	
	initBuffers() 
	{
	    this.cylinder = new MyCylinder(this.scene,12,12);
	    this.circle = new MyCircle(this.scene,12,12);
		this.angle = Math.PI/2;

		this.vehicle = new MyVehicle(this.scene, this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]);
		this.arm = new MyArm(this.scene,12,12);

		this.armAngle = 0;
		this.vehicleIn = 0;

		this.cranetimer = 0;
		
		this.vehicleInCrane = 0;

		this.vehicleDisplay = 0;

		this.vehicleDrop = 0;

		this.gravity = 0;

		this.craneControl = 0;

		this.high = 0;

		this.craneAppearance = new CGFappearance(this.scene);
		this.craneAppearance.loadTexture("../resources/images/red.png");
		this.craneAppearance.setAmbient(1.0,1.0,1.0,1);
		this.craneAppearance.setDiffuse(1.0,1.0,1.0,1);
		this.craneAppearance.setSpecular(1.0,1.0,1.0,1);
		this.craneAppearance.setShininess(120);


	};


	craneVehicleSet(car)
	{	
		this.sceneVehicle = car;	
	}


	checkCarPosition(posX, posZ, velocity)
	{

		if((posZ > -1 && posZ < 1.5) && (posX > -22 && posX < -16)  && (velocity == 0) )
		{
			this.vehicleIn = 1;
			console.log("ENTROU NO TARGET!");
		}
		else
		{
			this.vehicleIn = 0;
			this.cranetimer = 0;
			this.craneControl = 0;
			this.vehicle.position[1] = 0;
		}
		//console.log("X : "+posX+"\nZ : "+posZ);
	}



	updateCrane()
	{
		//rodar para o target
		if(this.craneControl == 2)
		{
			if(this.angle > Math.PI/2)
			  this.angle -= Math.PI/100;


			if(this.angle < Math.PI/2)
			  this.angle += Math.PI/100;

			    
			if(this.armAngle > 0)
			  this.armAngle -= Math.PI/100;


			if(this.armAngle < 0)
			  this.armAngle += Math.PI/100;
		
		
		}
		
		if(this.vehicleIn ==  1)
		{
			
			this.cranetimer++;
		//	this.angle = 0;
			if(this.cranetimer < 100) //roda posiçao inical
			{

				if(this.angle > -Math.PI)
			    {
			    	this.angle -= Math.PI/100;
			    }

				console.log(this.cranetimer);
			
			};
			
			if(this.cranetimer >= 100 && this.cranetimer < 130) // baixa o braço
			{
			
				if(this.armAngle > -Math.PI/8) // baixa
			 	{   
			    	this.armAngle -= +Math.PI/100;
			    	this.vehicleDisplay = 1;
			 	}
			}

		
			
			if(this.cranetimer >= 115 && this.cranetimer < 150) // levanta o braço
			{
				 
			  if(this.armAngle < 0)
			  {
			  		this.armAngle += Math.PI/100;
			  }
				
			}

			if(this.cranetimer > 150 && this.cranetimer < 250) // roda pi
			{
				if(this.angle < Math.PI/2)
					this.angle +=	Math.PI/100;

				
				if(this.cranetimer > 247 && this.cranetimer < 250)
					this.vehicle.position[1] -= 0.2;
					
			}
			
			if(this.cranetimer > 250) 
{
			this.vehicleDisplay = 0;
			this.sceneVehicle.position = [0,0,0];
			this.sceneVehicle.rotY = -this.vehicle.rotY;
			this.craneControl = 0;
} 
		}




		/*
		
		//baixar o braço

		this.armDown = 0;
		
		if(this.firstRotOver == 1)
		{
			if(this.armAngle > -Math.PI/8) // baixa
			    {
			    	this.armAngle -= +Math.PI/100;
			    	this.armDown = 0;
			    }
			    else
			    {
			    	this.firstRotOver = 0;
			    	this.armAngle = -Math.PI/8;
			    	this.armDown = 1;
			    }


		}

		
		// PASSAR DISPLAY

		//LEVANTAR

		
		if(this.armDown == 1)
		{
			

			if(this.armAngle < 0)
			  {
			  	this.armAngle += Math.PI/100;
			  	this.armUp = 0;
			  }
			  else
			  {
			  	this.armUp = 1;
			  }
		
		}



		// ROTACAO PARA O OUTRO LADO
		//

		

*/

	}

	display()
	{
		//this.scene.translate(0,this.high,0)
        this.scene.rotate(this.angle,0,1,0);	
	    
	    this.scene.pushMatrix();
	    if(this.vehicleDisplay == 1)
	    {
	    this.scene.translate(4 + 5*Math.cos(this.armAngle),6.75 + 5*Math.sin(this.armAngle)- 5.8,0);
	this.vehicle.currAppearance = this.sceneVehicle.currAppearance;	
		this.vehicle.currAppearance.apply();

	    this.vehicle.display();
	    }
	    else
	    {
	    	this.scene.translate(5.5,0,-1.5);
			this.scene.rotate(Math.PI/2,0,1,0);
	    }
	    this.scene.popMatrix();
		

        this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
	this.craneAppearance.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.translate(0,0,1);
        this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/6,0,1,0);
        this.scene.scale(1/3,1/3,7);
        this.cylinder.display();
        this.scene.popMatrix();


 		//suporte pendulo
 		this.scene.pushMatrix();
			this.scene.translate(4,6.75,-0.5);               // PONTO 4,6.75,-0.5
			this.scene.rotate(this.armAngle,0,0,1);
			this.scene.pushMatrix();
        		this.scene.pushMatrix();		
	    			this.scene.pushMatrix(); 			
        				this.scene.pushMatrix();
        					this.scene.rotate(Math.PI/2,0,1,0);
        					this.scene.translate(-1/2,1/4,5.5);
        					this.scene.scale(1/2,1/2,1);
        					this.circle.display()
       					    this.scene.popMatrix();
	    				this.scene.rotate(Math.PI/2,0,1,0);
	    					this.scene.translate(-1/2,1/4,1/2);
	    					this.scene.scale(1/2,1/2,5);
	    					this.cylinder.display();
	    					this.scene.popMatrix();
        			this.scene.rotate(Math.PI,0,1,0);
        			this.circle.display();
	    			this.scene.popMatrix();
	    	this.scene.translate(0,0,1);
	    	this.circle.display();
	    	this.scene.popMatrix();
	    	this.cylinder.display();
	    this.scene.popMatrix();

		//PENDULO
		

		this.scene.pushMatrix();
		this.scene.translate(4 + 5*Math.cos(this.armAngle),6.75 + 5*Math.sin(this.armAngle),0)
		this.scene.pushMatrix();
				this.scene.pushMatrix();
					this.scene.pushMatrix();
					this.scene.rotate(Math.PI/2,1,0,0);
					this.scene.scale(1/8,1/8,3);
        			this.cylinder.display();
        			this.scene.popMatrix();
        		this.scene.translate(0,-3,0);
       			this.scene.rotate(Math.PI/2,1,0,0);
        		this.cylinder.display();
     		   this.scene.popMatrix();
     	this.scene.translate(0,-3,0);
     	this.scene.rotate(Math.PI/2,1,0,0);
       	this.scene.rotate(Math.PI,1,0,0);
        this.circle.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

    	
        //iman (4,6.75,-0.5) + (5-0.5, 0 , 0) = (8.75,6.75,-0.5)
	};

};
