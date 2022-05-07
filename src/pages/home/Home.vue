<template>
  <div>
    <el-row style="background: white; margin-bottom: 20px">
      <el-col :span="24">
        <el-card class="box-card">
          <div style="display: flex; justify-content: start">
            <el-icon :size="40"
                     style="padding: 20px">
              <avatar />
            </el-icon>
            <div v-if="userInfo"
                 style="width: 80%; padding: 5px 0px">
              <p style="
                  margin: 12px 0px;
                  font-size: 20px;
                  font-weight: 700;
                  color: #3c4a54;
                ">
                {{ userInfo.nickname || userInfo.account }}
              </p>
              <p style="font-size: 14px; color: #808695">
                {{ userInfo.sex || "这人性别未知" }}
              </p>
            </div>
            <div v-if="!userInfo"
                 style="
                width: 80%;
                padding: 5px 0px;
                align-items: center;
                display: flex;
              ">
              <p style="
                  font-size: 24px;
                  font-weight: bold;
                  color: #65659d;
                  cursor: pointer;
                "
                 @click="accountEdit">
                登录/注册
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            style="margin-bottom: 20px">
      <el-col :span="6">
        <el-card class="box-card"
                 style="background: white">
          <div id="DayWork"
               style="height: 250px; width: 100%"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card"
                 style="background: white">
          <div id="WeekWork"
               style="height: 250px; width: 100%"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card"
                 style="background: white; height: 290px">
          <p style="
              text-align: center;
              font-size: 20px;
              font-weight: 700;
              color: rgb(60, 74, 84);
              margin: 0 0 16px 0;
            ">
            版本说明
          </p>
          <el-table :data="tableData"
                    style="width: 100%">
            <el-table-column prop="datea"
                             label="名称" />
            <el-table-column prop="versiona"
                             label="版本" />
            <el-table-column prop="dateb"
                             label="名称" />
            <el-table-column prop="versionb"
                             label="版本" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="box-card"
                 style="background: white">
          <div id="weekWeather"
               style="height: 500px; width: 100%"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card"
                 style="background: white; height: 290px">
          <div>1</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { onMounted } from 'vue'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      tableData: [
        {
          datea: 'vue',
          versiona: '^3.2.20',
          dateb: 'vue-router',
          versionb: '^4.0.11',
        },
        {
          datea: 'element-plus',
          versiona: '^1.1.0-beta.19',
          dateb: '@element-plus/icons',
          versionb: '0.0.11',
        },
        {
          datea: 'echarts',
          versiona: '^5.2.1',
          dateb: 'vuex',
          versionb: '^4.0.2',
        },
      ],
    }
  },
  setup() {
    const store = useStore() // 获取store 实例
    const userInfo = computed(() => store.state.userInfo)
    const TODAY_WORK = {
      title: {
        text: '今日任务',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        bottom: 'bottom',
      },
      series: [
        {
          name: '今日任务',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '改 BUG' },
            { value: 735, name: '写 BUG' },
            { value: 580, name: '功能开发' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    const WEEK_WORK = {
      title: {
        text: '周统计图',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['改 BUG', '写 BUG', '功能开发'],
        bottom: 'bottom',
      },
      grid: {
        left: '2%',
        right: '3%',
        bottom: '30px',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '改 BUG',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '写 BUG',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: '功能开发',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
      ],
    }

    const accountEdit = () => {
      store.dispatch('changeAccount', true)
    }
    onMounted(() => {
      {
        // 基于准备好的dom，初始化echarts实例
        var dayChart = echarts.init(document.getElementById('DayWork'))
        var weekChart = echarts.init(document.getElementById('WeekWork'))
        // 绘制图表
        dayChart.setOption(TODAY_WORK)
        weekChart.setOption(WEEK_WORK)
      }
    })
    return {
      userInfo,
      accountEdit,
    }
  },
}
</script>

<style lang="scss">
</style>