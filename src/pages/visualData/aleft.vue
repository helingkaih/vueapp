<template>
  <div class="aleft">
    <div class="boxall"
         style="height: 2.7rem">
      <div class="alltitle">
        任务分类统计
      </div>
      <div class="sycm">
        <ul>
          <li>
            <p>{{statesInfo[4].total}}</p>
            <p>方案设计</p>
          </li>
          <li>
            <p>{{statesInfo[5].total}}</p>
            <p>编码测试</p>
          </li>
          <li>
            <p>{{statesInfo[6].total}}</p>
            <p>冒烟问题处理</p>
          </li>
        </ul>
        <div style="border-bottom: 1px solid rgba(255,255,255,.1)"></div>
        <ul>
          <li>
            <p>{{statesInfo[0].total}}</p>
            <p>内部管理</p>
          </li>
          <li>
            <p>{{statesInfo[8].total}}</p>
            <p>系统升级</p>
          </li>
          <li>
            <p>{{statesInfo[1].total}}</p>
            <p>部门协同会</p>
          </li>
        </ul>
      </div>
      <div class="boxfoot"></div>
    </div>
    <div class="boxall"
         style="height: 2.7rem">
      <div class="alltitle">
        任务完成率
      </div>
      <el-carousel :interval="4000"
                   type="card"
                   height="2rem">
        <el-carousel-item v-for="(item) in statesInfo"
                          :key="item.label">
          <div :id="'rate'+item.label"
               style="height:2rem;width: 2rem;margin:auto">

          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="boxfoot"></div>
    </div>
    <div class="boxall"
         style="height: 2.7rem">
      <div class="alltitle">
        7日概况
      </div>
      <div style="height:2rem;width: 100%;"
           id="workDistribution"></div>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import { onMounted, toRefs, watchEffect } from 'vue'
import liquidoption from './echarts/liquidfill'
import brokenlineoptions from './echarts/brokenline'
export default {
  name: 'Aleft',
  components: {},
  props: ['statesInfo', 'weekData'],
  setup(props) {
    // 任务完成率
    const { statesInfo, weekData } = toRefs(props)
    const chartArr = [] // 用来存放水球图
    var ratioColor = ['#1991d2', '#3831f3', '#1991d2'] //波浪内颜色
    onMounted(() => {
      // 获取 水球图dom
      const workDistributiondom = document.getElementById('workDistribution')
      const workDistributionchart = echarts.init(workDistributiondom)
      watchEffect(() => {
        for (let key in statesInfo.value) {
          let item = statesInfo.value[key]
          // 制作水球图数据
          let rate =
            item.total === 0 ? 100 : Math.ceil(item.finish / item.total)
          let option = liquidoption({
            ratioColor,
            ratioArr: [rate / 100, rate / 100, rate / 100],
            ratio: rate,
            title: item.label,
          })
          const rateDom = document.getElementById('rate' + item.label)
          const rateChart = echarts.init(rateDom)
          // 渲染数据
          rateChart.setOption(option)
          chartArr.push(rateChart)
        }
        const blop = brokenlineoptions(weekData.value)
        workDistributionchart.setOption(blop)
      })

      window.addEventListener('resize', function () {
        for (let chartitem of chartArr) {
          chartitem.resize()
        }
        workDistributionchart.resize()
      })
    })
    return {
      statesInfo,
    }
  },
}
</script>

<style lang="scss">
@import './visualData.scss';
.aleft {
  width: 30%;
  padding: 0 0.4rem;
  .sycm ul {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    padding: 0.16rem 0;
    display: flex;
  }

  .sycm li {
    width: 33.33%;
    text-align: center;
    position: relative;
  }

  .sycm li:before {
    position: absolute;
    content: '';
    height: 30%;
    width: 1px;
    background: rgba(255, 255, 255, 0.1);
    right: 0;
    top: 15%;
  }

  .sycm li:last-child:before {
    width: 0;
  }

  .sycm li {
    p:nth-child(1) {
      font-size: 0.35rem;
      color: #c5ccff;
      font-weight: bold;
      margin-bottom: 0.1rem;
    }
    p:nth-child(2) {
      font-size: 0.18rem;
      color: #fff;
      opacity: 0.5;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    // background-color: #d3dce6;
  }
  .el-carousel__mask {
    background-color: unset;
  }
  .el-carousel__item {
    background: unset !important;
  }
}

// :v-deep{

// }
</style>