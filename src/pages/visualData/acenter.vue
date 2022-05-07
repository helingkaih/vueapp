<template>
  <div class="acenter">
    <div class="bar">
      <div class="barbox">
        <ul class="clearfix">
          <li class="pulll_left counter">{{allNum.create}}</li>
          <li class="pulll_left counter">{{allNum.finish}}</li>
        </ul>
      </div>
      <div class="barbox2">
        <ul class="clearfix">
          <li class="pulll_left">总任务数</li>
          <li class="pulll_left">总完成数</li>
        </ul>
      </div>
    </div>
    <div class="map">
      <div class="map1"><img src="@/assets/visualData/lbx.png"></div>
      <div class="map2"><img src="@/assets/visualData/jt.png"></div>
      <div class="map3"><img src="@/assets/visualData/map.png"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs } from 'vue'
export default {
  name: 'Acenter',
  components: {},
  props: ['allNum'],
  setup(props) {
    const { allNum } = toRefs(props)
    onMounted(() => {})
    return {
      allNum,
    }
  },
}
</script>

<style lang="scss">
.acenter {
  width: 40%;
  padding: 0 0.4rem;
  .bar {
    background: rgba(101, 132, 226, 0.1);
    padding: 0.15rem;
    ul {
      list-style: none;
      display: flex;
      margin: 0;
    }
  }

  .barbox li,
  .barbox2 li {
    width: 50%;
    text-align: center;
    position: relative;
  }

  .barbox:before,
  .barbox:after {
    position: absolute;
    width: 0.3rem;
    height: 0.1rem;
    content: '';
  }

  .barbox:before {
    border-left: 2px solid #02a6b5;
    left: 0;
    border-top: 2px solid #02a6b5;
  }

  .barbox:after {
    border-right: 2px solid #02a6b5;
    right: 0;
    bottom: 0;
    border-bottom: 2px solid #02a6b5;
  }

  .barbox li:first-child:before {
    position: absolute;
    content: '';
    height: 50%;
    width: 1px;
    background: rgba(255, 255, 255, 0.2);
    right: 0;
    top: 25%;
  }

  .barbox {
    border: 1px solid rgba(25, 186, 139, 0.17);
    position: relative;
  }

  .barbox li {
    font-size: 0.6rem;
    color: #ffeb7b;
    padding: 0.05rem 0;
    font-family: Gotham, 'Helvetica Neue', Helvetica, Arial, 'sans-serif';
    font-weight: bold;
  }

  .barbox2 li {
    font-size: 0.25rem;
    color: white;
    padding-top: 0.1rem;
  }
  .map {
    position: relative;
    height: 7.2rem;
    z-index: 9;
  }

  .map4 {
    width: 200%;
    height: 7rem;
    position: relative;
    left: -50%;
    top: 4%;
    margin-top: 0.2rem;
    z-index: 5;
  }

  .map1,
  .map2,
  .map3 {
    position: absolute;
  }

  .map1 {
    width: 6.83rem;
    z-index: 2;
    top: 0.85rem;
    left: 0.1rem;
    animation: myfirst2 15s infinite linear;
  }

  .map2 {
    width: 6.28rem;
    top: 1.2rem;
    left: 0.38rem;
    z-index: 3;
    opacity: 0.5;
    animation: myfirst 10s infinite linear;
  }

  .map3 {
    width: 5.68rem;
    top: 1.5rem;
    left: 0.7rem;
    z-index: 1;
  }

  @keyframes myfirst2 {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }

  @keyframes myfirst {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(-359deg);
    }
  }
}
</style>