const env = chrome || browser;

const couponInputElement = document.querySelector('[name="coupon"]');

// 若有 selector 紀錄則帶入
env.storage.local.get(['YCouponSelector'], (result) => {
    
    if (result.YCouponSelector) {

        couponInputElement.value = result.YCouponSelector;

    }

});

// 點擊時提交，將結果紀錄到 env.storage.local 的 YCouponSelector
document.getElementById('save').addEventListener('click', () => {

    const couponSelectorValue = couponInputElement.value;

    env.storage.local.set({ YCouponSelector: couponSelectorValue }, () => {

        // UI 提示一下已儲存
        document.getElementById('status').innerText = 'Success!!!';
        
    });

});