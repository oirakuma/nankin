var srcs = [
  "p_ji_c_1.gif",
  "p_ji_e_1.gif",
  "p_ji_h_1.gif",
  "p_ji_n_1.gif",
  "p_ji_s_1.gif",
  "p_ji_w_1.gif",
  "p_ms1_1.gif",
  "p_ms2_1.gif",
  "p_ms3_1.gif",
  "p_ms4_1.gif",
  "p_ms5_1.gif",
  "p_ms6_1.gif",
  "p_ms7_1.gif",
  "p_ms8_1.gif",
  "p_ms9_1.gif",
  "p_no_1.gif",
  "p_ps1_1.gif",
  "p_ps2_1.gif",
  "p_ps3_1.gif",
  "p_ps4_1.gif",
  "p_ps5_1.gif",
  "p_ps6_1.gif",
  "p_ps7_1.gif",
  "p_ps8_1.gif",
  "p_ps9_1.gif",
  "p_ss1_1.gif",
  "p_ss2_1.gif",
  "p_ss3_1.gif",
  "p_ss4_1.gif",
  "p_ss5_1.gif",
  "p_ss6_1.gif",
  "p_ss7_1.gif",
  "p_ss8_1.gif",
  "p_ss9_1.gif",
];

var pais = null;
var firstX = null;
var firstY = null;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
ctx.fillStyle = 'rgba(192, 80, 77, 0.7)';

function initialize() {
  firstX = null;
  firstY = null;

  pais = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < srcs.length; j++)
      pais.push(srcs[j]);
  }
  pais.sort(function(x,y){
    return Math.random()-0.5;
  });
}

function reset() {
  initialize();
  repaint();
}

function allRemoved(pais) {
  return (pais[8-1] == null);
}

function repaint() {
  ctx.clearRect(0, 0, 800, 600);
  ctx.beginPath();
  //左上から下に向かって描画する
  for (var i = 0; i < 17; i++) {
    for (var j = 0; j < 8; j++) {
      var img = new Image();
      img.src = "images/"+pais[8*i+j];
      ctx.drawImage(img, i*47, j*63);
    }
  }

  if (firstX != null && firstY != null) {
    ctx.fillRect(47*firstX, 63*firstY, (47-1), 63);
    ctx.stroke();
  }
}

function shiftDownLeft(a) {
  for (var i = 0; i < 17; i++)
    shiftDown(a, i);
  for (var i = 0; i < 17; i++)
    shiftDown(a, i);

  for (var i = 0; i < 17; i++)
    shiftLeft(a, i);
  for (var i = 0; i < 17; i++)
    shiftLeft(a, i);

  function shiftDown(a, i) {
    for (var j = 8-1; j > 0; j--) {
      if (a[8*i+j] == null) {
        a[8*i+j] = a[8*i+j-1];
        a[8*i+j-1] = null;
      }
    }
  }

  function shiftLeft(a, i) {
    for (var j = 0; j < 8; j++) {
      if (a[8*i+j] != null)
        return false;
    }
    for (var j = 0; j < 8; j++) {
      a[8*i+j] = a[8*(i+1)+j];
      a[8*(i+1)+j] = null;
    }
  }
}

canvas.addEventListener("click", function(e){
  console.log(e);
  console.log(e.clientX-9);
  console.log(e.clientY-9);

  var x = e.clientX-9;
  var y = e.clientY-9;

  var secondX = Math.floor(x/47);
  var secondY = Math.floor(y/63);
  var second1 = 8*secondX+secondY;

  if (pais[second1] == null) return;

  if (firstX != null && firstY != null) {
    var first1 = 8*firstX+firstY;

    var dist = (firstX-secondX)*(firstX-secondX) + (firstY-secondY)*(firstY-secondY);
    if (first1 != second1 && (firstX == secondX || firstY == secondY || dist <= 2) && pais[first1] == pais[second1]) {
      pais[first1] = null;
      pais[second1] = null;
      shiftDownLeft(pais);
      firstX = null;
      firstY = null;

      if (allRemoved(pais))
        alert("Congratulations!");
    } else {
      firstX = secondX;
      firstY = secondY;
    }
  } else {
    firstX = Math.floor(x/47);
    firstY = Math.floor(y/63);
  }
  repaint();
});

setTimeout(function(){
  initialize();
  repaint();
}, 0);
