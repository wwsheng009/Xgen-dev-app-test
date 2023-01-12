function main(args, out, res) {
  var data = http.Get(args[0]);
  //console.log(data)
  // var newdata = {
  //   "Name": args[0],
  //   "TempFile": data.data,
  //   "Header": data.headers,
  //   "Size": 0,
  // }
  var fs = new FS("system");
  
  var temp = fs.MkdirTemp("/tmp/download");
  console.log("temp folder:",temp)
  console.log("temp file:",temp + "/name.svg")
  var length = fs.WriteFileBuffer(temp + "/name.svg", data.data,0644);
  console.log("length:" + length)
  var resp = http.Post("http://172.18.3.234:5099/api/file/UploadByFileApi", {}, {
    "image": temp + "/name.svg"
  })

  console.log(resp)
  return resp.data
}
