const upload_your_pdf_file = async () => {
  try {
    const file = await DocumentPicker.getDocumentAsync()
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError("Network request failed"))
      }
      xhr.responseType = "blob"
      xhr.open("GET", file.uri, true)
      xhr.send(null)
    })
    const storageRef = await app.storage().ref()
    const bucket = storageRef.child(file.name)
    await bucket.put(blob)
    const url = await bucket.getDownloadURL()
    console.log(url)
    set_file_url_link(url)
    console.log("upload File")
  } catch (err) {
    console.log(err)
  }
}
