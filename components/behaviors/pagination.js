const paginationBeh = Behavior({
    data: {
        resultData: [],
        total: 0,
        noneResult: false,
        loading: false //锁，用于防止无限加载多次请求 节流
    },

    methods: {
        setMoreData: function (moreDataArray) {
            const temp = this.data.resultData.concat(moreDataArray);
            this.setData({
                resultData: temp
            })
        },

        getCurrentStart() {
            return this.data.resultData.length;
        },

        hasMoreData() {
            if (this.data.resultData.length < this.data.total)
                return true;
            else
                return false;
        },

        setTotal(total) {
            if (total === 0) {
                this.setData({
                    noneResult: true
                })
            } else {
                this.setData({
                    noneResult: false
                })
            }
            this.data.total = total;
        },

        //判断是否上锁
        isLocked: function () {
            return this.data.loading;
        },
        
        //上锁
        setLock: function () {
            this.setData({
                loading: true
            })
        },

        //解锁
        setUnlock: function () {
            this.setData({
                loading: false
            })
        }
    }
});

export {
    paginationBeh
}