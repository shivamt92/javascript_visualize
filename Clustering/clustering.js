import {startVisualize, random_graphs, nodes, links, network} from "./../network_graph.js"


function create2DArray(m,n){
    var array = []
    for (let i=0; i<m; i++){
        array.push(new Array(n).fill(0))
    }
    return array
}

function createLMatrix(nodes,links){

    console.log(nodes,links)
    var matrix = create2DArray(nodes.length, nodes.length)
    console.log(matrix)
    for (let i=0; i<links.length; i++){

        let s_index = +links[i].source
        let t_index = +links[i].target
        // console.log(s_index,t_index)
        matrix[s_index][t_index]++;
        matrix[t_index][s_index]++;

    }
    var degree = new Array(matrix.length)

    for (let i=0; i<matrix.length; i++){
        let sum=0
        for (let j=0; j<matrix.length; j++){
            sum= sum+matrix[i][j]
        }
        degree[i] = sum
    }
    
    var laplace = create2DArray(degree.length,degree.length)
    
    for (let i=0; i<laplace.length; i++){
        
        for (let j=0; j<laplace.length; j++){
            if (i===j) laplace[i][j]= degree[i]
            else laplace[i][j] = -matrix[i][j]
            
        }
    }

    return laplace
    
}

function Clustering(nodes,links){

    return math.eigs(createLMatrix(nodes,links))
}

function visualize_Community(eigens){

    document.getElementById("graph").textContent = ''

    let width = 600
    let height = 500
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
    .attr("draggable","true")
    .on("mouseover", mouseoverHandler)
    .call(d3.drag()
        .on("start", dragstart)
        .on("drag", dragging)
        .on("end", draggend))
    
    group.append("text")
    


    function mouseoverHandler(d,i){
        // console.log("ssse",this)
        // console.log(d3.select("g").select('text'))
        d3.select("g").select('text')
        .text("hello")
        // .attr("text",(d)=>{if (d.state == 'i') return "Infected"
        //                     if (d.state == 's') return "Susceptible"
        //                     else return "Recovered"            
    // })

    }

    function dragstart(d,i){
        if (!d3.event.active) network.simulation.alphaTarget(0.3).restart()
        
        d.fx = null
        d.fx = null

    }

    function dragging(d,i){
        
        if (!d3.event.active) network.simulation.alphaTarget(0.3).restart()

        d.fx = d3.event.x;
        d.fy = d3.event.y;
        
    }

    function draggend(d,i){
        
        if (!d3.event.active) network.simulation.alphaTarget(0.3).restart()
        
        d.fx = null;
        d.fy = null;
    }

    // .call(drag(network.simulation));

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
        .force("charge",d3.forceManyBody().strength(-40))
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
                .attr("fill",(d,i)=>{
                    if (eigens.vectors[1][i]<0) return "red"
                    else return "green"
                })
        })
        

}
// function displayCommunity(eigens){
//     console.log("Trying to display")
    

//     d3.selectAll("circle")
//     .attr("fill", (d,i)=>{
//         // console.log(d,i)
//         if (eigens.vectors[2][i]>0) return "red"
//                         else return "green"})
// }

window.onload = function(){

    random_graphs.generate_erdos_renyi(15,.3)
    const eigens = Clustering(nodes,links)
    visualize_Community(eigens)
    


}
