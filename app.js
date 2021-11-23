const placeIp = document.querySelector("#places");
const transitionIp = document.querySelector("#transitions");
const arcIp = document.querySelector("#arcs");

const btn = document.querySelector(".btn");
const resOp = document.querySelector("#result");

const getPlaceCode = function(s) {
    let label, nT, x, y
    [label, nT, x, y] = s.split(" ");
    const code =  `\\node[place, tokens=${nT}, label=$${label}$] (${label}) at (${x},${y}) {};`

    return code;
}

const getTransCode = function(t) {
    let label, x, y
    [label, x, y] = t.split(" ")
    const code =  `\\node[transition, label=$${label}$] (${label}) at (${x},${y}) {};`

    return code;
}

const getArcsCode = function(a) {
    let sou, des;
    [sou, des] = a.split(" ");
    const code = `(${sou}) edge[post] (${des})`
    return code;
}


const generate = function(){
    const s = 
    `\\begin{tikzpicture}[
        thick,
          node distance=2cm,
          on grid,
          pre/.style={<-, shorten <=1pt, >={Stealth}},
          post/.style={->,shorten >=1pt, >={Stealth}},
          every transition/.style={fill,minimum width=3mm, minimum height=10mm},
          every place/.style={fill=blue!25,draw=blue!75},
          every label/.style={black}]
    ]`;

    const e = 
    `\\end{tikzpicture}`
    let output = s + "\n";
    let places = placeIp.value.split("\n");
    let trans = transitionIp.value.split("\n");
    let arcs = arcIp.value.split("\n");
    places.forEach(p => {output += getPlaceCode(p) + "\n"})
    trans.forEach(t => {output += getTransCode(t) + "\n"})
    output += "\\draw";
    arcs.forEach(a => output += "\n" + getArcsCode(a));
    output += ";\n" + e;

    resOp.value = output;

}

btn.addEventListener("click", generate);