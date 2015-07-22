---
layout: default
title: Air Hockey App Documentation
permalink: /en-US/win10/samples/AirHockeyApp_Documentation.htm
lang: en-US
---

#Industrial Automation - Air Hockey App

##What is Industrial Automation?

Industrial automation involves the automation of manufacturing processes in industrial environments, which includes areas such as food processing, automotive manufacturing, and other manufacturing applications. Two key components of industrial automation are described below.

1. Programmable Logic Controller

An important component of industrial automation is the programmable logic controller (PLC). PLC devices interface with  equipment and sensors in order to implement process and real time control, which allows control of actuators such as servos and stepper motors. 

2. Machine Vision

A machine vision setup typically includes a camera paired with a computer system which runs the machine vision algorithms. These setups may also be paired with the aforementioned PLCs as part of an end-to-end automation solution.

##Goal

To demonstrate the utility of Windows 10 IoT Core in industrial automation, we automate a game of air hockey by building a robot arm which can compete against a human player.

This app, which has been tested on a MinnowBoard Max (x86 platform), demonstrates the following aspects of an Industrial Automation scenario:

*	Servo and motor controller interfacing
*	Low level sensor interfacing via I2C, GPIO, SPI
*	Near real-time support for implementing control loops
*	Human interface component (for example, a console that allow the user to view data and control the application)
*	Machine vision and camera interfacing

##Design

![High Level Architecture]({{site.baseurl}}/images/AirHockeyApp/AirHockeyDesign.png)

##Building and running the app

