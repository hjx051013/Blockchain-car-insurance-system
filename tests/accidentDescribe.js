const sites = ['春晖小区','古荡街道','鄱阳湖大桥','五环高架','市菜市场','港珠澳大桥'];
const weathers = ['晴','小雨','暴雨','大雨','中雨','阴天','雾霾','雪天','冰雹','沙尘暴'];
const roadLevels = ['高速公路','国道','省道','市道','县级公路','水泥路','乡村土路'];
const roadSituations = ['直平','弯道','上坡','下坡','颠簸崎岖'];
const trafficSituations = ['空旷','少许行人车辆','正常人流车流','堵车','重度堵车'];
const damages = ['擦碰','轻微变形','中度损坏','完全损坏'];
const speeds = [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160];
const accelerations = [5,10,15,25,30,35,40,45,50];
const alcoholDetections = ['no','yes'];
const loss = [100,200,500,800,1000,1500,2000,3000,4000,5000,8000,10000];
module.exports = {
  'site':sites,
  'weather':weathers,
  'roadLevel':roadLevels,
  'roadSituation':roadSituations,
  'trafficSituation':trafficSituations,
  'damage':damages,
  'speed':speeds,
  'acceleration':accelerations,
  'alcohol':alcoholDetections,
  'loss':loss,
};
