import {
    HTTP
} from "../util/http-p";

class BookModel extends HTTP {
    /**
     * 获取热门书籍
     */
    getHotList() {
        return this.request({
            url: "/book/hot_list",
        });
    }

    /**
     * 获取图书详情
     * @param {图书id} bid 
     */
    getDetail(bid) {
        return this.request({
            url: `/book/${bid}/detail`,
        });
    }

    /**
     * 获取图书短评信息
     * @param {图书id} bid 
     */
    getComments(bid) {
        return this.request({
            url: `/book/${bid}/short_comment`
        });
    }

    /**
     * 获取点赞情况
     * @param {图书id} bid 
     */
    getLikeStatus(bid) {
        return this.request({
            url: `/book/${bid}/favor`
        });
    }
}

export {
    BookModel
};