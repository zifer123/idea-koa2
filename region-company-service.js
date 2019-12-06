const superagent = require('superagent');
// 参考链接：https://www.jianshu.com/p/8aa148435499
var Excel = require('exceljs');

/**
 * data: {"orgType":0} 大区
 * data: {"relationId":1,"orgName":"公海大区","orgType":10,"ifChild":6,"anwserCode":{"code":1,"message":"响应成功"}} 分公司
 * data: {"relationId":48380,"orgName":"深圳万顺叫车云信息技术有限公司石家庄分公司","orgType":20,"ifChild":18,"anwserCode":{"code":1,"message":"响应成功"}} 服务中心
 * */
const api = 'https://sysmanager.wsecar.com/systemManager/local/selectOrgOption';
const token = 'MjAxOTEyMDMxNjQwMTA4ODQ6MjgwOkBCIzMyJipBQmFiOmRjMS1hbGl5dW4taG4xLWF6YS1hcHA0Nzow';

const baseData = {
  op: null,
  token,
};
const regionList = [];

// 大区
function fetchRegionList() {
  return superagent
    .post(api)
    .send({
      ...baseData,
      data: "{orgType: 0}",
    });
}

// 分公司和服务中心都是子级
function fetchChildrenByRelationIdAndOrgId(relationId, orgType) {
  return superagent
    .post(api)
    .send({
      ...baseData,
      data: `{relationId: ${relationId}, orgType: ${orgType}}`,
    });
}

const allList = [];
!(async () => {
  const response = await fetchRegionList();
  const regionList = JSON.parse(response.body.data);
  for (const region of regionList) {
    const tempData = { regionName: region.orgName };
    const companyResponse = await fetchChildrenByRelationIdAndOrgId(region.relationId, region.orgType);
    const companyList = JSON.parse(companyResponse.body.data);
    for (const company of companyList) {
      tempData.companyName = company.orgName;
      const serviceResponse = await fetchChildrenByRelationIdAndOrgId(company.relationId, company.orgType);
      const serviceList = JSON.parse(serviceResponse.body.data);
      for (const service of serviceList) {
        allList.push({
          ...tempData,
          serviceName: service.orgName,
        });
      }
    }
  }
  generateExcel(allList);
})();

function generateExcel(list) {
  var start_time = new Date();
  var workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: './大区公司服务中心表.xlsx'
  });
  var worksheet = workbook.addWorksheet('Sheet');

  worksheet.columns = [
    { header: '大区', key: 'regionName' },
    { header: '分公司', key: 'companyName' },
    { header: '服务中心', key: 'serviceName' },
  ];

  var length = list.length;

// 当前进度
  var current_num = 0;
  var time_monit = 400;
  var temp_time = Date.now();

  console.log('开始添加数据');
// 开始添加数据
  for(let i in list) {
    worksheet.addRow(list[i]).commit();
    current_num = i;
    if(Date.now() - temp_time > time_monit) {
      temp_time = Date.now();
      console.log((current_num / length * 100).toFixed(2) + '%');
    }
  }
  console.log('添加数据完毕：', (Date.now() - start_time));
  workbook.commit();

  var end_time = new Date();
  var duration = end_time - start_time;

  console.log('用时：' + duration);
  console.log("程序执行完毕");
}

