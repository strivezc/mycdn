/**
 * 注入JS会在全局环境下找到TCIC对象
 * TCIC.SDK.instance 为SDK实例
 * TCIC.TMainState 为SDK状态枚举
 * TCIC.TMainEvent 为事件名枚举
 * TCIC.TMainEvent.Show_Msg_Box 表示出现弹窗组件时抛出的事件，
 * 监听此事件可以捕获弹窗配置,可以通过修改配置的方式改变弹窗内容，
 * 但无法修改已绑定业务事件的按钮，如果有需要可以清空原按钮，注入自己的，如下所示：
 */
TCIC.SDK.instance.on(TCIC.TMainEvent.Show_Msg_Box, (data) => {
  let classInfos = TCIC.SDK.instance.getClassInfo();
  let endTime = new Date(classInfos.endTime * 1000);
  let now = new Date();
  /**
   * 课堂还没结束
   * 所有下课相关内容都需要隐藏
   * 更改弹窗文案
   */
  if (now.getTime() < endTime.getTime()) {
    /**
     * 延迟取dom，因为在弹窗出现之前，dom是不存在的
     */
    setTimeout(() => {
      let dialog = document.getElementById(
        `msg-box-component-${data.msgBoxId}`
      );
      let footer = dialog.querySelector(".dialog-footer");
      let btnArr = footer.getElementsByTagName("BUTTON");
      for (let i = 0; i < btnArr.length; i++) {
        if(btnArr[i].innerText.indexOf('下课')>-1 || btnArr[i].innerText.indexOf('End Class')>-1 ) {
          btnArr[i].style.display='none'
        }
      }
    }, 20);
  }
});

/**
* 隐藏设备检测
*/
function noLoadDeviceDetect(){
  TCIC.SDK.instance.setState('TStateDeviceDetect',false)
}
TCIC.SDK.instance.subscribeState(TCIC.TMainState.Class_Info_Ready,noLoadDeviceDetect)


