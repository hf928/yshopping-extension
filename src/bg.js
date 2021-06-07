const env = chrome || browser;

let flag = true;

env.tabs.onCreated.addListener((tab) => checkPageHandle(tab.id));
env.tabs.onUpdated.addListener((id) => checkPageHandle(id));

function checkPageHandle (id) {

    if (flag) {

        flag = false;
        setTimeout(() => flag = true, 10);

        
        env.tabs.get(id, (tab) => {

            // env.storage.local.get(['CouponStatus'], (result) => {

            //     const isActive = result.CouponStatus;

            //     if (tab.url && tab.url.indexOf('https://tw.buy.yahoo.com/coupons') !== -1) {

            //         console.log('status', isActive);
            //         // env.tabs.sendMessage(tab.id, { action: 'coupons', status: isActive });
                   
            //     }

            // });


            if (tab.url && tab.url.indexOf('https://tw.buy.yahoo.com/coupons') !== -1) {

                env.tabs.sendMessage(tab.id, { action: 'coupons' });
                
            }
            
        });

    }

};

// 點擊觸發刷 coupons
// env.browserAction.onClicked.addListener((tab) => {

//     env.storage.local.get(['CouponStatus'], (result) => {

//         const isActive = result.CouponStatus;

//         env.storage.local.set({ CouponStatus: !isActive }, () => {

//             env.tabs.sendMessage(tab.id, { action: 'change_status' });
    
//         });

//     });

// });
