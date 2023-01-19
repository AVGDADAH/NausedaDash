function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let running = true;

let mid_air = false;

const JUMP_HEIGHT = 70;

const JUMP_SPEED = 0.005;

const MOVEMENT_SPEED = 3;

const stop = document.getElementById("stop");
    //TODO:Add hitboxes, using an array, check if a collision happened by checking if the obstacle's rightmost coordinate is at the hitbox
//Function//
async function main_loop(){
    await sleep(1000);

    const frame = document.getElementById("frame");

    let levellength = frame.offsetWidth-41;

    console.log(levellength);

    let once = 0;
    while (once < 1){
        if (running == false) break;
        console.log(running);
        for (let i = 0; i < levellength; ++i){
            if (running === false) {
                delete frame;
                break;
            }
            await sleep(MOVEMENT_SPEED);
            const player = document.getElementById("player");
            player.style.left = `${i}px`;
            frame.addEventListener("click", jump);
            stop.addEventListener("click", stopTheLoop);
            }
            ++once;
        }
    }

function stopTheLoop(){
    stop.style.backgroundColor = "#52b025";
    stop.innerHTML = "Stopped :)";
    running = false;
}
async function jump(){
    const player = document.getElementById("player");
    if (mid_air === true) {
        console.log("Please wait for the player to land");
        return 0;
    }
    mid_air = true;
    for (let i = 0; i < JUMP_HEIGHT; ++i){
        await sleep(JUMP_SPEED);
        player.style.bottom = `${i}px`;
    }
    for (let i = JUMP_HEIGHT; i > 0; --i){
        await sleep(JUMP_SPEED);
        player.style.bottom = `${i}px`;
    }
    mid_air = false;
}

main_loop();