<template>
  <div id="map">
    <header-back-bar title="定位" />
    <input
      class="search"
      type="text"
      placeholder="搜索"
      v-model.trim="searchValue"
      @input="getSearchAddress"
    />
    <ul class="tips">
      <li
        class="item"
        v-for="item in tips"
        :key="item.id"
        @click="toHome(item)"
      >
        {{ item.name }},{{ item.address }}
      </li>
    </ul>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      city: "",
      //当前搜索的提示词
      tips: [],
      currentAddress: this.$store.getters.currentAddress,
    };
  },
  mounted() {
    this.getCityMap();
    this.getCity();
  },
  methods: {
    //1.获取当前城市的地图
    getCityMap() {
      if (this.currentAddress.name) {
        var map = new AMap.Map("container", {
          zoom: 15, //级别
          center: [
            this.currentAddress.location.lng,
            this.currentAddress.location.lat,
          ], //中心点坐标
        });
        var marker = new AMap.Marker({
          position: [
            this.currentAddress.location.lng,
            this.currentAddress.location.lat,
          ], //位置
        });
        map.add(marker); //添加到地图
      } else {
        var map = new AMap.Map("container", {
          zoom: 10,
        });
      }
    },
    //2.根据搜索内容展示当前城市的地点
    getSearchAddress() {
      var _this = this;
      AMap.plugin("AMap.AutoComplete", function () {
        var autoOptions = {
          //city 限定城市，默认全国
          city: _this.city,
        };
        // 实例化AutoComplete
        var autoComplete = new AMap.AutoComplete(autoOptions);
        // 根据关键字进行搜索
        autoComplete.search(_this.searchValue, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          _this.tips = result.tips;
        });
      });
    },
    //3.获取当前城市信息
    getCity() {
      var _this = this;
      //获取当前城市信息
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            //console.log(result);
            _this.city = result.city;
          }
        });
      });
    },
    //4.点击当前地址,跳转到home页面,并携带地址
    toHome(address) {
      //保存当前地址信息
      this.$store.commit("map/setCurrentAddress", address);
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss" scoped>
#map {
  // background-color: #fff;
  height: 100%;
  .search {
    display: block;
    width: 80%;
    height: 40px;
    margin: 0 auto;
    margin-top: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    text-indent: 1em;
  }
  .tips {
    position: relative;
    z-index: 999;
    width: 80%;
    margin: 0 auto;
    padding: 0 8px;
    background-color: #fff;
    .item {
      margin: 8px 0;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  #container {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 400px;
  }
}
</style>
