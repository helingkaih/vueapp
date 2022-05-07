<template>
  <div class="aright">Aright
    <div class="boxall"
         style="height:5.7rem">
      <div class="alltitle">
        人员概况
      </div>
      <div style="display:flex">
        <div id="alluser"
             style="height:2rem;width:33.3%"></div>
        <div id="userlogin"
             style="height:2rem;width:33.3%"></div>
        <div id="freeuser"
             style="height:2rem;width:33.3%"></div>
      </div>
      <div class="tit02"><span>在线人员列表</span></div>
      <div class="userloginlist">
        <div class="userloginlistrowup">
          <div v-for="(item) in userState.login"
               :key="item.account"
               class="listitem">
            <div style="display:flex">
              <el-image :key="'img'+item.avatar"
                        style="width:0.5rem"
                        :src="'http://helingkai.com/static/avatars/default01.svg'"></el-image>
              <div class="username">
                {{item.nickname}}
              </div>
              <div class="mood">
                {{item.mood}}
              </div>
            </div>

            <div class="loginstate">
              <el-icon :size="20">
                <platform />
              </el-icon>
              <el-icon :size="20">
                <cloudy />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="boxfoot"></div>
    </div>
    <div class="boxall"
         style="height:2.7rem">
      <div class="alltitle">
        实时任务状态
      </div>
      <div class="taskStatus">
        <div class="worklistrowup">
          <div v-for="(item,index) of newwork"
               :key="item.workname+index"
               class="worklist">
            <div>
              <span class="username">{{item.user}}&nbsp;</span>
              <span class="type">{{item.type==='change'?'修改':'新增了任务'}}</span>
              <span class="workname">&nbsp;{{item.workname}}&nbsp;</span>
              <span class="text">{{item.type==='change'?'为':''}}</span>
              <span class="state">&nbsp;{{item.type==='change'?item.state:''}}&nbsp;</span>
            </div>
            <div class="time">
              {{item.time}}
            </div>
          </div>
        </div>
      </div>
      <div class="boxfoot">

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs, watchEffect } from 'vue'
import * as echarts from 'echarts'
import cpieoption from './echarts/cpie'
export default {
  name: 'Aright',
  components: {},
  props: ['userState'],
  setup(props) {
    const { userState } = toRefs(props)
    const newwork = [
      {
        user: 'hlk',
        type: 'change',
        workname: '万达系统升级',
        state: '1',
        time: '下午 17:56',
      },
      {
        user: 'hlk',
        type: 'change',
        workname: '仪陇系统升级',
        state: '5',
        time: '下午 17:56',
      },
      {
        user: 'hlk',
        type: 'add',
        workname: '看板开发',
        state: '0',
        time: '下午 17:56',
      },
      {
        user: 'sdd',
        type: 'change',
        workname: '工作台开发',
        state: '4',
        time: '下午 17:56',
      },
    ]
    onMounted(() => {
      const userlogindom = document.getElementById('userlogin')
      const userloginechart = echarts.init(userlogindom)
      const alluserdom = document.getElementById('alluser')
      const alluserchart = echarts.init(alluserdom)
      const freeuserdom = document.getElementById('freeuser')
      const freeuserchart = echarts.init(freeuserdom)
      watchEffect(() => {
        userloginechart.setOption(
          cpieoption({
            title: '在线 ' + userState.value.login.length + '人',
            secondtitle:
              Math.ceil(
                (userState.value.login.length / userState.value.total) * 100 ||
                  0
              ) + '%',
            rate:
              (userState.value.login.length / userState.value.total) * 100 || 0,
            circlecolor: ['#a17fe0', '#5d26c1'],
          })
        )

        alluserchart.setOption(
          cpieoption({
            title: '共 ' + userState.value.total + ' 人',
            secondtitle: '在职',
            rate: 100,
            circlecolor: ['#fffc00', '#ffffff'],
          })
        )

        freeuserchart.setOption(
          cpieoption({
            title: '空闲 ' + userState.value.free.length + ' 人',
            secondtitle:
              Math.ceil(
                (userState.value.free.length / userState.value.login.length) *
                  100 || 0
              ) + '%',
            rate:
              (userState.value.free.length / userState.value.login.length) *
                100 || 0,
            circlecolor: ['#c2e59c', '#64b3f4'],
          })
        )
      })

      window.addEventListener('resize', function () {
        userloginechart.resize()
        alluserchart.resize()
        freeuserchart.resize()
      })
    })
    return {
      newwork,
    }
  },
}
</script>

<style lang="scss">
@import './visualData.scss';
.aright {
  width: 30%;
  padding: 0 0.4rem;
  .tit02 {
    text-align: center;
    margin: 0.1rem 0;
    position: relative;
  }

  .tit02 span {
    border: 1px solid rgba(25, 186, 139, 0.17);
    letter-spacing: 2px;
    padding: 0.01rem 0.2rem;
    background: rgba(255, 255, 255, 0.05);
    font-size: 0.18rem;
    color: #49bcf7;
  }

  .tit02:before,
  .tit02:after {
    position: absolute;
    width: 30%;
    height: 1px;
    background: rgba(25, 186, 139, 0.2);
    content: '';
    top: 0.12rem;
  }

  .tit02:after {
    right: 0;
  }

  .tit02:before {
    left: 0;
  }
  .userloginlist {
    height: 2.7rem;
    overflow: hidden;
    .listitem {
      display: flex;
      height: 0.5rem;
      line-height: 0.5rem;
      margin: 0.1rem 0;
      justify-content: space-between;
      .username {
        font-size: 0.25rem;
        color: white;
        margin-right: 0.1rem;
      }
      .mood {
        font-size: 0.2rem;
        color: rgba(255, 255, 255, 0.6);
      }
      .loginstate {
        color: white;
        line-height: 0.6rem;
      }
    }
  }

  .taskStatus {
    margin-top: 0.1rem;
    overflow: hidden;
    .worklist {
      font-size: 0.2rem;
      color: rgba(255, 255, 255, 0.6);
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      line-height: 0.4rem;
      height: 0.4rem;
      .username {
        color: white;
      }
      .workname {
        color: #f9f982;
      }
      .state {
        color: #a2a2e9;
      }
    }
  }
  @keyframes userloginlistrowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(0, 2.7rem, 0);
      transform: translate3d(0, -2.7rem, 0);
      display: none;
    }
  }
  .userloginlistrowup {
    -webkit-animation: 10s userloginlistrowup linear infinite normal;
    animation: 10s userloginlistrowup linear infinite normal;
    position: relative;
    &:hover {
      animation-play-state: paused;
      -webkit-animation-play-state: paused;
    }
  }
  @keyframes worklistrowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(0, 2.7rem, 0);
      transform: translate3d(0, -2.5rem, 0);
      display: none;
    }
  }
  .worklistrowup {
    -webkit-animation: 10s worklistrowup linear infinite normal;
    animation: 10s worklistrowup linear infinite normal;
    position: relative;
    &:hover {
      animation-play-state: paused;
      -webkit-animation-play-state: paused;
    }
  }
}
</style>