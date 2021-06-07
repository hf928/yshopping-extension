require('@babel/polyfill');

const env = chrome || browser;

// 整點為基準，開始/結束刷新的時間 (分鐘)
const refleshMinuteOffest = 2;
// 頁面捲動間隔時間 (毫秒)
const scrollingDelay = 50;
// 頁面捲動次數
const scrollingTimes = 30;

let YCouponSelector = '';

//接受訊息
env.runtime.onMessage.addListener((msg) => {

    // 取得儲存的 coupon selector
    env.storage.local.get(['YCouponSelector'], (result) => {
    
        if (result.YCouponSelector) {
    
            YCouponSelector = result.YCouponSelector;

            // if (msg.action === 'change_status') window.location.reload();

            // if (msg.action === 'coupons' && msg.status === true) {
            if (msg.action === 'coupons') {
        
                const curMinute = new Date().getMinutes();
                
                // 在每個整點前後 {refleshMinuteOffest} 分鐘刷新找 coupons
                if (curMinute >= (60 - refleshMinuteOffest) || curMinute <= refleshMinuteOffest) {

                    loadNewCoupons();

                }
                // 或者設個計時器，整點前 {refleshMinuteOffest} 分鐘刷新
                else {

                    // 剩餘時間 = 刷新開始時間 (分鐘) - 現在時間 (分鐘)
                    // 分鐘轉成毫秒
                    const timeLeft = ((60 - refleshMinuteOffest) - curMinute) * 60 * 1000;

                    setTimeout(() => {

                        loadNewCoupons();
                        
                    }, timeLeft);

                }
        
            }
    
        }
        else throw new Error('YCouponSelector is not defined.');
    
    });

});

async function loadNewCoupons () {

    // 由於要向下捲動才能載入更多 coupons，不知道要捲幾次，每次不知道載入要多久，先亂捲一通，之後再想想有啥好做法
    // 捲動 {scrollingTimes} 次，每次間隔 {setTimeout} 毫秒
    // 弄完 reload
    for (let i = 0; i <= scrollingTimes; i++) {
        
        await (new Promise((resolve) => {

            setTimeout(() => {
            
                window.scroll(0, 99999);
                seekNewCoupons();

                if (i === scrollingTimes) window.location.reload();
                else resolve();
            
            }, scrollingDelay);

        }));

    }

};

// 根據 YCouponSelector 來找，找到後觸發點擊來領券
function seekNewCoupons () {

    let newCoupons = document.querySelectorAll(YCouponSelector);

    if (newCoupons.length > 0) {

        [].forEach.call(newCoupons, (ele)=> {
            
            if (ele.innerText === '領取') ele.click();
        
        })

    }

};