You can find this sample [here](https://github.com/ms-iot/samples-private/tree/rtm/AirHockeyApp){:target="_blank"}. Make a copy of the folder on your disk and open the project from Visual Studio.

Make sure you set the 'Remote Debugging' setting to point to your Windows IoT device. Go back to the basic 'Hello World' [sample](http://ms-iot.github.io/content-private/en-US/win10/samples/HelloWorld.htm) if you need guidance.

After selecting the appropriate platform for your device, deploy the app from Visual Studio by pressing F5. The app's home page is displayed below.

![Air Hockey App Home]({{site.baseurl}}/images/AirHockeyApp/airhockeypage.png)

A full demo of the app requires the hardware setup outlined in the design diagram in the previous section. See video for full demo.

##Let's Look at the Code

###PixyCam.cs

The PixyCam class, contained in the AirHockeyHelper project, has been adapted from C++ open source code. This class contains methods for interfacing with the PIXY Camera, a fast vision sensor. The SPI APIs are used by this class to interface with the hardware/camera. The PixyCam object is initialized as follows:

          public async Task Initialize()
          {
              var spiAqs = SpiDevice.GetDeviceSelector();
              var devicesInfo = await DeviceInformation.FindAllAsync(spiAqs);
              var settings = new SpiConnectionSettings(0);
              settings.ClockFrequency = 1000000;
              settings.DataBitLength = 8;
              settings.SharingMode = SpiSharingMode.Shared;
              
              Device = await SpiDevice.FromIdAsync(devicesInfo[0].Id, settings);
           }

This class contains methods which support the reading in of blocks of data (e.g. bytes, DWORD, etc). The block-read rate is determined in the game class, which determines the robot's response time. Important information contained in the block data includes the (x, y) coordinates of the block read in by the Pixy cam.

        private ObjectBlock getBlock()
        {
            byte[] readData = getBytes(10);
            if (readData != null)
            {
                ObjectBlock block = new ObjectBlock();
                block.Signature = BitConverter.ToUInt16(readData, 0);
                block.X = BitConverter.ToUInt16(readData, 2);
                block.Y = BitConverter.ToUInt16(readData, 4);
                block.Width = BitConverter.ToUInt16(readData, 6);
                block.Height = BitConverter.ToUInt16(readData, 8);
                
                return block;
            }
            return null;
        }

###AIHelper.cs

The AIHelper class includes methods which determine the robot's game mode and move type. 

Most importantly, this class contains utility functions for getting puck position, calculating the puck's trajectory and formulas for center of mass and line calculation, which are used to decide where the mallet should be moved to strike the puck.

               private void calculateLine(Point[] points)
               {
                 // Recalculate line
                 double val1 = 0, val2 = 0, val3 = 0, val4 = 0;
                 double n = points.Length;
                 if (n != 0)
                 {
                     for (int i = 0; i < n; i++)
                     {
                         val1 += points[i].X * points[i].Y;
                         val2 += points[i].X;
                         val3 += points[i].Y;
                         val4 += points[i].X * points[i].X;
                     }
                     
                     beta = (val1 - (1 / n) * val2 * val3) / (val4 - (1 / n) * (val2 * val2));
                     alpha = (1 / n) * val3 - beta * ((1 / n) * val3);
                 }
             }
             
             //Get puck path based on point returned from this method
             public Point getPuckTrajectory(double x)
             {
                 if (beta == 0)
                 {
                     return CoordinateHelper.INVALID_POINT;
                 }
     
                 double y = alpha + beta * x;
                 if (y >= 0 && y <= CoordinateHelper.VirtualHeight)
                 {
                     return new Point(x, y);
                 }
                 else
                 {
                     y = Helper.Constrain(y, 0, CoordinateHelper.VirtualHeight);
                     x = (y - alpha) / beta;
                     return new Point(x, y);
                 }
             }

The calculateMalletTargetV3() method is the key method that will be used to determine where the robot should move its mallet. Depending upon current mallet and puck position, acceleration and speed, the mallet should be moved to either hit the puck in an offensive mode or block the incoming puck in an offensive move.

          public Point calculateMalletTargetV3(Point currentPuckPosition, long currentTime)
          {
            puckPosition = currentPuckPosition;
            .
            .
            .
            // Puck is behind the mallet
            if (distanceFromMallet.X < 0)
            {
                // Defensive position in front of goal
                malletTargetOffset = defenseOffset;
                // Don't interrupt this move until we get to the destination
                DoNotInterrupt = true;
            }
            
            // Puck is moving away
            else if (prevCenterOfMass.X > centerOfMass.X)
            {
                // Defensive position in front of goal
                malletTargetOffset = defenseOffset;
            }
            .
            .
            .
            // Puck is moving towards mallet
            else if (prevCenterOfMass.X < centerOfMass.X)
            {
                trajectoryPoint = CoordinateHelper.CalculateTrajectoryPoint(prevCenterOfMass, centerOfMass, currentMalletPosition.X);
                
                if (trajectoryPoint == CoordinateHelper.INVALID_POINT)
                {
                    malletTargetOffset = CoordinateHelper.INVALID_POINT;
                }
                // We can block the puck from our current location (no Y movement)
                else if (trajectoryPoint.X == currentMalletPosition.X)
                .
                .
                .
            
            // We have a valid target destination for the mallet
            if (malletTargetOffset != CoordinateHelper.INVALID_POINT)
            {
                // Constrain offset so that mallet doesn't move too far
                malletTargetOffset.X = Helper.Constrain(malletTargetOffset.X, 0, Config.MAX_MALLET_OFFSET_X);
                malletTargetOffset.Y = Helper.Constrain(malletTargetOffset.Y, 0, Config.MAX_MALLET_OFFSET_Y);
            }
            .
            .
            .
            return malletTargetOffset;
        }

###Config.cs

This class defines the default values for mallet position, air hockey table mapping and motor speeds and acceleration. The values correspond to the setup of the hockey table as seen in the demo video. MAX_MALLET_OFFSET is defined as the number of steps required to get the mallet from one end of the table

          public struct Config
          {
              public static float
              MOTOR_X_MAX_SPEED = 100000,
              MOTOR_Y_MAX_SPEED = 70000,
              MOTOR_X_ACCELERATION = 1000000,
              MOTOR_Y_ACCELERATION = 600000;
              
               // Default values, not const because Calibration can adjust values
               public static int MAX_MALLET_OFFSET_X = 2681;
               public static int MAX_MALLET_OFFSET_Y = 2462;
               
               public const long TABLE_HEIGHT = 766;
               public const long TABLE_MID_X_COORDINATE = 950;
               public const long TABLE_GOAL_Y_TOP = TABLE_HEIGHT / 2 - 150;
               public const long TABLE_GOAL_Y_BOTTOM = TABLE_HEIGHT / 2 + 150;
          }

###Global.cs

This class contains a static Stopwatch object which is used to monitor time during game play.

###Helper.cs

This class contains static methods for computing the distance between two points and computing coefficients in a system of linear equations. 

The ComputeCoefficients() method is shown below. Here, given two coefficient matrices, we compute coefficients to solve a system of linear equations. The result is then used to fix lens distortion from the camera in the CoordinateHelper class to translate camera coordinates. This improves the precision our system and our ability to accurately track the mallet, puck position, etc.

        public static double[] ComputeCoefficents(double[,] X, double[] Y)
        {
            // Used for calibration
            int I, J, K, K1, N;
            N = Y.Length;
            for (K = 0; K < N; K++)
            {
                K1 = K + 1;
                for (I = K; I < N; I++)
                {
                    if (X[I, K] != 0)
                    {
                        for (J = K1; J < N; J++)
                        {
                            X[I, J] /= X[I, K];
                        }
                        Y[I] /= X[I, K];
                    }
                }
                for (I = K1; I < N; I++)
                {
                    if (X[I, K] != 0)
                    {
                        for (J = K1; J < N; J++)
                        {
                            X[I, J] -= X[K, J];
                        }
                        Y[I] -= Y[K];
                    }
                }
            }
            for (I = N - 2; I >= 0; I--)
            {
                for (J = N - 1; J >= I + 1; J--)
                {
                    Y[I] -= X[I, J] * Y[J];
                }
            }
            return Y;
        }

###CoordinateHelper.cs

This class contains functions to translate camera coordinates and calculate puck trajectory points. 

Initialization involves setting the default calibration/mapping of the table. 

        public static void Initialize(double virtualWidth, double virtualHeight)
        {
            VirtualWidth = virtualWidth;
            VirtualHeight = virtualHeight;
            
            setDefaultCalibration();
        }
        
Good calibration is required for the accuracy of our system. The setDefaultCalibration() method requires the computation of coefficients, which is accomplished by invoking a method from the Helper.cs class.

        private static void setDefaultCalibration()
        {
            // Set pre-calibrated points
            topLeft = new Point(17, 20);
            topRight = new Point(299, 30);
            topCenter = new Point(160, 12);
            bottomLeft = new Point(12, 170);
            bottomRight = new Point(293, 182);
            bottomCenter = new Point(155, 190);
            center = new Point(156, 100);
            centerLeft = new Point(9, 96);
            centerRight = new Point(303, 107);
            .
            .
            .
            // Calculate coefficients for the quadratic equations to help account for curvature distortion in lens
            topQuadraticCoeff = Helper.ComputeCoefficents(
                new double[,] {
                    { Math.Pow(topLeft.X, 2), topLeft.X, 1 },
                    { Math.Pow(topCenter.X, 2), topCenter.X, 1 },
                    { Math.Pow(topRight.X, 2), topRight.X, 1 }
                },
                new double[] { topLeft.Y, topCenter.Y, topRight.Y }
            );


 ###AccelStepper.cs

This class is contained in the AirHockeyHelper project. The robot arm used in the air hockey setup is controlled by motors. This class contains functions allowing the app to interface between the robot's stepper motors and control motor movement. Interfacing with the hardware motors is made possible by GPIO APIs. 

The methods in this class allow us to determine when and where to move the motors and by what degree (i.e. how many steps, what direction). AccelStepper supports and provides functions for the following features:
  ####Acceleration/decceleration of motors. 
  
 To set a new acceleration value we must compute the number of steps required reach a goal speed as a function of old and new acceleration. 

          public void SetAcceleration(float accelerationValue)
          {
                if (accelerationValue == 0.0)
                    return;
                if (acceleration != accelerationValue)
                {
                    n = (long)(n * (acceleration / accelerationValue));
                    .
                    .
                    .
                    
                    
  In this method we also update the initial timer count as a function of new acceleration value
                    .
                    .
                    .
                    c0 = (float)(0.676 * Math.Sqrt(2.0 / accelerationValue) * TimeSpan.TicksPerSecond); // Equation 15
                    acceleration = accelerationValue;
                    computeNewSpeed();
                }
              }
            
####Computing speeds 

In this method we compute number of steps required to read maximum speed as a function of both speed and acceleration

            public void SetMaxSpeed(float speedValue)
            {
                if (maxSpeed != speedValue)
                {
                    maxSpeed = speedValue;
                    cmin = TimeSpan.TicksPerSecond / speedValue;
                    // Recompute n from current speed and adjust speed if accelerating or cruising
                    if (n > 0)
                    {
                        n = (long)((speed * speed) / (2.0 * acceleration)); // Equation 16
                        computeNewSpeed();
                    }
                }
            }

Computing a new speed and decisions to accelerate or stop require knowledge of the robot's proximity to the target.

            if (distanceTo > 0)
            {
                // We are anticlockwise from the target
                // Need to go clockwise from here, maybe decelerate now
                if (n > 0)
                {
                    // Currently accelerating, need to decel now? Or maybe going the wrong way?
                    if ((stepsToStop >= distanceTo) || direction == Direction.CounterClockwise)
                        n = -stepsToStop; // Start deceleration
                }
                else if (n < 0)
                {
                    // Currently decelerating, need to accel again?
                    if ((stepsToStop < distanceTo) && direction == Direction.Clockwise)
                        n = -n; // Start accceleration
                }
            }
            .
            .
            .
              // Need to accelerate or decelerate
              if (n == 0)
              {
                  // First step from stopped
                  cn = c0;
                  direction = (distanceTo > 0) ? Direction.Clockwise : Direction.CounterClockwise;
              }
              else
              {
                  // Subsequent step. Works for accel (n is +_ve) and decel (n is -ve).
                  cn = cn - ((2.0f * cn) / ((4.0f * n) + 1)); // Equation 13
                  cn = Math.Max(cn, cmin);
              }
              .
              .
              .
              
The speed calculation is then used to adjust the direction and movement of motors and "step" the motors by writing values ot the GPIO pins

            public void Step(long step)
            {
                if (!Debug)
                {
                    if (speed > 0)
                    {
                        directionPin.Write(clockwiseValue);
                    }
                    else
                    {
                        directionPin.Write((clockwiseValue == GpioPinValue.High) ? GpioPinValue.Low : GpioPinValue.High);
                    }
                    motorPin.Write(GpioPinValue.Low);
                    motorPin.Write(GpioPinValue.High);
                }
            }
            
###MotorHelper.cs

This class contains contains the GetCoordinatesFromOffset() method which is used by the AIHelper to calculate the robot's mallet current and target positions required to strike the puck.

      // Used to get current mallet and target positions
        public static Point GetCoordinatesFromOffset(Point offset)
        {
            double x = GetCoordinateXFromOffsetY((long)offset.Y);
            double y = GetCoordinateYFromOffsetX((long)offset.X);
            
            return new Point(x, y);
        }

Preassigned mallet offset values are used in coordinate calculations:

          public static double GetCoordinateYFromOffsetX(long offset)
          {
              double pointYLength = maxPoint.Y - zeroPoint.Y;
              double ratioY = (double)offset / Config.MAX_MALLET_OFFSET_X;
              double y = ratioY * pointYLength + zeroPoint.Y;
              
              return y;
          }
          

###Robot.cs

The Robot class contains methods for interfacing with the sensors and coordinating the control of the motors.

This class contains two Stepper motors, with one motor used to determine the robot's mallet movement in the X-axis and the other to govern movement in the Y-axis.

      public AccelStepper StepperX, StepperY;

The robotic arm is supported on a guide rail. Limit switch pins are used to detect the ends of the guard rails.

        private const int LIMIT_SWITCH_PIN_X1 = 0;
        private const int LIMIT_SWITCH_PIN_X2 = 1;
        private const int LIMIT_SWITCH_PIN_Y1 = 2;
        private const int LIMIT_SWITCH_PIN_Y2 = 3;
        
        // Y sensors go low when triggered, X sensors go high when triggered
        private GpioPin LimitSwitchPin_X1;  // Right 
        private GpioPin LimitSwitchPin_X2;  // Left
        private GpioPin LimitSwitchPin_Y1;  // Bottom
        private GpioPin LimitSwitchPin_Y2;  // Top

Event handlers are used to capture when a goal is triggered

        public event EventHandler<EventArgs> RobotGoalSensorTriggered;
        public event EventHandler<EventArgs> HumanGoalSensorTriggered;
        .
        .
Robot initialization includes initiating of the GPIO controller and the opening and setting to initial values of the motor, limit switch and goal sensor pins.

        private void initialize()
        {
            controller = GpioController.GetDefault();
            
            initializeLimitSwitches();
            initializeMotors();
            initializeGoalSensors();
        }

A key method, MoveStraightToOffset(), is described below as follows:

Observe that we first if the current motor positions are already at the offset; if so, return. If the coordinates are currently not at the offset, a new max speed is set for the stepper motors by taking the minimum of Motor X and Motor Y's maximum speed.

          public void MoveStraightToOffset(Point offset)
          {
              .
              .
              .
              float diffX = (float)Math.Abs(StepperX.CurrentPosition() - offset.X);
              float diffY = (float)Math.Abs(StepperY.CurrentPosition() - offset.Y);
              
              if (diffX > 0 && diffY > 0)
              {
                  float newAccelY = Config.MOTOR_Y_ACCELERATION;
                  float newAccelX = Config.MOTOR_X_ACCELERATION;
                  
                  long minMaxSpeed = (long)Math.Min(Config.MOTOR_X_MAX_SPEED, Config.MOTOR_Y_MAX_SPEED);
                  StepperX.SetMaxSpeed(minMaxSpeed);
                  StepperY.SetMaxSpeed(minMaxSpeed);
                  .
                  .
                  .
                  
                  // We need to move more in the X direction than Y, so Y accel will be slower than X accel
                  if (diffX > diffY)
                  {
                      if (Config.MOTOR_Y_ACCELERATION < Config.MOTOR_X_ACCELERATION)
                      {
                          newAccelY = diffY / diffX * Config.MOTOR_X_ACCELERATION;
                          if (newAccelY > Config.MOTOR_Y_ACCELERATION)
                          {
                              newAccelX = Config.MOTOR_X_ACCELERATION * (Config.MOTOR_Y_ACCELERATION / newAccelY);
                              newAccelY = Config.MOTOR_Y_ACCELERATION;
                          }
                      }
                      else
                      {
                          newAccelY = diffY / diffX * Config.MOTOR_X_ACCELERATION;
                          newAccelX = Config.MOTOR_X_ACCELERATION;
                      }
                  }
                  // We need to move more in the Y direction, so X accel will be slower than Y accel
                  else
                  {
                      if (Config.MOTOR_Y_ACCELERATION < Config.MOTOR_X_ACCELERATION)
                      {
                          newAccelX = diffX / diffY * Config.MOTOR_Y_ACCELERATION;
                          newAccelY = Config.MOTOR_Y_ACCELERATION;
                      }
                      else
                      {
                          newAccelX = diffX / diffY * Config.MOTOR_Y_ACCELERATION;
                          if (newAccelX > Config.MOTOR_X_ACCELERATION)
                          {
                              newAccelY = Config.MOTOR_Y_ACCELERATION * (Config.MOTOR_X_ACCELERATION / newAccelX);
                              newAccelX = Config.MOTOR_X_ACCELERATION;
                          }
                      }
                  }
                  StepperX.SetAcceleration(newAccelX);
                  StepperY.SetAcceleration(newAccelY);
              }
              MoveToOffset(offset);
          }
          
###MainPage.xaml.cs

This class defines the home page for the app. 4 tiles are available on this page:

1. Start Game: Primary game mode, resets the motors and initializes a game of air hockey with scorekeeping
2. Test: This mode is used in the game class. It allows testing the AccelStepper functions without the hockey table. Runs the robot's motors and returns to the default position after test ends.
3. Mirror: This mode, used in the Game class, tests the PIXYCam's ability to track the motion of the puck, visualized on the screen
4. Diagnostics: Commences a game of air hockey with no scorekeeping. Tests robot's decision making functions as well as methods from the UI helper class.

###Game.xaml.cs

This class contains provides the user interface for the human player and governs the robot's actions based on the mode selected in the home page

In addition to drawing the UI, this class contains the runDecisionThread() provides the decision-making logic of the game. AI Helper methods are used by the robot to determine the mallet's target.

Importantly, the reading of the camera data, and decision-making routines are run in a high priority thread separate from the UI thread. This is done so that the UI isn't blocked while the robot is operational.

        private void runDecisionThread(Point puckPosition)
        {
            ThreadPool.RunAsync((s) =>
            {
                Point malletOffset;
                
                if (gameMode == GameMode.Mirror || mirrorMode)
                {
                    // Mirror the puck
                    double yOffset = MotorHelper.GetOffsetYFromCoordinateX(virtualWidth - puckPosition.X);
                    double xOffset = MotorHelper.GetOffsetXFromCoordinateY(puckPosition.Y);
                    
                    if (Math.Abs(xOffset - robot.StepperX.CurrentPosition()) < 50)
                    {
                        xOffset = robot.StepperX.CurrentPosition();
                    }
                    
                    if (Math.Abs(yOffset - robot.StepperY.CurrentPosition()) < 50)
                    {
                        yOffset = robot.StepperY.CurrentPosition();
                    }
                    
                    malletOffset = new Point(xOffset, yOffset);
                }
                else
                {
                    // Figure out where the mallet should move
                    malletOffset = robot.AI.calculateMalletTargetV3(puckPosition, Global.Stopwatch.ElapsedMilliseconds);
                }
                
                if (malletOffset != CoordinateHelper.INVALID_POINT)
                {
                    // Set the destination for stepper motors
                    if (!robot.AI.DoNotInterrupt)
                    {
                        switch (robot.AI.Move)
                        {
                            case MoveType.Fast:
                                robot.MoveFastToOffset(malletOffset);
                                break;
                            case MoveType.Straight:
                                robot.MoveStraightToOffset(malletOffset);
                                break;
                        }
                    }
                }
            });
        }
