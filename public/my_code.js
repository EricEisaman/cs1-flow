(function() {
    var canvas = document.getElementById('mycanvas'),
            context = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            LiteGraph.LGraphCanvas.onResizeNode();
    }
    resizeCanvas();
    canvas.click();

})();


//node constructor class
function MyAddNode()
{
  this.addInput("A","number");
  this.addInput("B","number");
  this.addOutput("A+B","number");
  this.properties = { precision: 1 };
}

//name to show
MyAddNode.title = "Sum";

//function to call when the node is executed
MyAddNode.prototype.onExecute = function()
{
  var A = this.getInputData(0);
  if( A === undefined )
    A = 0;
  var B = this.getInputData(1);
  if( B === undefined )
    B = 0;
  this.setOutputData( 0, A + B );
}

//register in the system
LiteGraph.registerNodeType("basic/sum", MyAddNode );


var node_sum = LiteGraph.createNode("basic/sum");
node_sum.pos = [500,400];
graph.add(node_sum);




// WRAPPING FUNCTION PATTERN
function dif(a,b)
{
   return a-b;
}

LiteGraph.wrapFunctionAsNode("math/dif",dif, ["Number","Number"],"Number");
var node_dif = LiteGraph.createNode("math/dif");
node_dif.pos = [300,400];
graph.add(node_dif);



// Slider Widget
//node constructor class
function MyScaleNode()
{
  this.addInput("A","number");
  this.addOutput("s*A","number");
  this.properties = { precision: 1 };
  this.sf=5;
  this.slider_widget = this.addWidget("slider","Slider", 5, (value, widget, node)=>{
    this.setOutputData( 0, value*this.getInputData(0) );
    this.sf=value;
  }, { min: 1, max: 10} );
  this.size = [140,60];
}

//name to show
MyScaleNode.title = "Scale";

//function to call when the node is executed
MyScaleNode.prototype.onExecute = function()
{
  var A = this.getInputData(0);
  if( A === undefined )
    A = 0;
  this.setOutputData( 0, this.sf*A );
}

//register in the system
LiteGraph.registerNodeType("basic/scale", MyScaleNode );


var node_scale = LiteGraph.createNode("basic/scale");
node_scale.pos = [100,400];
graph.add(node_scale);


// Text Widget
//node constructor class
function MyTextNode()
{
  this.addOutput("text","string");
  this.text = this.addWidget("text","Text", "Some text...", (value, widget, node)=>{
    this.setOutputData( 0, value);
  });
  this.size = [160,40];
}

//name to show
MyTextNode.title = "Text";

//function to call when the node is executed
MyTextNode.prototype.onExecute = function()
{
  this.setOutputData( 0, this.text.value );
}

//register in the system
LiteGraph.registerNodeType("basic/text", MyTextNode );


var node_text = LiteGraph.createNode("basic/text");
node_text.pos = [100,300];
graph.add(node_text);


// Combo Widget
//node constructor class
function MyComboNode()
{
  this.addOutput("text","string");
  this.text = this.addWidget("combo","Combo", "Mary",value=>{
  console.log(value);
  this.setOutputData( 0, value );
},{
    values:["Mary","Shanice","Molly"]
  });
  this.size = [160,40];
}

//name to show
MyComboNode.title = "Combo";

//register in the system
LiteGraph.registerNodeType("basic/combo", MyComboNode );


var node_combo = LiteGraph.createNode("basic/combo");
node_combo.pos = [100,600];
graph.add(node_combo);




// WRAPPING FUNCTION PATTERN
function textJoin(a,b)
{
  a = a || 'text';
  b = b || 'text';
  return `${a} ${b}`;
}

LiteGraph.wrapFunctionAsNode("basic/textjoin",textJoin, ["string","string"],"string");
var node_textJoin = LiteGraph.createNode("basic/textjoin");
node_textJoin.pos = [800,400];
graph.add(node_textJoin);



// Button Widget
//node constructor class
function MyFetchNode()
{
  this.addOutput("text","string");
  this.text = this.addWidget("button","Fetch Data",null,e=>{
     fetch('avatar_upgrades')
     .then(res=>{
       return res.json();
     })
      .then(d=>{
       console.log(d);
       this.setOutputData( 0, d[0].id);
     })
      .catch(err=>{console.log(err)})
     
  });  
  this.size = [160,40];
}

//name to show
MyFetchNode.title = "Fetch";

//register in the system
LiteGraph.registerNodeType("basic/fetch", MyFetchNode );


var node_fetch = LiteGraph.createNode("basic/fetch");
node_fetch.pos = [800,500];
graph.add(node_fetch);

