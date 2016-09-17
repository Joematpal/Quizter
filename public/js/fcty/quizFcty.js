(function() {
  'use strict';
    angular.module('quizter')
    .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
      .factory('quizFcty', quizFcty);

      function quizFcty($http, $q) {
        //Local variables=======================================================
        var baseUrl = "https://api.themoviedb.org/3/";
        var middleMovieUrl = "discover/movie?"
        var apiKey = "&api_key=10fa5bc738dc7e2b1673233b87fdc97a";
        var randomMovieCollection = [];

        //======================================================================

        return {
          getData: getData,
          anyUniqRecursion: anyUniqRecursion,
          getGenreList: getGenreList,
          getDecadeList: getDecadeList,
          getCategoryList: getCategoryList,

        }



        //======================================================================


        function getData(hash) {
          //Pass an array of values to be mapped through and used.


          $http.get(baseUrl + middleMovieUrl + gameHash(hash) + apiKey)
            .then(function(results) {
              randomMovieCollection = results.data.results;
              console.log(randomMovieCollection);
            collectFourMovies(randomMovieCollection);
            //console.log("Get Shit",randomMovieCollection);
          })
          .catch(function(err) {
            console.log(err);
          });

        }

        function collectFourMovies(collection) {
          var fourMovieHash = [];
          var randomNumber1 = Math.random
          for (var i = 0; i < 4; i++) {
            //console.log(collection[i]);

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

        function getGenreList() {
          return $http.get('http://api.themoviedb.org/3/genre/movie/list?&api_key=10fa5bc738dc7e2b1673233b87fdc97a');
        }

        function getDecadeList() {
          return yearList;
        }

        function getCategoryList() {
          return categoryList;
        }
        function gameHash(hash) {
          var hashed = ''
          hash.forEach(function(ele, ind){
            if (ind == 0) {
              if(!ele){
                hashed += 'primary_release_year='+'&';
              } else {
                hashed += 'primary_release_year='+ele+'&';
              }
            } else if (ind == 1) {
              if(!ele){
                hashed += 'sort_by='+'&';
              } else {
                hashed += 'sort_by='+ele+'&';
              }
            } else if (ind == 2) {
              if(!ele){
                hashed += 'with_keywords='+'&';
              } else {
                hashed += 'with_keywords='+ele+'&';
              }
            } else if (ind == 3) {
              if(!ele){
                hashed += 'with_genres='+'&';
              } else {
                hashed += 'with_genres='+ele+'&';
              }
            }
          });
          console.log('hash',hashed);
          return hashed;

        }


      }
      var tropeList = [
        // survival,
        // superhero apocalyptic,
        // suspense,
        // animal attack,
        // suspense,
        // dinosaur,
        // marvel comic,
        // dc comic,
        // marvel cinematic universe,
        // revenge,
        // car race,
        // space,
        // scince,
        // mars,
        // based on novel,
        // disaster film,
        // catastrophe,
        // sport,
        // cold war,
        // spy
      ]
      var yearList = [
        {
          name: '2015',
          id:'2015'
        },
        {
          name: '2010',
          id:'2010'
        },
        {
          name: '2000',
          id:'2000'
        },
        {
          name: '1990',
          id:'1990'
        },
        {
          name: '1980',
          id:'1980'
        },
        {
          name: '1970',
          id:'1970'
        },
        {
          name: '1960',
          id:'1960'
        },
      ]
      var categoryList = [
        {
          name:'Most Popular',
          id:'popularity.desc'
        },
        {
          name:'Least Popular',
          id: 'popularity.asc'
        },
        {
          name:'Least Recent',
          id:'release_date.asc'
        },
        {
          name:'Most Recent',
          id:'release_date.desc'
        },
        {
          name:'Least Grossing',
          id:'revenue.asc'
        },
        {
          name:'Most Grossing',
          id:'revenue.desc'
        },
        {
          name:'Least Recent',
          id:'primary_release_date.asc'
        },
        {
          name:'Most Recent',
          id:'primary_release_date.desc'
        },
        {
          name:'Title Asc',
          id:'original_title.asc'
        },
        {
          name:'Title Desc',
          id:'original_title.desc'
        },
        {
          name:'Worst Movie',
          id:'vote_average.asc'
        },
        {
          name:'Best Movie',
          id:'vote_average.desc'
        },
        {
          name:'Least Voted',
          id:'vote_count.asc'
        },
        {
          name:'Most Voted',
          id:'vote_count.desc'
        }
      ];

}());
