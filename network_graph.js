var nodes = []
var links = []
var network = {circle:null, simulation:null}
var sirData = {
    nrinfected: 0,
    nrsuspected: 0,
    nrrecovered: 0,
    beta: null,
    mu: null
    
}

var buttons = {
    start: false,
    stop: false
}

random_graphs = {

    generate_erdos_renyi : function (size, probs){
        nodes = []
        links = []
        
        for (let i=0; i<size; i++) {
            nodes.push({id:i.toString(), state:"s"})
        }

        for (let i=0; i<nodes.length; i++){
            for (let j=i+1; j<nodes.length; j++){
                
                // console.log(val)
                if (Math.random()<probs){
                    links.push({source:i.toString(), target:j.toString()})
                }
            }
        }

    }

};


links.forEach(function(link){
    link.source = nodes[link.source]
    link.target = nodes[link.target]
})


function resetData(){
    sirData.nrsuspected = 0
    sirData.nrinfected = 0
    sirData.nrrecovered = 0
    buttons.stop = false
}

function OnClick(){

    resetData()
    EventListner.removeListner_btn("run2", "click", OnClick)
    buttons.stop = false
    EventListner.addListner_btn("stop2","click",bind_btn)

    
    beta = Number(document.getElementById("beta-graph").value)
    mu = Number(document.getElementById("mu-graph").value)
    nr_nodes = Number(document.getElementById("nodes").value)
    console.log(nr_nodes,beta,mu)
    random_graphs.generate_erdos_renyi(nr_nodes,.2)
    startVisualize()
    sirData.nrsuspected = nr_nodes
    sirData.beta = beta
    sirData.mu = mu


    index = Math.floor(Math.random()*nr_nodes)
    nodes[index].state = "i"
    sirData.nrinfected = sirData.nrinfected + 1;
    sirData.nrsuspected = sirData.nrsuspected -1;
    console.log(sirData)
    
    setTimeout(init_graph_SIR,2000)


}


function init_graph_SIR(){
    
    // Infections
    for (let i=0; i<links.length; i++){
        s = links[i].source
        t = links[i].target
        if (s.state==="i" && t.state==="s" || t.state==="i" && s.state==="s"){
            
            if (Math.random()<sirData.beta){
                if (s.state==="i") t.state = "ni"
                else s.state = "ni"
                sirData.nrsuspected = sirData.nrsuspected -1;
                sirData.nrinfected = sirData.nrinfected +1;
            }
            
        }
    }
    // Recoveries

    for (let i=0; i<nodes.length; i++){
        if (nodes[i].state === 'i'){
            if (Math.random()<sirData.mu){
                nodes[i].state = "r"
                sirData.nrinfected = sirData.nrinfected -1
                sirData.nrrecovered = sirData.nrrecovered +1;
        }
        }
        else{
            if (nodes[i].state==="ni"){
                nodes[i].state = "i"
            }
    }}
    refreshVisualize()
    console.log("value ",sirData.nrinfected)
    if (sirData.nrinfected>0 && buttons.stop===false){
        setTimeout(init_graph_SIR,1000)
    }
    else{
        EventListner.addListner_btn("run2","click", OnClick)
        EventListner.removeListner_btn("stop2","click", bind_btn)
    }


}

function bind_btn(){
    if (buttons.stop===true) buttons.stop = false
    else buttons.stop = true
}


function startVisualize(){

    document.getElementById("graph").textContent = ''

    width = 600
    height = 500
    const svg = d3.select('#graph')
        .attr("width",width)
        .attr("height",height)

    const group = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        

    network.circle = group.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 13)
    .attr("cx",width/2)
    .attr("cy", height/2)
    .attr("fill","blue")
    .call(drag(network.simulation));

    const line = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)


    network.simulation = d3.forceSimulation(nodes)
        .force("center",d3.forceCenter(width/2,height/2))
        .force("link",d3.forceLink(links).distance(10*nodes.length))
        .force("charge",d3.forceManyBody())
        .force("collide", d3.forceCollide(20))
        .on("tick", (d)=>{
            
            line
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        
            network.circle
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("fill",(d)=>{
                    if (d.state==="s") return "blue"
                    if (d.state==="i") return "red"
                    if (d.state==="r") return "green"
                })
        })
        

    

}

drag = simulation => {
  
    function dragstarted(d) {
      if (!d3.event.active){
          console.log(simulation)
           simulation.alphaTarget(1).restart();}
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}


function refreshVisualize(){
    
    network.circle.attr("fill",(d)=>{
        
        if (d.state==="s") return "blue"
        if (d.state==="i") return "red"
        if (d.state==="r") return "green"
    })
}


  
