<!-- <template>
    <div>
        1312
    </div>
</template>

<script setup lang="ts">
import { appName } from '~/constants'
import type { Article, ListsData } from '~/types'

const router = useRouter()

const indexStore = useIndexStore()



useHead({
    title: `Open Case - ${appName}`,
})

definePageMeta({
    key: 'article-index',
    layout: 'default',
    keepalive: true,
})
</script> -->

<template>
    <div class="topnt">
        <div class="heade px-20px py-4">
            <div class="backwarp w33 text-left pl-1 flex items-center"> <img src="assets/images/return.png" alt=""
                    srcset="" class="w-[18px] h-[18px]">back</div>
            <div class="casename wauto text-center fw-600">{{ boxdata.name }}</div>
            <div class="share w33 text-right pr1 flex items-center justify-end">
                <div
                    class="shareimgwrap w-[40px] h-[40px] bg-[#161821] border-[3px] flex items-center border-blue border-rd-[3px] mr1">
                    <img class="w-[15px] h-[15px] mx-auto"
                        src="https://cdn.fskins.com/images/2024/03/07/671050b2-2831-42e3-98f7-f73713d8ef6c.png" alt=""
                        srcset="">
                </div>
                <div
                    class="shareimgwrap w-[40px] h-[40px] bg-[#161821] border-[3px] flex items-center border-blue border-rd-[3px]">
                    <img class="w-[15px] h-[15px] mx-auto"
                        src="https://cdn.fskins.com/images/2024/03/07/4c687dfa-2885-4adf-8cac-1d1f0e32feff.png" alt=""
                        srcset="">
                </div>
            </div>
        </div>

        <div class="casewrap wfull flex flex-col items-center">
            <div class="case mt30 relative">
                <img class="caseimg" :src="boxdata?.img" alt="" srcset="">
                <img class="ornamentimg absolute" :src="boxdata?.gun_img" alt="" srcset="">
            </div>
            <div class="caseline"></div>
            <div class="casebtn flex justify-between items-center min-w-124 text-center">
                <div class="numbox flex justify-between min-w-80">
                    <div class="numbtns cursor-pointer" v-for="(item, index) in boxnum">
                        <div class="numbtn deactive">{{ item }}</div>
                    </div>
                </div>

                <div class="buycasebtn default-btn ml-4">BUY <span class="cursymbol-green">$</span> {{ boxdata?.price }}
                </div>
            </div>
        </div>

    </div>
    <div class="topcase text-center wfull flex flex-col items-center mb-5">
        <div class="topcaseyiyle flex items-center text-center justify-center mb-4">
            <img src="https://cdn.elepawl.com/images/2023/09/18/115b6339-711c-4fbe-adb2-0c004acbeae8.png" style="width: 24px;height: 24px">
            Last top skins
        </div>
        <div class="topcaselist flex flex-row justify-center items-center gap-4">
            <TopcaseItem :caseinfo="item" :baseprice="boxdata.price" v-for="(item,index) in topbox"></TopcaseItem>
        </div>
    </div>

    <div class="topcase text-center wfull flex flex-col items-center">
        <div class="topcaseyiyle flex items-center text-center justify-center mb-4">
            <img src="https://cdn.elepawl.com/images/2023/09/18/b65cfb79-b5b2-41f5-b183-3cf23950ef85.png" style="width: 24px;height: 24px">
            Case contains
        </div>
       
    </div>
    <div class="caselist flex flex-row justify-start items-center gap-4">
            <Caseornament :ornametsinfo="item" v-for="(item,index) in boxdata.group_ornaments"></Caseornament>
        </div>

</template>

<script setup lang="ts">
import TopcaseItem from '~/components/TopcaseItem.vue';
import Caseornament from '~/components/Caseornament.vue'
import { appName } from '~/constants'
import { getBoxDetail } from '@/composables/apis/box'
import type { BoxDetail } from "~/types/api/box";

const router = useRouter()

const indexStore = useIndexStore()
const boxnum = ref([1, 2, 3, 4, 5, 10])
let boxdata: BoxDetail = reactive({ img: '', gun_img: '', price: '', name: '' })
let topbox = ref([])
let k: object = await getBoxDetail({ id: router.currentRoute.value.params.id, secret: 'tt_secret' })
boxdata = k.data.box
topbox = k.data.top

useHead({
    title: `Open Case - ${appName}`,
})

definePageMeta({
    key: 'article-index',
    layout: 'default',
    keepalive: true,
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/openpage.scss';
</style>