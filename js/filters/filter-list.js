
import { fetchData } from "../services/fetchApi.js";

export async function filterData(url){
    let data =  await fetchData(url);
    let filteredArr = []
     data.map(x => filteredArr.push(x.type));
     filteredArr = [...new Set(filteredArr)];
     return filteredArr;
 }