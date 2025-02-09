<template>
    <view>
      <!-- 中间 GO 按钮 -->
      <navigator url="/pages/machine/machine" class="heart-button">
        <image src="/static/index/img/go.png" alt="GO" class="go-icon" />
      </navigator>
  
      <!-- 底部导航栏 -->
      <view class="fixed-footer">
        <!-- 左侧按钮 -->
        <view class="left-buttons">
          <navigator url="/pages/team/team" class="flex flex-col items-center">
            <image src="/static/index/img/team.png" class="nav-icon" mode="widthFix" />
            <text class="text-sm">团队</text>
          </navigator>
        </view>
  
        <!-- 右侧按钮 -->
        <view class="right-buttons">
          <navigator url="/pages/account/account" class="flex flex-col items-center">
            <image src="/static/index/img/my1.png" class="nav-icon" mode="widthFix" />
            <text class="text-sm">我的</text>
          </navigator>
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  @import "/static/css/footer.css";
  </style>
  