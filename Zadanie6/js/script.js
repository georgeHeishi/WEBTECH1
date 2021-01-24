var textInput = document.querySelector("text-input");
var sliderInput = document.querySelector("slider-input");

function Funct(name,color){
    this.x = [];
    this.y = [];
    this.name = name;
    this.line = {
       color: color
    }
    this.updateFunct = function (x, y){
        const amplitude = textInput.shadowRoot.querySelector("#amplitude-text").value;
        this.x.push(x);
        this.y.push(y * amplitude);
    };
}

var sin = new Funct("Sinus", 'blue');
var cos = new Funct("Kosinus", 'orange');
var source;

if (typeof (EventSource) !== "undefined") {
    source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
    source.addEventListener("message", function (e) {
        var data = JSON.parse(e.data);
        var layout = {
            showlegend: false,
            xaxis:{fixedrange: true},
            yaxis:{fixedrange: true}
        };
        if(sin.x.length === 0){
            sin.updateFunct(data.x,data.y1)
            cos.updateFunct(data.x,data.y2)
            Plotly.newPlot('graph', [sin, cos], layout);
        }else{

            sin.updateFunct(data.x,data.y1)
            cos.updateFunct(data.x,data.y2)
            Plotly.redraw('graph');
            Plotly.relayout('graph', {
                'xaxis.autorange': true,
                'yaxis.autorange': true
            });

        }
    }, false);



} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
}
$("#sine").change(function () {
    if($("#sine").prop("checked")) {
        sin.visible = true;
    }else{
        sin.visible = false;
    }
    Plotly.redraw('graph');
});
$("#cosine").change(function () {
    if($("#cosine").prop("checked")) {
        cos.visible = true;
    }else{
        cos.visible = false;
    }
    Plotly.redraw('graph');
});
$( "#disable-graph" ).click(function() {
    $(this).addClass('activated');
    source.close();
    var layout = {
        showlegend: false,
        xaxis:{fixedrange: false},
        yaxis:{fixedrange: false}
    };
    Plotly.newPlot('graph', [sin, cos], layout);
});


textInput.shadowRoot.querySelector("#amplitude-text").addEventListener('input',function (){
    sliderInput.shadowRoot.querySelector("#amplitude-slider").value = textInput.shadowRoot.querySelector("#amplitude-text").value;
    }
);
sliderInput.shadowRoot.querySelector("#amplitude-slider").addEventListener('input',function () {
    textInput.shadowRoot.querySelector("#amplitude-text").value = sliderInput.shadowRoot.querySelector("#amplitude-slider").value;
    }
)