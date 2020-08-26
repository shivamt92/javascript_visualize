

// SIR_Model = {

//     run_SIR :  function(){
//     let beta = Number(document.getElementById("beta").value)
//     let mu = Number(document.getElementById("mu").value)
//     let p_i = Number(document.getElementById("infected").value)

//     // console.log(typeof(mu))

//     // console.log("ahehde",beta,mu,p_i)
//     SIR_Model.SIR(beta=beta,mu=mu,rho_i=p_i)
//     // document.getElementById("run").addEventListener('click', run_SIR)
//     console.log("added back event Listener")
//     },

//     SIR :  function(beta,mu, rho_i=.1, rho_r=.01){

//         var x = document.getElementById('chart1')
//     console.log(x.data.length)
//     if (document.getElementById('chart1').data.length>0){
//         Plotly.deleteTraces('chart1',0)
//     }
//     Plotly.addTraces('chart1',{y:[]})
    
//     document.getElementById("run").removeEventListener('click', run_SIR)
//     console.log("removed Event listner")

//     let rho_S = 1 -rho_i - rho_r
//     let rho_I = rho_i
    
    
//     // console.log(beta,mu,rho_I)

//     function getNext(){
        
//         let rho_I_temp = rho_I
//         let rho_S_temp = rho_S
//         rho_I += beta*rho_I_temp*rho_S_temp - mu*rho_I_temp
//         rho_S -= beta*rho_I_temp*rho_S_temp
//         rho_R  = 1 - rho_I - rho_S
//         // console.log("this value is",rho_I)
//         // console.log("running this")

//         return rho_I
    
//         // if (document.getElementById('chart1').data.length>0){
//     //     Plotly.deleteTraces('chart1',0)
//     // }

//     }
//     // if (document.getElementById('chart1').data.length>0){
//     //     Plotly.deleteTraces('chart1',0)
//     // }
//     var clickDisable = true
//     var btn = document.getElementById('run')
//     btn.style.opacity= .3

//     var interval = setInterval(function(){
//         Plotly.extendTraces('chart1',{y:[[getNext()]]},[0])
//         if (rho_I<.09){
//             clearInterval(interval)
//             clickDisable = false

//         }
//     }, 200)
//     var event_int = setInterval(()=>{
//         // console.log('adding back event')
//         if (!clickDisable){clearInterval(event_int)
//             btn.style.opacity= 1
//             document.getElementById("run").addEventListener('click', run_SIR)}
//         },200)



//     }

// }





function SIR(beta,mu, rho_i=.1, rho_r=.01){

    var x = document.getElementById('chart1')
    console.log(x.data.length)
    if (document.getElementById('chart1').data.length>0){
        Plotly.deleteTraces('chart1',0)
    }
    Plotly.addTraces('chart1',{y:[]})
    
    document.getElementById("run").removeEventListener('click', run_SIR)
    console.log("removed Event listner")

    let rho_S = 1 -rho_i - rho_r
    let rho_I = rho_i
    
    
    // console.log(beta,mu,rho_I)

    function getNext(){
        
        let rho_I_temp = rho_I
        let rho_S_temp = rho_S
        rho_I += beta*rho_I_temp*rho_S_temp - mu*rho_I_temp
        rho_S -= beta*rho_I_temp*rho_S_temp
        rho_R  = 1 - rho_I - rho_S
        // console.log("this value is",rho_I)
        // console.log("running this")

        return rho_I
    
        // if (document.getElementById('chart1').data.length>0){
    //     Plotly.deleteTraces('chart1',0)
    // }

    }
    // if (document.getElementById('chart1').data.length>0){
    //     Plotly.deleteTraces('chart1',0)
    // }
    var clickDisable = true
    var btn = document.getElementById('run')
    btn.style.opacity= .3

    var interval = setInterval(function(){
        Plotly.extendTraces('chart1',{y:[[getNext()]]},[0])
        if (rho_I<.09){
            clearInterval(interval)
            clickDisable = false

        }
    }, 200)
    var event_int = setInterval(()=>{
        // console.log('adding back event')
        if (!clickDisable){clearInterval(event_int)
            btn.style.opacity= 1
            document.getElementById("run").addEventListener('click', run_SIR)}
        },200)
        
}



function run_SIR(){


    let beta = Number(document.getElementById("beta").value)
    let mu = Number(document.getElementById("mu").value)
    let p_i = Number(document.getElementById("infected").value)

    // console.log(typeof(mu))

    // console.log("ahehde",beta,mu,p_i)
    SIR(beta=beta,mu=mu,rho_i=p_i)
    // document.getElementById("run").addEventListener('click', run_SIR)
    console.log("added back event Listener")
    
    
}

window.onload = function(){

    var chart = Plotly.newPlot("chart1",[{
        y: [],
        type: 'line'
    }],{
        title: "Classical SIR Model",
        xaxis:{
            title: 'Time',
            showgrid: false,
            zeroline: false
        },
        yaxis:{
            title: 'Percentage Infected',
            showgrid: false,
        }
    })

    

    document.getElementById("run").addEventListener('click', run_SIR)
    document.getElementById("stop").addEventListener('click',()=>{clearInterval(interval)})

// document.getElementById("beta").oninput = function(){
//     document.getElementById("beta-val").innerHTML = this.value
// }

    slider_ids = ["beta", "mu", "infected"]
    slider_vals = ["beta-val", "mu-val","infec-val"]

    for (let i=0; i<slider_ids.length; i++){

        document.getElementById(slider_ids[i]).oninput = function(){
        document.getElementById(slider_vals[i]).innerHTML = this.value
        }

    }
}














// <script type="text/javascript">

// var data = [];
// var iter = 100;
// var p_i=.1,p_r;
// var p_s = 1-p_i-p_r;


// var i=0;

//   function SIR(){
//       p_i = document.getElementById('p_i').value

//       for (let i=0; i<1 i++)){
//       console.log(p_i)
//       p_i = 1.2*p_i - p_r
//       p_r = .8*p_i
      
//       data.push({x:p_i,y:i});
//       i++;
//       var chart = new CanvasJS.Chart("chartContainer",
//       {
//       title:{
//       text: "Line Chart with line color"
//       },
//       data: [
//       {        
//           type: "line",
//           lineColor:"red", //**Change the color here
//           dataPoints: data
//       }]
//       });

//   chart.render();

//       }
//       iter--;
//   }
// window.onclick = function () {
    
//   data.push({x:i,y:i});
//   i++;
//   var chart = new CanvasJS.Chart("chartContainer",
//   {
//     title:{
//     text: "Line Chart with line color"
//     },
//     data: [
//     {        
//       type: "line",
//       lineColor:"red", //**Change the color here
//       dataPoints: data
//     }
//     ]
//   });

//   chart.render();
// }
// </script>
// <script type="text/javascript" src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>