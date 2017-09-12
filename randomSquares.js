function pickRandom (min, max) {
  // Returns a random integer between min (inclusive) and max (exclusive)sp
  return Math.floor(Math.random() * (max - min) + min)
}

function changeID (id, minColor, maxColor) {
  // Takes an ID, minimum color value, generates 3 random integers within range
  // Then sets the background color of the element with matching ID to a random RGB value
  let cMin = minColor || 0
  let cMax = maxColor || 256
  let randColor = []
  for (var i = 3; i > 0; i--) {
    randColor.push(pickRandom(cMin, cMax))
  }
  document.getElementById(id).style.backgroundColor = 'rgb(' + randColor[0] + ',' + randColor[1] + ',' + randColor[2] + ')'
  // Enter change into history
  logHistory(id, randColor)
}

function logHistory (id, randColor) {
  var entry = document.createElement("P")
  var text = document.createTextNode(id + " changed to  ")
  var color = document.createElement("SPAN")
  color.style.backgroundColor = 'rgb(' + randColor[0] + ',' + randColor[1] + ',' + randColor[2] + ')'
  color.style.padding = '0 10px'
  entry.appendChild(text)
  entry.appendChild(color)
  document.getElementById('history').prepend(entry)
}

function startRandom (list, f, reset) {
  // Main function to begin changing random elements
  // Takes a list of IDs and an optional frequency and reset parameters
  // Initialize parameters and set defaults if necessary
  let freq = f || 250
  let t = reset || 2000
  let l = list.slice()
  // Initialize interval and store reference to interval in global var stop
  stop = setInterval(function () {
    // Pick random index
    let rand = pickRandom(0, l.length)
    // Get ID at index
    let id = l[rand]
    // Remove id from list
    l.splice(rand, 1)
    // Change color at ID
    changeID(id)
    // Initialize setTimeout to reinsert id to list
    setTimeout(function () {
      l.push(id)
    }, t)
  }, freq)
}

function stopRandom () {
  // Clear stored interval to stop random changes
  clearInterval(stop)
}

// Default list of IDs
var cells = [
  'A1', 'A2', 'A3', 'A4',
  'B1', 'B2', 'B3', 'B4',
  'C1', 'C2', 'C3', 'C4',
  'D1', 'D2', 'D3', 'D4'
]

// Variable to store interval reference
var stop
