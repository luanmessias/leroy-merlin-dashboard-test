
/*
  ng-app padrão do projeto  
*/
var simpleDash = angular.module("simpleDashboard", ['ngAnimate']);

/*
  ng-controller padrão do projeto  
*/
simpleDash.controller("simpleDashboardCtrl", function ($scope, $http) {
    $http.get('assets/data/data.json').then(function (data, status) {
        $scope.posts = data.data.links;

        /*
            Função responável por gerar mais posts ao clicar em Load More
        */
        $scope.quantity = 5;
        $scope.loadMore = function () {
            var postsSize = data.data.links.length;
            var increamented = $scope.quantity + 3;
            var btLoadMore = document.querySelector('.loadMore');

            if (increamented > postsSize) {
                $scope.quantity = postsSize;
                btLoadMore.setAttribute("class", "loadMore inactive");
            } else {
                $scope.quantity = increamented;
            }
        };

    });
});


/*
    Função responsável pela busca de posts
*/
simpleDash.filter('searchFor', function () {
    return function (arr, searchString) {
        if (!searchString) {
            return arr;
        }
        var result = [];
        var btLoadMore = document.querySelector('.loadMore');
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function (item) {
            if (item.meta.author.toLowerCase().indexOf(searchString) !== -1 || item.meta.title.toLowerCase().indexOf(searchString) !== -1) {
                result.push(item);
            }
            if(result.length < 5 && result.length > 0){
                btLoadMore.setAttribute("class", "loadMore inactive");
            } else if(result.length == 0) {
                btLoadMore.setAttribute("class", "loadMore zeroLenght");
            } else {
                btLoadMore.setAttribute("class", "loadMore");
            }
        });
        return result;
    };
});