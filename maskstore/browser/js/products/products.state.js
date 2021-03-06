app.config(function($stateProvider){
	$stateProvider
		.state('products', {
			url: '/products',
			templateUrl: "js/products/products.html",
			resolve: {
				masks: function(MasksFactory){
					return MasksFactory.getMasks();
				}
			},
			controller: function($scope, masks, $state){
				$scope.masks = masks;
				$scope.options = [
					{ label: 'Costume', value: 'costume' },
					{ label: 'Burglary', value: 'burglary' },
					{ label: 'Armed Robbery', value: 'armed robbery' },
					{ label: 'Meth Making', value: 'meth making' },
					{ label: 'Handling Liquid Nitrogen', value: 'handling liquid nitrogen' },
					{ label: 'Skiing', value: 'skiing' },
				];
				// $scope.watch('categoryWatch', function(value) {
				// 	if (value) {
				// 		$state.go('products.category({category: value})');
				// 	}
				// });
				$scope.stateChange = function(value) {
					console.log("is this the value? ", value);
					$state.go('products.category', {category: value });
				}
			}
		})
	.state('productsDetail', {
		url: '/:id',
		templateUrl: 'js/common/directives/mask/mask.html',
		resolve: {
			mask: function(MasksFactory, $stateParams) {
				return MasksFactory.getMask($stateParams.id);
			},
			reviews: function(ReviewsFactory, $stateParams) {
				return ReviewsFactory.getReviews($stateParams.id);
			},
			user: function(AuthService) {
				return AuthService.getLoggedInUser();
			}
		},
		controller: function($scope, mask, reviews, user, ReviewsFactory) {
			$scope.mask = mask;
			$scope.reviews = reviews;
			$scope.createReview = function(newReview) {
				newReview.mask = mask;
				newReview.user = user;
				console.log("creating this review: ", newReview);
				return ReviewsFactory.createReview(newReview);
			}
		}
	})
	.state('products.category', {
		controller: function($scope, masks){
			$scope.masks = masks;
		},
		url: '/:category',
		resolve: {
			masks: function(MasksFactory, $stateParams){
					return MasksFactory.getMasks($stateParams.category);
			}
		},
		template: '<products></products>'
	});
});
