    var chart;
    var options;
    var table;
    var seriesdata=[];
    $(document).ready(function(){
        init();
    });
    $(window).resize(function(){
        init();
    });

    function init(){
        $('.mymulti').chosen({max_selected_options:10});

        var ch = $('.chart-selector');
        type = ch.val();
        name = ch.find('option:selected').text().toUpperCase();

        $('[data-role="bullion"]').html(name);
        //For Icon Color
        $('.commodity-table>i').removeClass('GOLD').removeClass('SILVER');
        $('.commodity-table>i').addClass(name);

        generateChart(type,name);

        updateSelectFields();

        $('.relative').hover(function(){
            $('.compare-chart-selector').show();
            $('.compare-btn').hide();
        },function(){
            $('.compare-chart-selector').hide();
            $('.compare-btn').show();
        });
    }

    $('.mymulti').change(function(){
        ch = $(this);
        type = ch.val();
        //swap the array values so that the main deselected option is on the top of arraylist
        type.unshift(ch.find('option[disabled]').val());
        compareChart(type);
    });

    $('.chart-selector').change(function() {
        ch = $(this);
        type = ch.val();
        name = ch.find('option:selected').text().toUpperCase();
        $('[data-role="bullion"]').html(name);
        //For Icon Color
        $('.commodity-table>i').removeClass('GOLD').removeClass('SILVER');
        $('.commodity-table>i').addClass(name);
        updateSelectFields();
        generateChart(type,name);
    });

    function generateChart(type, name)
    {
        $.post(getBullionURL,{type:type}, function (data) {
            // Create the chart
            seriesdata = [{
                type: 'area',
                name: name,
                data: data,
                tooltip: {
                    valueDecimals: 2
                },
                fillColor : {
                    linearGradient : [0, 0, 0, 210],
                    stops : [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                threshold: null
            }];
            chart = new Highcharts.StockChart({
                chart: {
                    renderTo: 'chart-container',
                    zoomType: 'x'
                },
                credits: {
                    enabled: false
                },
                rangeSelector: {
                    inputEnabled: $('#chart-container').width()>480,
                    buttons: [{
                        type: 'week',
                        count: 1,
                        text: '1w'
                    }, {
                        type: 'day',
                        count: 15,
                        text: '15d'
                    }, {
                        type: 'month',
                        count: 1,
                        text: '1m'
                    }, {
                        type: 'month',
                        count: 3,
                        text: '3m'
                    }, {
                        type: 'month',
                        count: 6,
                        text: '6m'
                    }, {
                        type: 'all',
                        text: '1y'
                    }],
                    selected: 0
                },
                series: seriesdata,
                yAxis: {
                    title: {
                        text: 'Value'
                    }
                }
            }, function (chart) { // on complete
				var textX = eval(chart.plotLeft + chart.plotSizeX/2-90);
				var textY = eval(chart.plotTop + chart.plotSizeY/2);

				chart.renderer.text('InvestoNepal',textX,textY)
					.css({
						color: '#ddd',
						fontSize: '35px'
					})
					.add();
			});
            updateTable();
        });
    }

    function compareChart(arr)
    {
        var alldata = [];
        var counter1 = 0;
        var counter2 = 0;
        var dataWithpercentChange = [];
        var name = []
        $(arr).each(function(k,v){
            type = v;
            name[counter2] = $('.mymulti option[value='+type+']').text();
            $.post(getBullionURL,{type:type}, function (data) {
                // Create the chart data
                dataWithpercentChange[counter1]=[];

                for (i = 0; i < (data.length); i++) {
                    var value = data[i][1];
                    var preValue = i!==0?data[i - 1][1]:0;
                    var diff = i!==0?parseFloat((value - preValue)).toFixed(3):0;
                    var per = preValue!==0?parseFloat((diff/preValue)*100).toFixed(3):0;
                    dataWithpercentChange[counter1].push([data[i][0],parseFloat(per)]);
                }
                alldata[counter1] = {
                    type:counter1==0?'area':undefined,
                    name: name[counter1],
                    data: dataWithpercentChange[counter1],
                    tooltip: {
                        valueDecimals: 2,
                        valueSuffix: ' %'
                    },
                    fillColor : {
                        linearGradient : [0, 0, 0, 210],
                        stops : [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    threshold: null
                };
                counter1++;
            });
            counter2++;
        });

        //check if all ajax request are complete and update chart after it
        var checkAjaxCompletion = setInterval(function(){
           if(counter1==counter2) {
               clearInterval(checkAjaxCompletion);
               $('#chart-container').html('');
               chart = new Highcharts.StockChart({
                   chart: {
                       renderTo: 'chart-container',
                       zoomType: 'x'
                   },
                   rangeSelector: {
                       buttons: [{
                           type: 'week',
                           count: 1,
                           text: '1w'
                       }, {
                           type: 'day',
                           count: 15,
                           text: '15d'
                       }, {
                           type: 'month',
                           count: 1,
                           text: '1m'
                       }, {
                           type: 'month',
                           count: 3,
                           text: '3m'
                       }, {
                           type: 'month',
                           count: 6,
                           text: '6m'
                       }, {
                           type: 'all',
                           text: '1y'
                       }],
                       selected: 0
                   },
                   series: alldata,
                   yAxis: {
                       title: {
                           text: 'Percent'
                       }
                   }
               },function (chart) { // on complete
					var textX = eval(chart.plotLeft + chart.plotSizeX/2-90);
					var textY = eval(chart.plotTop + chart.plotSizeY/2);

					chart.renderer.text('InvestoNepal',textX,textY)
						.css({
							color: '#f1f1f1',
							fontSize: '35px'
						})
						.add();
				});
           }
        },100);

    }

    function updateTable()
    {
        $('table.compare-bullion').hide();
        if(table===undefined){
            table = $('table.bullion').DataTable({
                processing: true,
                serverSide: false,
                filter:false,
                paging: false,
                order: [[1,'desc']],
                info: false,
                language: {
                    processing: SPINNER
                },
                ajax: {
                    url: getBullionDatatableURL,
                    type: 'POST',
                    data: {
                        type: function(){return $('.chart-selector').val()},
                    }
                },
                columns: [
                    {data: 'date',class:'hidden-sm hidden-xs'},
                    {data: 'date'},
                    {data: 'price',render:function(data){
                        if(data===null) return 'N/A';
                        return data;
                    }},
                    {data: 'previous',class:'hidden-sm hidden-xs',searchable:false,render:function(data){
                        if(data===null) return 'N/A';
                        return data;
                    }},
                    {data: 'change',searchable:false,render:function(data){
                        if(data===null) return 'N/A';
                        
                        change = "neutral";
                        if(eval(data)>0)
                            change = "up";
                        else if(eval(data)<0)
                            change = "down";
                        return "<span data-change="+change+">"+data+"</span>";
                    }},
                    {data: 'percent',class:'hidden-sm hidden-xs',searchable:false,render:function(data){
                        if(data===null) return 'N/A';
                        if(eval(data)>0)
                            change = "up";
                        else if(eval(data)<0)
                            change = "down";
                        return "<span data-change="+change+">"+data+"</span>";
                    }},
                ]
            });
            
            table.on( 'order.dt search.dt page.dt draw.dt', function () {
                table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                });
            }).draw();
        } else {
            table.ajax.reload();
        }
    }
    function updateSelectFields()
    {
        currentlyselected = $('.chart-selector').val();

        //disable same value in compare selector
        $('.mymulti>option').each(function(){
            $(this).removeAttr('disabled').removeAttr('selected');
        })
        $('.mymulti>option[value='+currentlyselected+']').attr('disabled',true).attr('selected','selected');
        $('.mymulti').trigger('chosen:updated');
    }
    function swapElement(array, bullionA, bullionB) {
        var tmp = array[bullionA];
        array[bullionA] = array[bullionB];
        array[bullionB] = tmp;
    }