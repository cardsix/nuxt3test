<template>
  <!-- :style="`--core-entity-color: ${props.caseinfo.color}`" -->
  <div class="caseitem" :class="`ornaments-rarity${props.caseinfo.rarity}`">
    <div class="casecontanier">
      <img :src="props.caseinfo.img" class="itemimg" alt="" srcset="">
      <div style="" class="price">
        <span class="currency">$</span>{{ props.caseinfo.price }}
        <div style="text-align: left;">
          {{ abrasionConvert(props.caseinfo.abrasion) }}
          <span style="color: #ea6a2a;font-weight: 600;text-transform: uppercase;" class="core-item-csgo-stattrak"
            v-if="props.caseinfo.stat_trak == 1"> ST </span>
        </div>

      </div>
      <span class="beishu" :style="`background: ${props.caseinfo.color}`">
        x{{ (Number(props.caseinfo.price) / Number(props.baseprice)).toFixed(2) }}
      </span>

      <div class="bottominfo">
        <div class="binfosubtitle">{{ splitTextPup(props.caseinfo.name)[0] }}</div>
        <div class="binfotitle">{{ splitTextPup(props.caseinfo.name)[1] }}</div>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
const props: object = defineProps({
  caseinfo: Object,
  baseprice: String || Number
})

function splitTextPup(text:string) {


  if (text.indexOf("|") === -1) {
    // //console.log("text", text)

    return [text]; // 返回一个包含原始文本的数组
  }
  const input = text;
  // 拆分输入字符串
  const parts = input.split(" | ");
  // 假设 parts[1] 可能为 undefined
  if (parts[1] === undefined) {
    return []; // 返回一个空数组或者其他合适的结果
  }
  // 提取括号内容
  const regex = /\((.*?)\)/;
  const matches = parts[1].match(regex);
  // 构建最终的拆分结果
  let splitResult = [
    parts[0].trim(),
    parts[1].replace(matches ? matches[0] : "", "").trim(),
    matches ? matches[1].trim() : ""
  ];
  return splitResult;
}

function abrasionConvert(abrasion: number | string) {
  if (abrasion) {
    if (abrasion === 1) {
      return "FN"
    }
    if (abrasion === 2) {
      return "MW"
    }
    if (abrasion === 3) {
      return "FT"
    }
    if (abrasion === 4) {
      return "WW"
    }
    if (abrasion === 5) {
      return "BS"
    }
    if (abrasion === 6) {
      return ""
    }
  } else {
    return ""
  }
}
</script>
<style lang="scss" scoped>
.binfosubtitle{
  text-align: left;
  color: #8f9daa; font-size: 12px; font-weight: 400; z-index: 3;
}
.binfotitle{
  text-align: left;
  color: #f1f1f1; font-size: 12px; font-weight: 600; z-index: 3;
}
.beishu {
  padding: 6px 10px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  font-weight: 600;
}

.bottominfo {
  padding: 6px 10px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.price {
  position: absolute;
  font-size: 12px;
  font-weight: 600;
  top: 0;
  left: 0;
  padding: 6px 10px;
}

.currency {
  color: $currency-color;
}

.caseitem {
  width: 208px;
  height: 167px;
  position: relative;
  border-radius: .5rem;
  border: 1px solid rgb(66 66 84);
  // overflow: hidden;

  // &::before{
  //   width: 100%;
  //   height: 100%;
  //   background: var(--core-entity-color);
  //   mask-image: url('@/@/assets/images/case/case/bg-item.svg');
  //   -webkit-mask-image:url('@/@/assets/images/case/case/bg-item.svg');
  //   --entity-background-type-koeff: 1.6;
  //   mask-position: center;
  //   mask-size: cover;
  //   content: '';
  //   display: block;
  //   position: absolute;
  // }
}

.casecontanier {
  width: 100%;
  height: 100%;
  position: relative;

  .itemimg {
    width: 132px;
    height: 114px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

</style>