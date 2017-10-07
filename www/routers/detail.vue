<style scoped lang="less">
  @import "../resources/css/website/detail.less";
  @import "../resources/plugin/swiper/css/swiper.css"; /*swiper 轮播white-space  ellipsis*/

  .detail-icon{width:0.4rem !important;height:0.4rem !important}
  .bt{border-top:2px solid #e5e5e6}
  .houseInfo div.intro{text-align:center}
  .houseInfo div.collapse{margin:0 auto;width:85%;text-align:center;padding:.3rem 0}
  .houseInfo div.intro span{display:inline-block;padding:.3rem 0 .1rem 0}
  .houseInfo div.collapse i{display: inline-block;width: .3rem;height: .18rem;margin-left: .06rem;background: #fff url(../resources/images/icons/detail-icon.png) -0.18rem -0.78rem no-repeat;background-size: .64rem auto;cursor:pointer}
  .houseInfo div.collapse.active-filter i{background-position: -0.18rem -1.04rem !important}
  .houseInfo p{text-indent:.55rem;padding:.2rem .4rem .4rem .4rem}
  .bg-white{padding-bottom: .2rem;}
  .item span.row{width:100% !important;color:black !important;}
  .item span:not(.row){width:47% !important}
  .section{padding-top:0 !important}
  .detail-icon{background-size:16px 16px !important;}
  .dz_msg{width:65%}
  .dz_msg span:first-child{float:left;margin-right:.2rem}
  .dz_msg span:nth-child(2) > i:first-child{color:red;margin-right:.04rem !important}
  .large{
    border:0px solid red;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: black;
    display: block;
    float: none;
    position: absolute;
    z-index:9999;
    top:0;
    img{
      width: 100%;
      height:270px !important;
      margin-top: 2.5rem;

    }

  }
  .clear{
    border: 1px solid #778899;
    border-radius: 50%;
    -moz-border-radius:50%;
    -webkit-border-radius:50%;
    width:.6rem;
    height: .6rem;
    /* margin-left: 6.8rem;
     margin-top: .3rem;*/
    float: right;
    color: #778899;
    font-size: .4rem;
    margin-right: .3rem;
    margin-top: .3rem;
  }
</style>
<template>
  <div>
    <!--context-->
    <section id="section" class="pr section">
      <div class="detail-container">
        <!--banner-->
        <div id="slideBox" class="slideBox">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="image in building_images">
                <a href="javascript:;" @click="enlarge">
                  <img :src="$prefix + '/' + image" alt="">
                </a>
              </div>
            </div>
            <div class="banner-page">
              <span class="pageState"><span id="picIndex">1</span>/{{building_images.length}}</span>
            </div>
          </div>
        </div>
      </div>


      <!--office info-->
      <div class="office-info border-tb">
        <div class="banner-text">
          <p v-if="address" :title="address">
            <span class="detail-icon" style="color:#5b5b5b;"></span>{{address}}</p>
        </div>
        <div class="house_msg_tit clearfix">
          <div><i></i>市场均价 <span v-text="price" style="color:#e01222"></span><span v-if="price != null">元/㎡/天</span></div>
          <div><i></i><span v-text="total_items" style="color:#e01222"></span><span v-if="total_items != null">套房源可租</span></div>
          <span class="hou_line"></span>
        </div>
        <div class="house_msg_content item clearfix">
          <span style="color:black;">建成年代：<i v-text="kprq" style="color:#5b5b5b;"></i></span>
          <span style="color:black;">可否注册：<i v-text="zc" style="color:#5b5b5b;"></i></span>
          <span class="row">产权性质：<i v-for="xz in chqxz" style="color:#5b5b5b;">{{xz}}</i></span>
          <span class="row">物业公司：<i v-for="gs in wygs.split('、')" style="color:#5b5b5b;">{{gs}}</i></span>
          <span style="color:black;">物&nbsp;&nbsp;业&nbsp;&nbsp;费：<i v-text="wyf" style="color:#5b5b5b;"></i></span>
          <span style="color:black;">供暖费：<i v-text="gnf" style="color:#5b5b5b;"></i></span>
          <span style="color:black;">车位数量：<i v-text="tcwsl==='0' ? '暂无数据': tcwsl" style="color:#5b5b5b;"></i></span>
          <span style="color:black;">停车费：<i v-text="tcf" style="color:#5b5b5b;"></i></span>
          <span class="row">网络公司：<i v-text="wlgs" style="color:#5b5b5b;"></i></span>
        </div>
      </div>

      <!--house info-->
      <div class="mb08 houseInfo">
        <div id="houseScroll">
          <div class="size_wrap">
            <div class="size_box clearfix">
              <div v-for="(item,index) in area_arr" v-if="index == 0"
                   :id="item.code"
                   :class="{active:areaActive == index}"
                   @click="sel_area_list($event)"
                   v-text="item.name">
              </div>

              <template v-else>
                <div v-if="index == area_arr.length-1"
                     :class="{active:areaActive == index}"
                     class="last"
                     @click="sel_area_list($event)"
                >{{item.chqxz}}
                </div>
                <div v-else :class="{active:areaActive == index}"
                     @click="sel_area_list($event)">{{item.chqxz}}
                </div>
              </template>
              <a></a>
            </div>
          </div>
          <!--搜索结果-->
          <div class="size_content">
            <div class="size_con_sub" v-for="item1 in buildList">
              <router-link :to="{path:'order',query:{house_id:item1.id}}" class="dz-list clearfix">
                <div class="dz_img_wrap">
                  <img v-if="item1.housing_icon" :src="$prefix + '/' + item1.housing_icon" alt="">
                  <img v-else :src="$prefix + '/upload/2017-08-27/6404b4de960b81fc5403c870aefcea34.png'" alt="">
                </div>
                <div class="dz_msg fl">
                  <!--<span >{{item.fybh}}</span>
                  <span v-else>{{item.zdh}} - {{item.fybh}}</span>-->
                  <span>
                    <i v-if="item1.zdh.indexOf('独栋')> -1">{{item1.fybh}}</i>
                    <i v-else>{{item1.zdh}} - {{item1.fybh}}</i>
                  </span>
                  <span style="border:0px solid red;height:.5rem;"></span>
                  <span>
                       <i v-text="item1.daily_price==='0.0'?'':item1.daily_price"></i><i>元/㎡·天</i>
                      <i v-text="item1.monthly_price==='0.0'?'':item1.monthly_price"></i><i>元/月</i>
                  </span>
                  <span>
                      <i v-text="(item1.housing_area==='0.0'?'':item1.housing_area)+'㎡'"></i>
                      <i v-text="item1.workstation+'个工位'"></i>
                      <i v-text="item1.fjzt"></i>
                  </span>
                </div>
              </router-link>
            </div>
            <div class="no_result" style="display: none" v-show="res_showFlag">暂无房源信息</div>
          </div>
        </div>
        <a id="houseListMore" v-show="more_flag" class="btn-more" @click="loadmore">查看更多</a>
      </div>

      <div class="mb08 houseInfo">
        <div class="intro"><span>楼盘介绍</span></div>
        <p>{{desp}}</p>

        <div class="collapse active-filter bt">
            <span @click="toggle($event)"><i class="filt-arrow"></i></span>
        </div>
      </div>

      <div class="pt20 mb08 border-tb bg-white" id="kuan">
        <h2 class="sort-title tc fb mb20">周边配套</h2>
        <div class="map-box" id="allmap"></div>
        <ul class="text-gray6 clearfix ph15" id="map_item_ul">
          <li class="supporting-item">
            <i class="supporting-icon sup-ct img12" style="position: relative;left: -0.0em;"></i>
            <span class="db">餐厅</span>
          </li>
          <li class="supporting-item">
            <i class="supporting-icon sup-jd img13" style="position: relative;left: -0.0em;"></i>
            <span class="db">酒店</span>
          </li>
          <li class="supporting-item">
            <i class="supporting-icon sup-js img14" style="position: relative;left: -0.0em;"></i>
            <span class="db">健身</span>
          </li>
          <li class="supporting-item">
            <i class="supporting-icon sup-yh img15" style="position: relative;left: -0.0em;"></i>
            <span class="db">银行</span>
          </li>
        </ul>
      </div>
    </section>
    <!--context end-->
    <!--点击出现放大图片-->
    <div v-show="large" class="large">
      <div class="clear" @click="cancel">x</div>
      <div style="clear: both;"></div>
      <div class="detail-container">
        <!--banner-->
        <div id="slideBox" class="slideBox">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="image in building_images" style="transition-duration: 0ms !important;">
                <a href="javascript:;" @click="enlarge">
                  <img :src="$prefix + '/' + image" alt="">
                </a>
              </div>
            </div>
            <!--<div class="banner-page">
              <span class="pageState"><span id="picIndex">1</span>/{{building_images.length}}</span>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import header1 from '../components/header.vue';
  import footer1 from '../components/footer.vue';
  import {Indicator} from 'mint-ui';
  import {InfiniteScroll} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import { Swipe, SwipeItem } from 'mint-ui';

  import '../resources/plugin/swiper/js/swiper.min.js';


  export default {
    components: {
      header1,
      footer1,

    },
    data () {
      return {
        ovfl:null,
        large:false,
        building_id: '',
        address: '',  //楼盘地址
        price: '',  //单价
        desp: "",
        buildList: [], //结果列表
        total_items: '',  //可租房源总数
        total: 100,
        areaActive: 0,
        area_arr: [], //面积条件数组

        res_showFlag: false, //查询无结果showhide
        area: "", //区域
        price_dj: "", // 单价
        price_zj: "", //总价

        curr_page: 1, 
        wygs: '',//物业公司
        wyf: '',//物业费
        kprq: '',//建成年代
        tcf: "",
        wlgs: "",
        gnf: "",
        zc: "",
        fybh: "",
        chqxz: "",
        tcwsl: "",
        building_images: [],
        property: {"1":"写字楼", "2":"公寓","3":"商务楼","4":"住宅","5":"商业","6":"酒店","7":"综合","8":"别墅","9":"商业综合体","10":"酒店式公寓"},
        gaodeGPS: '',
        positionData: "",
        restaurant: "",
        hotel: "",
        health: "",
        bank: "",
        allmap: ""
      }
    },
    methods: {
      cancel(){
          $("body").css({"overflow":"scroll"});
          $("html").css({"overflow":"scroll"});
          /*$("body").removeClass({"overflow":"auto"});
          $("html").removeClass({"overflow":"auto"});*/
          this.large = false;
      },
      enlarge(){
          $("body").css({"overflow":"hidden"});
          $("html").css({"overflow":"hidden"});
          this.large = true;
      },
      //获取筛选条件
      getSortList(){
        var _this = this;
        this.$http.post(
          this.$api + "/yhcms/web/jcsj/getChqxz.do"
        ).then(function (res) {
          var result = JSON.parse(res.bodyText);
          if (result.success) {
            _this.area_arr = result.data;
            var all_area = {
              code: "area_all",
              name: "全部"
            };
            _this.area_arr.unshift(all_area);
            $('.size_box').width(_this.area_arr.length * 2.3 + 'rem');

          } else {
            Toast({
               message: '获取筛选条件失败: ' + result.message,
               position: 'bottom'
            });
          }
        }, function (res) {
            Toast({
               message: '获取筛选条件失败! 请稍候再试',
               position: 'bottom'
            });
        });
      },

      //获取楼盘详情
      getDetail(){
        var _this = this;
        this.$http.post(
          this.$api + "/yhcms/web/lpjbxx/getZdLpxq.do",
          {
            "parameters": {
              "building_id": this.building_id,
              "area": "",
              "price_dj": "[0,1000000]",
              "price_zj": "",
              "orderby": "",
              "curr_page": "1",
              "items_perpage": "10"
            },
            "foreEndType": 2,
            "code": "30000002"
          }
        ).then(function (res) {
          var result = JSON.parse(res.bodyText);
          Indicator.close();
          if (result.success) {
            if (result.data) {

              $('title').html(result.data.building_name);

              _this.district = result.data.district == null ? '区域' : result.data.district; //区域
              const business = !result.data.business ? '' : '-' + result.data.business; //商圈
              _this.desp = !result.data.desp ? "": result.data.desp;
              _this.total = result.data.kzfyS || 100;
              _this.total_items = result.data.kzfyS == null ? '暂无数据' : result.data.kzfyS;

              let district = _this.district  + business;
              district = !district ? result.data.address : '【' + district + '】' + result.data.address;
              _this.address = district;
              _this.price = result.data.price == null ? '暂无数据' : result.data.price;
              _this.positionData = result.data.longitude + ',' + result.data.latitude;
              _this.bMap(_this.positionData);

              _this.building_images = result.data.building_images.split(";");

              //物业信息
              _this.wygs = result.data.wygs || '暂无数据'; //物业公司
              if(result.data.wyf == 0){
                  _this.wyf = '已包含';
              }else{
                  _this.wyf = !result.data.wyf ? '暂无数据' : result.data.wyf + '元/㎡/月'; //物业费
              }
              _this.kprq = result.data.kprq || '暂无数据'; // 建成年代
              _this.tcwsl = result.data.tcwsl || '暂无数据';
              _this.tcf = !result.data.tcf ? '暂无数据' : result.data.tcf + '元/月';
              _this.wlgs = result.data.wlgs || '暂无数据';
              if(result.data.gnf == 0){
                  _this.gnf = '已包含';
              }else{
                  _this.gnf = !result.data.gnf ? '暂无数据' : result.data.gnf + '元/㎡/季';
              }
              _this.fybh = !result.data.fybh || '';
              _this.zc = result.data.zc || '暂无数据';
              _this.chqxz = result.data.chqxz.split('、').map((p)=>{return this.property[p]});

              /*
              setTimeout(function(){_this.getPoi("餐厅", "restaurant");},1000);
              setTimeout(function(){_this.getPoi("酒店", "hotel");},1000);
              setTimeout(function(){_this.getPoi("健身", "health");},1000);
              setTimeout(function(){_this.getPoi("银行", "bank");},1000);
              */

              //图片加载完成后,创建轮播图
              setTimeout(function(){
                var mySwiper = new Swiper('.swiper-container', {
                  loop: true,
                  paginationClickable: true,
                  centeredSlides: true,
                  autoplay: 3500,
                  onSlideChangeStart: function (swiper) {
                      $("#picIndex").text(swiper.realIndex + 1);
                  },
                  autoplayDisableOnInteraction: true
                });
              }, 1000);
            }
          }

        }, function (res) {
          Toast({
            message: '获取楼盘详情失败',
            position: 'middle',
            duration: 3000
          });
        });
      },

      //获取楼盘详情页楼盘列表
      getDetList(){
        var _this = this;
        Indicator.open({
          text: '',
          spinnerType: 'fading-circle'
        });
        this.$http.post(
          this.$api + "/yhcms/web/lpjbxx/getZdLpxq.do",
          {"parameters":{"building_id":this.building_id,"curr_page":this.curr_page,"items_perpage":"5","area":this.area},"foreEndType":2,"code":"30000002"}
        ).then(function (res) {
          var result = JSON.parse(res.bodyText);
          Indicator.close();
          if (result.success) {
            const houses = result.data.houses;
            _this.buildList = _this.buildList.concat(houses);
            if (_this.buildList.length) {
              _this.res_showFlag = false; //不展示
            } else {
              _this.res_showFlag = true;
            }
          }

        }, function (res) {
          Toast({
              message: '获取楼盘列表失败! 请稍候再试',
              position: 'bottom'
          });
        });
      },
      toggle(e){
        const target = $("div.collapse");
        if (target.hasClass('active-filter')) {
          target.removeClass('active-filter');
          $("div.collapse").removeClass("bt");
          $("div.intro + p").hide();
        } else {
          $("div.collapse").addClass("bt");
          $("div.intro + p").show();
          target.addClass('active-filter');
        }
      },
      loadmore(){
          this.curr_page += 1;
          this.getDetList();
      },
      //选择面积筛选
      sel_area_list(e){
        $(e.target).addClass('active').siblings().removeClass('active');

        this.area = "";
        var min = 0, max = 0, sort_two_single = 1;
        if ($(e.target).html() == '全部') {
          this.area = "";
        } /*else if ($(e.target).hasClass('last')) {
          this.area = [];
            console.log(this.area);
          min = Math.floor($(e.target).html().match(/\d+/g)[0]);
          max = 1000000;
          this.area.push(min);
          this.area.push(max);
            console.log(this.area);
        }*/else {
          this.area = "";
          var area_fw = $(e.target).html()/*.split('-')*/;
         /* min = Math.floor(area_fw[0]);*/
           /* min = $.trim(area_fw);*/
            this.area = $.trim(area_fw);
            /*console.log(this.area);*/
          //max = Math.floor(area_fw[1].match(/\d+/g)[0]);
          /*this.area.push(min);*/
          //this.area.push(max);
        }
        this.buildList = [];
        this.curr_page = 1;
        this.getDetList();
      },

      //百度地图
      bMap(pos_data){
        var _this = this;
        var posArr = pos_data.split(',');
        var map = new BMap.Map("allmap");    // 创建Map实例
        this.allmap = map;
        var point = new BMap.Point(posArr[0], posArr[1]);
        map.centerAndZoom(new BMap.Point(posArr[0], posArr[1]), 15);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        //map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);

        //标签点击

        $('#map_item_ul li').click(function () {
          var index = $(this).index() + 1;
          location.href = "http://m.amap.com/around/?locations=" + pos_data + "&keywords=餐厅,酒店,健身,银行&defaultIndex=" + index + "&defaultView=&searchRadius=1000&key=cc238157d6183b1d54404a704bb86171&defaultView=map";

        });
      },
      getPoi(keyword, bind){
          const that = this;
          var options = {
              pageCapacity: 100,
              onSearchComplete: (results)=>{
                  that[bind] = results.getNumPois();
              }
          };
          var local = new BMap.LocalSearch(this.allmap, options);
          local.search(keyword);
      }
    },
    computed:{
        more_flag(){
            const num = this.buildList.length;
            return num > 4 && this.total > num;
        }
    },
    mounted(){
      var _this = this;

      this.building_id = this.$route.query.building_id;

      Indicator.open({
        text: '',
        spinnerType: 'fading-circle'
      });

      this.getSortList(); //获取筛选条件

      this.getDetail(); //获取楼盘详情

      this.getDetList(); //获取楼盘详情页楼盘列表
    }
  }
</script>
