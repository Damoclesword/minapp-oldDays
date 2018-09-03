// components/classic/music/index.js
import {
  classicBeh
} from "../classic-beh";

//获取背景音乐管理播放器
const mgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    url: {
      type: String,
      observer: function () {
        if (mgr.src != this.properties.url) {
          this.setData({
            isPlay: false
          });
        }
      }
    },
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay: false,
    playSrc: "./images/player@play.png",
    pauseSrc: "./images/player@pause.png"
  },

  /**
   * ready中监听音乐的状态
   */
  ready: function () {
    mgr.onPause(()=>{
      console.log("music is pause");
      this.setData({
        isPlay: false
      })
    });
    mgr.onStop(() => {
      console.log("music is stop");
      this.setData({
        isPlay: false
      })
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (e) {
      let isPlay = this.properties.isPlay;
      if (!isPlay) {
        mgr.src = this.properties.url;
        mgr.title = this.properties.title;
        mgr.play();
      } else {
        mgr.pause();
      }
      this.setData({
        isPlay: !this.properties.isPlay
      });
    }
  }
});