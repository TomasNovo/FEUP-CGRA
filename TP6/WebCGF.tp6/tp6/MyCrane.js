class MyCrane extends CGFobject
{
	constructor(scene, car) 
	{
		super(scene);
		this.scene = scene;
		this.car = car;
		this.initBuffers();
	};

	initBuffers() 
	{
	    this.cylinder = new MyCylinder(this.scene,12,12);
	    this.circle = new MyCircle(this.scene,12,12);
		this.angle = 0;

		this.vehicle = new MyVehicle(this.scene);

		this.arm = new MyArm(this.scene,12,12);

		this.armAngle = 0;
		this.vehicleIn = 0;

		this.cranetimer = 0;
		
	};


	//craneVehicleUpdate(car)
	//{	
		//this.vehicle = car;	
	//}


	checkCarPosition(posX, posZ, speed)
	{

		if( (posZ > 8 && posZ < 12) && (posX > -12 && posX < -8) && speed == 0 ) {
			this.vehicleIn = 1;
			//console.log("ENTROU NO TARGET!");
		}
		else
		{
			this.cranetimer = 0;
			this.vehicleIn = 0;
		}
		//console.log("X : "+posX+"\nZ : "+posZ);
	}



	updateCrane()
	{

/*		if(this.vehicle.position[0] >= 5 && this.vehicle.position[0] <= 7.5 )
			if (this.vehicle.position[2] >= 13 && this.vehicle.position[0] <= 19)
		  		this.crane.vehicleIn = 1;
*/


		//rodar para o target
		
		
		if(this.vehicleIn ==  1 && this.car.velocity==0)
		{
			this.car.isCarOnCrane = true;
			this.cranetimer++;

			if(this.cranetimer < 50) //roda posiçao inical
			{

				if(this.angle > -Math.PI/2)
			    {
			    	this.angle -= Math.PI/100;
			    }

				//console.log(this.cranetimer);
			
			};
			
			if(this.cranetimer >= 70 && this.cranetimer < 100) // baixa o braço
			{
			
				if(this.armAngle > -Math.PI/8) // baixa
			 	{   
			    	this.armAngle -= +Math.PI/100;
			 	}
			}

		
			
			if(this.cranetimer >= 115 && this.cranetimer < 140) // levanta o braço
			{
				 
			  if(this.armAngle < 0)
			  {
			  		this.armAngle += Math.PI/100;
			  }
				
			}

			if(this.cranetimer > 141 && this.cranetimer < 250)
			{
				console.log("!!!! "+this.cranetimer); 
				if(this.angle < Math.PI/2)
					this.angle +=	Math.PI/100;
				if(this.cranertimer==249) {
					this.car.isCarOnCrane = false;
					this.car.position[0] = 20;
				}

			}


			if(this.cranetimer > 270)
			{
				if(this.angle > 0)
					this.angle -= Math.PI/100;
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

        this.scene.rotate(this.angle,0,1,0);
	
	//if(this.car.isCarOnCrane) {
		this.car.scene.pushMatrix();
		this.car.scene.translate(0,0,7);
		this.car.display();
		this.car.scene.popMatrix();
	//}

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
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
	};

};
