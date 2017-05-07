angular.module('statistics')
    .config(['ChartJsProvider', function (ChartJsProvider) {
        ChartJsProvider.setOptions({
            chartColors: ['#FF5252', '#FF8A80'],
            responsive: false
        });
        // Configure all line charts
        ChartJsProvider.setOptions('line', {
            showLines: false
        });
    }])
    .controller("StatisticsCtrl", ['$scope', '$timeout', function ($scope, $timeout) {


        {//hotClickData
            $scope.hotClickLabels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

            $scope.hotClickData = [
                [65, 59, 90, 81, 56, 55, 40],
                [28, 48, 40, 19, 96, 27, 100]
            ];
        }
        {//
            $scope.PVStatisticsLabels = ["January", "February", "March", "April", "May", "June", "July"];
            $scope.PVStatisticsData = [
                [65, 59, 80, 81, 56, 55, 40]
            ];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };
        }
}])

