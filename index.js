document.addEventListener('DOMContentLoaded',()=>{

    const table = document.getElementById('ping_pong_table');
    const ball = document.getElementById('ball');
    const paddle = document.getElementById('paddle');

    // intial location of ball with respect to the table.
    let ballX = 10; 
    let ballY = 10;

    let dx = 3;  //displacement factor in x-direction
    //+x --> 2  and -x --> -2
    let dy = 3;  //displacement factor in x-direction
    ball.style.top = `${ballY}px`;
    ball.style.left = `${ballX}px`;

    //every second this will execute
    setInterval(function exec(){


        // added displacement in the X-dir and Y-dir
        ballX+=dx;
        ballY +=dy;

        //apply those changes on the ball element
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        // if(ballX<0 || ballX>700-20){
        //     dx = dx * -1;
        // }

        // if(ballY<0 ||ballY>400-20){
        //     dy = dy* -1;
        // }

        //checked that ball direction if it touch the boundary 
            //For left boundary is simple distance is 0
            //For right boundary if we put the table width then 
                //--> ball will exceed the right boundary because distance apply from the table to ball element.
            //For that table width - ball width to touch only right boundary.
        if(ballX<0 || ballX>table.offsetWidth - ball.offsetWidth){
            dx = dx * -1;
        }

        //checked that ball direction if it touch the boundary 
            //For top boundary is simple distance is 0
            //For bottom boundary if we put the table height then 
                //--> ball will exceed the bottom boundary because distance apply from table to ball element.
            //For that table height - ball height to touch only bottom boundary.
        if(ballY<0 ||ballY>table.offsetHeight - ball.offsetHeight){
            dy = dy* -1;
        }

        //changed direction if and only if the paddle touch the ball
        if(ballX< paddle.offsetLeft+paddle.offsetWidth  // x-distance 
            &&
            ballY > paddle.offsetTop                   // top-distance
            &&
            ballY - ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight // bottom distance
            ){
                dx = dx * -1;
                dy=dy*-1;
            }
    },10);

    let paddleY = 0;
    let dPy = 5;

    document.addEventListener('keydown',(event)=>{
        event.preventDefault();
        if(event.key == 'ArrowDown' && paddleY < table.offsetHeight - paddle.offsetHeight){
                paddleY +=dPy;
                paddle.style.top = `${paddleY}px`;
        }else if(event.key == 'ArrowUp' && paddleY >0){ 
                paddleY -=dPy;
        }
        paddle.style.top = `${paddleY}px`;
    });

    document.addEventListener('mousemove',(event)=>{
        const mouseDistanceFromTop = event.clientY;
        const tableDistanceFromTop = table.offsetTop;
        const mousePointControl = mouseDistanceFromTop - tableDistanceFromTop - paddle.offsetHeight/2;
        paddleY = mousePointControl;
        if(paddleY<0 || paddleY > table.offsetHeight - paddle.offsetHeight ) return;
        paddle.style.top = `${paddleY}px`;
    })
 





});