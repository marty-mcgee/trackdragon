// openJSONCad.js, a Parser function to handle JSONCAD JSON graphics specification
//
// Copyright (c) 2015 by James Reilly <jimreillyemail@gmail.com>
//
// Version: 0.001
// License: MIT License
// 
//
//General structure  
//	ObjectName : {
//			
//	   setOperator: {
//
//			ObjectName : [ TypeOfPrimitive	, ParameterOptions	,Instances   ]
//		}
//}
//		Instances are either in array or object form 	
//	 	instances as array  			[x,y,z,r1,d1,r2,d2]
//	 	instances as object  			{x: 0, y: 0,z: a[2],r1: {axis: xyz   ,degrees: 0-360 },r2: {axis: xyz  ,degrees:  0-360} ,size: [n,n,n] , color: [n,n,n,1]  }
//	
//   
//Nodes : {
//	 
//	ObjectNames : 
//		intersect : {			 
//			ObjName1 : [  keyword,  [param1, param2, param3, param4, param5]
//							,[
//								[x,y,z,r1_axis,r1_angle r2_axis,r2_angle]	// instances include local offset from 0,0,0 plus up to three rotations  x0-x360,y0-y360,z0-z360  
//							,	[x,y,z,r1_axis,r1_angle r2_axis,r2_angle]	// this is the array iteration structure for covenience
//							,	[x,y,z,r1_axis,r1_angle r2_axis,r2_angle]	// ultimately array structure is translated to object structure as below
//							,	[x,y,z,r1_axis,r1_angle r2_axis,r2_angle]
//							]
//						],
//			ObjName2 : [  keyword, [param1, param2, param3, param4, param5]
//							,[
//							 	{x: 0, y: 0,z: a[2],r1: {axis: 'y' ,degrees: 45},r2: {axis: 'Z',degrees: 30} ,size: 7		, color: [1,0,0,1]  }	//  scaled to 7x and red color
//							,	{x: 0, y: 0,z: a[2],r1: {axis: 2   ,degrees: 45},r2: {axis: 1  ,degrees: 30} ,size: [5,2,6] , color: [0,0,1,1]  }	//	scaled to x=5,y=2,z=6]  and color is blue  
//							,	{x: 0, y: 0,z: a[2],r1: {axis: 0   ,degrees: 45},r2: {axis: 0  ,degrees: 30}  }										//	no rotations no color specfied and no change to size
//							 ]
//							]
// 
//			}
//}
//	
// This is the list of control words presently implimented, if one 
// wants to use lowercase or less terse terms just add to the list
// (with the 4char function call as the translation)
//
// Eventually this list will disappear once the specification has been frozen
var gverbs = {
     "VOBJ"		: "VOBJ"			//	Virtual, created/creatable object
    ,"FUNC"		: "FUNC"			//	Function call to create virtual object
    ,"GETF"		: "GETF"			//	Get File... not yet implimented
    ,"GOBJ"		: "GOBJ"			//	Get File... not yet implimented
    ,"SCRP"		: "SCRP"			//	Process Script 
    ,"PIPE"		: "PIPE"			//	Cylinder   always centered at 0,0,0 lower
    ,"CONE"		: "CONE"			//	Cylinder with two radii
    ,"RIPE"		: "RIPE"			//	Rounded Cylinder
    ,"SPHR"		: "SPHR"			//	Sphere
    ,"DNUT"		: "DNUT"			//	Torus
    ,"CUBE"		: "CUBE"			//	Centered Cube
    ,"BOXZ"		: "BOXZ"			//	Cube lower left = 0,0,0
    ,"WOXZ"		: "WOXZ"			//	Wire Cube lower left = 0,0,0
    ,"WEDG"		: "WEDG"			//	3d Right Triangle at 0,0,0 = all right angles, 0,0
    ,"PYRM"		: "PYRM"			//	Pyramid from zeroed vecotrs
    ,"RUBE"		: "RUBE"			//	Rounded Cube
    ,"ROXZ"		: "ROXZ"			//	Rounded Cube lower left ~= 0,0,0
    ,"PHDR"		: "PHDR"			//	Polyhedron 
    ,"REDG"		: "REDG"			//	Rounded Wedge
    ,"RYRM"		: "RYRM"			//	Rounded Pyramid
    ,"TEXT"		: "TEXT"			//  Two Dimensional Text Rendered InSitu
    ,"LINE"		: "LINE"			//  Two Dimensional Text Rendered InSitu
    ,"INTE"		: "intersect"		//  CSG Inetersect function
    ,"UNIO"		: "union"			//  CSG union function
    ,"SUBT"		: "subtract"		//  CSG subtract function
    ,"INVE"		: "invert"			//  Not sure what this does but I can call it :)
    ,"INTERSECT": "intersect"		//  CSG Inetersect function
    ,"UNION"	: "union"			//  CSG union function
    ,"SUBTRACT"	: "subtract"		//  CSG subtract function
    ,"INVERT"	: "invert"			//  Not sure what this does but I can call it :)
    ,"intersect": "intersect"		//  CSG Inetersect function
    ,"union"	: "union"			//  CSG union function
    ,"subtract"	: "subtract"		//  CSG subtract function
    ,"invert"	: "invert"			//  Not sure what this does but I can call it :)
};

