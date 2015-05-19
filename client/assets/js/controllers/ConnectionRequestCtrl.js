"use strict";
(function () {
    angular.module("application")
        .controller("ConnectionRequestCtrl", ["$scope", "ConnectionRequestService", "FoundationApi",
            function ($scope, ConnectionRequestService, FoundationApi) {
                FoundationApi.publish('loaderModal', 'open');
                ConnectionRequestService.getOrganizationsConnectionRequestCount()
                    .then(function (response) {
                        $scope.organizationsConnectionRequest = response.data;
                        $scope.selectedAccount = $scope.organizationsConnectionRequest[0];
                        $scope.accountOnChange($scope.selectedAccount);
                        FoundationApi.publish('loaderModal', 'close');
                    });
                $scope.selectedConnections = [];

                $scope.accountOnChange = function (selectedAccount) {
                    FoundationApi.publish('loaderModal', 'open');
                    ConnectionRequestService.getCreateConnectionsData(selectedAccount)
                        .then(function (response) {
                            $scope.allConnections = response.data;
                            FoundationApi.publish('loaderModal', 'close');
                        });
                };

                $scope.acceptRequest = function (request) {
                    FoundationApi.publish('loaderModal', 'open');
                    ConnectionRequestService.acceptConnectionRequests(request)
                        .then(function (response) {
                            FoundationApi.publish('loaderModal', 'close');
                            if (response.data.code == 1) {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'success',
                                        autoclose: "3000"
                                    }
                                );
                                $scope.accountOnChange($scope.selectedAccount);
                            } else {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'warning',
                                        autoclose: "3000"
                                    }
                                );
                            }
                        });
                };

                $scope.rejectRequest = function (request) {
                    FoundationApi.publish('loaderModal', 'open');
                    ConnectionRequestService.rejectConnectionRequests(request)
                        .then(function (response) {
                            FoundationApi.publish('loaderModal', 'close');
                            if (response.data.code == 1) {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'success',
                                        autoclose: "3000"
                                    }
                                );
                                $scope.accountOnChange($scope.selectedAccount);
                            } else {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'warning',
                                        autoclose: "3000"
                                    }
                                );
                            }
                        });

                };

                $scope.acceptAll = function () {

                    if (!$scope.allConnections.connectionRequests.length) {
                        return;
                    }

                    FoundationApi.publish('loaderModal', 'open');

                    ConnectionRequestService.acceptConnectionRequests($scope.allConnections.connectionRequests)
                        .then(function (response) {
                            FoundationApi.publish('loaderModal', 'close');
                            if (response.data.code == 1) {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'success',
                                        autoclose: "3000"
                                    }
                                );
                                $scope.accountOnChange($scope.selectedAccount);
                            } else {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'warning',
                                        autoclose: "3000"
                                    }
                                );
                            }
                        });
                };

                $scope.sendRequest = function (recommended) {
                    FoundationApi.publish('loaderModal', 'open');
                    ConnectionRequestService.sendConnectionRequests($scope.selectedAccount, recommended)
                        .then(function (response) {
                            FoundationApi.publish('loaderModal', 'close');
                            if (response.data.code == 1) {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'success',
                                        autoclose: "3000"
                                    }
                                );
                                $scope.accountOnChange($scope.selectedAccount);
                            } else {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'warning',
                                        autoclose: "3000"
                                    }
                                );
                            }
                        });
                };

                $scope.sendRequestAll = function () {
                    if (!$scope.allConnections.recommendedConnections.length) {
                        return;
                    }

                    FoundationApi.publish('loaderModal', 'open');

                    ConnectionRequestService.sendConnectionRequests($scope.selectedAccount, $scope.allConnections.recommendedConnections)
                        .then(function (response) {
                            FoundationApi.publish('loaderModal', 'close');
                            if (response.data.code == 1) {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'success',
                                        autoclose: "3000"
                                    }
                                );
                            } else {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'warning',
                                        autoclose: "3000"
                                    }
                                );
                            }
                        });
                };

                $scope.updateSearchResults = function (searchKey) {
                    if (searchKey == "") {
                        $scope.searchResults = [];
                        return;
                    }
                    ConnectionRequestService.getSuggestedConnections($scope.selectedAccount, searchKey)
                        .then(function (response) {
                            if ($scope.searchKey != "") {
                                $scope.searchResults = response.data;
                            }
                        });
                };

                $scope.selectResult = function (result) {
                    $scope.selectedConnections.push(result);
                    $scope.searchResults = [];
                    $scope.searchKey = '';
                };

                $scope.sendInvitation = function (connection) {
                    FoundationApi.publish('loaderModal', 'open');
                    ConnectionRequestService.sendConnectionRequests($scope.selectedAccount, connection)
                        .then(function (response) {
                            FoundationApi.publish('loaderModal', 'close');
                            $scope.selectedConnections = [];
                            if (response.data.code == 1) {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'success',
                                        autoclose: "3000"
                                    }
                                );
                                $scope.accountOnChange($scope.selectedAccount);
                            } else {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'warning',
                                        autoclose: "3000"
                                    }
                                );
                            }
                        });
                };

                $scope.removeInvitation = function (connection) {
                    var connectionIndex = $scope.selectedConnections.indexOf(connection);
                    $scope.selectedConnections.splice(connectionIndex, 1);
                };

                $scope.sendInvitationToAll = function () {
                    if (!$scope.selectedConnections.length) {
                        return;
                    }

                    FoundationApi.publish('loaderModal', 'open');

                    ConnectionRequestService.sendConnectionRequests($scope.selectedAccount, $scope.selectedConnections)
                        .then(function (response) {
                            FoundationApi.publish('loaderModal', 'close');
                            $scope.selectedConnections = [];
                            if (response.data.code == 1) {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'success',
                                        autoclose: "3000"
                                    }
                                );
                            } else {
                                FoundationApi.publish('main-notifications', {
                                        title: 'CONNECTION',
                                        content: response.data.message,
                                        color: 'warning',
                                        autoclose: "3000"
                                    }
                                );
                            }
                        });
                };

            }]);
})();