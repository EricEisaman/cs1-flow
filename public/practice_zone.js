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


var graph = new LGraph();

var canvas = new LGraphCanvas("#mycanvas", graph);


var node_const = LiteGraph.createNode("basic/const");
node_const.pos = [80,400];
graph.add(node_const);
node_const.setValue(4.5);

var node_watch = LiteGraph.createNode("basic/watch");
node_watch.pos = [300,400];
graph.add(node_watch);

node_const.connect(0, node_watch, 0 );


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
node_dif.pos = [300,480];
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
LiteGraph.registerNodeType("cs1/scale", MyScaleNode );


var node_scale = LiteGraph.createNode("cs1/scale");
node_scale.pos = [100,700];
graph.add(node_scale);


// Text Widget
//node constructor class
function MyTextNode()
{
  this.addOutput("text","string");
  this.text = this.addWidget("text","Text", "avatar_upgrades", (value, widget, node)=>{
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
LiteGraph.registerNodeType("cs1/text", MyTextNode );


var node_text = LiteGraph.createNode("cs1/text");
node_text.pos = [450,200];
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
LiteGraph.registerNodeType("cs1/combo", MyComboNode );


var node_combo = LiteGraph.createNode("cs1/combo");
node_combo.pos = [100,600];
graph.add(node_combo);




// WRAPPING FUNCTION PATTERN
function textJoin(a,b)
{
  a = a || 'text';
  b = b || 'text';
  return `${a} ${b}`;
}

LiteGraph.wrapFunctionAsNode("cs1/textjoin",textJoin, ["string","string"],"string");
var node_textJoin = LiteGraph.createNode("cs1/textjoin");
node_textJoin.pos = [300,600];
graph.add(node_textJoin);



// Button Widget
//node constructor class
function MyFetchNode()
{
  console.log('FETCH NODE');
  console.log(this);
  this.addInput("text","string");
  this.text = this.addWidget("button","Fetch Data",null,e=>{
     
     fetch(this.getInputData(0))
     .then(res=>{
       return res.json();
     })
      .then(d=>{
       console.log(d);
       d.forEach( (a,i)=>{
           console.log(this);
           if(!this.outputs ||(this.outputs && (d.length>this.outputs.length))){
             this.addOutput("text","string");
             this.setOutputData( i, a);         
           } else this.setOutputData( i, a);;
           
       });
     })
      .catch(err=>{console.log(err)})
     
  });  
  this.size = [160,40];
}

//name to show
MyFetchNode.title = "Fetch";

MyFetchNode.prototype.onExecute = e=>{
 
}

//register in the system
LiteGraph.registerNodeType("cs1/fetch", MyFetchNode );


var node_fetch = LiteGraph.createNode("cs1/fetch");
node_fetch.pos = [650,200];
graph.add(node_fetch);

node_text.connect(0, node_fetch, 0 );


//node constructor class
function AvatarUpgradeViewNode()
{
  this.addInput("avatar","string");
   this.avatar = {};
   this.id_txt = this.addWidget("text","ID", "id", (value, widget, node)=>{
    
    });
   this.url_txt = this.addWidget("text","URL", "url", (value, widget, node)=>{
    
    });
   this.pos_txt = this.addWidget("text","POS", "position", (value, widget, node)=>{
    
    });
   this.size = [200,160];
}

//name to show
AvatarUpgradeViewNode.title = "Avatar Upgrade View";

//function to call when the node is executed
AvatarUpgradeViewNode.prototype.onExecute = function()
{
  this.avatar = this.getInputData(0);
  if(!this.avatar)return;
  this.id_txt.value = this.avatar.id;
  this.url_txt.value = this.avatar.url.slice(0,20) + '...';
  this.pos_txt.value = this.avatar.position;

}

//register in the system
LiteGraph.registerNodeType("cs1/avatarupgradeview", AvatarUpgradeViewNode );


var node_avatarUpgradeView1 = LiteGraph.createNode("cs1/avatarupgradeview");
node_avatarUpgradeView1.pos = [900,200];
graph.add(node_avatarUpgradeView1);

var node_avatarUpgradeView2 = LiteGraph.createNode("cs1/avatarupgradeview");
node_avatarUpgradeView2.pos = [900,400];
graph.add(node_avatarUpgradeView2);




graph.start()











// UTILS

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function isUniqueOutput(value,node){
  let result = true;
  node.outputs.forEach(o=>{
    if(o._data == value)result = false;
  })
  return result;
}