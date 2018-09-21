const paginationBeh = Behavior({
    data: {
        resultData: [],
        total: 0
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
            this.data.total = total;
        }
    }
});

export {
    paginationBeh
}