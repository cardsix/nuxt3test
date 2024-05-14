import type { BoxdetailParams } from "~/types/api/box";

export const getBoxDetail = async (params:Object) =>{
  let { data,pending } = await useHttp().post<BoxdetailParams>('/api/box/get_box_details',params)
  data = JSON.parse(data.value as unknown as string)
  return data
}

