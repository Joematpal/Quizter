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
        var apiKey = "&api_key=56ec7a0697a4feca62f114f41c8f0cb4";
        var qApiKey = "?&api_key=56ec7a0697a4feca62f114f41c8f0cb4";
        var randomMovieCollection = [];

        //Old// 10fa5bc738dc7e2b1673233b87fdc97a
        //New// 4c5af288fecc2760a3c90f593bd06a79
        //Newest// 56ec7a0697a4feca62f114f41c8f0cb4

        //======================================================================

        return {
          getData: getData,
          //anyUniqRecursion: anyUniqRecursion,
          getGenreList: getGenreList,
          getDecadeList: getDecadeList,
          getCategoryList: getCategoryList,
          getTropeList: getTropeList,
          arrangeMovies: arrangeMovies,
          //getQuestionsAnswers: getQuestionsAnswers,
          collectMovies: collectMovies,
          makeRandomQuestions: makeRandomQuestions,
          getTMDBmoviePage: getTMDBmoviePage,
          getOMDBmoviePage: getOMDBmoviePage,
          uniqNumber: uniqNumber,
          orderTheQuestions: orderTheQuestions,
          publishTheQuestions: publishTheQuestions,
          movieList: movieList
        }



        //======================================================================
        var movieList = [];
        function uniqNumber(x){
          var arr = []
          while(arr.length < x){
            var randomnumber=Math.ceil(Math.random()*x)
            var found=false;
            for(var i=0;i<arr.length;i++){
            if(arr[i]==randomnumber){
              found=true;
              break}
            }
            if(!found){
              arr[arr.length]=randomnumber;
            }
          }
           return arr;
        }

        function gameManager(hash){

        }

        function publishTheQuestions(hash){
          return this.orderTheQuestions(hash)
            then(function(results){

            });
        }


        function orderTheQuestions(hash){
          return this.makeRandomQuestions(hash)
            .then(function(results){
              var acc = []
              var uniqArrayOfNumber = uniqNumber(200);
              for (var i = 0; i < 200; i+=4) {
                function returnOddRandomNumber(){
                    var odd = false;
                  	while (!odd){
                  	var rndnum = Math.floor(Math.random()*17)
                	  	if (rndnum % 2 !== 0){
                	  		return rndnum;
                	  	}
                  }
                 }
                 var mi = i; var mii = i+1; var miii = i+2; var miv = i+3;
                var randomNumber = returnOddRandomNumber();
                if ( randomNumber == 1 ){
                  var keyedResultsmi = Object.keys(results[mi]);
                    var title = results[mi][keyedResultsmi[0]];
                    var question = results[mi][keyedResultsmi[randomNumber]];
                    var answer = results[mi][keyedResultsmi[10]];
                  var keyedResultsmii = Object.keys(results[mii]);
                    var choiceOne = results[mii][keyedResultsmii[10]];
                  var keyedResultsmiii = Object.keys(results[miii]);
                    var choiceTwo = results[miii][keyedResultsmiii[10]];
                  var keyedResultsmiv = Object.keys(results[miv]);
                    var choiceThree = results[miv][keyedResultsmiv[10]];
                  acc.push({title:title, question: question, answer:answer, choiceOne: choiceOne, choiceTwo: choiceTwo, choiceThree: choiceThree});
                } else {
                  var keyedResultsmi = Object.keys(results[mi]);
                    var title = results[mi][keyedResultsmi[0]];
                    var question = results[mi][keyedResultsmi[randomNumber]];
                    var answer = results[mi][keyedResultsmi[randomNumber-1]];

                  var keyedResultsmii = Object.keys(results[mii]);
                    var choiceOne = results[mii][keyedResultsmii[randomNumber-1]];

                  var keyedResultsmiii = Object.keys(results[miii]);
                    var choiceTwo = results[miii][keyedResultsmiii[randomNumber-1]];

                  var keyedResultsmiv = Object.keys(results[miv]);
                    var choiceThree = results[miv][keyedResultsmiv[randomNumber-1]];
                  var poster = results[mi][keyedResultsmi[16]];
                  acc.push({title:title, question: question, answer:answer, choiceOne: choiceOne, choiceTwo: choiceTwo, choiceThree: choiceThree, poster: poster});
                }

              }
              return acc;
            });
        }

        function makeRandomQuestions(hash){
          return this.getOMDBmoviePage(hash)
            .then(function(theQandA){
              var pizza = theQandA.map(function(elem){
                return elem.data;
              });
              var acc = [];
              pizza.forEach(function(elem, ind){
                acc.push({
                  "00title": elem.Title,
                  "01titleQuestion":"What is the title of this movie?",
                  "02actors": elem.Actors,
                  '03actorsQuestion':"What actors are in "+ elem.Title+'?',
                  '04awards': elem.Awards,
                  '05awardsQuestion': "How many awards did "+ elem.Title + " win?",
                  '06director': elem.Director,
                  '07directorQuestion': "Who directed "+elem.Title+'?',
                  '08metascore': elem.Metascore,
                  '09metascoreQuestion': "What is the Metascore of " +elem.Title+'?',
                  '10plot': elem.Plot,
                  '11plotQuestion': "What is the plot of "+elem.Title+'?',
                  '12runtime': elem.Runtime,
                  '13runtimeQuestion': "What is the runtime of "+elem.Title+'?',
                  '14writer': elem.Writer,
                  '15writerQuestion': "Who wrote "+elem.Title+'?',
                  '16poster': elem.Poster
                });

              });
              return acc;
            });
        }

        function getOMDBmoviePage(hash){
          return this.getTMDBmoviePage(hash)
            .then(function(imdb_results){

              var rest = imdb_results.map(function(elem){
                return elem.data;
              });

              var dfd = $q.defer();
              var movies = [];
              rest.forEach(function(ele, i){
                movies.push($http.get('http://www.omdbapi.com/?i='+rest[i]['imdb_id']+'&plot=short&r=json'));
              });
              $q.all(movies)
                .then(function(results){
                    dfd.resolve(results);
                }, function(errors){
                    dfd.reject(errors);
                }, function(updates){
                    dfd.update(updates);
                });
                return dfd.promise;
              })
        }

        function getTMDBmoviePage(hash){
          return this.arrangeMovies(hash)
            .then(function(results){
              var dfd = $q.defer();
              var movies = [];
              results.forEach(function(ele, i){
                movies.push($http.get("http://api.themoviedb.org/3/movie/"+results[i]['id']+qApiKey));
              });

              $q.all(movies)
                .then(function(results){
                    dfd.resolve(results);
                }, function(errors){
                    dfd.reject(errors);
                }, function(updates){
                  dfd.update(updates);
                });
                return dfd.promise;

              })
        }//End of getTMDBmoviePage


        // function getQuestionsAnswers(hash){
        //   return this.arrangeMovies(hash)
        //     .then(function(results){
        //       console.log(results);
        //       var acc = [];
        //       results.forEach(function(elem, i){
        //         var ranNum = Math.floor(Math.random() * 9)
        //
        //         var movieDirections = [
        //           {
        //            title:results[i]["title"],
        //           	titleAnswer:"title",
        //           	titleQuestion:"What is the title of this movie?",
        //           	revenueAnswer:"revenue",
        //           	revenueQuestion: "How much money did "+results[i]['title']+" bring in?",
        //           	runtimeAnswer:"runtime",
        //           	runtimeQuestion: "What is the runtime of"+results[i]['title']+"?",
        //           	taglineAnswer:"tagline",
        //           	taglineQuestion: "What is the tagline to "+results[i]['title']+"?",
        //           	budgetAnswer:"budget",
        //           	budgetQuestion:"What was the budget of "+results[i]['title']+"?",
        //           	directions: "http://api.themoviedb.org/3/movie/"+results[i]['id']+qApiKey,
        //             backdrop_path:"http://image.tmdb.org/t/p/w1000"+results[i]["backdrop_path"],
        //             poster_path:"http://image.tmdb.org/t/p/w1000"+results[i]["poster_path"]
        //           },
        //           {
        //           	directorAnswer:"Director",
        //           	directorQuestion: "Who is the director of "+results[i]['title']+"?",
        //           	writeresAnswer:"Writer",
        //           	writersQuestion: "who is the writer of "+results[i]['title']+"?",
        //           	actorsAnswer:"Actors",
        //           	actorsQuestion: "Which actors played in this movie?",
        //           	releasedAnswer:"Relseased",
        //           	releasedQuestion: "When was the release date for this movie?",
        //           	plotAnswer:"Plot",
        //           	plotQuestion: "What is the plot of "+results[i]['title']+"?",
        //             directions: "http://api.themoviedb.org/3/movie/"+results[i]['id']+qApiKey,
        //           	backdrop_path:"http://image.tmdb.org/t/p/w1000"+results[i]["backdrop_path"],
        //             poster_path:"http://image.tmdb.org/t/p/w1000"+results[i]["poster_path"]
        //           }
        //           ];
        //
        //         movieDirections.forEach(function(elem, ind){
        //
        //         if (ind != 0){
        //           $http.get(movieDirections[ind]['directions'])
        //             .then(function(imdb_results){
        //               $http.get('http://www.omdbapi.com/?i='+imdb_results['data']['imdb_id']+'&plot=short&r=json')
        //                 .then(function(imdbobj){
        //
        //                   var mObj = {
        //                     id:results[i].id,
        //                     backdrop_path:movieDirections[ind]['backdrop_path'],
        //                     poster_path:movieDirections[ind]['poster_path'],
        //                     directorAnswer: imdbobj.data[movieDirections[ind]['directorAnswer']],
        //                     directorQuestion: movieDirections[ind]['directorQuestion'],
        //                     writerAnswer: imdbobj.data[movieDirections[ind]['writerAnswer']],
        //                     writerQuestion: movieDirections[ind]['writerQuestion'],
        //                     actorsAnswer: imdbobj.data[movieDirections[ind]['actorsAnswer']],
        //                     actorsQuestion: movieDirections[ind]['actorsQuestion'],
        //                     plotAnswer: imdbobj.data[movieDirections[ind]['plotAnswer']],
        //                     plotQuestion: movieDirections[ind]['plotQuestion'],
        //                     releasedAnswer: imdbobj.data[movieDirections[ind]['releasedAnswer']],
        //                     releasedQuestion: movieDirections[ind]['relaeasedQuestion'],
        //                   };
        //
        //                   //console.log('omdb_mObj', results[i]['id']);
        //                   acc.push(results[i]['id']=mObj)
        //                 })
        //
        //             });
        //         } else {
        //           $http.get(movieDirections[ind]['directions'])
        //             .then(function(qaobj){
        //               var mObj = {
        //                 id:results[i].id,
        //                 title:results[i].title,
        //                 titleAnswer: qaobj.data[movieDirections[ind]['titleAnswer']],
        //                 titleQuestion: movieDirections[ind]['titleQuestion'],
        //                 revenueAnswer: qaobj.data[movieDirections[ind]['revenueAnswer']],
        //                 revenueQuestion: movieDirections[ind]['revenueQuestion'],
        //                 runtimeAnswer: qaobj.data[movieDirections[ind]['runtimeAnswer']],
        //                 runtimeQuestion: movieDirections[ind]['runtimeQuestion'],
        //                 taglineAnswer: qaobj.data[movieDirections[ind]['taglineAnswer']],
        //                 taglineQuestion: movieDirections[ind]['taglineQuestion'],
        //                 budgetAnswer: qaobj.data[movieDirections[ind]['budgetAnswer']],
        //                 budgetQuestion: movieDirections[ind]['budgetQuestion']
        //               }
        //
        //               acc.push(mObj)
        //             });
        //         } //end of else statement
        //       });// End of inner forEach
        //       });
        //       //End of the forEach
        //       console.log('acc', acc);
        //       acc.forEach(function(ele){ debugger;
        //         console.log('acc forEach',ele);
        //       });
        //       return acc;
        //     })
        // }//End of getQuestionsAnswers

        function arrangeMovies(hash){
          return this.collectMovies(hash)
            .then(function(results){
              return results.reduce(function(prev, curr){
                return prev.concat(curr);
              },[]);
            });
        }

        function collectMovies(hash){
          return this.getData(hash)
            .then(function(results){
                return results.map(function(elem){
                  return elem.data.results;
                });
              });
        }

        function getData(hash) {
          var dfd = $q.defer();
          var movies = [];
          gameHash(hash).forEach(function(ele, i){
            movies.push($http.get(baseUrl + middleMovieUrl + ele + apiKey));
          });

          $q.all(movies)
            .then(function(results){
                dfd.resolve(results);
            }, function(errors){
                dfd.reject(errors);
            }, function(updates){
              dfd.update(updates);
            });
            return dfd.promise;





          // $http.get(baseUrl + middleMovieUrl + gameHash(hash) + apiKey)
          //   .then(function(results) {
          //     randomMovieCollection = results.data.results;
          //     console.log(randomMovieCollection);
          //   collectFourMovies(randomMovieCollection);
          //   //console.log("Get Shit",randomMovieCollection);
          // })
          // .catch(function(err) {
          //   console.log(err);
          // });

        }


        // function collectFourMovies(collection) {
        //   var fourMovieHash = [];
        //   var randomNumber1 = Math.random
        //   for (var i = 0; i < 4; i++) {
        //     //console.log(collection[i]);
        //
        //   }
        // }

        // function anyUniqRecursion( anyNum, passedArr, randNumSize) {
        // 	var arrUniq = passedArr;
        // 	var randomNumber = (Math.floor(Math.random() * randNumSize) );
        // 	if (arrUniq.indexOf(randomNumber) ==-1 ) {
        // 		if (!anyNum) {
        // 			return arrUniq;
        // 		} else {
        // 			arrUniq.push(randomNumber);
        // 			return anyUniqRecursion(anyNum-1, arrUniq, randNumSize)
        // 		}
        // 	} else {
        // 		return anyUniqRecursion(anyNum, arrUniq, randNumSize);
        // 	}
        // }
        // anyUniqRecursion(200,[], 200);

        function getGenreList() {
          return $http.get('http://api.themoviedb.org/3/genre/movie/list?&api_key=10fa5bc738dc7e2b1673233b87fdc97a');
        }

        function getDecadeList() {
          return yearList;
        }

        function getCategoryList() {
          return categoryList;
        }
        function getTropeList(){
          return tropeList;
        }
        function gameHash(hash) {
          var arrayCacther = [];
          console.log(hash[0]);
          if (hash[0] <= 2009 && hash[0] >= 0){
            hash[0] = parseInt(hash[0]);
            var plusTen = hash[0]+10;
            for (var i = hash[0]; i < plusTen; i++){
              hash[0] = i;
            var hashed = '';
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
            arrayCacther.push(hashed);
          }
          } else {
            var arrayCacther = [];
            for (var i = 1; i <= 10; i++){

            hash[0] = '';

            var hashed = '';
              hashed += 'page='+i;
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
            arrayCacther.push(hashed);
          }
          }
          return arrayCacther
        }


      }
      var tropeList = [
        {
          name:'survival',
          id:'10349'
        },
        {
          name:'superhero',
          id:'9715'
        },
        {
          name:'apocalyptic',
          id:'4458'
        },
        {
          name:'animal attack',
          id:'158130'
        },
        {
          name:'suspense',
          id:'9937'
        },
        {
          name:'dinosaur',
          id:'12616'
        },
        {
          name:'marvel comic',
          id:'74707'
        },
        {
          name:'marvel cinematic universe',
          id:'180547'
        },
        {
          name:'dc comic',
          id:'830'
        },
        {
          name:'revenge',
          id:''
        },
        {
          name:'car race',
          id:''
        },
        {
          name:'space',
          id:'9882'
        },
        {
          name:'science',
          id:'156810'
        },
        {
          name:'mars',
          id:'839'
        },
        {
          name:'based on novel',
          id:'818'
        },
        {
          name:'disaster film',
          id:'189411'
        },
        {
          name:'catastrophe',
          id:'188351'
        },
        {
          name:'sport',
          id:'6075'
        },
        {
          name:'cold war',
          id:'2106'
        },
        {
          name:'spy',
          id:'470'
        }
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
