import {startVisualize} from "./../network_graph.js"

var nodes = []
var links = []

function create2DArray(m,n){
    var array = []
    for (let i=0; i<m; i++){
        array.push(new Array(n).fill(0))
    }
    return array
}

function createLMatrix(nodes,links){

    var matrix = create2DArray(nodes.length, nodes.length)

    for (let i=0; i<links.length; i++){

        s_index = +links[i].source
        t_index = +links[i].target

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


    let laplace = createLMatrix(nodes,links)
    
    return math.eigs(laplace)
    
}



window.onload = function(){

    random_graphs.generate_erdos_renyi(10,.4)
    // links.forEach(function(link){
    //     link.source = nodes[link.source]
    //     link.target = nodes[link.target]
    // })
    startVisualize()
    // this.network.simulation.stop()

    this.Clustering(nodes,links)
    

}
