 $(document).ready(function () {
     var myChart = echarts.init(document.getElementById('human'));
     option = {
         tooltip: {
             trigger: 'item',
             formatter: "{a} <br/>{b} : {c} ({d}%)"
         },
         color: ['#ffae03', '#fe938c', '#4392f1', '#4bc6b9'],
         series: [{
             name: '人体成分',
             type: 'pie',
             radius: '80%',
             center: ['50%', '50%'],
             data: [{
                     value: 215
                 },
                 {
                     value: 139
                 },
                 {
                     value: 42
                 },
                 {
                     value: 494
                 },
             ],
             roseType: 'radius',
             labelLine: {
                 normal: {
                     lineStyle: {
                         color: 'white'
                     }
                 }
             },
         }]
     };
     myChart.setOption(option);

 })