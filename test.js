

var EventListner = {
    addListner_btn: function(id,type,func){
        var x = document.getElementById(id)
        console.log(func)
        x.addEventListener(type,func)
        x.style.opacity = 1
        console.log('added')
        
    },

    removeListner_btn: function(id,type,func){
        var x = document.getElementById(id)
        x.removeEventListener(type,func)
        x.style.opacity = .3
        console.log('removed')
    }

}


var SIR_Model = {
    run_SIR :  ()=>{
    let beta = Number(document.getElementById("beta").value)
    let mu = Number(document.getElementById("mu").value)
    let p_i = Number(document.getElementById("infected").value)
    
    SIR_Model.SIR(beta=beta,mu=mu,rho_i=p_i)
    // console.log('here')
    

    },

    SIR :  function(beta,mu, rho_i=.1, rho_r=.01){

        var x = document.getElementById('chart1')
        console.log(x.data.length)
        if (document.getElementById('chart1').data.length>0){
            Plotly.deleteTraces('chart1',0)
        }
        Plotly.addTraces('chart1',{y:[]})
        
        
        EventListner.removeListner_btn('run','click',SIR_Model.run_SIR)

        // document.getElementById("run").removeEventListener('click', SIR_Model.run_SIR)

        // console.log("removed Event listner")

        let rho_S = 1 -rho_i - rho_r
        let rho_I = rho_i
    

        function getNext(){
            
            let rho_I_temp = rho_I
            let rho_S_temp = rho_S
            rho_I += beta*rho_I_temp*rho_S_temp - mu*rho_I_temp
            rho_S -= beta*rho_I_temp*rho_S_temp
            rho_R  = 1 - rho_I - rho_S
            
            return rho_I
        
        }
        
        var clickDisable = true
        var btn = document.getElementById('run')
        btn.style.opacity= .3
        /////////
        EventListner.addListner_btn('stop','click',()=>{
            clearInterval(interval)
            EventListner.addListner_btn('run','click',SIR_Model.run_SIR)
           
        })

        // document.getElementById('stop').addEventListener('click',()=>{
        //     clearInterval(interval)
        //     document.getElementById('run').addEventListener('click',SIR_Model.run_SIR)
        //     document.getElementById('run').style.opacity = 1
        // })

        var interval= setInterval(function(){
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
                document.getElementById("run").addEventListener('click', SIR_Model.run_SIR)}
            },200)

    }

}




window.onload = function(){

    
    var chart = Plotly.newPlot("chart1",[{
        y: [],
        type: 'line'
    }],{
        title: "Classical SIR Model",
        width: '1100',
        height: '500',
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

    

    console.log(SIR_Model)

    this.EventListner.addListner_btn('run','click',SIR_Model.run_SIR)


    // document.getElementById("run").addEventListener('click', SIR_Model.run_SIR)



    slider_ids = ["beta", "mu", "infected"]
    slider_vals = ["beta-val", "mu-val","infec-val"]

    for (let i=0; i<slider_ids.length; i++){

        document.getElementById(slider_ids[i]).oninput = function(){
        document.getElementById(slider_vals[i]).innerHTML = this.value
        }

    }
    
    // Loading SIR GRAPH MODELS

    EventListner.addListner_btn("run2","click",OnClick)
    EventListner.addListner_btn("stop2","click",this.bind_btn)
    slider_ids = ["beta-graph", "mu-graph", "nodes"]
    slider_vals = ["beta-val-graph", "mu-val-graph","node-val"]

    for (let i=0; i<slider_ids.length; i++){

        document.getElementById(slider_ids[i]).oninput = function(){
        document.getElementById(slider_vals[i]).innerHTML = this.value
        }

    }


    random_graphs.generate_erdos_renyi(10,.3)
    this.startVisualize()



}
