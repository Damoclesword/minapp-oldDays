import { HTTP } from "../util/http-p"

class BookModel extends HTTP {
  /**
   * 获取热门书籍
   */
  getHotList() {
    return this.request({
      url: "/book/hot_list",
    })
  }
  /**
   * 书籍搜索
   * @param {开始记录数 默认为0} start
   * @param {0为完整内容，1为简介，默认0} summary
   * @param {搜索内容} q
   */
  search(start, summary, q) {
    return this.request({
      url: "/book/search",
      data: {
        start,
        summary,
        q,
      },
    })
  }

  /**
   * 获取图书详情
   * @param {图书id} bid
   */
  getDetail(bid) {
    return this.request({
      url: `/book/${bid}/detail`,
    })
  }

  /**
   * 获取图书短评信息
   * @param {图书id} bid
   */
  getComments(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`,
    })
  }

  /**
   * 获取点赞情况
   * @param {图书id} bid
   */
  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`,
    })
  }

  /**
   * 获取收藏书数目
   */
  getFavorBookCount() {
    return this.request({
      url: `/book/favor/count`,
    })
  }

  /**
   * 提交评论
   * @param {图书id} bid
   * @param {评论文字} content
   */
  postComments(bid, content) {
    return this.request({
      url: `/book/add/short_comment`,
      data: {
        book_id: bid,
        content,
      },
      method: "POST",
    })
  }
}

export { BookModel }
