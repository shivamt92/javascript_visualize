var visualisation = {}
  , network = {}
  , sirData = {}
  , pageType = {};
$(document).on("pageshow", "#sirnetworkpage", function(a) {
    pageType.prefix = "#sir";
    visualisation = {};
    network = {};
    sirData = {};
    visualisation.resize = null;
    pageType.sirPage = true;
    visualisation.colors = {
        susceptible: getCSS("sirsusceptible", "color"),
        infected: getCSS("sirinfected", "color"),
        recovered: getCSS("sirrecovered", "color")
    };
    calculateDimension();
    erdosRenyiClick()
});
$(document).on("pageinit", "#sirnetworkpage", function(a) {
    bindButtonsSir()
});
function bindButtonsSir() {
    $("#sirStart").off("click", startClick);
    $("#sirPause").off("click", pauseClick);
    $("#sirReset").off("click", resetClick);
    $("#sirStart").on("click", startClick);
    $("#sirPause").on("click", pauseClick);
    $("#sirReset").on("click", resetClick);
    $("#sirRandomGenerate").off("click", erdosRenyiClick);
    $("#sirSmallWorldGenerate").off("click", smallWorldClick);
    $("#sirBaGenerate").off("click", barabasiAlbertClick);
    $("#sirCompleteGenerate").off("click", completeClick);
    $("#sirRandomGenerate").on("click", erdosRenyiClick);
    $("#sirSmallWorldGenerate").on("click", smallWorldClick);
    $("#sirBaGenerate").on("click", barabasiAlbertClick);
    $("#sirCompleteGenerate").on("click", completeClick)
}
$(document).on("pageshow", "#networkspage", function(a) {
    pageType.prefix = "#net";
    visualisation = {};
    network = {};
    sirData = {};
    visualisation.resize = null;
    visualisation.colors = {
        susceptible: getCSS("sirsusceptible", "color"),
        infected: getCSS("sirinfected", "color"),
        recovered: getCSS("sirrecovered", "color")
    };
    calculateDimension();
    pageType.sirPage = false;
    visualisation.even = true;
    visualisation.nodeGreen = null;
    visualisation.nodeRed = null;
    erdosRenyiClick()
});
$(document).on("pageinit", "#networkspage", function(a) {
    bindButtonsNet()
});
function bindButtonsNet() {
    $("#netRandomGenerate").off("click", erdosRenyiClick);
    $("#netSmallWorldGenerate").off("click", smallWorldClick);
    $("#netGridGenerate").off("click", gridClick);
    $("#netCocktailGenerate").off("click", cocktailClick);
    $("#netBaGenerate").off("click", barabasiAlbertClick);
    $("#netEdgeGenerate").off("click", edgeCopyingClick);
    $("#netForestGenerate").off("click", forestFireClick);
    $("#netStarGenerate").off("click", starClick);
    $("#netCompleteGenerate").off("click", completeClick);
    $("#netRandomGenerate").on("click", erdosRenyiClick);
    $("#netSmallWorldGenerate").on("click", smallWorldClick);
    $("#netGridGenerate").on("click", gridClick);
    $("#netCocktailGenerate").on("click", cocktailClick);
    $("#netBaGenerate").on("click", barabasiAlbertClick);
    $("#netEdgeGenerate").on("click", edgeCopyingClick);
    $("#netForestGenerate").on("click", forestFireClick);
    $("#netStarGenerate").on("click", starClick);
    $("#netCompleteGenerate").on("click", completeClick)
}
function calculateDimension() {
    visualisation.sizeNetwork = {
        width: $(window).width() * 0.75,
        height: $(window).height() * 0.5625
    };
    visualisation.sizeNetwork.radiusNode = Math.min(Math.max(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height) * 0.017, 8);
    visualisation.sizeNetwork.width = visualisation.sizeNetwork.width - 5 * visualisation.sizeNetwork.radiusNode;
    visualisation.sizeSirStat = {
        width: $(window).width() * 0.24,
        height: $(window).height() * 0.25
    };
    visualisation.sizeDegreeDistribution = {
        width: $(window).width() * 0.8,
        height: $(window).height() * 0.27,
        top: $(window).height() * 0.02,
        bottom: $(window).height() * 0.05,
        left: $(window).width() * 0.1,
        right: $(window).width() * 0.1
    }
}
$(window).bind("resize", function(a) {
    clearTimeout(visualisation.resize);
    visualisation.resize = setTimeout(resizeVisualisation, 500)
});
function resizeVisualisation() {
    calculateDimension();
    if (visualisation.fixed === true) {
        generateSmallWorldPosition(visualisation.k)
    }
    initVisualisation()
}
function getSirOptions() {
    sirData.probabilityInfection = parseFloat($(pageType.prefix + "ProbInf").val(), 10);
    sirData.probabilityRecovery = parseFloat($(pageType.prefix + "ProbRec").val(), 10);
    initialInfection = parseFloat($(pageType.prefix + "InitialInfection").val(), 10)
}
function getErdosRenyiOptions() {
    network.networkPopulation = parseInt($(pageType.prefix + "RandomPopulation").val(), 10);
    return parseFloat($(pageType.prefix + "RandomProb").val(), 10)
}
function getSmallWorldOptions() {
    network.networkPopulation = parseInt($(pageType.prefix + "SmallWorldPopulation").val(), 10);
    return {
        k: parseInt($(pageType.prefix + "SmallWorldK").val(), 10),
        beta: parseFloat($(pageType.prefix + "SmallWorldBeta").val(), 10)
    }
}
function getGridOptions() {
    return {
        m: parseInt($(pageType.prefix + "GridM").val(), 10),
        n: parseInt($(pageType.prefix + "GridN").val(), 10)
    }
}
function getCocktailOptions() {
    return parseInt($(pageType.prefix + "CocktailN").val(), 10)
}
function getBarabasiAlbertOptions() {
    network.networkPopulation = parseInt($(pageType.prefix + "BaPopulation").val(), 10);
    return {
        m0: parseInt($(pageType.prefix + "BaM0").val(), 10),
        m: parseInt($(pageType.prefix + "BaM").val(), 10)
    }
}
function getEdgeCopyingOptions() {
    network.networkPopulation = parseInt($(pageType.prefix + "EdgePopulation").val(), 10);
    return parseFloat($(pageType.prefix + "EdgeBeta").val(), 10)
}
function getForestFireOptions() {
    network.networkPopulation = parseInt($(pageType.prefix + "ForestPopulation").val(), 10);
    return parseFloat($(pageType.prefix + "ForestProb").val(), 10)
}
function getStarOptions() {
    network.networkPopulation = parseInt($(pageType.prefix + "StarPopulation").val(), 10)
}
function getCompleteOptions() {
    network.networkPopulation = parseInt($(pageType.prefix + "CompletePopulation").val(), 10)
}
function erdosRenyiClick() {
    var a = getErdosRenyiOptions();
    generateErdosRenyi(a);
    generateErdosRenyiPosition(a);
    visualiseNewNetwork()
}
function smallWorldClick() {
    var a = getSmallWorldOptions();
    generateSmallWorld(a.k, a.beta);
    generateSmallWorldPosition(a.k);
    visualiseNewNetwork()
}
function gridClick() {
    var a = getGridOptions();
    generateGrid(a.m, a.n);
    generateGridPosition(a.m, a.n);
    visualiseNewNetwork()
}
function cocktailClick() {
    var a = getCocktailOptions();
    network.networkPopulation = a * 2;
    generateCocktail(a);
    generateSmallWorldPosition(2);
    visualiseNewNetwork()
}
function barabasiAlbertClick() {
    var a = getBarabasiAlbertOptions();
    generateBarabasiAlbert(a.m0, a.m);
    generateBarabasiAlbertPosition(a.m0, a.m);
    visualiseNewNetwork()
}
function edgeCopyingClick() {
    var a = getEdgeCopyingOptions();
    generateEdgeCopying(a);
    generateEdgeCopyingPosition();
    visualiseNewNetwork()
}
function forestFireClick() {
    var a = getForestFireOptions();
    generateForestFire(a);
    generateForestFirePosition(a);
    visualiseNewNetwork()
}
function starClick() {
    getStarOptions();
    generateStar();
    generateStarPosition();
    visualiseNewNetwork()
}
function completeClick() {
    getCompleteOptions();
    generateComplete();
    generateCompletePosition();
    visualiseNewNetwork()
}
function visualiseNewNetwork() {
    if (pageType.sirPage === true) {
        resetSirData();
        $("#sirStart").removeClass("ui-disabled");
        $("#sirPause").removeClass("ui-disabled").addClass("ui-disabled");
        $("#sirReset").removeClass("ui-disabled").addClass("ui-disabled")
    } else {
        visualisation.even = true;
        visualisation.nodeGreen = null;
        visualisation.nodeRed = null;
        $("#netgreenproperties").empty();
        $("#netredproperties").empty();
        $("#netbothproperties").empty()
    }
    initVisualisation()
}
function startClick(a) {
    $("#sirStart").removeClass("ui-disabled").addClass("ui-disabled");
    $("#sirPause").removeClass("ui-disabled");
    $("#sirReset").removeClass("ui-disabled");
    getSirOptions();
    if (visualisation.pause === true) {
        visualisation.pause = false;
        sirStep()
    } else {
        visualisation.reset = false;
        if (a === true) {
            sirStart(true)
        } else {
            sirStart(false)
        }
    }
}
function nodeClick(a) {
    if (pageType.sirPage === true) {
        if (a.s === "s") {
            a.s = "i";
            startClick(true)
        }
    } else {
        var d, c, b;
        if (visualisation.even) {
            visualisation.nodeGreen && (visualisation.nodeGreen.s = "s");
            visualisation.nodeGreen = a;
            visualisation.nodeGreen.s = "r";
            d = "#netgreenproperties"
        } else {
            visualisation.nodeRed && (visualisation.nodeRed.s = "s");
            visualisation.nodeRed = a;
            visualisation.nodeRed.s = "i";
            d = "#netredproperties"
        }
        refreshVisualisation();
        $(d).empty();
        c = calculateLocalClusteringCoefficient(a.index);
        $(d).append("<p>Degree: " + a.w + " - Clustering coefficient: " + Math.floor(c * 100) / 100 + "</p>");
        if (visualisation.nodeGreen && visualisation.nodeRed) {
            $("#netbothproperties").empty();
            b = shortestPath(visualisation.nodeGreen.index, visualisation.nodeRed.index);
            if (b === -1) {
                $("#netwbothproperties").append("<p>Length shortest path green-red: infinity</p>")
            } else {
                $("#netbothproperties").append("<p>Length shortest path green-red: " + b + "</p>")
            }
        }
        visualisation.even = !visualisation.even
    }
}
function pauseClick() {
    $("#sirStart").removeClass("ui-disabled");
    $("#sirPause").removeClass("ui-disabled").addClass("ui-disabled");
    $("#sirReset").removeClass("ui-disabled");
    visualisation.pause = true
}
function resetClick() {
    $("#sirStart").removeClass("ui-disabled");
    $("#sirPause").removeClass("ui-disabled").addClass("ui-disabled");
    $("#sirReset").removeClass("ui-disabled").addClass("ui-disabled");
    resetSirData();
    initStatPlot();
    refreshVisualisation()
}
function getStepTime() {
    return (101 - $(pageType.prefix + "StepTime").val()) * 20
}
function initVisualisation() {
    var d, a, c, b;
    d = pageType.prefix + "graph";
    $(d).empty();
    a = d3.select(d).append("svg").attr("width", visualisation.sizeNetwork.width).attr("height", visualisation.sizeNetwork.height);
    c = d3.layout.force().gravity(0.05).distance(visualisation.distance).charge(-400).size([visualisation.sizeNetwork.width, visualisation.sizeNetwork.height]).nodes(network.nodes).links(network.edges).alpha(0);
    c.on("tick", function() {
        b.attr("x1", function(e) {
            return e.source.x
        }).attr("y1", function(e) {
            return e.source.y
        }).attr("x2", function(e) {
            return e.target.x
        }).attr("y2", function(e) {
            return e.target.y
        });
        if (typeof visualisation.svgNode !== "undefined") {
            visualisation.svgNode.attr("cx", function(e) {
                return e.x = Math.max(visualisation.sizeNetwork.radiusNode, Math.min(visualisation.sizeNetwork.width - visualisation.sizeNetwork.radiusNode, e.x))
            }).attr("cy", function(e) {
                return e.y = Math.max(visualisation.sizeNetwork.radiusNode, Math.min(visualisation.sizeNetwork.height - visualisation.sizeNetwork.radiusNode, e.y))
            })
        }
    });
    b = a.selectAll(".link").data(network.edges);
    b.enter().insert("line", "node").attr("class", "networklink");
    visualisation.svgNode = a.selectAll(".node").data(network.nodes);
    visualisation.svgNode.enter().insert("circle").attr("r", visualisation.sizeNetwork.radiusNode - 0.75).style("fill", nodeFill).on("click", function(f, e) {
        if ((pageType.sirPage === true && visualisation.reset === true) || pageType.sirPage === false) {
            nodeClick(f)
        }
    });
    c.start();
    if (pageType.sirPage === true) {
        refreshStatNumbers();
        initStatPlot();
        visualisation.sirStat.render()
    } else {
        visualiseGraphProperties()
    }
}
function visualiseGraphProperties() {
    var a, h, g, c, b, f, e, d, k, j, i;
    $("#netdegreedistribution").empty();
    a = calculateDegreeDistribution();
    h = d3.scale.ordinal().rangeRoundBands([0, visualisation.sizeDegreeDistribution.width], 0.1, 0.9).domain(a.map(function(m, l) {
        return l
    }));
    g = d3.scale.linear().range([visualisation.sizeDegreeDistribution.height, 0]).domain([0, d3.max(a, function(l) {
        return l
    })]);
    c = d3.svg.axis().scale(h).orient("bottom");
    b = d3.svg.axis().scale(g).orient("left");
    f = d3.select("#netdegreedistribution").append("svg").attr("width", visualisation.sizeDegreeDistribution.width + visualisation.sizeDegreeDistribution.left + visualisation.sizeDegreeDistribution.right).attr("height", visualisation.sizeDegreeDistribution.height + visualisation.sizeDegreeDistribution.top + visualisation.sizeDegreeDistribution.bottom).append("g").attr("transform", "translate(" + visualisation.sizeDegreeDistribution.left + "," + visualisation.sizeDegreeDistribution.top + ")");
    f.append("g").attr("class", "xnet netaxis").attr("transform", "translate(0," + visualisation.sizeDegreeDistribution.height + ")").call(c);
    f.append("g").attr("class", "netaxis").call(b);
    f.selectAll(".netbar").data(a).enter().append("rect").attr("class", "netbar").attr("x", function(m, l) {
        return h(l)
    }).attr("width", h.rangeBand()).attr("y", function(l) {
        return g(l)
    }).attr("height", function(l) {
        return visualisation.sizeDegreeDistribution.height - g(l)
    });
    $("#netproperties").empty();
    e = isConnected();
    if (e === true) {
        $("#netproperties").append("<p>Connected: yes</p>")
    } else {
        $("#netproperties").append("<p>Connected: no</p>")
    }
    $("#netproperties").append("<p>Nodes: " + network.nodes.length + " - Links: " + network.edges.length + "</p>");
    d = calculateMeanDegree();
    $("#netproperties").append("<p>Mean degree: " + Math.floor(d * 100) / 100 + "</p>");
    k = calculateNetworkDensity();
    $("#netproperties").append("<p>Network density: " + Math.floor(k * 100) / 100 + "</p>");
    j = calculateGlobalClusteringCoefficient();
    $("#netproperties").append("<p>Clustering coefficient: " + Math.floor(j * 100) / 100 + "</p>");
    i = calculateAveragePathLengthDiameter();
    if (i.diameter === -1) {
        $("#netproperties").append("<p>Diameter: Not connected</p>");
        $("#netproperties").append("<p>Average path length: Not connected</p>")
    } else {
        $("#netproperties").append("<p>Diameter: " + Math.floor(i.diameter * 100) / 100 + "</p>");
        $("#netproperties").append("<p>Average path length: " + Math.floor(i.averagePathLength * 100) / 100 + "</p>")
    }
}
function initStatPlot() {
    $("#sirplot").empty();
    visualisation.sirStat = new Rickshaw.Graph({
        element: document.querySelector("#sirplot"),
        width: visualisation.sizeSirStat.width,
        height: visualisation.sizeSirStat.height,
        renderer: "line",
        interpolation: "linear",
        series: [{
            name: "Susceptible",
            data: sirData.sirStatData[0],
            color: visualisation.colors.susceptible
        }, {
            name: "Infected",
            data: sirData.sirStatData[1],
            color: visualisation.colors.infected
        }, {
            name: "Recovered",
            data: sirData.sirStatData[2],
            color: visualisation.colors.recovered
        }]
    });
    visualisation.statyAxis = new Rickshaw.Graph.Axis.Y({
        graph: visualisation.sirStat,
        orientation: "left"
    });
    visualisation.statxAxis = new Rickshaw.Graph.Axis.X({
        graph: visualisation.sirStat
    })
}
function refreshStatNumbers() {
    $(pageType.prefix + "SusceptibleNr").text(sirData.nrSusceptible);
    $(pageType.prefix + "InfectedNr").text(sirData.nrInfected);
    $(pageType.prefix + "RecoveredNr").text(sirData.nrRecovered)
}
function refreshVisualisation() {
    if (pageType.sirPage === true) {
        visualisation.sirStat.render();
        refreshStatNumbers()
    }
    visualisation.svgNode.style("fill", nodeFill)
}
function nodeFill(a) {
    switch (a.s) {
    case "s":
        return visualisation.colors.susceptible;
    case "i":
    case "ni":
        return visualisation.colors.infected;
    case "r":
        return visualisation.colors.recovered;
    default:
        return "#000000"
    }
}
function generateCompletePosition() {
    visualisation.distance = (Math.min(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height) / 5) * 3;
    visualisation.fixed = false
}
function generateBarabasiAlbertPosition(b, a) {
    visualisation.distance = (Math.min(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height) / 5) * (1 + a / 6);
    visualisation.fixed = false
}
function generateEdgeCopyingPosition() {
    visualisation.distance = (Math.min(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height) / 5) * 2;
    visualisation.fixed = false
}
function generateForestFirePosition(a) {
    var b = Math.min(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height);
    visualisation.distance = Math.min(b / 8 * a / 0.1, b / 2);
    visualisation.fixed = false
}
function generateStarPosition() {
    visualisation.distance = Math.min(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height) / 7;
    visualisation.fixed = false
}
function generateGridPosition(a, b) {
    visualisation.distance = Math.min(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height) / (Math.max(a, b) * 5);
    visualisation.fixed = false
}
function generateErdosRenyiPosition(a) {
    var b = Math.min(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height);
    visualisation.distance = Math.min(b / 7 * network.nodes.length / 50 * a / 0.1, b / 2);
    visualisation.fixed = false
}
function generateSmallWorldPosition(e) {
    var h, d, c, b, g, j, o, m, f = Math.floor(e / 2), p = [], a = Math.min(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height) / 2 - 3 * visualisation.sizeNetwork.radiusNode, l = Math.min(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height) / 2 - 3 * visualisation.sizeNetwork.radiusNode;
    for (h = 0; h < f; ++h) {
        p.push(a - h * 3 * visualisation.sizeNetwork.radiusNode)
    }
    d = 0;
    c = (Math.PI * 2) / network.nodes.length;
    for (b = 0; b < network.nodes.length; ++b) {
        network.nodes[b].fixed = true;
        l = p[b % p.length];
        g = visualisation.sizeNetwork.width / 2;
        j = visualisation.sizeNetwork.height / 2;
        o = Math.round(g + l * Math.cos(d) - g);
        m = Math.round(j + l * Math.sin(d) - j);
        network.nodes[b].fixed = true;
        network.nodes[b].px = g + o;
        network.nodes[b].py = j + m;
        d = d + c
    }
    visualisation.distance = Math.min(visualisation.sizeNetwork.width, visualisation.sizeNetwork.height) / 5;
    visualisation.fixed = true;
    visualisation.k = e
}
function resetSirData() {
    var a;
    sirData.nrSusceptible = network.networkPopulation;
    sirData.nrRecovered = 0;
    sirData.nrInfected = 0;
    visualisation.pause = false;
    visualisation.reset = true;
    sirData.sirStatData = [[], [], [], [], []];
    sirData.sirStatData[0].push({
        x: 0,
        y: sirData.nrSusceptible
    });
    sirData.sirStatData[1].push({
        x: 0,
        y: sirData.nrInfected
    });
    sirData.sirStatData[2].push({
        x: 0,
        y: sirData.nrRecovered
    });
    for (a = 0; a < network.nodes.length; ++a) {
        network.nodes[a].s = "s"
    }
}
function sirStart(c) {
    var d, f, e, a, b;
    if (c === false) {
        d = Math.max(Math.floor(network.nodes.length * initialInfection), 1);
        f = 0;
        do {
            e = getRandomInt(0, network.nodes.length - 1);
            if (network.nodes[e].s === "s") {
                network.nodes[e].s = "i";
                ++f
            }
        } while (f < d);sirData.nrSusceptible = sirData.nrSusceptible - d;
        sirData.nrInfected = d
    } else {
        sirData.nrSusceptible = sirData.nrSusceptible - 1;
        sirData.nrInfected = sirData.nrInfected + 1
    }
    a = sirData.sirStatData[0].length;
    sirData.sirStatData[0].push({
        x: a,
        y: sirData.nrSusceptible
    });
    sirData.sirStatData[1].push({
        x: a,
        y: sirData.nrInfected
    });
    sirData.sirStatData[2].push({
        x: a,
        y: sirData.nrRecovered
    });
    refreshVisualisation();
    b = getStepTime();
    setTimeout(sirStep, b)
}
function sirStep() {
    var d, g, f, b, a, c;
    if (visualisation.pause === false && visualisation.reset === false && sirData.nrInfected > 0) {
        for (d = 0; d < network.edges.length; ++d) {
            f = network.edges[d].source;
            b = network.edges[d].target;
            if (f.s === "i" && b.s === "s" || b.s === "i" && f.s === "s") {
                if (Math.random() < sirData.probabilityInfection) {
                    if (f.s === "i") {
                        b.s = "ni"
                    } else {
                        f.s = "ni"
                    }
                    sirData.nrInfected = sirData.nrInfected + 1;
                    sirData.nrSusceptible = sirData.nrSusceptible - 1
                }
            }
        }
        for (g = 0; g < network.nodes.length; ++g) {
            if (network.nodes[g].s === "i") {
                if (Math.random() < sirData.probabilityRecovery) {
                    network.nodes[g].s = "r";
                    sirData.nrRecovered = sirData.nrRecovered + 1;
                    sirData.nrInfected = sirData.nrInfected - 1
                }
            } else {
                if (network.nodes[g].s === "ni") {
                    network.nodes[g].s = "i"
                }
            }
        }
        a = sirData.sirStatData[0].length;
        sirData.sirStatData[0].push({
            x: a,
            y: sirData.nrSusceptible
        });
        sirData.sirStatData[1].push({
            x: a,
            y: sirData.nrInfected
        });
        sirData.sirStatData[2].push({
            x: a,
            y: sirData.nrRecovered
        });
        refreshVisualisation();
        if (sirData.nrInfected > 0) {
            c = getStepTime();
            setTimeout(sirStep, c)
        }
    }
}
function tryAddingEdge(c, a) {
    var b;
    if (c !== a) {
        for (b = 0; b < network.edges.length; ++b) {
            if ((network.edges[b].source === c && network.edges[b].target === a) || (network.edges[b].source === a && network.edges[b].target === c)) {
                return false
            }
        }
        network.edges.push({
            source: c,
            target: a
        });
        network.nodes[c].w = network.nodes[c].w + 1;
        network.nodes[a].w = network.nodes[a].w + 1;
        return true
    }
    return false
}
function generateErdosRenyi(c) {
    var b, a;
    network.nodes = [];
    for (b = 0; b < network.networkPopulation; ++b) {
        network.nodes.push({
            name: b,
            s: "s",
            w: 0
        })
    }
    network.edges = [];
    for (b = 0; b < network.networkPopulation - 1; ++b) {
        for (a = b; a < network.networkPopulation; a++) {
            if (b != a && Math.random() < c) {
                tryAddingEdge(b, a)
            }
        }
    }
}
function generateSmallWorld(b, f) {
    var d, a, c, e;
    network.nodes = [];
    for (d = 0; d < network.networkPopulation; ++d) {
        network.nodes.push({
            name: d,
            s: "s",
            w: 0
        })
    }
    network.edges = [];
    for (d = 0; d < network.networkPopulation; ++d) {
        a = [];
        for (c = 1; c <= b / 2; ++c) {
            if (Math.random() < f) {
                do {
                    e = getRandomIntUntilUnequal(0, network.nodes.length - 1, d)
                } while ($.inArray(e, a) !== -1);tryAddingEdge(d, e);
                a.push(e)
            } else {
                tryAddingEdge(d, (d + c) % network.nodes.length)
            }
        }
    }
}
function generateGrid(a, e) {
    var d, c, b;
    network.nodes = [];
    b = a * e;
    for (d = 0; d < b; ++d) {
        network.nodes.push({
            name: d,
            s: "s",
            w: 0
        })
    }
    network.edges = [];
    for (d = 0; d < a - 1; ++d) {
        for (c = 0; c < e; ++c) {
            tryAddingEdge(d + c * a, d + 1 + c * a)
        }
    }
    for (d = 0; d < e - 1; ++d) {
        for (c = 0; c < a; ++c) {
            tryAddingEdge(d * a + c, (d + 1) * a + c)
        }
    }
}
function generateCocktail(d) {
    var b, a, c;
    network.nodes = [];
    for (b = 0; b < d * 2; ++b) {
        network.nodes.push({
            name: b,
            s: "s",
            w: 0
        })
    }
    c = d * 2;
    network.edges = [];
    for (b = 0; b < c - 1; ++b) {
        for (a = b; a < c; ++a) {
            if ((b !== a) && (d + b !== a)) {
                tryAddingEdge(b, a)
            }
        }
    }
}
function generateBarabasiAlbert(t, c) {
    var o, n, e, h, a, s, g, q, f, p, b, r;
    network.nodes = [];
    network.edges = [];
    for (o = 0; o < network.networkPopulation; ++o) {
        network.nodes.push({
            name: o,
            s: "s",
            w: 0
        })
    }
    t = Math.min(network.networkPopulation, t);
    a = 0;
    do {
        do {
            s = getRandomIntUntilUnequal(0, t - 1, a)
        } while (!tryAddingEdge(a, s));a = s;
        h = true;
        for (o = 0; o < t; ++o) {
            if (network.nodes[o].w === 0) {
                h = false;
                break
            }
        }
    } while (!h);for (o = t; o < network.networkPopulation; ++o) {
        g = 0;
        for (q = 0; q < o; ++q) {
            g = g + network.nodes[q].w
        }
        f = 0;
        r = [];
        for (e = 0; e < o; ++e) {
            r.push(e)
        }
        for (n = 0; n < c; ++n) {
            while (r.length > 0) {
                b = network.nodes[r[f % r.length]].w / g;
                if (Math.random() <= b) {
                    if (tryAddingEdge(o, r[f % r.length]) === true) {
                        r.splice(f % r.length, 1);
                        ++f;
                        break
                    }
                } else {
                    ++f
                }
            }
        }
    }
}
function generateEdgeCopying(m) {
    var d, b, n, a, c, f, e, g, l, h;
    network.nodes = [];
    network.edges = [];
    for (f = 0; f < network.networkPopulation; ++f) {
        network.nodes.push({
            name: f,
            s: "s",
            w: 0
        })
    }
    for (c = 1; c < network.networkPopulation; ++c) {
        d = getRandomInt(1, c);
        n = 0;
        a = [];
        for (e = 0; e < c; ++e) {
            a[e] = e
        }
        arrayShuffle(a);
        if (Math.random() <= m) {
            while (n < d && n < a.length) {
                tryAddingEdge(c, a[n]);
                ++n
            }
        } else {
            g = 0;
            while (n < d && g < a.length) {
                l = a[g];
                neighborNodes = getNeighborNodes(l);
                arrayShuffle(neighborNodes);
                h = 0;
                while (n < d && h < neighborNodes.length) {
                    if (tryAddingEdge(c, neighborNodes[h]) === true) {
                        ++n
                    }
                    ++h
                }
                ++g
            }
        }
    }
}
function generateForestFire(c) {
    var e, h, f, a, d, g, b;
    network.nodes = [];
    network.edges = [];
    for (e = 0; e < network.networkPopulation; ++e) {
        network.nodes.push({
            name: e,
            s: "s",
            w: 0
        })
    }
    for (h = 1; h < network.networkPopulation; ++h) {
        ambassador = getRandomInt(0, h - 1);
        tryAddingEdge(h, ambassador);
        f = [ambassador];
        do {
            a = f[0];
            d = geometricDistribution(c);
            g = getNeighborNodes(a);
            arrayShuffle(g);
            for (b = 0; b < g.length && b < d; ++b) {
                if (tryAddingEdge(h, g[b])) {
                    f.push(g[b])
                }
            }
            f.splice(0, 1)
        } while (f.length > 0)
    }
}
function generateStar() {
    var a;
    network.nodes = [];
    network.edges = [];
    for (a = 0; a < network.networkPopulation; ++a) {
        network.nodes.push({
            name: a,
            s: "s",
            w: 0
        })
    }
    for (a = 1; a < network.networkPopulation; ++a) {
        tryAddingEdge(0, a)
    }
}
function generateComplete() {
    var b, a;
    network.nodes = [];
    for (b = 0; b < network.networkPopulation; ++b) {
        network.nodes.push({
            name: b,
            s: "s",
            w: 0
        })
    }
    network.edges = [];
    for (b = 0; b < network.networkPopulation - 1; ++b) {
        for (a = b + 1; a < network.networkPopulation; ++a) {
            tryAddingEdge(b, a)
        }
    }
}
function calculateDegreeDistribution() {
    var a = [], d = 0, c, b;
    for (c = 0; c < network.nodes.length; ++c) {
        b = network.nodes[c].w;
        if (a[b] === undefined) {
            a[b] = 1
        } else {
            ++a[b]
        }
    }
    for (c = 0; c < a.length; ++c) {
        if (a[c] === undefined) {
            a[c] = 0
        } else {
            a[c] = a[c] / network.nodes.length
        }
    }
    return a
}
function isConnected() {
    var a;
    for (a = 0; a < network.nodes.length; ++a) {
        if (network.nodes[a].w === 0) {
            return false
        }
    }
    return true
}
function calculateMeanDegree() {
    return 2 * network.edges.length / network.nodes.length
}
function calculateNetworkDensity() {
    return (2 * network.edges.length) / (network.nodes.length * (network.nodes.length - 1))
}
function getNeighborNodes(a) {
    var c = [], b;
    if (network.edges.length > 1) {
        if (typeof network.edges[0].source == "object") {
            for (b = 0; b < network.edges.length; ++b) {
                if (network.edges[b].source.index === a) {
                    c.push(network.edges[b].target)
                }
                if (network.edges[b].target.index === a) {
                    c.push(network.edges[b].source)
                }
            }
        } else {
            for (b = 0; b < network.edges.length; ++b) {
                if (network.edges[b].source === a) {
                    c.push(network.edges[b].target)
                }
                if (network.edges[b].target === a) {
                    c.push(network.edges[b].source)
                }
            }
        }
    }
    return c
}
function calculateGlobalClusteringCoefficient() {
    var a = 0, b;
    for (b = 0; b < network.nodes.length; ++b) {
        a = a + calculateLocalClusteringCoefficient(b)
    }
    return a / network.nodes.length
}
function calculateLocalClusteringCoefficient(a) {
    var d, b, c;
    if (a >= 0 && a < network.nodes.length && network.nodes.length > 1) {
        d = getNeighborNodes(a);
        b = 0;
        if (d.length <= 1) {
            return 0
        }
        for (c = 0; c < network.edges.length; ++c) {
            if (isElementInArray(d, network.edges[c].source) && isElementInArray(d, network.edges[c].target)) {
                ++b
            }
        }
        return 2 * b / (d.length * (d.length - 1))
    } else {
        return -1
    }
}
function calculateAveragePathLengthDiameter() {
    var c, a, d = 0, b = 0;
    if (isConnected() === false) {
        return {
            diameter: -1,
            averagePathLength: -1
        }
    }
    for (c = 0; c < network.nodes.length; ++c) {
        a = shortestPathAll(c);
        if (a.diameter > d) {
            d = a.diameter
        }
        b = b + a.path
    }
    return {
        diameter: d,
        averagePathLength: b / (network.nodes.length * (network.nodes.length - 1))
    }
}
function shortestPathAll(j) {
    var d, c, k, g, f, l, h = [], b = [], a, e = [];
    for (d = 0; d < network.nodes.length; ++d) {
        e.push(0)
    }
    h.push({
        i: j,
        l: 0
    });
    b.push(j);
    while (h.length > 0) {
        c = h[0];
        e[h[0].i] = h[0].l;
        h.splice(0, 1);
        k = getNeighborNodes(c.i);
        a = c.l + 1;
        for (d = 0; d < k.length; ++d) {
            g = isElementInArray(b, k[d].index);
            if (!g) {
                b.push(k[d].index);
                h.push({
                    i: k[d].index,
                    l: a
                })
            }
        }
    }
    f = 0;
    l = 0;
    for (d = 0; d < e.length; ++d) {
        f = f + e[d];
        if (e[d] > l) {
            l = e[d]
        }
    }
    return {
        diameter: l,
        path: f
    }
}
function shortestPath(h, f) {
    var c, j, d, e, g = [], b = [], a;
    g.push({
        i: h,
        l: 0
    });
    b.push(h);
    while (g.length > 0) {
        c = g[0];
        g.splice(0, 1);
        if (c.i === f) {
            return c.l
        }
        j = getNeighborNodes(c.i);
        a = c.l + 1;
        for (d = 0; d < j.length; ++d) {
            e = isElementInArray(b, j[d].index);
            if (!e) {
                b.push(j[d].index);
                g.push({
                    i: j[d].index,
                    l: a
                })
            }
        }
    }
    return -1
}
function isElementInArray(c, b) {
    var a;
    for (a = 0; a < c.length; ++a) {
        if (c[a] === b) {
            return true
        }
    }
    return false
}
function geometricDistribution(a) {
    var b = 0;
    do {
        ++b
    } while (Math.random() < a);return b
}
function arrayShuffle(d) {
    var a, b, c;
    for (b = d.length - 1; b > 0; --b) {
        c = Math.floor(Math.random() * (b + 1));
        a = d[b];
        d[b] = d[c];
        d[c] = a
    }
    return d
}
function getRandomInt(b, a) {
    return Math.floor(Math.random() * (a - b + 1)) + b
}
function getRandomIntUntilUnequal(b, a, d) {
    var c;
    do {
        c = Math.floor(Math.random() * (a - b + 1)) + b
    } while (c === d);return c
}
function getCSS(b, c) {
    var a = $("<div>").css("display", "none").addClass(b);
    $("body").append(a);
    try {
        return a.css(c)
    } finally {
        a.remove()
    }
}
;