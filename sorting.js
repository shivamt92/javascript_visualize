var data = []
var q_i = null
var sort = {}

function isSorted(data){
    for (let i=1; i<data.length;i++){
        if (data[i]<data[i-1]){console.log("not sorted")}
    }

    console.log("sorted")

}

async function SelectionSort(){
    svg = d3.select("#graph")
    svg.selectAll("text").data(["Selection Sort"]).enter().append("text")
            .attr("x", 20)
            .attr("y", svg.attr("height")-20)
            .text( function(d){return d})
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "red")
    
        for (let i=0; i<data.length; i++){
            
            min = data[i]
            index = i
            for (let j=i; j<data.length; ++j){
    
                
                if (data[j]<min){
                    min=data[j]
                    index =j
                    
            }}
            data[index] = data[i]
            data[i] = min
            
            rect = d3.select("#graph").selectAll("rect").data(data)
            d3.select("rect:nth-child("+i+")").attr("fill","red")
            d3.select("rect:nth-child("+index+")").attr("fill","red")
            // d3.select(rect[i]).transition(400).attr("fill","red").end()

        // console.log(data)
            await rect
            .transition()
            .duration(400)
            .attr("fill", (d)=>{return sort.color(d)})
            .attr("height",(d)=>{return sort.yScale(d)})
        .end()
            
        }
    
}

async function InsertionSort(){
    
    for (let i=1; i<data.length; i++){
        val = data[i]
        let index  = i
        d3.select('rect:nth-child('+i+')').attr("fill","red")

        for (let j=i-1; j>-1; j--){
            if (data[i]<data[j]){
                index = j
                
            } 
        }
        let temp = data[i]
        for (let k=i-1; k>=index; k--){
            d3.select('rect:nth-child('+k+')').attr("fill","red")
            // d3.select('rect:nth-child('+k+1+')').attr("fill","red")

            data[k+1] = data[k]
            
            await d3.select("#graph").selectAll("rect").data(data)
        .transition()
        .duration(200)
        .attr("fill", (d,n)=>{
            if (n==i){return "red"} else return sort.color(d)})
        .attr("height",(d)=>{return sort.yScale(d)})
    .end()

        }
        data[index] = temp
        
        console.log(data)
        rect = d3.select("#graph").selectAll("rect").data(data)
        
    console.log(data)
        await rect
        .transition()
        .duration(200)
        .attr("fill", (d)=>{return sort.color(d)})
        .attr("height",(d)=>{return sort.yScale(d)})
    .end()
        
    }

}

async function QuickSort(){

    function swap(leftIndex, rightIndex){
        var temp = data[leftIndex];
        data[leftIndex] = data[rightIndex];
        data[rightIndex] = temp;
    }


    async function partition(left, right) {
        var pivot_val = Math.floor((right + left) / 2)
        var pivot   = data[pivot_val] //middle element
        console.log("in partition ",pivot_val)
        if (pivot_val>=1 && pivot_val<=50){
            var x = await d3.select('rect:nth-child('+pivot_val+')').transition().attr("fill","red").end()

        }
            i       = left, //left pointer
            j       = right; //right pointer
        while (i <= j) {
            
            while (data[i] < pivot) {
                i++;
            }
            while (data[j] > pivot) {
                j--;
            }
            if (i <= j) {
                swap( i, j); //swap two elements
                i++;
                j--;
            }
            rect = d3.select("#graph").selectAll("rect").data(data)
            await rect
            .transition()
            .duration(200)
            .attr("fill", (d,i)=>{if (i==pivot_val){return "red"} else return sort.color(d)})
            .attr("height",(d)=>{return sort.yScale(d)})
        .end()
        
        }
        var x = await d3.select('rect:nth-child('+i+')').transition().attr("fill","green").transition().delay(300).end()
        return i 
        // q_i = i;
    }
    
    async function quickSort(left, right) {
        console.log(left,right)
        var index;
        if (data.length > 1) {
            console.log("in if")
            var index = await partition(left, right); //index returned from partition
            // console.log(p)
            // p.then(function(val){ index=val})
            
            console.log(index,index,index)
            if (left < index - 1) { //more elements on the left side of the pivot
                await quickSort(left, index - 1);
            }
            if (index < right) { //more elements on the right side of the pivot
                await quickSort(index, right);
            }
        }
    //     rect = d3.select("#graph").selectAll("rect").data(data)
    //     await rect
    //     .transition()
    //     .duration(2000)
    //     .attr("fill", (d)=>{return sort.color(d)})
    //     .attr("height",(d)=>{return sort.yScale(d)})
    // .end()
        
    }
  
    await quickSort(0,data.length-1)
    console.log(data)
    rect = d3.select("#graph").selectAll("rect").data(data)
        await rect
        .transition()
        .duration(2000)
        .attr("fill", (d)=>{return sort.color(d)})
        .attr("height",(d)=>{return sort.yScale(d)})
    .end()
    

  
        
}



async function MergeSort(){
    
    for (let i=0; i<data.length; i++){
        min = data[i]
        index = i
        for (let j=i; j<data.length; j++){
            if (data[j]<min){
                min=data[j]
                index =j
            }
        }
        data[index] = data[i]
        data[i] = min
        console.log(data)
        rect = d3.select("#graph").selectAll("rect").data(data)
        
    console.log(data)
        await rect
        .transition()
        .duration(200)
        .attr("fill", (d)=>{return sort.color(d)})
        .attr("height",(d)=>{return sort.yScale(d)})
    .end()
        
    }

}

function initVisual(){
    console.log(data)
    const margin = 0
    const svg =d3.select("#graph")
                .attr("width", 600)
                .attr("height", 600)
    console.log(svg)
    const width = svg.attr("width")-margin
    const height = svg.attr("height")-margin

    var domain_arr = new Array(data.length)

    for (let i=0; i<domain_arr.length; i++){
        domain_arr[i]=i
    }

    sort.xScale = d3.scaleBand().domain(domain_arr).range([0,width]).padding(.2)
    sort.yScale = d3.scaleLinear().domain([0,d3.max(data)]).range([0,height])
    
    sort.color = d3.scaleLinear()
    .domain(data)
    .range(["grey","black"])

    // .range([ "steelblue","black"]);


    rect = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")

    rect
    .attr("width",sort.xScale.bandwidth())
    .attr("height",(d)=>{return sort.yScale(d)})
    .attr("x",(d,i)=>{
        console.log(d,i, sort.xScale(i))
        return sort.xScale(i) 
    })
    .attr("fill", (d)=>{return sort.color(d)})
    
}



window.onload = function(){

    // Create Data
    data = new Array(50)

    for (let i=0; i<this.data.length; i++){
        data[i] = Math.random()*50
    }

    // data= [10,2,3,1,5,6,8,1,10]
    
    initVisual()

    d3.select("#btn_ss")
        .on("click", this.SelectionSort)
    d3.select("#btn_is")
        .on("click", this.InsertionSort)
    d3.select("#btn_qs")
        .on("click", this.QuickSort)
    d3.select("#btn_ms")
        .on("click", this.SelectionSort)
    


}