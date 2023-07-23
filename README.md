# Restaurant List

我最愛的餐廳清單
這是一份由個人最喜愛的餐廳組成的清單
可進行搜尋、瀏覽詳細資訊、查詢Google地圖等功能

## 專案畫面
![MyImage](/restaurantList_CRUD_2.0.png)

## 目錄

- [功能](#專案功能)
- [安裝](#專案安裝流程)
- [開發工具](#開發工具)

## 專案功能
**使用者可以在首頁看到所有餐廳與它們的簡單資料：**
  * 餐廳照片
  * 餐廳名稱
  * 餐廳分類
  * 餐廳評分
    
**使用者可以再點進去看餐廳的詳細資訊：**
  * 類別
  * 電話
  * 描述
  * 圖片
  * 地址
  * Google Map
    
**使用者可以透過搜尋餐廳名稱/類別來找到特定的餐廳**

**使用者可以新增一家餐廳**

**使用者可以修改一家餐廳的資訊**

**使用者可以刪除一家餐廳**

## 專案安裝流程
1.確保您的電腦安裝node.js後，開啟終端機輸入以下指令下載專案
```
git clone https://github.com/agiopu222/Restaurant-List_CRUD.git
```
2.進入專案資料夾，修改.env.example檔名，改為.env，並在其[]中的內容請依取得的金鑰做替換
```
MONGODB_URI=mongodb+srv://[your_username]:[your_password]@cluster0.xivrwx2.mongodb.net/[database_name]?retryWrites=true&w=majority
```
3.終端機輸入以下指令安裝npm套件
```
npm install
```
4.安裝nodemon
```
npm install nodemon
```
5.終端機輸入以下指令建立種子資料
```
node models/seeds/restaurantdataSeeder.js
```
6.終端機輸入以下指令開啟伺服器
```
node app.js
```
7.開啟任意瀏覽器輸入網址就可以進入畫面
```
http://localhost:3000
```
8.如需停止，終端機輸入以下指令
```
^C //ctrl=C
```

## 開發工具
+ Node.js @16.19.1
+ Express @4.18.2
+ Express-Handlebars @5.3.5
+ Bootstrap @5.1.3
+ Body-parser @1.20.2
+ Mongoose @5.13.19
+ Dotenv @16.3.1
+ Method-override @3.0.0
+ Handlebars-helpers @0.10.0