function textLine(o){
			var group	= 	OpenJSONCad.Viewer.prototype.aLineOfText(o.text ,0,0,0, o.fontsize, o.fcolor, o.scale  );
}

function lineLine(o){
			var line	= 	OpenJSONCad.Viewer.prototype.lineTo(0,0,0 ,o.x,o.y,o.z, o.color  );
}

function wireCube(o) {		// creates a wireframe cube 
    var 
	  x2 =(o) ? (o.start)  ? o.start[0]	: 1 : 1
    , y2 =(o) ? (o.start)  ? o.start[1]	: 1 : 1
    , z2 =(o) ? (o.start)  ? o.start[2]	: 1 : 1
    ,  x =(o) ? (o.end	)  ? o.end[0]	: 2 : 2
    ,  y =(o) ? (o.end	)  ? o.end[1]	: 2 : 2
    ,  z =(o) ? (o.end	)  ? o.end[2]	: 2 : 2
    , sz =(o) ? (o.start)  ? 0.125		: 0.0125 : 0.0125					 
    , xs = x - 2 * sz
    , ys = y - 2 * sz
    , zs = z - 2 * sz;
    return (new CSG()).union([
        CSG.cube({size: 1}).scale([sz, sz, z2]).translate([ sz      , sz      , z2      ])
      , CSG.cube({size: 1}).scale([sz, sz, z2]).translate([ sz + xs , sz      , z2      ])
      , CSG.cube({size: 1}).scale([sz, sz, z2]).translate([ sz      , sz + ys , z2      ])
      , CSG.cube({size: 1}).scale([sz, sz, z2]).translate([ sz + xs , sz + ys , z2      ])
      , CSG.cube({size: 1}).scale([x2, sz, sz]).translate([ x2      , sz      , sz      ])
      , CSG.cube({size: 1}).scale([x2, sz, sz]).translate([ x2      , sz + ys , sz      ])
      , CSG.cube({size: 1}).scale([x2, sz, sz]).translate([ x2      , sz      , sz + zs ])
      , CSG.cube({size: 1}).scale([x2, sz, sz]).translate([ x2      , sz + ys , sz + zs ])
      , CSG.cube({size: 1}).scale([sz, y2, sz]).translate([ sz      , y2      , sz      ])
      , CSG.cube({size: 1}).scale([sz, y2, sz]).translate([ sz + xs , y2      , sz      ])
      , CSG.cube({size: 1}).scale([sz, y2, sz]).translate([ sz      , y2      , sz + zs ])
      , CSG.cube({size: 1}).scale([sz, y2, sz]).translate([ sz + xs , y2      , sz + zs ])
    ]);
}

