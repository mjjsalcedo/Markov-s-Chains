var MarkovChain = require('markovchain')
  , fs = require('fs')
  , quotes = new MarkovChain(fs.readFileSync('algo/quotes.txt', 'utf8'))

console.log('first', quotes.start('I').end(8).process())

var useUpperCase = function(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z'
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}

console.log('second', quotes.start(useUpperCase).end().process())

// same as passing value, 5 to end function
var stopAfterFiveWords = function(sentence) {
  return sentence.split(" ").length >= 9
}

console.log('third', quotes.start(useUpperCase).end(stopAfterFiveWords).process())
