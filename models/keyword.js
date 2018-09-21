import {
    HTTP
} from "../util/http-p";
class KeywordModel extends HTTP {
    key = 's_history';
    max_history = 10;

    /**
     * 获取历史搜索
     */
    getHistory() {
        return wx.getStorageSync(this.key);
    }

    /**
     * 获取热门搜索
     */
    getHot() {
        return this.request({
            url: "/book/hot_keyword",
            method: "GET"
        })
    }

    /**
     * 插入搜索历史
     * @param {搜索关键字} keyword 
     */
    addToHistory(keyword) {
        let words = this.getHistory();
        if (!words) {
            words = [];
        }
        console.log("word: " + keyword)
        if (!words.includes(keyword)) {
            if (words.length >= this.max_history) {
                words.pop();
            }
            words.unshift(keyword);
        } else {
            let index = words.findIndex(function (val) {
                return val === keyword;
            });
            words.splice(index, 1);
            words.unshift(keyword);
        }
        wx.setStorageSync(this.key, words);
    }
}

export {
    KeywordModel
};