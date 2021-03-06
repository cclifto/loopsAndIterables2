var assert = require('chai').assert
// PART 0: Write a function called squareDance() that squares each number in an array.

var squareDance = function(inputArr){
    var sqrArr = []
    for (var i = 0; i < inputArr.length; i += 1){
     	var dbl = inputArr[i] * inputArr[i]
        sqrArr.push(dbl)
    }
	return sqrArr
}

// PART 1: write a function called nicer(). 
// It should clean up the language in its input sentence. 
// Forbidden words include heck, dang, crappy, and dang.

var nicer = function(string){
	var swearJar = ["heck","darn","crappy","dang"]
	var stringArray = string.split(" ")
	var outputString = ""
	for(var i = 0; i < stringArray.length; i++){
		if (!swearJar.includes(stringArray[i])){
			outputString += " " + stringArray[i] 
		}
	}
    
	return outputString.substring(1)
}

// // PART 2: write a function called capitalizeAll(). 
// It should take as input a sentence and capitalize the first letter
// of every word in the sentence. 

var capitalizeAll = function(string){
	var outputString = ""
	var stringArray = string.split(" ")
	for (var i = 0; i < stringArray.length; i ++) {
		var letters = stringArray[i].split("")
        letters[0] = letters[0].toUpperCase();
        stringArray[i] = letters.join("")
        stringArray[i].substring(0).toUpperCase()
	}
	return stringArray.join(" ")
}

// // PART 3: write a function called properSentences(). It should take as input a string and capitalize the first letter of every sentence in that string. (For our purposes, all sentences will end with periods. Write one that works with ? and ! and receive a gratifying high five, right on the hand!)

var properSentences = function(string){
	var outputString = ""
	var stringArray = string.split(". ")
	for (var i = 0; i < stringArray.length; i ++) {
        var letters = stringArray[i].split("")
        stringArray[i] = stringArray[i].toUpperCase(0,1)
		letters[0] = letters[0].toUpperCase();
		stringArray[i] = letters.join("")
        string = stringArray.join(". ")
	}
	return string
}

// var paragraph = 'it was a fine morning. the wine was good. light slanted in through the cafe window.'
// 		var properParagraph = 'It was a fine morning. The wine was good. Light slanted in through the cafe window.'



// // PART 4: write a function called iPutTheFunIn(). It should take a string as input. The output should be a copy of the original string with the word 'fun' inserted into the center of the string. 

var iPutTheFunIn = function(string){
	var outputString = 0
    var fun = string.split("")
	fun.splice(fun.length/2, 0, "fun")
	outputString = fun.join("")
	return outputString  
}

// // HARD MODE

// // PART 5: write a function called split(). it should take two inputs: (1) a string and (2) a delimiter

// // obviously, you may not use the native .split() method. your task here is to reverse-engineer .split() and write your own. 

var split = function(inputstring, delimiter) {
    var startpos = 0
    var outputarray = []
    
    for(var i = 0; i < inputstring.length; i++) {
        if( inputstring[i] === delimiter) {
       	outputarray.push(inputstring.substring(inputstring[startpos], i))
        startpos = i  
       }
        
}
    outputarray.push(inputstring.slice(startpos +1))
    return outputarray
}


// // PART 6: write a function called pipeline(). it should take three inputs: (1) a starting value, (2) a function, and (3) another function. it should use functions (2) and (3) on the starting value, one after the other, and return a new value that has been processed by both function (2) and function (3).

// // the following three tests will be run against your code.

// // test 1
var paragraph = 'mom bring your crappy self in here. i want a dang sandwich.'

var pipeline = function (inputValue, inputFunc1, inputFunc2) {
    var cleanSentence = inputFunc1(inputValue)
    var allProper = inputFunc2(cleanSentence)
    return allProper
}

// pipeline(paragraph,nicer,properSentences) should equal "Mom bring your self in here. I want a sandwich."

// test 2
var squareNum = function(n){
	return n * n
}

var addOne = function(n) {
	return n + 1
}

var pipeline = function (inputValue, inputFunc1, inputFunc2) {
    var squared = inputFunc1(inputValue)
    var squaredPlusOne = inputFunc2(squared)
    return squaredPlusOne

}

// pipeline(7,squareNum,addOne) should equal 50

// test 3
var exclaimAll = function(arr) {
	var newArr = []
	for (var i = 0; i < arr.length; i ++) {
		newArr.push(arr[i] + '!')
	}
    return newArr
}

