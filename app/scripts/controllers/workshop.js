'use strict';

angular.module('portfolioApp')
    .controller('WorkshopCtrl', function ($scope) {
        $scope.myName = 'Marc Njoku';
        $scope.buttonAus = 'workshop';

        $scope.evaluationButtonisDisabled = true;
        $scope.enableEvaluationButton = function() {
            $scope.evaluationButtonisDisabled = false;
            console.log('Der Button müsste aktiviert sein!');
        };
    });
