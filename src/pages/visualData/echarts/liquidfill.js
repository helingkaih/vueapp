import * as echarts from 'echarts';

function liquidoption(config) {
    var option = {
        title: {
            text: config.title,
            textStyle: {
                fontSize: '0.2rem',
                fontFamily: 'Microsoft Yahei',
                fontWeight: 'bold',
                color: '#fff',
            },
            x: 'center',
            y: '0',
        },
        series: [
            {
                type: 'liquidFill',
                radius: '60%',
                center: ['50%', '50%'],
                color: config.ratioColor,
                data: config.ratioArr,
                backgroundStyle: {
                    // borderWidth: 1,
                    color: '#1f2c52',
                },
                label: {
                    position: ['50%', '50%'],
                    formatter: function () {
                        return `${config.ratio}%`;
                    },
                    fontSize: '0.2rem',
                    color: '#fff',
                },
                outline: {
                    show: false,
                },
            },
            {
                //细的外圈
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['64%', '65%'],
                hoverAnimation: false,
                data: [
                    {
                        name: '',
                        value: config.ratio,
                        labelLine: {
                            show: false,
                        },
                        itemStyle: {
                            color: 'transparent',
                        },
                        emphasis: {
                            labelLine: {
                                show: false,
                            },
                            itemStyle: {
                                color: 'transparent',
                            },
                        },
                    },

                    {
                        //画剩余的刻度圆环
                        name: '',
                        value: 100 - config.ratio,
                        itemStyle: {
                            color: '#41496b',
                        },
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        emphasis: {
                            labelLine: {
                                show: false,
                            },
                            itemStyle: {
                                color: '#41496b',
                            },
                        },
                    },
                ],
            },
            {
                //粗的外圈
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['63%', '66%'],
                hoverAnimation: false,
                zlevel: 2,
                data: [
                    {
                        name: '',
                        value: config.ratio,
                        labelLine: {
                            show: false,
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#00e2fe',
                                },
                                {
                                    offset: 1,
                                    color: '#0707ff',
                                },
                            ]),
                        },
                        emphasis: {
                            labelLine: {
                                show: false,
                            },
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#00e2fe',
                                    },
                                    {
                                        offset: 1,
                                        color: '#0707ff',
                                    },
                                ]),
                            },
                        },
                    },

                    {
                        //画剩余的刻度圆环
                        name: '',
                        value: 100 - config.ratio,
                        itemStyle: {
                            color: 'transparent',
                        },
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        emphasis: {
                            labelLine: {
                                show: false,
                            },
                            itemStyle: {
                                color: 'transparent',
                            },
                        },
                    },
                ],
            },
        ],
    }
    return option
}

export default liquidoption