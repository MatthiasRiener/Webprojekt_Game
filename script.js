


$.get("tileset/overworld.json", function (data) {
    canvasData = data;
}).then(
    $.get("files/test1.xml", function (data) {
        var json_object = xmlToJson(data);
        console.log(json_object)
    })
);

var level = {};
var spriteSheet = "overworld";
var cameraTracking = true;
var batteryLoading = 0.9;

var mapWidth = 0;
var mapHeight = 0;
var canvasData = null;
var json = {
    "spriteSheet": "overworld",
    "cameraTracking": true,
    "batteryLoading": 0.9,
    "patterns": {},
    "layers": [

    ]

}
// Changes XML to JSON
function xmlToJson(xml) {

    var tile = xml.childNodes.item(0);
    mapWidth = parseInt(tile.attributes.tileswide.value);
    mapHeight = parseInt(tile.attributes.tileshigh.value);



    tile.childNodes.forEach((element) => {
        if (element.nodeName == 'layer') {
            let obj = {
                "backgroundSpeed": 1,
                "tiles": [

                ]
            }
            for (let item of element.children) {
                var valueX = parseInt(item.attributes.x.value);
                var valueY = parseInt(item.attributes.y.value);
                var index = parseInt(item.attributes.index.value);

                var tileAttribute = getTileAttributes(index);
                var itemObj = {
                    "name": tileAttribute.name,
                    "type": tileAttribute.type,
                    "ranges": [[
                        valueX, 1, valueY, 1
                    ]]
                }

                obj.tiles.push(itemObj);
            }
            json.layers.push(obj);
        }
    });

    json.entities = [];
    return json;
};


function getTileAttributes(index) {
    tileAttributes = {
        
    };
    canvasData.tiles.forEach((tile) => {
        if(tile.tileIndex == index){
            tileAttributes.name = tile.name;
            tileAttributes.type = tile.type;
        }
    })

    return tileAttributes;

}