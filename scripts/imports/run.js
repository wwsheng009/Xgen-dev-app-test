/**
 * 资产导入数据
 */
function Role(columns, data) {
  log.Trace(columns, data);

  let ignore = 0;
  let failure = 0;

  // 整理数据 (也可以调用批量入库处理器)
  data.forEach((item) => {
    if (!item[1]) {
      ignore++;
      return;
    }

    let payload = {
      name: item[0],
      type: item[1]
    };

    let res = Process("yao.table.Save", "role", payload);
    log.Trace("res:", res)
    if (res.code && res.message) {
      log.Error("[import] Role %s %s", item[0], res.message);
      failure++;
    }
  });

  return [failure, ignore];
}


function Output(data) {
  // todo 处理导入后的逻辑，导入后会自动调用这个函数："output": "scripts.imports.ticket.Output",
  return data;
}