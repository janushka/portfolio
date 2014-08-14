'use strict';

angular.module('portfolioApp')
    .directive('radarchart', ['d3Service', function (d3service) {
        return {
            restrict: 'EA',
            scope: {
                data: '=', // bi-directional data-binding
                evaluation: '=', // bi-directional data-binding
                reset: '=', // bi-directional data-binding
                score: '=' // bi-directional data-binding
            },
            link: function postLink(scope, element, attrs) {
                d3service.d3().then(function (d3) {
                    var pie = d3.layout.pie()
                        .sort(null);

                    var width = 660,
                        height = 500,
                        cwidth = 15;

                    var outerRadius = width / 2;
                    var innerRadius = height / 2;

                    var svg = d3.select(element[0])
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("class", "wrapper")
                        .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");

                    show(scope.data);

                    // watch for data changes and render radarchart if form is complete
                    scope.$watch('score', function (newVal, oldVal) {
                        if (newVal === oldVal) return; // on init
                        console.log('The \'score\'-scopeVariable in controller \'workshop\' has changed from: ' + oldVal + ' to: ' + newVal);
                        if (newVal >= 24) {
                            show(scope.data);
                            updateData(scope.evaluation);
                        }
                    }, true);

                    // watch for data changes and reset radarchart if reset-button has been clicked
                    scope.$watch('reset', function (newVal, oldVal) {
                        if (newVal === oldVal) return; // on init
                        console.log('The \'reset\'-scopeVariable in controller \'workshop\' has changed from: ' + oldVal + ' to: ' + newVal);
                        show(scope.data);
                    }, true);

                    function show(dataset) {
                        // remove all previous items before render
                        svg.selectAll('*').remove();

                        // If we don't pass any data, return out of the element
                        if (!dataset) return;

                        //Draw the Background-Circle
                        svg.append("circle")
                            .attr("cx", 0)
                            .attr("cy", 0)
                            .attr("r", innerRadius - 2 * cwidth)
                            .attr("fill", "#91A2B7");

                        var gs = svg.selectAll("g.wrapper").data(d3.values(dataset)).enter()
                            .append("g")
                            .attr("id", function (d, i) {
                                return Object.keys(dataset)[i];
                            });

                        var path = gs.selectAll("path")
                            .data(function (d) {
                                return pie(d);
                            })
                            .enter().append("path")
                            .attr("id", function (d, i, j) {
                                //console.log("Value of id = s" + j + i);
                                return "s" + j + i;
                            })
                            .attr("class", function (d, i, j) {
                                //console.log("value of i = " + i + ", value of j = " + j + ", data = " + d);
                                if ((Object.keys(dataset)[j].indexOf("spiritualitaet") != -1) && (i == 2 || i == 4 || i == 6)) {
                                    return "arc_dashed";
                                }
                                if ((Object.keys(dataset)[j].indexOf("identitaet") != -1) && (i == 0 || i == 2 || i == 8 || i == 10 || i == 16 || i == 18 )) {
                                    return "arc";
                                }
                                if ((Object.keys(dataset)[j].indexOf("identitaet") != -1) && (i == 4 || i == 6 || i == 12 || i == 14 || i == 20 || i == 22 )) {
                                    return "arc_dashed";
                                }
                                if ((Object.keys(dataset)[j].indexOf("identitaet") != -1) && (i == 1 || i == 9 || i == 17)) {
                                    return "arc_transparent";
                                }
                                if ((Object.keys(dataset)[j].indexOf("auftrag") != -1) && (i == 0 || i == 6 || i == 12 || i == 18 || i == 24)) {
                                    return "arc";
                                }
                                if ((Object.keys(dataset)[j].indexOf("auftrag") != -1) && (i == 2 || i == 4 || i == 8 || i == 10 || i == 14 || i == 16 || i == 20 || i == 22)) {
                                    return "arc_dashed";
                                }
                            })
                            .attr("fill", function (d, i, j) {
                                var color;
                                if (Object.keys(dataset)[j].indexOf("spiritualitaet") != -1) {
                                    return d3.rgb(238, 234, 231);
                                }
                                if (Object.keys(dataset)[j].indexOf("identitaet") != -1) {
                                    switch (i) {
                                        case 1:
                                            color = d3.rgb(221, 219, 224);
                                            break;
                                        case 9:
                                            color = d3.rgb(221, 219, 224);
                                            break;
                                        case 17:
                                            color = d3.rgb(221, 219, 224);
                                            break;
                                        default:
                                            color = d3.rgb(197, 200, 207);
                                            break;
                                    }
                                    return color;
                                }
                                if (Object.keys(dataset)[j].indexOf("auftrag") != -1) {
                                    switch (i) {
                                        case 0:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 2:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 4:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 6:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 8:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 10:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 12:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 14:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 16:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 18:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 20:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 22:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        case 24:
                                            color = d3.rgb(128, 147, 174);
                                            break;
                                        default:
                                            color = d3.rgb(169, 177, 195);
                                            break;
                                    }
                                    return color;
                                }
                            })
                            .attr("d", function (d, i, j) {
                                if (Object.keys(dataset)[j].indexOf("spiritualitaet") != -1) {
                                    //console.log("Value of d = " + JSON.stringify(d));
                                    switch (i) {
                                        case 0:
                                            d.startAngle = 0 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 1:
                                            d.startAngle = 0 * (Math.PI / 180);
                                            d.endAngle = 120 * (Math.PI / 180);
                                            break;
                                        case 2:
                                            d.startAngle = 120 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 3:
                                            d.startAngle = 120 * (Math.PI / 180);
                                            d.endAngle = 240 * (Math.PI / 180);
                                            break;
                                        case 4:
                                            d.startAngle = 240 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 5:
                                            d.startAngle = 240 * (Math.PI / 180);
                                            d.endAngle = 360 * (Math.PI / 180);
                                            break;
                                        case 6:
                                            d.startAngle = 360 * (Math.PI / 180);
                                            d.endAngle = 360 * (Math.PI / 180);
                                            break;
                                    }
                                }
                                // process segment should be out of alignment (not vertical!)
                                if (Object.keys(dataset)[j].indexOf("identitaet") != -1) {
                                    //console.log("data sAngle = " + d.startAngle + ", data eAngle = " + d.endAngle + ", pie data i = " + i + " and pie level j = " + j);
                                    switch (i) {
                                        case 0:
                                            d.startAngle = -20 * (Math.PI / 180);
                                            d.endAngle = -20 * (Math.PI / 180);
                                            break;
                                        case 1:
                                            d.startAngle = -20 * (Math.PI / 180);
                                            d.endAngle = 20 * (Math.PI / 180);
                                            break;
                                        case 2:
                                            d.startAngle = 20 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 3:
                                            d.startAngle = 20 * (Math.PI / 180);
                                            d.endAngle = (20 * (Math.PI / 180)) + ((80 / 3) * (Math.PI / 180));
                                            break;
                                        case 4:
                                            d.startAngle = (20 * (Math.PI / 180)) + ((80 / 3) * (Math.PI / 180));
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 5:
                                            d.startAngle = (20 * (Math.PI / 180)) + ((80 / 3) * (Math.PI / 180));
                                            d.endAngle = (20 * (Math.PI / 180)) + (2 * ((80 / 3) * (Math.PI / 180)));
                                            break;
                                        case 6:
                                            d.startAngle = (20 * (Math.PI / 180)) + (2 * ((80 / 3) * (Math.PI / 180)));
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 7:
                                            d.startAngle = (20 * (Math.PI / 180)) + (2 * ((80 / 3) * (Math.PI / 180)));
                                            d.endAngle = 100 * (Math.PI / 180);
                                            break;
                                        case 8:
                                            d.startAngle = 100 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 9:
                                            d.startAngle = 100 * (Math.PI / 180);
                                            d.endAngle = 140 * (Math.PI / 180);
                                            break;
                                        case 10:
                                            d.startAngle = 140 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 11:
                                            d.startAngle = 140 * (Math.PI / 180);
                                            d.endAngle = (140 * (Math.PI / 180)) + ((80 / 3) * (Math.PI / 180));
                                            break;
                                        case 12:
                                            d.startAngle = (140 * (Math.PI / 180)) + ((80 / 3) * (Math.PI / 180));
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 13:
                                            d.startAngle = (140 * (Math.PI / 180)) + ((80 / 3) * (Math.PI / 180));
                                            d.endAngle = (140 * (Math.PI / 180)) + (2 * ((80 / 3) * (Math.PI / 180)));
                                            break;
                                        case 14:
                                            d.startAngle = (140 * (Math.PI / 180)) + (2 * ((80 / 3) * (Math.PI / 180)));
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 15:
                                            d.startAngle = (140 * (Math.PI / 180)) + (2 * ((80 / 3) * (Math.PI / 180)));
                                            d.endAngle = 220 * (Math.PI / 180);
                                            break;
                                        case 16:
                                            d.startAngle = 220 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 17:
                                            d.startAngle = 220 * (Math.PI / 180);
                                            d.endAngle = 260 * (Math.PI / 180);
                                            break;
                                        case 18:
                                            d.startAngle = 260 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 19:
                                            d.startAngle = 260 * (Math.PI / 180);
                                            d.endAngle = (260 * (Math.PI / 180)) + ((80 / 3) * (Math.PI / 180));
                                            break;
                                        case 20:
                                            d.startAngle = (260 * (Math.PI / 180)) + ((80 / 3) * (Math.PI / 180));
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 21:
                                            d.startAngle = (260 * (Math.PI / 180)) + ((80 / 3) * (Math.PI / 180));
                                            d.endAngle = (260 * (Math.PI / 180)) + (2 * ((80 / 3) * (Math.PI / 180)));
                                            break;
                                        case 22:
                                            d.startAngle = (260 * (Math.PI / 180)) + (2 * ((80 / 3) * (Math.PI / 180)));
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 23:
                                            d.startAngle = (260 * (Math.PI / 180)) + (2 * ((80 / 3) * (Math.PI / 180)));
                                            d.endAngle = 340 * (Math.PI / 180);
                                            break;
                                    }
                                    //d._tmp = d.endAngle;
                                    //d.endAngle = d.startAngle;
                                }
                                if (Object.keys(dataset)[j].indexOf("auftrag") != -1) {
                                    switch (i) {
                                        case 0:
                                            d.startAngle = 0 * (Math.PI / 180);
                                            d.endAngle = 0 * (Math.PI / 180);
                                            break;
                                        case 1:
                                            d.startAngle = 0 * (Math.PI / 180);
                                            d.endAngle = 30 * (Math.PI / 180);
                                            break;
                                        case 2:
                                            d.startAngle = 30 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 3:
                                            d.startAngle = 30 * (Math.PI / 180);
                                            d.endAngle = 60 * (Math.PI / 180);
                                            break;
                                        case 4:
                                            d.startAngle = 60 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 5:
                                            d.startAngle = 60 * (Math.PI / 180);
                                            d.endAngle = 90 * (Math.PI / 180);
                                            break;
                                        case 6:
                                            d.startAngle = 90 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 7:
                                            d.startAngle = 90 * (Math.PI / 180);
                                            d.endAngle = 120 * (Math.PI / 180);
                                            break;
                                        case 8:
                                            d.startAngle = 120 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 9:
                                            d.startAngle = 120 * (Math.PI / 180);
                                            d.endAngle = 150 * (Math.PI / 180);
                                            break;
                                        case 10:
                                            d.startAngle = 150 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 11:
                                            d.startAngle = 150 * (Math.PI / 180);
                                            d.endAngle = 180 * (Math.PI / 180);
                                            break;
                                        case 12:
                                            d.startAngle = 180 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 13:
                                            d.startAngle = 180 * (Math.PI / 180);
                                            d.endAngle = 210 * (Math.PI / 180);
                                            break;
                                        case 14:
                                            d.startAngle = 210 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 15:
                                            d.startAngle = 210 * (Math.PI / 180);
                                            d.endAngle = 240 * (Math.PI / 180);
                                            break;
                                        case 16:
                                            d.startAngle = 240 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 17:
                                            d.startAngle = 240 * (Math.PI / 180);
                                            d.endAngle = 270 * (Math.PI / 180);
                                            break;
                                        case 18:
                                            d.startAngle = 270 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 19:
                                            d.startAngle = 270 * (Math.PI / 180);
                                            d.endAngle = 300 * (Math.PI / 180);
                                            break;
                                        case 20:
                                            d.startAngle = 300 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 21:
                                            d.startAngle = 300 * (Math.PI / 180);
                                            d.endAngle = 330 * (Math.PI / 180);
                                            break;
                                        case 22:
                                            d.startAngle = 330 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                        case 23:
                                            d.startAngle = 330 * (Math.PI / 180);
                                            d.endAngle = 360 * (Math.PI / 180);
                                            break;
                                        case 24:
                                            d.startAngle = 360 * (Math.PI / 180);
                                            d.endAngle = d.startAngle;
                                            break;
                                    }
                                }
                                d.arc = d3.svg.arc().innerRadius(1 + cwidth * j).outerRadius(cwidth * (j + 1));
                                return d.arc(d);
                            })
                            .transition().delay(function (d, i, j) {
                                return i * 500;
                            }).duration(700)
                            .attrTween('d', function (d, x, y) {
                                //var i = d3.interpolate(d.startAngle, d._tmp);
                                return function (t) {
                                    //d.endAngle = i(t);
                                    return d.arc(d);
                                }
                            });

                        /** LABELS SPIRITUALITÄT **/

                        var textpath_spiritualitaet = svg.append("svg:path")
                            .attr("id", "spiritualitaet")
                            .attr("class", "text_spiritualitaet")
                            .style("fill", "#EEEAE7")
                            .style("visibility", "hidden")
                            .attr("d", "M -42,5 L 45,5 L 45,-7 L -42,-7 Z");

                        var text_spiritualitaet = svg.append("text")
                            .style("fill", "#A9B1C3")
                            .attr("dy", -2)
                            .attr("dx", 8)
                            .append("textPath")
                            .attr("class", "spiritualitaet")
                            .attr("textLength", 73)
                            .style("font-size", 7)
                            .attr("xlink:href", "#spiritualitaet")
                            .style("text-anchor", "start")
                            .text("SPIRITUALITÄT");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -6)
                            .attr("dx", 4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s00")
                            .attr("text-anchor", "middle")
                            .text("1");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -21)
                            .attr("dx", 4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s10")
                            .attr("text-anchor", "middle")
                            .text("2");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -36)
                            .attr("dx", 4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s20")
                            .attr("text-anchor", "middle")
                            .text("3");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -51)
                            .attr("dx", 4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s30")
                            .attr("text-anchor", "middle")
                            .text("4");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -66)
                            .attr("dx", 4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s40")
                            .attr("text-anchor", "middle")
                            .text("5");

                        // 4 Reihe Zahlen

                        svg.append("text")
                            .style("fill", "#A9B1C3")
                            .attr("dy", -8)
                            .attr("dx", 15)
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s31")) + ")")
                            .attr("text-anchor", "middle")
                            .text("1");

                        svg.append("text")
                            .style("fill", "#A9B1C3")
                            .attr("dy", -1)
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s33")) + ")")
                            .attr("text-anchor", "middle")
                            .text("2");

                        svg.append("text")
                            .style("fill", "#A9B1C3")
                            .attr("dy", -8)
                            .attr("dx", -15)
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s35")) + ")")
                            .attr("text-anchor", "middle")
                            .text("3");

                        /** LABELS IDENTITÄT **/

                        var textpath_identitaet_geschichte = svg.append("svg:path")
                            .attr("id", "identitaet_geschichte")
                            .style("visibility", "hidden")
                            .attr("d", "M -118.17693036146497,20.837781320031613 A 120,120 0 0,1 -41.04241719908023,-112.76311449430901 L -36.25413519252086,-99.60741780330629");

                        var text_identitaet_geschichte = svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 11)
                            .append("textPath")
                            .attr("class", "identitaet")
                            .attr("textLength", 128)
                            .style("font-size", 8)
                            .attr("xlink:href", "#identitaet_geschichte")
                            .attr("startOffset", "11%")
                            .style("text-anchor", "start")
                            .text("IDENTITÄT - GESCHICHTE");

                        var textpath_identitaet_ressourcen = svg.append("svg:path")
                            .attr("id", "identitaet_ressourcen")
                            .style("visibility", "hidden")
                            .attr("d", "M 41.04241719908025,-112.763114494309 A 120,120 0 0,1 118.17693036146497,20.83778132003164 L 104.38962181929405,18.406706832694617");

                        var text_identitaet_ressourcen = svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 11)
                            .append("textPath")
                            .attr("class", "identitaet")
                            .attr("textLength", 128)
                            .style("font-size", 8)
                            .attr("xlink:href", "#identitaet_ressourcen")
                            .attr("startOffset", "11%")
                            .style("text-anchor", "start")
                            .text("IDENTITÄT - RESSOURCEN");

                        var textpath_identitaet_perspektive = svg.append("svg:path")
                            .attr("id", "identitaet_perspektive")
                            .style("visibility", "hidden")
                            .attr("d", "M -77.1345131623847,91.92533317427736 A -120,-120 0 0,0 77.13451316238472,91.92533317427736 L 68.13548662677316,81.20071097061167");

                        var text_identitaet_perspektive = svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -4)
                            .append("textPath")
                            .attr("class", "identitaet")
                            .attr("textLength", 128)
                            .style("font-size", 8)
                            .attr("xlink:href", "#identitaet_perspektive")
                            .attr("startOffset", "11%")
                            .style("text-anchor", "start")
                            .text("IDENTITÄT - PERSPEKTIVE");

                        // NORD-OST

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -77)
                            .attr("dx", 23)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s52")
                            .attr("text-anchor", "middle")
                            .text("1");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -91)
                            .attr("dx", 28)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s62")
                            .attr("text-anchor", "middle")
                            .text("2");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -105)
                            .attr("dx", 33)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s72")
                            .attr("text-anchor", "middle")
                            .text("3");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -119)
                            .attr("dx", 38)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s82")
                            .attr("text-anchor", "middle")
                            .text("4");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -133)
                            .attr("dx", 43)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s92")
                            .attr("text-anchor", "middle")
                            .text("5");

                        // SÜD-OST

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 63)
                            .attr("dx", 57)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s58")
                            .attr("text-anchor", "middle")
                            .text("1");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 74)
                            .attr("dx", 67)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s68")
                            .attr("text-anchor", "middle")
                            .text("2");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 86)
                            .attr("dx", 77)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s78")
                            .attr("text-anchor", "middle")
                            .text("3");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 97)
                            .attr("dx", 86)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s88")
                            .attr("text-anchor", "middle")
                            .text("4");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 108)
                            .attr("dx", 96)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s98")
                            .attr("text-anchor", "middle")
                            .text("5");

                        // SÜD-WEST

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 23)
                            .attr("dx", -80)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s518")
                            .attr("text-anchor", "middle")
                            .text("1");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 25.5)
                            .attr("dx", -95)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s618")
                            .attr("text-anchor", "middle")
                            .text("2");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 28)
                            .attr("dx", -110)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s718")
                            .attr("text-anchor", "middle")
                            .text("3");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 30)
                            .attr("dx", -125)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s818")
                            .attr("text-anchor", "middle")
                            .text("4");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 33)
                            .attr("dx", -140)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s918")
                            .attr("text-anchor", "middle")
                            .text("5");

                        // 4 Reihe Zahlen

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s819")) + ")")
                            .attr("text-anchor", "middle")
                            .text("4");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s821")) + ")")
                            .attr("text-anchor", "middle")
                            .text("5");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s823")) + ")")
                            .attr("text-anchor", "middle")
                            .text("6");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s83")) + ")")
                            .attr("text-anchor", "middle")
                            .text("7");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s85")) + ")")
                            .attr("text-anchor", "middle")
                            .text("8");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s87")) + ")")
                            .attr("text-anchor", "middle")
                            .text("9");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 5)
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s811")) + ")")
                            .attr("text-anchor", "middle")
                            .text("10");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 4)
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s813")) + ")")
                            .attr("text-anchor", "middle")
                            .text("11");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 6)
                            .attr("class", "label_dunkelgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s815")) + ")")
                            .attr("text-anchor", "middle")
                            .text("12");

                        /** LABELS AUFTRAG **/

                        var textpath_auftrag_lernen = svg.append("svg:path")
                            .attr("id", "auftrag_lernen")
                            //.style("display","none")
                            .style("visibility", "hidden")
                            .attr("d", "M -195,2.3880612576959347e-14 A 195,195 0 0,1 -3.5820918825113965e-14,-195 L -3.32491605504904e-14,-181");

                        var text_auftrag_lernen = svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", 11)
                            .append("textPath")
                            .attr("class", "auftrag")
                            .attr("textLength", 116)
                            .attr("xlink:href", "#auftrag_lernen")
                            .attr("startOffset", "30%")
                            .style("text-anchor", "start")
                            .text("AUFTRAG - LERNEN");

                        var textpath_auftrag_gestalten = svg.append("svg:path")
                            .attr("id", "auftrag_gestalten")
                            .style("visibility", "hidden")
                            .attr("d", "M 0,-195 A 195,195 0 0,1 195,0 L 181,0");

                        var text_auftrag_gestalten = svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", 11)
                            .append("textPath")
                            .attr("class", "auftrag")
                            .attr("textLength", 130)
                            .attr("xlink:href", "#auftrag_gestalten")
                            .attr("startOffset", "28%")
                            .style("text-anchor", "start")
                            .text("AUFTRAG - GESTALTEN");

                        var textpath_auftrag_freundsein = svg.append("svg:path")
                            .attr("id", "auftrag_freundsein")
                            .style("visibility", "hidden")
                            .attr("d", "M 0,195 A -195,-195 0 0,0 195,0 L181,0");

                        var text_auftrag_freundsein = svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", -5)
                            .append("textPath")
                            .attr("class", "auftrag")
                            .attr("textLength", 138)
                            .attr("xlink:href", "#auftrag_freundsein")
                            .attr("startOffset", "27%")
                            .style("text-anchor", "start")
                            .text("AUFTRAG - FREUND SEIN");

                        var textpath_auftrag_beimirselbstsein = svg.append("svg:path")
                            .attr("id", "auftrag_beimirselbstsein")
                            .style("visibility", "hidden")
                            .attr("d", "M -195,0 A 195,195 0 0,0 195,2.3880612576959347e-14 L 2.2166107058613547e-14,181");

                        var text_auftrag_beimirselbstsein = svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", -5)
                            .append("textPath")
                            .attr("class", "auftrag")
                            .attr("textLength", 175)
                            .attr("xlink:href", "#auftrag_beimirselbstsein")
                            .attr("startOffset", "8%")
                            .style("text-anchor", "start")
                            .text("AUFTRAG - BEI MIR SELBST SEIN");

                        // WEST

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 8)
                            .attr("dx", -158)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s1018")
                            .attr("text-anchor", "middle")
                            .text("1");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 8)
                            .attr("dx", -173)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s1118")
                            .attr("text-anchor", "middle")
                            .text("2");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 8)
                            .attr("dx", -188)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s1218")
                            .attr("text-anchor", "middle")
                            .text("3");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 8)
                            .attr("dx", -203)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s1318")
                            .attr("text-anchor", "middle")
                            .text("4");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 8)
                            .attr("dx", -218)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s1418")
                            .attr("text-anchor", "middle")
                            .text("5");

                        // NORD

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -156)
                            .attr("dx", -4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s100")
                            .attr("text-anchor", "middle")
                            .text("1");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -171)
                            .attr("dx", -4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s110")
                            .attr("text-anchor", "middle")
                            .text("2");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -186)
                            .attr("dx", -4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s120")
                            .attr("text-anchor", "middle")
                            .text("3");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -201)
                            .attr("dx", -4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s130")
                            .attr("text-anchor", "middle")
                            .text("4");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -216)
                            .attr("dx", -4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s140")
                            .attr("text-anchor", "middle")
                            .text("5");

                        // OST

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -3)
                            .attr("dx", 158)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s106")
                            .attr("text-anchor", "middle")
                            .text("1");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -3)
                            .attr("dx", 173)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s116")
                            .attr("text-anchor", "middle")
                            .text("2");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -3)
                            .attr("dx", 188)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s126")
                            .attr("text-anchor", "middle")
                            .text("3");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -3)
                            .attr("dx", 203)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s136")
                            .attr("text-anchor", "middle")
                            .text("4");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", -3)
                            .attr("dx", 218)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s146")
                            .attr("text-anchor", "middle")
                            .text("5");

                        // SÜD

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 160)
                            .attr("dx", 4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s1012")
                            .attr("text-anchor", "middle")
                            .text("1");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 175)
                            .attr("dx", 4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s1112")
                            .attr("text-anchor", "middle")
                            .text("2");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 190)
                            .attr("dx", 4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s1212")
                            .attr("text-anchor", "middle")
                            .text("3");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 205)
                            .attr("dx", 4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s1312")
                            .attr("text-anchor", "middle")
                            .text("4");

                        svg.append("text")
                            .style("fill", "#8093AE")
                            .attr("dy", 220)
                            .attr("dx", 4)
                            .attr("class", "label_dunkelgrau")
                            .attr("xlink:href", "#s1412")
                            .attr("text-anchor", "middle")
                            .text("5");

                        // 4 Reihe Zahlen

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", -3)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s131")) + ")")
                            .attr("text-anchor", "middle")
                            .text("13");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", -2)
                            .attr("dx", 1)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s133")) + ")")
                            .attr("text-anchor", "middle")
                            .text("14");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", -1)
                            .attr("dx", 4)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s135")) + ")")
                            .attr("text-anchor", "middle")
                            .text("15");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dx", 7)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s137")) + ")")
                            .attr("text-anchor", "middle")
                            .text("16");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", 4)
                            .attr("dx", 6)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s139")) + ")")
                            .attr("text-anchor", "middle")
                            .text("17");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", 9)
                            .attr("dx", 2)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s1311")) + ")")
                            .attr("text-anchor", "middle")
                            .text("18");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", 9)
                            .attr("dx", -2)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s1313")) + ")")
                            .attr("text-anchor", "middle")
                            .text("19");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", 4)
                            .attr("dx", -6)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s1315")) + ")")
                            .attr("text-anchor", "middle")
                            .text("20");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dx", -7)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s1317")) + ")")
                            .attr("text-anchor", "middle")
                            .text("21");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", -1)
                            .attr("dx", -5)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s1319")) + ")")
                            .attr("text-anchor", "middle")
                            .text("22");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", -2)
                            .attr("dx", -2)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s1321")) + ")")
                            .attr("text-anchor", "middle")
                            .text("23");

                        svg.append("text")
                            .style("fill", "#EEEAE7")
                            .attr("dy", -3)
                            .attr("class", "label_hellgrau_g")
                            .attr("transform", "translate(" + getCentroid(d3.select("#s1323")) + ")")
                            .attr("text-anchor", "middle")
                            .text("24");
                    }

                    function getCentroid(sel) {
                        // get the DOM element from a D3 selection
                        // you could also use "this" inside .each()

                        var el = sel.node();
                        var bbox = $(el)[0].getBBox();
                        return [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2];
                    }


                    function updateData(evaluation_pies) {
                        for (var i = 0; i < evaluation_pies.length; i++) {
                            categories[i + 1][parseInt(evaluation_pies[i])]();
                        }
                    }

                    var categories = {
                        // Fragen 1,2 und 3 (Spiritualität)
                        1: {
                            1: function () {
                                svg.select("#s01").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s01").style("fill", "green");
                                svg.select("#s11").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s01").style("fill", "green");
                                svg.select("#s11").style("fill", "green");
                                svg.select("#s21").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s01").style("fill", "green");
                                svg.select("#s11").style("fill", "green");
                                svg.select("#s21").style("fill", "green");
                                svg.select("#s31").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s01").style("fill", "green");
                                svg.select("#s11").style("fill", "green");
                                svg.select("#s21").style("fill", "green");
                                svg.select("#s31").style("fill", "green");
                                svg.select("#s41").style("fill", "green");
                            }
                        },
                        2: {
                            1: function () {
                                svg.select("#s03").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s03").style("fill", "green");
                                svg.select("#s13").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s03").style("fill", "green");
                                svg.select("#s13").style("fill", "green");
                                svg.select("#s23").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s03").style("fill", "green");
                                svg.select("#s13").style("fill", "green");
                                svg.select("#s23").style("fill", "green");
                                svg.select("#s33").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s03").style("fill", "green");
                                svg.select("#s13").style("fill", "green");
                                svg.select("#s23").style("fill", "green");
                                svg.select("#s33").style("fill", "green");
                                svg.select("#s43").style("fill", "green");
                            }
                        },
                        3: {
                            1: function () {
                                svg.select("#s05").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s05").style("fill", "green");
                                svg.select("#s15").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s05").style("fill", "green");
                                svg.select("#s15").style("fill", "green");
                                svg.select("#s25").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s05").style("fill", "green");
                                svg.select("#s15").style("fill", "green");
                                svg.select("#s25").style("fill", "green");
                                svg.select("#s35").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s05").style("fill", "green");
                                svg.select("#s15").style("fill", "green");
                                svg.select("#s25").style("fill", "green");
                                svg.select("#s35").style("fill", "green");
                                svg.select("#s45").style("fill", "green");
                            }
                        },
                        // Fragen 4,5 und 6 (Identität - Geschichte)
                        4: {
                            1: function () {
                                svg.select("#s519").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s519").style("fill", "green");
                                svg.select("#s619").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s519").style("fill", "green");
                                svg.select("#s619").style("fill", "green");
                                svg.select("#s719").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s519").style("fill", "green");
                                svg.select("#s619").style("fill", "green");
                                svg.select("#s719").style("fill", "green");
                                svg.select("#s819").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s519").style("fill", "green");
                                svg.select("#s619").style("fill", "green");
                                svg.select("#s719").style("fill", "green");
                                svg.select("#s819").style("fill", "green");
                                svg.select("#s919").style("fill", "green");
                            }
                        },
                        5: {
                            1: function () {
                                svg.select("#s521").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s521").style("fill", "green");
                                svg.select("#s621").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s521").style("fill", "green");
                                svg.select("#s621").style("fill", "green");
                                svg.select("#s721").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s521").style("fill", "green");
                                svg.select("#s621").style("fill", "green");
                                svg.select("#s721").style("fill", "green");
                                svg.select("#s821").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s521").style("fill", "green");
                                svg.select("#s621").style("fill", "green");
                                svg.select("#s721").style("fill", "green");
                                svg.select("#s821").style("fill", "green");
                                svg.select("#s921").style("fill", "green");
                            }
                        },
                        6: {
                            1: function () {
                                svg.select("#s523").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s523").style("fill", "green");
                                svg.select("#s623").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s523").style("fill", "green");
                                svg.select("#s623").style("fill", "green");
                                svg.select("#s723").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s523").style("fill", "green");
                                svg.select("#s623").style("fill", "green");
                                svg.select("#s723").style("fill", "green");
                                svg.select("#s823").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s523").style("fill", "green");
                                svg.select("#s623").style("fill", "green");
                                svg.select("#s723").style("fill", "green");
                                svg.select("#s823").style("fill", "green");
                                svg.select("#s923").style("fill", "green");
                            }
                        },
                        // Fragen 7,8 und 9 (Identität - Ressourcen)
                        7: {
                            1: function () {
                                svg.select("#s53").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s53").style("fill", "green");
                                svg.select("#s63").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s53").style("fill", "green");
                                svg.select("#s63").style("fill", "green");
                                svg.select("#s73").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s53").style("fill", "green");
                                svg.select("#s63").style("fill", "green");
                                svg.select("#s73").style("fill", "green");
                                svg.select("#s83").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s53").style("fill", "green");
                                svg.select("#s63").style("fill", "green");
                                svg.select("#s73").style("fill", "green");
                                svg.select("#s83").style("fill", "green");
                                svg.select("#s93").style("fill", "green");
                            }
                        },
                        8: {
                            1: function () {
                                svg.select("#s55").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s55").style("fill", "green");
                                svg.select("#s65").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s55").style("fill", "green");
                                svg.select("#s65").style("fill", "green");
                                svg.select("#s75").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s55").style("fill", "green");
                                svg.select("#s65").style("fill", "green");
                                svg.select("#s75").style("fill", "green");
                                svg.select("#s85").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s55").style("fill", "green");
                                svg.select("#s65").style("fill", "green");
                                svg.select("#s75").style("fill", "green");
                                svg.select("#s85").style("fill", "green");
                                svg.select("#s95").style("fill", "green");
                            }
                        },
                        9: {
                            1: function () {
                                svg.select("#s57").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s57").style("fill", "green");
                                svg.select("#s67").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s57").style("fill", "green");
                                svg.select("#s67").style("fill", "green");
                                svg.select("#s77").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s57").style("fill", "green");
                                svg.select("#s67").style("fill", "green");
                                svg.select("#s77").style("fill", "green");
                                svg.select("#s87").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s57").style("fill", "green");
                                svg.select("#s67").style("fill", "green");
                                svg.select("#s77").style("fill", "green");
                                svg.select("#s87").style("fill", "green");
                                svg.select("#s97").style("fill", "green");
                            }
                        },
                        // Fragen 10,11 und 12 (Identität - Perspektive)
                        10: {
                            1: function () {
                                svg.select("#s511").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s511").style("fill", "green");
                                svg.select("#s611").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s511").style("fill", "green");
                                svg.select("#s611").style("fill", "green");
                                svg.select("#s711").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s511").style("fill", "green");
                                svg.select("#s611").style("fill", "green");
                                svg.select("#s711").style("fill", "green");
                                svg.select("#s811").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s511").style("fill", "green");
                                svg.select("#s611").style("fill", "green");
                                svg.select("#s711").style("fill", "green");
                                svg.select("#s811").style("fill", "green");
                                svg.select("#s911").style("fill", "green");
                            }
                        },
                        11: {
                            1: function () {
                                svg.select("#s513").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s513").style("fill", "green");
                                svg.select("#s613").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s513").style("fill", "green");
                                svg.select("#s613").style("fill", "green");
                                svg.select("#s713").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s513").style("fill", "green");
                                svg.select("#s613").style("fill", "green");
                                svg.select("#s713").style("fill", "green");
                                svg.select("#s813").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s513").style("fill", "green");
                                svg.select("#s613").style("fill", "green");
                                svg.select("#s713").style("fill", "green");
                                svg.select("#s813").style("fill", "green");
                                svg.select("#s913").style("fill", "green");
                            }
                        },
                        12: {
                            1: function () {
                                svg.select("#s515").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s515").style("fill", "green");
                                svg.select("#s615").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s515").style("fill", "green");
                                svg.select("#s615").style("fill", "green");
                                svg.select("#s715").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s515").style("fill", "green");
                                svg.select("#s615").style("fill", "green");
                                svg.select("#s715").style("fill", "green");
                                svg.select("#s815").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s515").style("fill", "green");
                                svg.select("#s615").style("fill", "green");
                                svg.select("#s715").style("fill", "green");
                                svg.select("#s815").style("fill", "green");
                                svg.select("#s915").style("fill", "green");
                            }
                        },
                        // Fragen 13,14 und 15 (Auftrag - Gestalten)
                        13: {
                            1: function () {
                                svg.select("#s101").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s101").style("fill", "green");
                                svg.select("#s111").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s101").style("fill", "green");
                                svg.select("#s111").style("fill", "green");
                                svg.select("#s121").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s101").style("fill", "green");
                                svg.select("#s111").style("fill", "green");
                                svg.select("#s121").style("fill", "green");
                                svg.select("#s131").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s101").style("fill", "green");
                                svg.select("#s111").style("fill", "green");
                                svg.select("#s121").style("fill", "green");
                                svg.select("#s131").style("fill", "green");
                                svg.select("#s141").style("fill", "green");
                            }
                        },
                        14: {
                            1: function () {
                                svg.select("#s103").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s103").style("fill", "green");
                                svg.select("#s113").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s103").style("fill", "green");
                                svg.select("#s113").style("fill", "green");
                                svg.select("#s123").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s103").style("fill", "green");
                                svg.select("#s113").style("fill", "green");
                                svg.select("#s123").style("fill", "green");
                                svg.select("#s133").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s103").style("fill", "green");
                                svg.select("#s113").style("fill", "green");
                                svg.select("#s123").style("fill", "green");
                                svg.select("#s133").style("fill", "green");
                                svg.select("#s143").style("fill", "green");
                            }
                        },
                        15: {
                            1: function () {
                                svg.select("#s105").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s105").style("fill", "green");
                                svg.select("#s115").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s105").style("fill", "green");
                                svg.select("#s115").style("fill", "green");
                                svg.select("#s125").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s105").style("fill", "green");
                                svg.select("#s115").style("fill", "green");
                                svg.select("#s125").style("fill", "green");
                                svg.select("#s135").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s105").style("fill", "green");
                                svg.select("#s115").style("fill", "green");
                                svg.select("#s125").style("fill", "green");
                                svg.select("#s135").style("fill", "green");
                                svg.select("#s145").style("fill", "green");
                            }
                        },
                        // Fragen 16,17 und 18 (Auftrag - Freund sein)
                        16: {
                            1: function () {
                                svg.select("#s107").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s107").style("fill", "green");
                                svg.select("#s117").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s107").style("fill", "green");
                                svg.select("#s117").style("fill", "green");
                                svg.select("#s127").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s107").style("fill", "green");
                                svg.select("#s117").style("fill", "green");
                                svg.select("#s127").style("fill", "green");
                                svg.select("#s137").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s107").style("fill", "green");
                                svg.select("#s117").style("fill", "green");
                                svg.select("#s127").style("fill", "green");
                                svg.select("#s137").style("fill", "green");
                                svg.select("#s147").style("fill", "green");
                            }
                        },
                        17: {
                            1: function () {
                                svg.select("#s109").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s109").style("fill", "green");
                                svg.select("#s119").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s109").style("fill", "green");
                                svg.select("#s119").style("fill", "green");
                                svg.select("#s129").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s109").style("fill", "green");
                                svg.select("#s119").style("fill", "green");
                                svg.select("#s129").style("fill", "green");
                                svg.select("#s139").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s109").style("fill", "green");
                                svg.select("#s119").style("fill", "green");
                                svg.select("#s129").style("fill", "green");
                                svg.select("#s139").style("fill", "green");
                                svg.select("#s149").style("fill", "green");
                            }
                        },
                        18: {
                            1: function () {
                                svg.select("#s1011").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s1011").style("fill", "green");
                                svg.select("#s1111").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s1011").style("fill", "green");
                                svg.select("#s1111").style("fill", "green");
                                svg.select("#s1211").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s1011").style("fill", "green");
                                svg.select("#s1111").style("fill", "green");
                                svg.select("#s1211").style("fill", "green");
                                svg.select("#s1311").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s1011").style("fill", "green");
                                svg.select("#s1111").style("fill", "green");
                                svg.select("#s1211").style("fill", "green");
                                svg.select("#s1311").style("fill", "green");
                                svg.select("#s1411").style("fill", "green");
                            }
                        },
                        // Fragen 19,20 und 21 (Auftrag - Bei mir selbst sein)
                        19: {
                            1: function () {
                                svg.select("#s1013").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s1013").style("fill", "green");
                                svg.select("#s1113").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s1013").style("fill", "green");
                                svg.select("#s1113").style("fill", "green");
                                svg.select("#s1213").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s1013").style("fill", "green");
                                svg.select("#s1113").style("fill", "green");
                                svg.select("#s1213").style("fill", "green");
                                svg.select("#s1313").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s1013").style("fill", "green");
                                svg.select("#s1113").style("fill", "green");
                                svg.select("#s1213").style("fill", "green");
                                svg.select("#s1313").style("fill", "green");
                                svg.select("#s1413").style("fill", "green");
                            }
                        },
                        20: {
                            1: function () {
                                svg.select("#s1015").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s1015").style("fill", "green");
                                svg.select("#s1115").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s1015").style("fill", "green");
                                svg.select("#s1115").style("fill", "green");
                                svg.select("#s1215").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s1015").style("fill", "green");
                                svg.select("#s1115").style("fill", "green");
                                svg.select("#s1215").style("fill", "green");
                                svg.select("#s1315").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s1015").style("fill", "green");
                                svg.select("#s1115").style("fill", "green");
                                svg.select("#s1215").style("fill", "green");
                                svg.select("#s1315").style("fill", "green");
                                svg.select("#s1415").style("fill", "green");
                            }
                        },
                        21: {
                            1: function () {
                                svg.select("#s1017").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s1017").style("fill", "green");
                                svg.select("#s1117").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s1017").style("fill", "green");
                                svg.select("#s1117").style("fill", "green");
                                svg.select("#s1217").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s1017").style("fill", "green");
                                svg.select("#s1117").style("fill", "green");
                                svg.select("#s1217").style("fill", "green");
                                svg.select("#s1317").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s1017").style("fill", "green");
                                svg.select("#s1117").style("fill", "green");
                                svg.select("#s1217").style("fill", "green");
                                svg.select("#s1317").style("fill", "green");
                                svg.select("#s1417").style("fill", "green");
                            }
                        },
                        // Fragen 22,23 und 24 (Auftrag - Lernen)
                        22: {
                            1: function () {
                                svg.select("#s1019").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s1019").style("fill", "green");
                                svg.select("#s1119").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s1019").style("fill", "green");
                                svg.select("#s1119").style("fill", "green");
                                svg.select("#s1219").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s1019").style("fill", "green");
                                svg.select("#s1119").style("fill", "green");
                                svg.select("#s1219").style("fill", "green");
                                svg.select("#s1319").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s1019").style("fill", "green");
                                svg.select("#s1119").style("fill", "green");
                                svg.select("#s1219").style("fill", "green");
                                svg.select("#s1319").style("fill", "green");
                                svg.select("#s1419").style("fill", "green");
                            }
                        },
                        23: {
                            1: function () {
                                svg.select("#s1021").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s1021").style("fill", "green");
                                svg.select("#s1121").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s1021").style("fill", "green");
                                svg.select("#s1121").style("fill", "green");
                                svg.select("#s1221").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s1021").style("fill", "green");
                                svg.select("#s1121").style("fill", "green");
                                svg.select("#s1221").style("fill", "green");
                                svg.select("#s1321").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s1021").style("fill", "green");
                                svg.select("#s1121").style("fill", "green");
                                svg.select("#s1221").style("fill", "green");
                                svg.select("#s1321").style("fill", "green");
                                svg.select("#s1421").style("fill", "green");
                            }
                        },
                        24: {
                            1: function () {
                                svg.select("#s1023").style("fill", "green");
                            },
                            2: function () {
                                svg.select("#s1023").style("fill", "green");
                                svg.select("#s1123").style("fill", "green");
                            },
                            3: function () {
                                svg.select("#s1023").style("fill", "green");
                                svg.select("#s1123").style("fill", "green");
                                svg.select("#s1223").style("fill", "green");
                            },
                            4: function () {
                                svg.select("#s1023").style("fill", "green");
                                svg.select("#s1123").style("fill", "green");
                                svg.select("#s1223").style("fill", "green");
                                svg.select("#s1323").style("fill", "green");
                            },
                            5: function () {
                                svg.select("#s1023").style("fill", "green");
                                svg.select("#s1123").style("fill", "green");
                                svg.select("#s1223").style("fill", "green");
                                svg.select("#s1323").style("fill", "green");
                                svg.select("#s1423").style("fill", "green");
                            }
                        }
                    };
                })
            }
        };
    }]);