var pipeline = function (inputValue, inputFunc1, inputFunc2) {
    var squared = inputFunc1(inputValue)
    var exclaSquared = inputFunc2(squared)
    return exclaSquared
}

var result = pipeline([10,20,30],squareDance,exclaimAll)
// result[1] should equal "400!"
// result[2] should equal "900!"
console.log('********************************************************************************************************************************************')
console.log('')
console.log('Test Results Below')
console.log('__________________')

var chai = require('chai'),
	expect = chai.expect
	should = chai.should
	assert = chai.assert

function checkFuncBasics(name,argNum) {
	try {
		var func = eval(name)
	}
	catch(e) {
		assert.equal(undefined,name,'Make sure your function is called ' + name + ', case-sensitive.')
	}
	if (argNum) assert.equal(func.length,argNum,'Your function should take ' + argNum + ' argument(s) (that means inputs). Does it?')
}

describe('squareDance()', function(){
	it('should have length equal to that of the original array', function(){
		checkFuncBasics('squareDance',1)
		expect(squareDance([2,4,6])).to.have.lengthOf(3)
	})
	it('should return a new array where each element in the original array has been squared.', function(){
		var newArr = squareDance([2,4,6])
		expect(newArr[1]).to.equal(16)
	})
})
describe('nicer()', function(){
	it('should return a string .', function() {
		checkFuncBasics('nicer',1)
		expect(nicer("test string")).to.be.a('string')
	})
	it('should return a copy of the input sentence with the words heck, darn, dang, and crappy omitted.', function(){
		expect(nicer("mom get the heck in here and bring me a darn sandwich."))
			.to.equal("mom get the in here and bring me a sandwich.")
		expect(nicer("here son, your crappy sandwich is on the dang plate."))
			.to.equal("here son, your sandwich is on the plate.")
	})
})
describe('capitalizeAll()', function(){
	it('should return a string.', function(){
		checkFuncBasics('capitalizeAll',1)
		expect(capitalizeAll('test sentence')).to.be.a('string')
	})
	it('should return a copy of the first string, with the first letter of each word capitalized.', function(){
		expect(capitalizeAll('every day is like sunday')).to.equal('Every Day Is Like Sunday')
		expect(capitalizeAll('hello world')).to.equal('Hello World')
	})
})
describe('properSentences()', function(){
	it('should return a copy of the first string, with the first letter of each *sentence* capitalized.', function(){
		checkFuncBasics('properSentences',1)
		var testParagraph = 'it was a fine morning. the wine was good. light slanted in through the cafe window.'
		var properParagraph = 'It was a fine morning. The wine was good. Light slanted in through the cafe window.'
		expect(properSentences(testParagraph)).to.equal(properParagraph)		
	})
})
describe('iPutTheFunIn()', function(){
	it('should return a copy of the first string, with the word "fun" inserted into the middle.', function(){
		checkFuncBasics('iPutTheFunIn',1)
		expect(iPutTheFunIn('funerary')).to.equal('funefunrary')
		expect(iPutTheFunIn('reds')).to.equal('refunds')
	})
})
describe('split()', function(){
	it('should return an array', function(){
		checkFuncBasics('split',2)
		expect(split('a b c',' ')).to.be.a('array')
	})
	it('should contain elements from the input string, separated by the input delimiter', function() {
		var fruits = "pear,apple,plum",
			fruitsArr = split(fruits,',')
		expect(fruitsArr[1]).to.equal('pear,apple')
		expect(split('a b c',' ')[0]).to.equal('a')
	})
})
describe('pipeline()', function() {
	it('should take three inputs, a value and two functions. it should process the value through each function in succession and return the final result', function() {
		// test 1
		var paragraph = 'mom bring your crappy self in here. i want a dang sandwich.'

		var result = pipeline(paragraph,nicer,properSentences) 
		expect(result).to.equal("Mom bring your self in here. I want a sandwich.")

		// test 2
		var squareNum = function(n){
			return n * n
		}

		var addOne = function(n) {
			return n + 1
		}

		var result = pipeline(7,squareNum,addOne) 
		expect(result).to.equal(50)

		// test 3
		var exclaimAll = function(arr) {
			var newArr = []
			for (var i = 0; i < arr.length; i ++) {
				newArr.push(arr[i] + '!')
			}
		}

		var result = pipeline([10,20,30],squareDance,exclaimAll)
		expect(result[1]).to.equal("400!")
		expect(result[2]).to.equal("900!")
	})
})