function doSizeColor(op, ob) { 

// once the object is created this function sets the size and color per the options parameter
      ob = (op.size  !== null && op.size  !== undefined &&  op.size !== 1) ? ob.scale(op.size)		: ob;
    return (op.color !== null && op.color !== undefined )				   ? ob.setColor(op.color)	: ob;
}
  
function includeJS(url){
	if(url.split(".").pop() != 'js' && url.split(".").pop() != 'jscad') return;
    var req = new XMLHttpRequest();
    req.open("GET", url, false);  
    req.send(null);
    var head		=	document.getElementsByTagName('head')[0] 
	,	 el			=	document.createElement('script');
		 el.type	=	'text/javascript';
		 el.text	=	req.responseText;
		if(!! head && head.innerHTML.indexOf(el.outerHTML) ==-1)  
		head.appendChild(el);
}
function GETF(o) {
			includeJS(o.uri);
    return doSizeColor(o,  this[o.call](o.prms));
}
function GOBJ(o) {
			includeJS(o.uri);
	var newobj = window[o.nodeSet];
	return doSizeColor(o, makeVirtualObject(	newobj[o.each],null, newobj		));
}
function FUNC(o) {
    return doSizeColor(o,  this[o.call](o.prms));
}
function SCRP(o) {
    return doSizeColor(o, OpenJSONCad.parseJsCadScriptSync(new Function(document.getElementById(o.scp).textContent + "\ndebugger;\n return (new CSG()).union(" + o.call + "(" + o.prms + "));")));
}
function VOBJ(o) {		// I have no idea why it is required to be explicit in this conversion,  
						// this expression barfs every time  even though it is correct JSON and Javascript 
						//	
						//  return  doSizeColor(o, makeVirtualObject((o.nodeSet[o.each]  instanceof Array  ) ? {o.each :  o.nodeSet[o.each]  }  :  o.nodeSet[o.each]));
	var newobj ={};
	if (o.nodeSet[o.each]  instanceof Array  )  newobj[o.each]	=  o.nodeSet[o.each];
	else										newobj			=  o.nodeSet[o.each];
	return doSizeColor(o, makeVirtualObject(	newobj	, null,    o.nodeSet	));
}
function CUBE(o) {
    return doSizeColor(o, CSG.cube({size: 1}).scale([o.dimx, o.dimy, o.dimz]));
}
function BOXZ(o) {
    return doSizeColor(o, CSG.cube({size: 1}).scale([o.dimx, o.dimy, o.dimz]).translate([o.dimx, o.dimy, o.dimz]));
}
function RUBE(o) {
    return doSizeColor(o, CSG.roundedCube({size: 1,resolution: o.r,roundradius: o.r}).scale([o.dimx, o.dimy, o.dimz]));
}
function ROXZ(o) {
    return doSizeColor(o, CSG.roundedCube({size: 1,resolution: o.r,roundradius: o.r}).scale([o.dimx, o.dimy, o.dimz]).translate([o.dimx, o.dimy, o.dimz]));
}
function WOXZ(o) {
    return doSizeColor(o, wireCube({start: [o.dimx, o.dimy, o.dimz],end: [o.x, o.y, o.z]}));
}
function PIPE(o) {
    return doSizeColor(o, CSG.cylinder({start: [0, 0, 0],end: [0, 0, o.len],radius: o.r }));
}
function CONE(o) {
    return doSizeColor(o, CSG.cylinder({start: [0, 0, 0],end: [0, 0, o.len],radius: o.r,radiusStart: o.rs,radiusEnd: o.re}));
}
function RIPE(o) {
    return doSizeColor(o, CSG.roundedCylinder({start: [0, 0, 0],end: [0, 0, o.len],radius: o.r,normal: o.rad,resolution: o.res}));
}
function RONE(o) {
    return doSizeColor(o, CSG.roundedCylinder({start: [0, 0, 0],end: [0, 0, o.len],radius: o.r,normal: o.rad,resolution: o.res}));
}
function WEDG(o) {
    return doSizeColor(o, (new CSG()).intersect([CSG.cube({size: 1}).translate([1, 1, 1-.414213562373]), CSG.cube({size: 1.414213562373}).rotateZ(45)]).translate([0,0,  0.414213562373]).scale([o.x, o.y, o.z]));
}
function REDG(o) {
    return doSizeColor(o, (new CSG()).intersect([CSG.roundedCube({size: 1,resolution: o.r,roundradius: o.r}).translate([1, 1, 1]), CSG.roundedCube({size: 1,resolution: o.r,roundradius: o.r}).rotateZ(45)]));
}
function PYRM(o) {
    return doSizeColor(o, (new CSG()).intersect([CSG.cube({size: 1 } ).translate(1,1,1) , CSG.cube({size: 1 }).rotateX(-36.5).rotateY( 45).scale(1.41 ).translate(-.2,-.2,-.2) ]).scale([o.x, o.y , o.z ])) ;
}
function TEXT(o){
	return doSizeColor(o,textLine(o) );
}
function LINE(o){
	return doSizeColor(o,lineLine(o) );
}
function SPHR(o) {
    return doSizeColor(o, CSG.sphere(o)) ;
}
function SPHG(o) {
    return;
}
function DNUT(o) {
    return  doSizeColor(o,  torus(o));
}
function makeParms(vb, o, nodeSet ,  each ) {
    if (typeof (o) == "object" && ! o instanceof Array){ o.nodeSet = nodeSet; o.each =  each;
        return sizeColor(  o.size, o.color,o);
    }
	// convenience function for setting size and color
    function sizeColor(size, color, o) {  o.color = color || null;   o.size = size || 1;   return o;    }


//	each of these function names are defined in the object above
//	Eventually they can be any term but will be translated to 
//	the Four character verbs/control words below.
//	Each of these cases sets up the correct parameters to be used in each 
//	instantiation of the object (in makeVirtualObject  
 
    switch ( vb ) { //size   color			o
        case 'VOBJ':
            return sizeColor(o[0], o[1], {nodeSet : nodeSet,each : each });
        case 'FUNC':
            return sizeColor(o[2], o[3], {call: o[0],prms: o[1]});
        case 'GETF':
            return sizeColor(o[3], o[4], {call: o[0], uri: o[1],prms: o[2]});
        case 'GOBJ':
            return sizeColor(o[3], o[4], { uri: o[1], nodeSet: o[2], each : o[0]});
        case 'SCRP':
            return sizeColor(o[3], o[4], {call: o[1],prms: o[2],scp: o[0]});
        case 'PIPE':
            return sizeColor(o[2], o[3], {r: o[0],len: o[1]});
        case 'CONE':
            return sizeColor(o[4], o[5], {r: o[0],len: o[1],rs: o[2],re: o[3]});
        case 'RONE':
            return sizeColor(o[5], o[6], {r: o[0],len: o[1],r1: o[2],rad: o[3],res: o[4]});
        case 'RIPE':
            return sizeColor(o[5], o[6], {r: o[0],len: o[1],rad: o[3],res: o[4]});
        case 'SPHR':
            return sizeColor(o[2], o[3], {r0: o[0],res: o[1]});
        case 'DNUT':
            return sizeColor(o[5], o[6], {ri: o[0],fni: o[1],roti: o[2],ro: o[3],fno: o[4]});
        case 'CUBE':
            return sizeColor(o[3], o[4], {x: o[0],y: o[1],z: o[2],dimx: o[0] / 2,dimy: o[1] / 2,dimz: o[2] / 2});
        case 'BOXZ':
            return sizeColor(o[3], o[4], {x: o[0],y: o[1],z: o[2],dimx: o[0] / 2,dimy: o[1] / 2,dimz: o[2] / 2});
        case 'WOXZ':
            return sizeColor(o[3], o[4], {x: o[0],y: o[1],z: o[2],dimx: o[0] / 2,dimy: o[1] / 2,dimz: o[2] / 2});
        case 'WEDG':
            return sizeColor(o[3], o[4], {x: o[0],y: o[1],z: o[2]});
        case 'PYRM':
            return sizeColor(o[3], o[4], {x: o[0],y: o[1],z: o[2],dimx: o[0] / 2,dimy: o[1] / 2,dimz: o[2] / 2});
        case 'RYRM':
            return sizeColor(o[3], o[4], {x: o[0],y: o[1],z: o[2],dimx: o[0] / 2,dimy: o[1] / 2,dimz: o[2] / 2});
        case 'RUBE':
            return sizeColor(o[5], o[6], {x: o[0],y: o[1],z: o[2],dimx: o[0] / 2,dimy: o[1] / 2,dimz: o[2] / 2,rad: o[3],res: o[4]});
        case 'ROXZ':
            return sizeColor(o[5], o[6], {x: o[0],y: o[1],z: o[2],dimx: o[0] / 2,dimy: o[1] / 2,dimz: o[2] / 2,rad: o[3],res: o[4]});
        case 'REDG':
            return sizeColor(o[5], o[6], {x: o[0],y: o[1],z: o[2],dimx: o[0] / 2,dimy: o[1] / 2,dimz: o[2] / 2,rad: o[3],res: o[4]});
        case 'RYRM':
            return sizeColor(o[5], o[6], {x: o[0],y: o[1],z: o[2],dimx: o[0] / 2,dimy: o[1] / 2,dimz: o[2] / 2,rad: o[3],res: o[4]});
    }
}
//
//	rotateTranslate is the second to last function processed in makeVirtualObject before returning   (union intersect etc are handled afterward). 
//  This function is called for each instance of an object for placing the object in the right size, color and location in the correct xyz 
//  and rotation coordinates.
//
function rotateTranslate(ob, op) {
    var r1 = op.r1.axis
      , r2 = op.r2.axis

	  // First Rotate r1 then r2
    ob	= (r1 == '1' || r1 == 'x' || r1 == 'X') ? ob.rotateX(op.r1.degrees) 
		: (r1 == '2' || r1 == 'y' || r1 == 'Y') ? ob.rotateY(op.r1.degrees) 
		: (r1 == '3' || r1 == 'z' || r1 == 'Z') ? ob.rotateZ(op.r1.degrees) 
		: ob;
    ob	= (r2 == '1' || r2 == 'x' || r2 == 'X') ? ob.rotateX(op.r2.degrees) 
		: (r2 == '2' || r2 == 'y' || r2 == 'Y') ? ob.rotateY(op.r2.degrees) 
		: (r2 == '3' || r2 == 'z' || r2 == 'Z') ? ob.rotateZ(op.r2.degrees) 
		: ob;

		// After Rotate Resize
    if (op.size !== null && op.size !== undefined && op.size !== 1)
        ob = ob.scale(op.size);

		// After Resize setting a new color
    if (op.color !== null && op.color !== undefined)
        ob = ob.setColor(op.color);

		// Last operation (is to Place the object in the correct x,y,z coordinates
    return ob.translate([op.x, op.y, op.z]);
}
function makeInstances(instanceArray) {

	// Each defined object has individual instances that need to be positioned in 3space. This function sets up the instance parameters.
    for (var i = 0; i < instanceArray.length; i++) {
  
        var a = instanceArray[i]
         if (a instanceof Array)
            instanceArray[i] = {x: a[0],y: a[1],z: a[2],r1: {axis: a[3],degrees: a[4]},r2: { axis: a[5],degrees: a[6] } ,size: (a[7]) ? a[7] : 1, color: (a[8]) ? a[8] : null }
    }
    return instanceArray;
}

