function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let running = true;

let mid_air = false;

const JUMP_HEIGHT = 150; //Bigger = Higher

const JUMP_SPEED = 0.00000000000000000000000000000000001; //Lower = Faster

const MOVEMENT_SPEED = 5; //Lower = Faster

const stop = document.getElementById("stop");

function death_screen(){
    const frame = document.getElementById("frame");
    frame.style.backgroundColor = "#121212";
    const death_text = document.createElement("div");
    death_text.classList.add("death");
    death_text.appendChild(document.createTextNode("Massive Skill Issue"));
    frame.appendChild(death_text);
}

function hitboxes(scrheight, dstat){
    const player = document.getElementById("player");
    const player_w = player.offsetWidth;
    const player_h = player.offsetHeight;

    const spike = document.getElementById("spiglys");

    const pleft = parseInt(player.style.left);
    const ptop = parseInt(player.style.bottom + player_h);
    const pbot = parseInt(player.style.bottom);
    const sleft = parseInt(getComputedStyle(spike).left);
    const stop = parseInt(scrheight - parseInt((0 + spike.offsetHeight)));
    const sbot = 0;
    //FIXME: baD HITBOXES :()
    if(!(pleft > sleft + spike.offsetWidth ||
        pleft + player_w < sleft ||
        ptop > stop + spike.offsetHeight ||
        pleft + player_h < stop)){
        //console.log("Rip Bozo");
        //console.log(pleft, ptop, pbot, sleft, stop, sbot);
        dstat.t = true;
    }

}
async function main_loop(){
    await sleep(1000);

    const frame = document.getElementById("frame");
    let levellength = frame.offsetWidth-41;
    let dead = {t: false};
    console.log(levellength);
    const player = document.getElementById("player");
    let once = 0;
    player.style.bottom = 0;
    console.log(frame.offsetHeight - player.offsetHeight + player.bottom, frame.offsetHeight);
    while (once < 1){
        
        if (running === false) {
            break;
        }
        console.log(running);
        for (let i = 0; i < levellength; ++i){
            console.log("Death status", dead.t);
            if (dead.t === true){
                death_screen();
                break;
            }
            if (running === false) {
                break;
            }
            await sleep(MOVEMENT_SPEED);
            player.style.left = `${i}px`;
            frame.addEventListener("click", jump);
            stop.addEventListener("click", stopTheLoop);
            hitboxes(frame.offsetHeight, dead);
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