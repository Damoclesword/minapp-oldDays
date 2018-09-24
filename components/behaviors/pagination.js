const paginationBeh = Behavior({
    data: {
        resultData: [],
        total: 0,
        noneResult: false
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
            if(total === 0){
                this.setData({
                    noneResult: true
                })
            }
            else {
                this.setData({
                    noneResult: false
                })
            }
            this.data.total = total;
        }
    }
});

export {
    paginationBeh
}