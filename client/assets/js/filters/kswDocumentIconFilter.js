"use strict";
(function () {
    angular.module('kswFilterModule')
        .filter('kswDocumentIconFilter', ["ApiService", function (ApiService) {
            return function (input) {
                if(!input){
                    return '/assets/img/doc-icons/doc_icon_default_big.png';
                }

                var fileType = input.match(/\.[0-9a-z]+$/i)[0];

                if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(fileType)) {
                    return ApiService.apiUrl + "/" + input;
                } else if ((/\.(doc|docx)$/i).test(fileType)) {
                    return '/assets/img/doc-icons/doc_icon_doc_big.png';
                } else if ((/\.(xlsx|xlsm|xlsb|xltx|xltm|xls|xlt|xls|xml|xlam|xla|xla)$/i).test(fileType)) {
                    return '/assets/img/doc-icons/doc_icon_excel_big.png';
                }
                else if ((/\.(txt)$/i).test(fileType)) {
                    return '/assets/img/doc-icons/doc_icon_default_big.png';
                } else if ((/\.(pdf)$/i).test(fileType)) {
                    return '/assets/img/doc-icons/doc_icon_pdf_big.png';
                } else {
                    return '/assets/img/doc-icons/doc_icon_default_big.png';
                }

            }
        }]);
})();