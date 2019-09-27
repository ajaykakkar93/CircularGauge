/*globals define
var a = [2, 6, 8, 1, 10, 11].sort((a, b) => a - b).slice(0,2)
https://codepen.io/anon/pen/PLRwrg
*/
define(["qlik", "jquery", "text!./style.css"], function(qlik, $, cssContent) {
    'use strict';
    $("<style>").html(cssContent).appendTo("head");
    return {
        initialProperties: {
            qHyperCubeDef: {
                qDimensions: [],
                qMeasures: [],
                qInitialDataFetch: [{
                    qWidth: 2,
                    qHeight: 1000
                }]
            }
        },
        definition: {
            type: "items",
            component: "accordion",
            items: {
                dimensions: {
                    uses: "dimensions",
                    max: 1
                },
                measures: {
                    uses: "measures",
                    max: 1,
                    type: "items",
                    items: {
                        /*color: {
                        	type: "string",
                        	ref: "qAttributeExpressions.1.qExpression",
                        	label: "Background Color",
                        	defaultValue: "#ffffff",
                        	component: "expression"
                        },*/
                        stroke: {
                            type: "string",
                            ref: "qAttributeExpressions.0.qExpression",
                            label: "Stroke Color",
                            defaultValue: "#a2ed56",
                            component: "expression"
                        }
                    }
                },
                sorting: {
                    uses: "sorting"
                },
                settings: {
                    uses: "settings",
                    items: {
                        customSettings: {
                            label: "Progress Settings",
                            type: "items",
                            items: {
                                qlikDefaultStyle: {
                                    type: "boolean",
                                    component: "switch",
                                    label: "Qlik Default Style",
                                    ref: "qlikDefaultStyle",
                                    options: [{
                                        value: true,
                                        label: "On"
                                    }, {
                                        value: false,
                                        label: "Not On"
                                    }],
                                    defaultValue: false
                                },
                                gaugeSize: {
                                    type: "number",
                                    component: "slider",
                                    label: "Gauge Size",
                                    ref: "gaugeSize",
                                    min: 100,
                                    max: 500,
                                    step: 1,
                                    defaultValue: 100
                                },
                                width: {
                                    type: "number",
                                    component: "slider",
                                    label: "Width",
                                    ref: "width",
                                    min: 1,
                                    max: 20,
                                    step: 1,
                                    defaultValue: 5
                                },
                                headerfontsize: {
                                    type: "number",
                                    component: "slider",
                                    label: "Header Font Size",
                                    ref: "headerfontsize",
                                    min: 10,
                                    max: 40,
                                    step: 1,
                                    defaultValue: 10
                                },
                                valuefontsize: {
                                    type: "number",
                                    component: "slider",
                                    label: "Value Font Size",
                                    ref: "valuefontsize",
                                    min: 10,
                                    max: 40,
                                    step: 1,
                                    defaultValue: 10
                                },
                                bgcolor: {
                                    label: "Background Color",
                                    component: "color-picker",
                                    ref: "bgcolor",
                                    type: "object",
                                    dualOutput: true,
                                    defaultValue: {
                                        color: "#ffffff"
                                    }
                                },
                                headercolor: {
                                    label: "Header Color",
                                    component: "color-picker",
                                    ref: "headercolor",
                                    type: "object",
                                    dualOutput: true,
                                    defaultValue: {
                                        color: "#000000"
                                    }
                                },
                                valuecolor: {
                                    label: "Value Color",
                                    component: "color-picker",
                                    ref: "valuecolor",
                                    type: "object",
                                    dualOutput: true,
                                    defaultValue: {
                                        color: "#000000"
                                    }
                                },
                                animation: {
                                    type: "integer",
                                    label: "Animation",
                                    ref: "animation",
                                    defaultValue: 1000,
                                    min: 0
                                },
                                showtotal: {
                                    type: "boolean",
                                    component: "switch",
                                    label: "Show Total",
                                    ref: "showtotal",
                                    options: [{
                                        value: true,
                                        label: "On"
                                    }, {
                                        value: false,
                                        label: "Not On"
                                    }],
                                    defaultValue: false
                                },
                                totalText: {
                                    type: "string",
                                    label: "Total Text",
                                    ref: "totalText",
                                    expression: "optional",
                                    show: function(d) {
                                        return d.showtotal;
                                    }
                                },
                                totalvaluecolor: {
                                    label: "Total Value Color",
                                    component: "color-picker",
                                    ref: "totalvaluecolor",
                                    type: "object",
                                    dualOutput: true,
                                    defaultValue: {
                                        color: "#ffffff"
                                    },
                                    show: function(d) {
                                        return d.showtotal;
                                    }
                                },
                                totalvaluebgcolor: {
                                    label: "Total Value BG Color",
                                    component: "color-picker",
                                    ref: "totalvaluebgcolor",
                                    type: "object",
                                    dualOutput: true,
                                    defaultValue: {
                                        color: "#cccccc"
                                    },
                                    show: function(d) {
                                        return d.showtotal;
                                    }
                                }
                                //end
                            }
                        }
                    }
                }
            }
        },
        snapshot: {
            canTakeSnapshot: true
        },
        paint: function($element, layout) {
            console.log(layout);
            var html = "",
                options = {
                    "qlikDefaultStyle": layout.qlikDefaultStyle,
                    "width": layout.width,
                    "headerfontsize": layout.headerfontsize,
                    "valuefontsize": layout.valuefontsize,
                    "bgcolor": layout.bgcolor.color,
                    "gaugeSize": layout.gaugeSize,
                    "headercolor": layout.headercolor.color,
                    "valuecolor": layout.valuecolor.color,
                    "animation": layout.animation,
                    "showtotal": layout.showtotal,
                    "totalText": layout.totalText,
                    "totalvaluecolor": layout.totalvaluecolor.color,
                    "totalvaluebgcolor": layout.totalvaluebgcolor.color,
                    "total": layout.qHyperCube.qGrandTotalRow["0"].qText
                };
            html += "<div style='background:" + options.bgcolor + ";'>";

            if (options.showtotal) {
                html += '<div style="width: 100%;text-align: center;padding-top: 10px;"><span style="width: 100%;color: ' + options.totalvaluecolor + ';background: ' + options.totalvaluebgcolor + ';padding: 5px;border-radius: 50px;font-weight:  bold;">' + options.totalText + ' ' + options.total + '</span></div>'
            }
            $.each(layout.qHyperCube.qDataPages["0"].qMatrix, function(k, v) {
                console.log(k, v[1].qNum);
                //var progressColor=v[1].qAttrExps.qValues["1"].qText;
                var progressStroke = v[1].qAttrExps.qValues["0"].qText;
                if (!options.qlikDefaultStyle) {
                    html += '<svg style="max-width:' + options.gaugeSize + 'px !important;" class="radial-progress" data-percentage="' + (Math.round(v[1].qNum * 100)) + '" viewbox="0 0 80 80">';
                    //fill:"+progressColor+" !important;
                    html += "<circle style='stroke-width:" + options.width + " !important; stroke:" + progressStroke + " !important;' class='incomplete' cx='40' cy='40' r='35'></circle>";
                    html += "<circle style='stroke-width:" + options.width + " !important; stroke:" + progressStroke + " !important;' class='complete' cx='40' cy='40' r='35'></circle>";
                    html += "<text style='fill:" + options.headercolor + ";font-size:" + options.headerfontsize + "px;' class='percentage' transform='matrix(0, 1, -1, 0, 80, 0)' x='50%' y='40%'>";
                    html += v[0].qText;
                    html += "</text>";
                    html += "<text style='fill:" + options.valuecolor + ";font-size:" + options.valuefontsize + "px;' class='percentage' transform='matrix(0, 1, -1, 0, 80, 0)' x='50%' y='63%'>";
                    html += v[1].qText;
                    html += "</text>";
                    html += '</svg>';
                } else {

                    html += '<svg class="qlik_default" style="transform: rotate(0deg);max-width:' + options.gaugeSize + 'px !important;" class="qlik_default" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" data-value="' + (Math.round(v[1].qNum * 100)) + '">';
                    html += '<path class="incomplete" style="stroke-width:' + options.width + '!important; stroke:' + progressStroke + ' !important;"  d="M41 149.5a77 77 0 1 1 117.93 0"  fill="none"/>';
                    html += '<path class="meter complete" style="stroke-width:' + options.width + '!important; stroke:' + progressStroke + ' !important;" d="M41 149.5a77 77 0 1 1 117.93 0" fill="none"/>';
                    html += '<text style="fill:' + options.headercolor + ';font-size:' + options.headerfontsize + 'px; text-anchor: middle;" class="percentage" transform="" x="100" y="80">';
                    html += v[0].qText;
                    html += '</text>';
                    html += '<text style="fill:' + options.valuecolor + ';font-size:' + options.valuefontsize + 'px; text-anchor: middle;" class="percentage" transform="" x="100" y="110">';
                    html += v[1].qText;
                    html += '</text>';
                    html += '</svg>';
                }
            });
            html += "</div>";
            $element.html(html);
            if (options.qlikDefaultStyle == false) {
                console.log("None qlikDefaultStyle");
                $('svg.radial-progress').each(function(index, value) {
                    // If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
                    // Get percentage of progress
                    var percent = $(value).data('percentage');
                    // Get radius of the svg's circle.complete
                    var radius = $(this).find($('circle.complete')).attr('r');
                    // Get circumference (2πr)
                    var circumference = 2 * Math.PI * radius;
                    // Get stroke-dashoffset value based on the percentage of the circumference
                    var strokeDashOffset = circumference - ((percent * circumference) / 100);
                    // Transition progress for 1 seconds
                    $(this).find($('circle.complete')).animate({
                        'stroke-dashoffset': strokeDashOffset
                    }, options.animation);
                });
            } else {
                console.log("qlikDefaultStyle");
                // Get all the Meters
                var meters = document.querySelectorAll('svg.qlik_default[data-value] .meter');
                meters.forEach((path) => {
                    // Get the length of the path
                    let length = path.getTotalLength();
                    // console.log(length) once and hardcode the stroke-dashoffset and stroke-dasharray in the SVG if possible 
                    // or uncomment to set it dynamically
                    // path.style.strokeDashoffset = length;
                    path.style.strokeDasharray = 350;
                    // Get the value of the meter
                    let value = parseInt(path.parentNode.getAttribute('data-value'));
                    // Calculate the percentage of the total length
                    let to = length * ((100 - value) / 100);
                    // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
                    path.getBoundingClientRect();
                    // Set the Offset
                    path.style.strokeDashoffset = Math.max(0, to);
                    path.style.transition = "stroke-dashoffset " + options.animation + "ms ease-in-out";
                });
            }


            return qlik.Promise.resolve();
        }
    };
});
/*
			html=`
			<svg style="max-width:120px !important;" class="radial-progress" data-percentage="10" viewbox="0 0 80 80">
				<circle style="stroke-width:5px !important;" class="incomplete" cx="40" cy="40" r="35"></circle>
				<circle style="stroke-width:10px !important;" class="complete" cx="40" cy="40" r="35" style="stroke-dashoffset: 0;"></circle>
				<text class="percentage" transform="matrix(0, 1, -1, 0, 80, 0)" x="50%" y="57%">
					10%
				</text>
			</svg>`;
      */