var SitaImageColorPicker = {
    reloadImage: function (imageSrc) {
    },
    initHandleFilePicker: function () {
        document.getElementById('filePicker').addEventListener('change', (event) => {
            var input = event.target;

            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result;
                SitaImageColorPicker.reloadImage(dataURL)
            };
            reader.readAsDataURL(input.files[0]);
        })

    }
}

function getRelativeLuminance(rgb) {// var rgb = [255,0,0];
    var rgb = rgb.map(function (c) {
        c /= 255;
        return c < .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4);

    });

    return (21.26 * rgb[0] + 71.52 * rgb[1] + 7.22 * rgb[2]) / 100
}

function colorContrast(c1, c2) {
    var l1 = getRelativeLuminance(c1);
    var l2 = getRelativeLuminance(c2);
    var ret = (l1 + .05) / (l2 + .05);
    // 0.05 for not dividing with 0
    return ret < 1 ? 1 / ret : ret;
}


function getFontColor(rgbRy, p) {
    if (colorContrast(rgbRy, [255, 255, 255]) > 4.5) {
        p.style.color = "white";
    } else {
        p.style.color = "black";
    }
}

function getFontColor(rgbRy) {
    if (colorContrast(rgbRy, [255, 255, 255]) > 4.5) {
        return "white";
    } else {
        return "black";
    }
}

var theBody = document.body;
var palette = document.querySelector(".palette");
var img = document.getElementById("img");
var viewColor = document.querySelector(".viewColor");// the current color
var colorsRy = [];
var imgW = 639;
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width = imgW; //img.width,
cx = cw / 2;
var ch = canvas.height = imgW * img.height / img.width,
    cy = ch / 2;

//draw the first image on the canvas
ctx.drawImage(img, 0, 0, cw, ch);
// get the Image Data
var imgData = ctx.getImageData(0, 0, cw, ch);
var pixels = imgData.data;
var thisRGB;
var thisRGBRy;

// on mousemove you get the current color
canvas.addEventListener("mousemove", function (e) {
    var m = oMousePos(canvas, e);

    var i = (m.x + m.y * cw) * 4;
    var R = pixels[i];
    var G = pixels[i + 1];
    var B = pixels[i + 2];
    thisRGBRy = [R, G, B];
    thisRGB = display_rgb(thisRGBRy);
    viewColor.style.backgroundColor = thisRGB;
    viewColor.style.color = getFontColor(thisRGBRy);
    //viewColor.innerHTML =  thisRGB;

}, false);

// You may drag and drop a new image of your choice.
theBody.addEventListener("dragenter", dragenter, false);
theBody.addEventListener("dragover", dragover, false);
theBody.addEventListener("drop", drop, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var datos = e.dataTransfer;
    var theFiles = datos.files;
    handleFiles(theFiles);
}

SitaImageColorPicker.reloadImage = function (imageSrc) {
    var img = new Image();
    img.src = imageSrc;
    img.onload = function () {
        var w = imgW;
        var h = imgW * img.height / img.width;
        // clear canvas & swatches
        ctx.clearRect(0, 0, cw, ch);
        clearSwatches(palette);
        colorsRy.length = 0;
        ch = canvas.height = h,
            cy = ch / 2;
        ctx.drawImage(this, 0, 0, w, h);
        imgData = ctx.getImageData(0, 0, cw, ch);
        pixels = imgData.data;
        getPaletteInImage(null, img);
    }

}

function handleFiles(theFiles) {
    for (var i = 0; i < theFiles.length; i++) {
        var _file = theFiles[i];
        var isImg = /^image\//;

        if (!isImg.test(_file.type)) {
            continue;
        }
        SitaImageColorPicker.reloadImage(window.URL.createObjectURL(_file));
    }
}

// END drag and drop new image


function Swatch(RGBry, parent) {
    this.element = document.createElement("div");

    this.rgb = display_rgb(RGBry);
    this.hex = display_hex(rgb2hex(RGBry));
    this.hsl = display_hsl(rgb2hsl(RGBry));

    this.att = {}
    this.att.class = "swatch";
    this.att.style = "background-color:" + this.rgb + "; color:" + getFontColor(RGBry) + ";";
    for (var name in this.att) {
        if (this.att.hasOwnProperty(name)) {
            this.element.setAttribute(name, this.att[name]);
        }
    }
    this.element.innerHTML = this.hex + "<br>" + this.rgb + "<br>" + this.hsl;
    //parent.appendChild(this.element);
    parent.prepend(this.element);
}

canvas.addEventListener("click", function (e) {
    // add swatch on click
    var swatch = new Swatch(thisRGBRy, palette);
    colorsRy.push(swatch);
    // get the colors string
    getColorsStr(colorsRy);

}, false);

palette.addEventListener("dblclick", function (e) {
    // remove swatch on dblclick
    if (e.target.className == "swatch") {
        for (var i = 0; i < colorsRy.length; i++) {
            if (colorsRy[i].element == e.target) {
                colorsRy.splice(i, 1);
                palette.removeChild(e.target);
                break;
            }
        }
    }

    var colorsStr = getColorsStr(colorsRy);
    console.clear();
    console.log(colorsStr);

}, false);

function clearSwatches(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getColorsStr(colorsRy) {
    var colorsStr = ''
    for (var i = 0; i < colorsRy.length; i++) {
        colorsStr += '[' + colorsRy[i].hex + ',' + colorsRy[i].rgb + ',' + colorsRy[i].hsl + ']';
        if (i < colorsRy.length - 1) {
            colorsStr += ',\n';
        }
        ;
    }
    return colorsStr;
}

function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return { //objeto
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

SitaImageColorPicker.pasteImageInit = function (imageElementId, options) {
    let {pasteFailedMes = ''} = options;
    document.onpaste = function (event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function (event) {
                    if (event.target.result.includes('data:image')) {
                        SitaImageColorPicker.reloadImage(event.target.result);
                    } else {
                        if (pasteFailedMes !== '') {
                            alert(pasteFailedMes)
                        }

                    }

                }; // data url!
            }
        }
    }
}

function getPaletteInImage(imgElementId, image) {
    var myImage;
    if (imgElementId) {
        myImage = document.getElementById(imgElementId);
    } else {
        myImage = image;
    }
    let colors = colorImage.getPalette(myImage, 5);
    var html = '';
    for (let i in colors) {
        var rgb = colors[i];
        let hex = '#' + rgb2hex(rgb).join('');
        let colorText = getFontColor(rgb);
        html += '<div class="colorInImage" style="background: ' + hex + ';color: ' + colorText + '">' + hex + '</div>'
    }
    document.getElementById('listColor').innerHTML = html
}
