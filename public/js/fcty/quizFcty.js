(function() {
  'use strict';
    angular.module('themoviequizzer')
      .factory('quizFcty', quizFcty);

      function quizFcty($http, $q) {
        //Local variables=======================================================
        var baseUrl = "https://api.themoviedb.org/3/";
        var movieRandomUrl = "discover/movie?sort_by=popularity.desc"
        var apiKey = "&api_key=10fa5bc738dc7e2b1673233b87fdc97a";
        var randomMovieCollection = [];

        //======================================================================

        return {
          getData: getData,
          anyUniqRecursion: anyUniqRecursion,
        }

        //======================================================================

        function getData() {
          //var topTenMoviePages = anyUniqRecursion()
          $http.get(baseUrl + movieRandomUrl + apiKey).then(function(results) {
            randomMovieCollection = results.data.results;
            collectFourMovies(randomMovieCollection);
            console.log("Get Shit",randomMovieCollection);
          })
          .catch(function(err) {
            console.log(err);
          });

        }

        function collectFourMovies(collection) {
          var fourMovieHash = [];
          var randomNumber1 = Math.random
          for (var i = 0; i < 4; i++) {
            console.log(collection[i]);

          }
        }

        function anyUniqRecursion( anyNum, passedArr, randNumSize) {
        	var arrUniq = passedArr;
        	var randomNumber = (Math.floor(Math.random() * randNumSize) );
        	if (arrUniq.indexOf(randomNumber) ==-1 ) {
        		if (!anyNum) {
        			return arrUniq;
        		} else {
        			arrUniq.push(randomNumber);
        			return anyUniqRecursion(anyNum-1, arrUniq, randNumSize)
        		}
        	} else {
        		return anyUniqRecursion(anyNum, arrUniq, randNumSize);
        	}
        }
        anyUniqRecursion(4,[], 25);




      }

}());
