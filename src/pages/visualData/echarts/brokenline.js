function brokenlineoptions(config) {
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['新增', '完成'],

        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '1%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: false,
            data: config.date,
            nameTextStyle: {
                color: 'white'
            }
        },
        yAxis: {
            type: 'value',
            splitLine: false,
        },
        series: [
            {
                name: '新增',
                type: 'line',
                stack: 'Total',
                data: config.create
            },
            {
                name: '完成',
                type: 'line',
                stack: 'Total',
                data: config.finish
            }
        ]
    };
    return option
}

export default brokenlineoptions