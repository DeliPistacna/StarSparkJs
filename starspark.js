// 
// StarSpark.js
// Author: Deli Pistacna
// 
class StarSpark {
    
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            sparkDuration: options.sparkDuration === undefined ? 0.5 : options.sparkDuration,
            totalDuration: options.totalDuration === undefined ? 2 : options.totalDuration,
            sparkCount: options.sparkCount === undefined ? 100 : options.sparkCount,
            sparksPerCycle: options.sparksPerCycle === undefined ? 4 : options.sparksPerCycle,
            delay: options.delay === undefined ? 0.1 : options.delay,
            overflow: options.overflow === undefined ? 15 : options.overflow,
            zIndex: options.zIndex === undefined ? 1 : options.zIndex,
            sparkHTML: options.sparkHTML === undefined ? '+' : options.sparkHTML,
            sparkSize: options.sparkSize === undefined ? 0.5 : options.sparkSize,
            sparkColor: options.sparkColor === undefined ? '#ffffff' : options.sparkColor,
            infinite: options.infinite === undefined ? false : options.infinite,
        };
        this.sparksContainer = null;
        this.sparks = []; 
        this.sparkAnimationKeyframes = [
            {
                opacity: 0,
                transform: "translateX(-50%) translateY(-50%) rotate(0deg) scale(0)",
            },
            {
                opacity: 1,
                transform: `translateX(-50%) translateY(-50%) rotate(0deg) scale(${this.options.sparkSize})`,
            },
            {
                opacity: 0,
                transform: `translateX(-50%) translateY(-50%) rotate(0deg) scale(${this.options.sparkSize*2})`,
            },
            
        ];
        this.initialize();
    }


    initialize() {
        // Init sparks container
        this.sparksContainer = this.createSparksContainer();
        this.createRandomSparks(20);
        // Alter target
        this.element.style.display = 'inline-block'
        this.element.style.position = 'relative'
        // Append
        this.element.append(this.sparksContainer);
        this.animateSparks();
    }

    animateSparks(){
        console.log("TOTAL DURATION", this.options.totalDuration);
        console.log("SPARK DURATION", this.options.sparkDuration);
        console.log("SPARK DELAY", this.options.delay);
        console.log("TOTAL TIME PER SPARK", this.options.sparkDuration + this.options.delay);
        let iterations = Math.round(this.options.totalDuration / this.options.sparkDuration + this.options.delay );
        console.log(iterations);
        
        for (let i = 0; i < iterations; i++) {
            for (let j = 0; j < this.options.sparksPerCycle; j++) {
                window.setTimeout(() => {
                    const spark = this.sparks[Math.floor(Math.random() * this.sparks.length)];
                    this.animateSpark(spark);
                }, this.options.delay * i * 1000);
                
            }
        }

        
        window.setTimeout(()=>{
            if(this.options.infinite){ 
                this.animateSparks();
            }else{
                this.sparksContainer.remove();
            }
        }, this.options.totalDuration * 1000);

    }



    animateSpark(spark) {
        spark.animate(this.sparkAnimationKeyframes, {
            duration: this.options.sparkDuration * 1000,
            easing: 'ease-in-out', // Timing function
            // iterations:1,
        });
    }

    
    // this.options.totalDuration

    createSingleSpark() {
        let spark = document.createElement('div');
        spark.innerHTML = this.options.sparkHTML;
        spark.style.position = 'absolute';
        spark.style.top = `${Math.random() * 100}%`;
        spark.style.left = `${Math.random() * 100}%`;
        spark.style.transform = 'translateX(-50%) translateY(-50%)';
        spark.style.opacity = '0';
        spark.style.color = this.options.sparkColor;
        spark.style.zIndex = this.options.zIndex;
        this.sparks.push(spark);
        this.sparksContainer.append(spark);
    }

    createRandomSparks() {
        for (let i = 0; i < this.options.sparkCount; i++) {
            this.createSingleSpark();
        }

    }

    createSparksContainer() {
        let sparks = document.createElement('div');
        sparks.classList.add('sparkContainer');
        sparks.style.position = 'absolute';
        sparks.style.margin = `-${this.options.overflow}px`;
        sparks.style.top = '0px';
        sparks.style.left = '0px';
        sparks.style.width = `calc(100% + ${this.options.overflow*2}px)`;
        sparks.style.height = `calc(100% + ${this.options.overflow * 2}px)`;
        return sparks;
    }

}





function createSingleSpark(i, count) {

}

function createSparks(count, posx, posy) {
    let sparks = document.createElement('div');
    sparks.style.position = 'absolute';
    sparks.style.top = '0px';
    sparks.style.left = '0px';
    sparks.style.width = '100%';
    sparks.style.height = '100%';
    for (let i = 0; i < count; i++) {
        sparkDiv = document.createElement('div');
        sparkDiv.innerHTML = "+";
        sparkDiv.style.position = 'absolute';
        // sparkDiv.style.top = `${5*Math.floor(Math.random() * count)}px`;
        // sparkDiv.style.right = `${5 * Math.floor(Math.random() * count)}px`;
        sparkDiv.style.top = `${Math.random() * 100}%`;
        sparkDiv.style.left = `${Math.random() * 100}%`;
        sparkDiv.style.transform = 'translateX(-50%) translateY(-50%)';
        sparkDiv.style.opacity = '0';
        sparkDiv.style.color = 'white';
        // sparkDiv.style.zIndex = '-1';
        sparkDiv.style.animation = `sparkme 4s ease forwards ${i * .05}s `;
        sparks.append(sparkDiv)
    }
    return sparks;
}
function sparkme(elem) {
    sparks = createSparks(20)
    sparks.classList.add('sparkContainer');
    elem.style.display = 'inline-block'
    elem.style.position = 'relative'
    elem.append(sparks);
    window.setTimeout(function () {
        document.querySelector('.sparkContainer').remove();
    }, 1000);
}


var style = document.createElement('style');
style.type = 'text/css';
var keyFrames = `
                @keyframes sparkme {
                    0% {
                        opacity:0;
                        color:white
                        transform: translateX(-50%) translateY(-50%) scale(0) rotate(0deg);
                    }

                    
                    5% { 
                        opacity:1;
                        color:white;
                        transform: translateX(-50%) translateY(-50%)  scale(0.5) rotate(0deg); 
                    }
                    
                    10% { 
                        opacity:0;
                        color:yellow;
                        // Scale 1 or 2
                        transform: translateX(-50%) translateY(-50%)  scale(2) rotate(0deg); 
                    }
                    100% {
                        opacity:0;
                        color:white
                        transform: translateX(-50%) translateY(-50%) scale(0) rotate(0deg);
                    }
                }
            `;
style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, "180deg");
document.getElementsByTagName('head')[0].appendChild(style);