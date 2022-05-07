<template>
  <div class="visualData-main">
    <!-- 标题 -->
    <div class="title">
      <p class="title-text">终极打工人系统</p>
    </div>
    <!-- 内容 -->
    <div class="body">
      <Aleft :statesInfo="statesInfo"
             :weekData="weekData"></Aleft>
      <Acenter :allNum="allNum"></Acenter>
      <Aright :userState="userState"></Aright>
    </div>
  </div>
</template>

<script>
import Aleft from './aleft.vue'
import Acenter from './acenter.vue'
import Aright from './aright.vue'
import { onUnmounted, onMounted, ref } from 'vue'
import { reqkoa } from '@/request'
import { format, subDays, formatDistance, endOfDay } from 'date-fns'
export default {
  name: 'VisualData',
  components: { Aleft, Acenter, Aright },
  setup() {
    // 所有类型的工作任务信息统计
    let statesInfo = ref({
      0: { label: '内部管理', total: 0, finish: 0 },
      1: { label: '部门协同会', total: 0, finish: 0 },
      2: { label: '其他会议', total: 0, finish: 0 },
      3: { label: '需求讨论', total: 0, finish: 0 },
      4: { label: '方案设计', total: 0, finish: 0 },
      5: { label: '编码测试', total: 0, finish: 0 },
      6: { label: '冒烟问题处理', total: 0, finish: 0 },
      7: { label: '发布脚本', total: 0, finish: 0 },
      8: { label: '系统升级', total: 0, finish: 0 },
      9: { label: '基础资源维护', total: 0, finish: 0 },
      10: { label: '内部沟通', total: 0, finish: 0 },
      11: { label: '岗位说明书', total: 0, finish: 0 },
      12: { label: '内部系统', total: 0, finish: 0 },
    })

    // 近7日新增与完成统计
    let weekData = ref({
      date: [
        format(subDays(new Date(), 6), 'MM-dd'),
        format(subDays(new Date(), 5), 'MM-dd'),
        format(subDays(new Date(), 4), 'MM-dd'),
        format(subDays(new Date(), 3), 'MM-dd'),
        format(subDays(new Date(), 2), 'MM-dd'),
        format(subDays(new Date(), 1), 'MM-dd'),
        format(subDays(new Date(), 0), 'MM-dd'),
      ],
      create: [0, 0, 0, 0, 0, 0, 0],
      finish: [0, 0, 0, 0, 0, 0, 0],
    })
    let allNum = ref({ create: 0, finish: 0 }) // 所有任务的总数和完成数
    let userState = ref({
      total: 0,
      login: [],
      free: [],
    })
    const nowEndDate = endOfDay(new Date()) // 今天的结束时间
    /**
     * 处理工作任务数据
     */
    function dealWork(workitem) {
      statesInfo.value[workitem.state].total += 1 // 总数累加

      allNum.value.create += 1
      if (workitem.type == '3') {
        statesInfo.value[workitem.state].finish += 1 // 总数累加
        allNum.value.finish += 1
        // 已完成
      }
      // 7天内的数据
      let cdistance = formatDistance(
        new Date(workitem.createTime.replace(/-/g, '/')),
        nowEndDate
      )
      let days = ['6 days', '5 days', '4 days', '3 days', '2 days', '1 day']
      let createdistance = days.indexOf(cdistance)
      // 今天的是 hours
      if (cdistance.indexOf('hours') !== -1) {
        createdistance = 6
      }
      if (createdistance != -1) {
        weekData.value.create[createdistance] += 1
      }
      if (workitem.endTime) {
        let edistance = formatDistance(
          new Date(workitem.endTime.replace(/-/g, '/')),
          nowEndDate
        )
        let enddistance = days.indexOf(edistance)
        if (edistance.indexOf('hours') !== -1) {
          enddistance = 6
        }
        if (enddistance != -1) {
          weekData.value.finish[enddistance] += 1
        }
      }
    }

    /**
     * 处理人员数据
     */
    function dealWuser(userItem) {
      if (!userItem) {
        return
      }
      userState.value.total += 1
      if (userItem.login) userState.value.login.push(userItem)
      if (userItem.free) userState.value.free.push(userItem)
    }

    onMounted(() => {
      reqkoa('getDaping', {}, 'POST').then((res) => {
        if (res.code === 1) {
          // 处理工作任务数据
          for (let workitem of res.data.allWork) {
            dealWork(workitem)
          }
          // 处理人员数据
          for (let useritem of res.data.allUser) {
            dealWuser(useritem)
          }
        }
      })
    })

    onUnmounted(() => {})
    return {
      statesInfo,
      weekData,
      allNum,
      userState,
    }
  },
}
</script>

<style lang="scss">
.visualData-main {
  background: #000d4a url(../../assets/visualData/bg.jpg) center top;
  background-size: cover;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .title {
    height: 1.05rem;
    background: url(../../assets/visualData/head_bg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    .title-text {
      color: white;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.4rem;
    }
  }
  .body {
    display: flex;
    img {
      max-width: 100%;
    }
  }
}
</style>