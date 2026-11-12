莊柏軒個人網站 匯出檔案（RWD 響應式）

index.html          首頁：電腦、平板、手機會自動切換版面
                    作品集在電腦與平板上是分頁（系統開發／網站與介面／影音製作／技術文件）
work-*.html         13 個作品的內頁，每頁都有上一個／下一個作品的連結

  系統開發   work-asky.html、work-people-flow.html、work-carbon.html、work-esports.html
  網站與介面 work-ibp.html、work-comd.html、work-mis2024.html、work-transit.html
  影音製作   work-jj.html、work-camp.html、work-mooc.html、work-drone.html
  技術文件   work-wellgen.html

css/          每一頁各自的樣式檔（含響應式斷點）
js/site.js    手機選單、導覽列霧化、作品集分頁、捲動淡入淡出（所有頁面共用）
.nojekyll     讓 GitHub Pages 直接發布 HTML（請一起上傳，不要刪除）
images/       網站使用的圖片

響應式斷點：
  900px 以下  多欄版面改成單欄或兩欄、時間軸改為單側
  760px 以下  導覽列收成「選單」按鈕；作品集取消分頁，四個分類直接依序展開
  560px 以下  手機版：標題與介紹置中、卡片改為單欄

更換圖片：把新圖片放進 images/，並在 HTML 中把對應的檔名改掉即可。
實習單位的 Logo 目前是 images/logo-placeholder.svg 範例圖；
無人機競賽影片的封面目前是 images/video-placeholder.svg 範例圖。
字型從 Google Fonts 載入，需要連上網路才會顯示正確字型。
