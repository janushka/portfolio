'use strict';

angular.module('portfolioApp')
    .controller('WorkshopCtrl', function ($scope) {
        $scope.myName = 'Marc Njoku';
        $scope.buttonAus = 'workshop';

        $scope.count = 0;

        $scope.evaluationButtonisDisabled = true;
        $scope.enableEvaluationButton = function (rbName) {
            $scope.evaluationButtonisDisabled = false;

            $scope.$watch(rbName, function(newValue, oldValue) {
                $scope.count = $scope.count + 1;
            });

            console.log('Der Button müsste aktiviert sein!');
        };

        $scope.calculateScore = function () {

            console.log('Der Wert der Variable \'count\' = ' + $scope.count);
        };
    });
