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
        this._recoverMusicStatus();
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
    this._monitorSwitch();
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
    },

    /**
     * 用于判断当前播放的音乐与背景音乐是否一致
     */
    _recoverMusicStatus: function () {
      if (mgr.src != this.properties.url) {
        this.setData({
          isPlay: false
        });
      } else {
        this.setData({
          isPlay: !mgr.paused
        });
      }
    },

    /**
     * 监听音乐被主动切换后的事件
     */
    _monitorSwitch: function () {
      mgr.onPause(() => {
        this._recoverMusicStatus();
      });
      mgr.onStop(() => {
        this._recoverMusicStatus();
      });
      mgr.onPlay(() => {
        this._recoverMusicStatus();
      });
      mgr.onEnded(() => {
        this._recoverMusicStatus();
      });
    }
  },
});