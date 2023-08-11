var canvas = document.querySelector("canvas");
if (canvas) {
    var context = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
