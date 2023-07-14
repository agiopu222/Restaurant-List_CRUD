// //後端在做資料驗證時，應該要採用「檢查所有資料若沒有符合格式，才回傳false否則都回傳true」，還是要「要求所有資料都要符合格式，否則一律都回傳false」

// // typeof 判斷型別

// // 必填的預設為false
// // 選填的預設為true, 但若有收到內容, 則必須驗證

function checkData (object) {

    // name 必填/string
    let resultName = false
    // name_en 選填/string
    let resultNameEn = true
    // category 必填/string
    let resultCategory = false
    // image 選填/string/字串包含http/限定input type="URL"
    let resultImage = true
    // location 必填/string
    let resultLocation = false
    // phone 選填/string
    let resultPhone = true
    // google_map 選填/string/字串包含http/限定input type="URL"
    let resultGoogleMap = true
    // rating 必填/number/0~5分/不能負數
    let resultRating = false
    // description 必填/string
    let resultDescription = false
    // 所有result都為true, finalResult才為true
    let finalResult = false

    // name 必填/string
    if (typeof object.name === 'string') {
        resultName = true
    }

    // name_en 選填/string
    // 假如沒有資料，直接回傳true，如果有資料，驗證是否為字串
    if (object.name_en) {
        if (typeof object.name_en === 'string') {
            resultNameEn = true
        } else { resultNameEn = false }
    } else { resultNameEn = true }

    // category 必填/string
    if (typeof object.category === 'string') {
        resultCategory = true
    }

    // image 選填/string/字串包含http/限定input type="URL"
    if (object.image) {
        const image = object.image.toLowerCase()
        if (!image.includes('http')) {
            resultImage = false
        } else { resultImage = true }
    }
    

    // location 必填/string
    if (typeof object.location === 'string') {
        resultLocation = true
    }

    // phone 選填/string
    if (object.phone) {
        if (typeof object.phone === 'string') {
            resultPhone = true
        } else { resultPhone = false }
    } else { resultPhone = true }

    // google_map 選填/string/字串包含http/限定input type="URL"
    if (object.google_map) {
        const google_map = object.google_map.toLowerCase()
        if (!google_map.includes('http')) {
            resultGoogleMap = false
        } else { resultGoogleMap = true }
    } else { resultGoogleMap = true }

    // rating 必填/number/0~5分/不能負數
    if (typeof object.rating === 'number') {
        if ( object >=1 && object <= 5) {
            resultRating = true
        } else {
            resultRating = false
        }
    }

    // description 必填/string
    if (typeof object.description === 'string') {
        resultDescription = true
    }

    console.log(resultName, resultNameEn, resultCategory, resultImage,
        resultLocation, resultPhone, resultGoogleMap, resultRating,
       resultDescription)

    //當所有結果都為true，才回傳true，否則一律回傳false
    if (resultName && resultNameEn && resultCategory && resultImage &&
        resultLocation && resultPhone && resultGoogleMap && resultRating &&
        resultDescription && resultDescription) {
        finalResult = true
    }
    return finalResult
   
}

module.exports = { checkData }