import * as echarts from 'echarts';
function cpieoption(config) {
    const option = {
        title: [
            {
                text: config.title,
                x: 'center',
                top: '50%',
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: '0.2rem',
                    fontWeight: '100',
                },
            },
            {
                text: config.secondtitle,
                x: 'center',
                y: '35%',
                textStyle: {
                    fontSize: '0.2rem',
                    color: '#FFFFFF',
                    fontFamily: 'DINAlternate-Bold, DINAlternate',
                    foontWeight: '600',
                },
            },
        ],
        polar: {
            radius: ['72%', '82%'],
            center: ['50%', '50%'],
        },
        angleAxis: {
            max: 100,
            show: false,
        },
        radiusAxis: {
            type: 'category',
            show: true,
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        series: [
            {
                name: '',
                type: 'bar',
                roundCap: true,
                barWidth: 30,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(66, 66, 66, .3)',
                },
                data: [config.rate],
                coordinateSystem: 'polar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            {
                                offset: 0,
                                color: config?.circlecolor ? config?.circlecolor[0] : '#fffc00',
                            },
                            {
                                offset: 1,
                                color: config?.circlecolor ? config?.circlecolor[1] : '#ffffff',
                            },
                        ]),
                    },
                },
            },
            {
                name: '',
                type: 'pie',
                startAngle: 80,
                radius: ['86%'],
                hoverAnimation: false,
                center: ['50%', '50%'],
                itemStyle: {
                    color: 'rgba(66, 66, 66, .1)',
                    borderWidth: 1,
                    borderColor: '#5269EE',
                },
                data: [100],
            },
            {
                name: '',
                type: 'pie',
                startAngle: 80,
                radius: ['68%'],
                hoverAnimation: false,
                center: ['50%', '50%'],
                itemStyle: {
                    color: 'rgba(66, 66, 66, .1)',
                    borderWidth: 1,
                    borderColor: '#5269EE',
                },
                data: [100],
            },
        ],
    };
    return option
}

export default cpieoption