<template>
  <div class="bg" style="display:flex">pagea
      <div class="diva">
          <div></div>
      </div>
      <div class="dive">
          <div></div>
      </div>
      <div class="divb"></div>
      <div class="divc"></div>
      <div class="divd"></div>
  </div>
</template>

<script>
import { onUnmounted } from "vue";
export default {
  name: "Vue2",
  components: {},
  setup() {
    console.log("pagea初始化");
    onUnmounted(() => {
      console.log("pagea被销毁");
    });
  },
};
</script>
<style lang="scss">
.bg{
    height: 100%;
    background: radial-gradient(244% 141% at -1% 0%, #4D547A 0%, #4D547A 0%, #4D547A 5%, #2D314C 82%, #2D314C 100%);
    //  background: linear-gradient(127deg, #464C6D 0%, #464C6D 0%, #262B44 99%, #262B44 99%);
    box-shadow: -32px -32px 48px 0px rgba(76, 82, 118, 0.17),34px 34px 64px 0px rgba(50, 53, 77, 0.48),inset -1px -1px 4px 0px rgba(44, 47, 68, 0.2),inset 2px 2px 2px 0px rgba(82, 91, 136, 0.11);

    padding-top: 50px;

}
.diva{
    width: 64px;
    height: 64px;
    border-radius: 21px;
    border-radius: 21px;
    opacity: 0.95;
    background: linear-gradient(135deg, #414768 -6%, #414768 -6%, #4A5177 100%, #4A5177 100%);
    box-shadow: -6px -6px 20px 0px rgba(85, 92, 130, 0.56),8px 8px 18px 0px rgba(54, 58, 86, 0.2),inset 1px 1px 1px 0px rgba(37, 48, 105, 0.05),inset -1px -1px 4px 0px rgba(82, 91, 136, 0.12);

    margin-left: 10px;
}

.divb{
    width: 313px;
    height: 160px;
    border-radius: 21px;
    opacity: 0.95;
    background: linear-gradient(117deg, #474E74 -6%, #474E74 -6%, #393F5E 99%, #393F5E 99%);
    box-shadow: -6px -6px 24px 0px rgba(85, 92, 130, 0.4),8px 8px 22px 0px rgba(54, 58, 86, 0.2),inset 1px 1px 1px 0px rgba(37, 48, 105, 0.05),inset -1px -1px 4px 0px rgba(82, 91, 136, 0.12);

    margin-left: 100px;

}

.divc{
    width: 360px;
    height: 944px;
    border-radius: 41px;
    background: radial-gradient(670% 129% at 17% -1%, #444A6D 0%, #444A6D 0%, #2D314C 100%, #2D314C 100%);
    box-shadow: 2px 4px 8px 0px rgba(34, 37, 61, 0.2),12px 12px 14px 0px rgba(42, 47, 74, 0.52),inset 2px 2px 2px 0px rgba(82, 91, 136, 0.08);

    margin-left: 100px;
}

.divd{
    width: 172px;
    height: 280px;
    border-radius: 20px;
    background: linear-gradient(148deg, #484F74 0%, #484F74 0%, #3A3F5E 100%, #3A3F5E 100%);
    box-shadow: -12px -12px 32px 0px rgba(73, 79, 115, 0.72),12px 12px 32px 0px rgba(46, 51, 77, 0.96),inset 2px 2px 2px 0px rgba(82, 91, 136, 0.11);

    margin-left: 100px;
}

.dive{
    width: 56px;
    height: 56px;
    border-radius: 19px;
    background: linear-gradient(135deg, #414768 5%, #414768 5%, #414768 24%, #4A5177 81%, #4A5177 100%);
    box-shadow: inset 2px 2px 4px 0px rgba(37, 48, 105, 0.16),inset -2px -2px 4px 0px rgba(82, 91, 136, 0.16);

    margin-left: 10px;
}

</style>