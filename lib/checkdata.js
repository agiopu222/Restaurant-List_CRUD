//後端在做資料驗證時，應該要採用「檢查所有資料若沒有符合格式，才回傳false否則都回傳ture」，還是要「要求所有資料都要符合格式，否則一律都回傳false」

//檢查傳進來的資料格式是否符合預期，若符合回傳true，不符合回傳false

//typeof 判斷型別
// name 必填/string
// name_en 選填/string
// category 必填/string
// image 選填/string/字串包含http/限定input type="URL"
// location 必填/string
// phone 選填/string
// google_map 選填/string/字串包含http/限定input type="URL"
// rating 必填/number/0~5分/不能負數
// description 必填/string


function checkData (object){
    //typeof 如果對到一個未被定義的東西會回傳undefined，所以沒有選項必填的時候必須先判斷該item是否存在，若存在才進行驗證
    
    //對於非必填項目的規則，若沒有收到該item，預設會通過驗證，但是若有收到該item就必須驗證，不管有沒有通過驗證都會生成該項的result
}