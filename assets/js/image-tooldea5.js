var SitaImage = {
    pasteImageInitHandle: function (options) {
        let {
            pasteFailedMes = '',
            callBack = function (result) {
            },
            loadingCallBack = function (show) {
            },
        } = options;
        document.onpaste = function (event) {
            var items = (event.clipboardData || event.originalEvent.clipboardData).items;
            for (index in items) {
                var item = items[index];
                if (item.kind === 'file') {
                    var blob = item.getAsFile();
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    loadingCallBack('show')
                    reader.onload = function (event) {
                        console.log(event.target)
                        if (event.target.result.includes('data:image')) {
                            eval(callBack(event.target.result))
                        } else {
                            if (pasteFailedMes !== '') {
                                alert(pasteFailedMes)
                            }

                        }
                    };
                    reader.onloadend = function () {
                        loadingCallBack('hide')
                    };
                }
            }
        }
    },
    filePickerInitHandler: function (inputFileId, options) {
        let {
            callBack = function (result) {
            },
            loadingCallBack = function (show) {
            },
        } = options;
        document.getElementById(inputFileId).addEventListener('change', (event) => {
            loadingCallBack('show')
            var input = event.target;
            var reader = new FileReader();
            reader.onload = function () {
                eval(callBack(reader.result));
            };
            reader.readAsDataURL(input.files[0]);

            reader.onloadend = function () {
                loadingCallBack('hide')
            };
        })

    }
}
