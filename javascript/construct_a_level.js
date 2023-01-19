if ('content' in document.createElement('template')) { 
    const POSITION_BETWEEN = 4;
    const frame = document.getElementById("frame");
    const levellength = frame.offsetWidth-41;
    const spiketempl = document.getElementById("spike");
    for (let i = 0; i < levellength; ++i){
        const clone_spike = spiketempl.content.cloneNode(true);
        //clone_spike.style.left = `${POSITION_BETWEEN * 2}em`;
        console.log(clone_spike);
        clone_spike.style.right = "5em";
        frame.appendChild(clone_spike);
    }
}