import regression from 'regression'
import Genetic from 'genetic-js'
import * as BABYLON from 'babylonjs'
export  function genfit(scribbledLine,zpos,scene)
{
    vicreg(scribbledLine,zpos,scene)
    
    let deg = 4

    var done = 0;
    var config = {
        "iterations": 500
        , "size": 250
        , "crossover": 0.2
        , "mutation": 0.1
        , "skip": 10
    };
    let vicdata =[]
    for (let i = 0; i < scribbledLine.length; i=i+3) {
        vicdata.push( [scribbledLine[i],scribbledLine[i+1] ])
    }
    var userData = {
        "terms": deg+1
        , "vertices": vicdata
    };
        // return

    var genetic = Genetic.create();
    genetic.optimize = Genetic.Optimize.Minimize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.FittestRandom;
    genetic.seed = function() {
        // console.log("seed",this.userData["terms"])
	
        var a = [];
        // create coefficients for polynomial with values between (-0.5, 0.5)
        
        var i;
        for (i=0;i<this.userData["terms"];++i) {
            a.push(Math.random()-0.01);
        }
        
        return a;
    };
    genetic.mutate = function(entity) {
        // console.log("mutate",entity)
        // allow chromosomal drift with this range (-0.05, 0.05)
        var drift = ((Math.random()-0.5)*2)*0.05;
        
        var i = Math.floor(Math.random()*entity.length);
        entity[i] += drift;
        
        return entity;
    };
    genetic.crossover = function(mother, father) {
        // console.log("crossover",mother,father)

        // crossover via interpolation
        function lerp(a, b, p) {
            return a + (b-a)*p;
        }
        
        var len = mother.length;
        var i = Math.floor(Math.random()*len);
        var r = Math.random();
        var son = [].concat(father);
        var daughter = [].concat(mother);
        
        son[i] = lerp(father[i], mother[i], r);
        daughter[i] = lerp(mother[i], father[i], r);
        
        return [son, daughter];
    };
    genetic.evaluatePoly = function(coefficients, x) {
        // console.log("evaluatePoly",coefficients)

        var s = 0;
        var p = 1;
        var i;
        for (i=0;i<coefficients.length;++i) {
            s += p*coefficients[i];
            p *= x;
        }
         
        return s;
    }
    genetic.fitness = function(entity) {
        // console.log("fitness",entity)
	
        var sumSqErr = 0;
        var vertices = this.userData["vertices"];
        
        var i;
        for (i=0;i<vertices.length;++i) {
            var err = this.evaluatePoly(entity, vertices[i][0]) - vertices[i][1];
            sumSqErr += err*err;
        }
        
        return Math.sqrt(sumSqErr);
    };
    
    
    genetic.generation = function(pop, generation, stats) {
        // console.log("generation",generation,stats,pop)


    };
    
    genetic.notification = function(pop, generation, stats, isFinished) {
        // console.log("notification",isFinished,generation,stats,pop)
	
        function poly(entity) {
            var a = [];
            var i;
            for (i=entity.length-1;i>=0;--i) {
                var buf = entity[i].toPrecision(2);
                if (i > 1)
                    buf += "<em><b>x<sup>" + i + "<sup></b></em>";
                else if (i == 1)
                    buf += "<em><b>x</b></em>";
                else if ( i==0)
                    buf=buf
                    
                a.push(buf);
            }
            if (!isFinished)
                return a.join(" + ");
            else    
                return a.join(" + ") + "   done";

        }
        
        function lerp(a, b, p) {
            return a + (b-a)*p;
        }
        
        // if (generation == 0) {
        // //     graph.solutions = [];
        // // }
        
        $("#solution").html(poly(pop[0].entity));


        const vicentity=pop[0].entity;
        const array=[]
        for (let j = -175; j <= 175; j=j+0.01) {
            let predict=[j,1]
            for (let i=vicentity.length-1;i>=0;--i) {
                var coef = vicentity[i].toPrecision(3);
                let tmpres = 1
                for (let k = i; k >0; k--) {
                    tmpres=tmpres*j;     
                }
                tmpres = tmpres*coef
                predict[1]+=tmpres
            }

            array.push(  predict )
        }

        let qq = []
        for (let i = 0; i < array.length; i++) {
          qq.push(  new BABYLON.Vector3(array[i][0], array[i][1], zpos )  )
          
        }
        let userFittedLine = scene.getMeshByName("userFittedLine")
        if (userFittedLine!=null)
        {
          userFittedLine.dispose()
        }
        let drawnLine =  BABYLON.Mesh.CreateLines("userFittedLine", qq, scene);
        drawnLine.color = new BABYLON.Color3(generation/999,0.1,.8);

        if (isFinished)
        {
            done=1;
            // lib.foo = "bar";
            drawnLine.color = new BABYLON.Color3(0, 1, 0);
        }
    };

    genetic.evolve(config, userData);
            
    var timeout = 1000000; // 1000000ms = 1000 seconds
 
    // var lib = function() {}; // Let's create an empty object
    var lib={}

    // This is the promise code, so this is the useful bit
    function ensureFooIsSet(timeout) {
        var start = Date.now();
        let p =  new Promise(waitForFoo); // set the promise object within the ensureFooIsSet object
        return p


        
        // waitForFoo makes the decision whether the condition is met
        // or not met or the timeout has been exceeded which means
        // this promise will be rejected
             function waitForFoo(resolve, reject) {
            if (done)
                resolve(done);
            else if (timeout && (Date.now() - start) >= timeout)
                reject(new Error("timeout"));
            else
                setTimeout(waitForFoo.bind(this, resolve, reject), 30);
        }
    }
     
    // This runs the promise code
     return ensureFooIsSet(timeout).then(function(res,reject){
        // alert(res); // if the promise condition is met, this alert is fired
    document.getElementById("z").innerHTML="  done:"+res;

      
    });

    // console.log("yoo")


}


function msr(){
    return 1
}

function predict(arr){
    return 1
}


export  function vicreg(scribbledLine,zpos,scene) {


    let vicdata =[]
    for (let i = 0; i < scribbledLine.length; i=i+30) {
        vicdata.push( [scribbledLine[i],scribbledLine[i+1] ])
    }



    // console.log(vicdata);

    for (let i = 1; i < 6; i=i+1) {

        let result = regression.polynomial(vicdata, { order: i });
        console.log(result.string);
        console.log(result.r2);

    }
    // console.log(result.points);
    // const preds=[]
    // for (let i = -175; i <= 175; i=i+0.01) {
    //     preds.push(  result.predict(i) )
    // }
    // return preds
    // return result.points


}