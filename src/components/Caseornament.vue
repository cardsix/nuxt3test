<template>
  <!-- :style="`--core-entity-color: ${props.caseinfo.color}`" -->
  <div class="caseitem" :class="`ornaments-rarity${props.ornametsinfo.rarity}`">
    <div class="casecontanier">
      <img :src="props.ornametsinfo.img" class="itemimg" alt="" srcset="">

      <div style="" class="price" v-if="!qualityShow" >
        <div class="droprate" >
          <span style="color: #8f9daa;">Drops</span> <span>{{ props.ornametsinfo.probability }}%</span>
        </div>
        <div class="infobtn" @click.stop="showinfo" :style="{'opacity':props.ornametsinfo.cid != 11 ? 1:0}">
          <svg data-v-1dda4190="" width="5" height="9" viewBox="0 0 3 9" xmlns="http://www.w3.org/2000/svg"
                 class="item-wrap__button--img">
              <path data-v-1dda4190=""
                    d="M0.614664 1.84391L2.3855 1.84391L2.3855 0.0730791L0.614664 0.0730793L0.614664 1.84391Z"></path>
              <path data-v-1dda4190=""
                    d="M0.614665 8.92725L2.3855 8.92725L2.3855 3.61475L0.614664 3.61475L0.614665 8.92725Z"></path>
            </svg>
        </div>

        
      </div>
      <div class="shortinfowrap" v-if="qualityShow">
        <div class="infobtn closeinfobtn" @click.stop="showinfo" :style="{'opacity':props.ornametsinfo.cid != 11 ? 1:0}">
          <svg data-v-5a4cf782="" width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg" class="item-wrap__button--img">
              <path data-v-5a4cf782=""  d="M0.94458 0.944336L8.05569 8.05545M0.94458 8.05545L8.05569 0.944336" stroke="white" stroke-width="1.5"></path>
            </svg>
        </div>

        <div class="odds-table-wrap">
            <table class="odds-table">
              <thead>
              <tr>
                <th class="quality" style="text-align: left" v-if="props.ornametsinfo.ornaments[0].abrasion_tag">
                  Wear
                </th>
                <th class="pricec" style="text-align: left">
                  Price
                </th>
                <th class="odds-number" style="text-align: left">
                  Drops
                </th>
              </tr>
              </thead>
              <tbody>
              <tr :class="item1.stat_trak === 1?'stattrak':''" v-for="(item1,index1) in props.ornametsinfo.ornaments">
                <td class="quality" v-if="item1.abrasion_tag" style="text-align: left">
                  {{item1.abrasion_tag}}
                </td>
                <td class="pricee" style="text-align: left"><span class="base-price price-inner base-price_primary">
                  <span
                      class="base-price__currency">$&nbsp;</span><span
                      class="base-price__value" >{{item1.steam_price}}</span></span>
                </td>
                <td class="odds-number" style="text-align: left">{{item1.probability}}%</td>
              </tr>
              </tbody>
            </table>
          </div>
      </div>
     

      <div class="bottominfo">
        <div class="binfosubtitle">{{ splitTextPup(props.ornametsinfo.group_name)[0] }}</div>
        <div class="binfotitle">{{ splitTextPup(props.ornametsinfo.group_name)[1] }}</div>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
const props: object = defineProps({
  ornametsinfo: Object,
})
let qualityShow = ref(false)
console.log(props.ornametsinfo)

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

function showinfo(){
  qualityShow.value = !qualityShow.value
}

</script>
<style lang="scss" scoped>
.odds-table-wrap {
  box-sizing: border-box;
  color: #8f9daa;
  font-size: .625rem;
  font-weight: 600;
  height: 100%;
  line-height: .7375rem;
  overflow-y: auto;
  padding: 0 0.3125rem 0.3125rem;
  width: 100%;
  scrollbar-face-color: #913f3f;

  table{
    width: 90%;
    margin: 0 auto;
    border-collapse: collapse;
    border-spacing: 0;
    thead th.quality {
    //padding-right: 1.25rem;
      width: 1.9375rem;
    }
    thead th {
      color: #8f9daa;
      font-size: .625rem;
      line-height: .75rem;
      margin-bottom: 1.75rem;
    }
    td:not([align]), table th:not([align]) {
      text-align: inherit;
    }
    thead th.pricec {
      width: 2.1875rem;
    }
    thead th.odds-number {
      width: 1.75rem;
      text-align: left;
    }
    tr.stattrak .odds-number,tr.stattrak .quality {
      color: #ea6a2a;
    }
    tr td {
      color: #fff;
      padding-bottom: 0.125rem;
      white-space: nowrap;
    }
  }
}

.shortinfowrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  color: #8f9daa;
  overflow-y: auto;
  background: rgba(27,28,37,.9);
  z-index: 20;
}
.closeinfobtn{
  margin-left: auto;
}
.infobtn{
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
  z-index: 6;
  background-color: #373845;
  .item-wrap__button--img {
    fill: #8f9daa;
  }
}
.binfosubtitle{
  text-align: left;
  color: #8f9daa; font-size: 12px; font-weight: 400; z-index: 3;
}
.binfotitle{
  text-align: left;
  width: 80px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #f1f1f1; font-size: 12px; font-weight: 600; z-index: 3;
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
  width: 100%;
  top: 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  left: 0;
  padding: 6px 10px;
}



.caseitem {
  width: 208px;
  height: 167px;
  position: relative;
  border-radius: .5rem;
  border: 1px solid rgb(66 66 84);
  cursor: pointer;
  transition: .3s linear;
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
.caseitem:hover{
  transform: scale(1.05);

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