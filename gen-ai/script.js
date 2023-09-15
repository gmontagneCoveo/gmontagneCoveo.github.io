const data = [39, 73, 370, 516];

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
const radius = height / 2;

const colors = [
    "#00D4B3", "#B6FAF0", "#65E4D1", "#EEE"
];

const arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 40)
    .context(context);

const pie = d3.pie();

const arcs = pie(data);

context.translate(width / 2, height / 2);

arcs.forEach(function(d, i) {
    context.beginPath();
    arc(d);
    context.fillStyle = colors[i];
    context.fill();
});

context.fillStyle = "#000";
context.font = '16px san-serif';
const textString = "998 requests";
const textWidth = context.measureText(textString).width;

context.fillText(textString, -(textWidth / 2), 5);