// This function is called recursively to process the JSON specification.
//
//
// Parameters :
//		nodeSet:     The JSON node that has within it definitions to create 3d objects
//		setOperator: Tells the next level down how to combine the items defined at that level of iteration
//		
//

function makeVirtualObject(nodeSet,  setOperator,basenode) {

    var gObjSet = [];
	basenode = basenode || nodes;
    for (var each in nodeSet) {

        if (each == 'intersect' || each == 'subtract' || each == 'invert' || each == 'union') {

            gObjSet.push(makeVirtualObject(nodeSet[each],  each, basenode));

            continue;
        }
        var gType	= gverbs[ (nodeSet[each][0]).toUpperCase()]					// normalizing all operation verbs before using them

        , params	= makeParms( gType, nodeSet[each][1], basenode ,  each )		// normalizing all the parameters to process

        , instances = makeInstances(    nodeSet[each][2]);						// normalizing all the instance data to process
        
        for (var i = 0; i < instances.length; i++)

            gObjSet.push(rotateTranslate(this[ gType ](params), instances[i])); //this is where the real work occurs.  
																				// Each function is called by this[gType](params) which makes an generic call to the 
																				// Correct function defined by each gType variable, which in turn is a normalized 
																				// name of a function call.
																				// The return from this[]() function call is CSG object that is sent to rotate/translate and 
																				// Finally put into an array to be consolidated upon return from the makeVirtualObject function
    }
    return (setOperator == 'intersect') ?	(new CSG()).intersect(gObjSet) 
		:  (setOperator == 'subtract' ) ?	 difference (gObjSet)		// still requires openscad for this function
		:  (setOperator == 'invert'   ) ?	(new CSG()).invert(gObjSet) 
		:  (setOperator == 'union'    ) ?	(new CSG()).union(gObjSet) 
    	:									(new CSG()).union(gObjSet);

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Three.js version without csg
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Presently three.js parsing is a separate set of functions and syntax. This is due to the rotation as quaternion vs euler nature of openjscad
// The syntax is as follows
//  object = Array [ function, Parms, Instances}  // where the function is limited right now to  // loading, or calling other objects or functions
//			Parms are an array of arbitrary length 
//			instances are like the ones above with postion listed in x,z, coordinats ,  rotation listed as a vector. and scale also as a vector. 
//	
//						 
//		'veyron'	: ['LOD3'
//							, ['loadurl3',  'obj/veyron/VeyronNoUv_bin.js'		, { mats :  ['Red' , 'Pure chrome' , 'Red metal' , 'Dark glass', 'Pure chrome', 'Pure chrome' , 'Red glass 50', 'Orange glass 50'], face : null, mmap : [] }	, 1, null]	
//							, [	{x: 100 ,y: -25, z: -20		,rotation :	[0, Math.PI -   Math.PI /12 ,0] , scale: [.04, .04, .04]}] 
//							] 
//
//	These three.js related objects and extensions need to be enhanced with a better treatement of meshes, textures etc.
//  Also missing in both parsers is animation.

//
//  These Mesh Materials are used with the loadurl3 (Auto)  loading routine. There are many more that could be added ... including as an entire syntax to encode in json.
//	For example  meshname, meshdescription, material functioncall, parms... 
//
//
  var mlib = {

 			 	"Blue"				: 	new THREE.MeshLambertMaterial(	{ color: 0x001133, combine: THREE.MixOperation, reflectivity: 0.3									} )
			,	"Red"				:	new THREE.MeshLambertMaterial(	{ color: 0x660000, combine: THREE.MixOperation, reflectivity: 0.25									} )
 			,	"White"				:	new THREE.MeshLambertMaterial(	{ color: 0xffffff, combine: THREE.MixOperation, reflectivity: 0.25									} )
			,	"Pure chrome"		: 	new THREE.MeshLambertMaterial(	{ color: 0xffffff, 																					} )
			,	"Dark chrome"		:	new THREE.MeshLambertMaterial(	{ color: 0x444444, 																					} )
  			,	"Red metal"			: 	new THREE.MeshLambertMaterial(	{ color: 0x770000, combine: THREE.MultiplyOperation													} )
			,	"Dark glass"		:	new THREE.MeshLambertMaterial(	{ color: 0x101046, opacity: 0.25, transparent: true													} )
			,	"Red glass 50"		: 	new THREE.MeshLambertMaterial(	{ color: 0xff0000, opacity: 0.5,  transparent: true													} )
 			,	"Orange glass 50"	:	new THREE.MeshLambertMaterial(	{ color: 0xffbb00, opacity: 0.5,  transparent: true													} )
			,	"Black rough"		:	new THREE.MeshLambertMaterial(	{ color: 0x050505																					} )
			,	"Light glass"		:	new THREE.MeshBasicMaterial(	{ color: 0x223344, combine: THREE.MixOperation, reflectivity: 0.25,		transparent: true			} )
 			,	"Gray shiny"		:	new THREE.MeshPhongMaterial(	{ color: 0x050505, shininess: 20																	} )
			,	"Fullblack rough"	:	new THREE.MeshLambertMaterial(	{ color: 0x000000																					} )
	};
 

	function rotate3TranslateScale(ob, op ) {
		if (op.rotation) 	
						ob.object.rotation.set(op.rotation[0],op.rotation[1],op.rotation[2]);
		if (op.scale){		
							ob.object.scale.x	 =  op.scale[0] * 1;
							ob.object.scale.y	 =  op.scale[1] * 1;	
							ob.object.scale.z	 =  op.scale[2] * 1;
		}	
		ob.object.position.set(op.x ,op.y ,op.z)					
 		ob.scene.add(ob.object);
	}
	function	loadurl3(ob,instances  ){
					var		loader =		new	THREE.BinaryLoader( true );
							loader.load(ob.url,	function( geometry ) {  
 
										 	for (var i = 0; i < ob.prms.mats.length; i++)
										 		ob.prms.mmap[i]				=	mlib[ob.prms.mats[i]]  ;
												ob.prms.face				=  	new THREE.MeshFaceMaterial()
												ob.prms.face.materials		=	ob.prms.mmap;  
												ob.object					=	new THREE.Mesh( geometry,  ob.prms.face  );
											for (var i =0; i < instances.length; i++)
												rotate3TranslateScale(ob, instances[i] )
		 					} );
	}
	function make3Parms(vb,  op, node3Set ,  each,  scene ) {
		if (typeof (op) == "object" &&  (! op instanceof Array)){
					 op.node3Set	=  node3Set; 
					 op.each		=  each;  
					 op.scene		=  scene;
			return	scale3Color(  op.scale, op.color,o);
		}
		function scale3Color(scale, color, op) {  op.color = color || null;   op.scale = scale || 1;   return op;    }
		switch ( vb ) {  
			case 'VOB3':
				return scale3Color(op[0], op[1],	{											node3Set : node3Set, each : each, scene : scene });
			case 'FUN3':
				return scale3Color(op[2], op[3],	{call: op[0], prms : op[1]  ,				node3Set : node3Set, each : each, scene : scene });
			case 'LOD3':
				return scale3Color(op[2], op[3],	{call: op[0], prms : op[2]	,url : op[1],	node3Set : node3Set, each : each, scene : scene });
		}
	}
	function make3VirtualObject(node3Set,  scene) {
		var g3verbs = { "VOB3"	: "VOB3","FUN3"	: "FUN3" ,"LOD3" : "LOD3"  } ;
		for (var each in node3Set) {
			 var g3Type	= g3verbs[ (node3Set[each][0]).toUpperCase()];	
			 var params	= make3Parms(g3Type, node3Set[each][1], node3Set ,each,scene );					 
			 if (g3Type == "LOD3")  
					this[params.call](params,node3Set[each][2],scene  ) ;
		}
	}
 