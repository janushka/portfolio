'use strict';

angular.module('portfolioApp')
    .controller('WorkshopCtrl', function ($scope) {
        var rbNumbs = createInitScoreArray(24);

        $scope.myName = 'Marc Njoku';
        $scope.buttonAus = 'workshop';

        $scope.count1 = 0, $scope.count2 = 0, $scope.count3 = 0, $scope.count4 = 0, $scope.count5 = 0, $scope.count6 = 0, $scope.count7 = 0, $scope.count8 = 0,
            $scope.count9 = 0, $scope.count10 = 0, $scope.count11 = 0, $scope.count12 = 0, $scope.count13 = 0, $scope.count14 = 0, $scope.count15 = 0, $scope.count16 = 0,
            $scope.count17 = 0, $scope.count18 = 0, $scope.count19 = 0, $scope.count20 = 0, $scope.count21 = 0, $scope.count22 = 0, $scope.count23 = 0, $scope.count24 = 0;

        $scope.evaluationButtonisDisabled = true;
        $scope.enableEvaluationButton = function (rbName, rbNumb) {
            $scope.evaluationButtonisDisabled = false;

            $scope.$watch(rbName, function (newValue, oldValue) {
                //console.log('Old value = ' + newValue + ', New value = ' + oldValue);
                rbNumbs[parseInt(rbNumb) - 1] = parseInt(newValue);
            });
        };

        $scope.calculateScore = function () {
            var score = 0;
            rbNumbs.forEach(function (numb) {
                score += numb;
            });
            console.log('The score = ' + score);
        };
    });

function createInitScoreArray(length) {
    var arr = new Array();
    for (var i = 0; i < length; i++) {
        arr[i] = 0;
    }
    return arr;
}