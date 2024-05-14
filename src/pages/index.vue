<template>
    <div>
        <NuxtLink to="/open/405">box</NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { appName } from '~/constants'
const router = useRouter()

const indexStore = useIndexStore()
const boxnum = ref([1,2,3,4,5,10])



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
</style>

