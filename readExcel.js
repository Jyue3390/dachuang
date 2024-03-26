//readExcelFileFromUrl.js
import * as XLSX from 'xlsx'
import axios from "axios";
axios.defaults.baseURL = '/api'
 
//url 为文件名比如 ttt.xslx
export function readExcelFile(url){
    axios.get(url,{responseType:'arraybuffer'})
        .then((res)=>{
            let data = new Uint8Array(res.data)
            let wb = XLSX.read(data, {type:"array"})
            let sheets = wb.Sheets // 获取文档数据
            transformSheets(sheets)
        }).catch( err =>{
        console.log(err)
    })
}
export function transformSheets(sheets){
    let content1 = []
    let tmplist = []
    for (let key in sheets){
        //读出来的workbook数据很难读,转换为json格式,参考https://github.com/SheetJS/js-xlsx#utility-functions
        tmplist.push(XLSX.utils.sheet_to_json(sheets[key]).length)
        content1.push(XLSX.utils.sheet_to_json(sheets[key]))
    }
    console.log(tmplist)
    console.log(content1)
}