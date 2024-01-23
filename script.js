document.addEventListener("DOMContentLoaded", function() {
    // Get the canvas element
    var canvas = document.getElementById("graphCanvas")
    var context = canvas.getContext("2d")
  
    // Set up the canvas and y-axis
    var canvasWidth = canvas.width
    var canvasHeight = canvas.height
    var yAxisWidth = 10
  
    // Draw the y-axis
    context.beginPath()
    context.moveTo(yAxisWidth, 0)
    context.lineTo(yAxisWidth, canvasHeight)
    context.stroke() // Draw the y-axis
  
    // Draw vertical lines on the y-axis
    var numLines = 10
    var lineSpacing = (canvasWidth - yAxisWidth) / numLines
  
    for (var i = 0; i <= numLines; i++) {
      var x = i * lineSpacing + yAxisWidth
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, canvasHeight)
      context.stroke() // Draw each vertical line
  
      // Display y-axis values above the canvas
      context.fillText(i * 10, x - 10, 20)
    }
  
    // Define the starting and ending points of the line
    var startPoint = { x: 10, y: 10 }
    var endPoint = { x: 88, y: 128 }
  
    // Define the duration of the animation in milliseconds
    var animationDuration = 2000
  
    // Calculate the interval between frames based on the animation duration
    var interval = animationDuration / (Math.abs(endPoint.x - startPoint.x) + Math.abs(endPoint.y - startPoint.y))
  
    // Define the current position of the line
    var currentPoint = { x: startPoint.x, y: startPoint.y }
  
    // Define the function to update the position of the line
    function updatePosition() {
      // Calculate the new position of the line based on the elapsed time
      currentPoint.x += (endPoint.x - startPoint.x) / animationDuration * interval
      currentPoint.y += (endPoint.y - startPoint.y) / animationDuration * interval
  
      // Clear the portion of the canvas that needs to be updated
      context.clearRect(0, 0, yAxisWidth, canvasHeight)
      context.clearRect(currentPoint.x, 0, canvasWidth - currentPoint.x, canvasHeight)
  
      // Draw the y-axis and vertical lines
      context.beginPath()
      context.moveTo(yAxisWidth, 0)
      context.lineTo(yAxisWidth, canvasHeight)
      context.stroke()
  
      for (var i = 0; i <= numLines; i++) {
        var x = i * lineSpacing + yAxisWidth
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, canvasHeight)
        context.stroke()
        context.fillText(i * 10, x - 10, 20)
      }
  
      // Draw the line from the previous starting point to the current position
      context.beginPath()
      context.moveTo(startPoint.x, startPoint.y)
      context.lineTo(currentPoint.x, currentPoint.y)
      context.stroke()
  
      // If the line has reached the ending position, update the starting and ending points
      if (currentPoint.x >= endPoint.x && currentPoint.y >= endPoint.y) {
        if (endPoint.x === 323 && endPoint.y === 245) {
          // If this is the last point, stop the animation
          return
        } else {
          // Otherwise, update the starting and ending points
          startPoint = { x: endPoint.x, y: endPoint.y }
          endPoint = { x: 323, y: 245 }
          animationDuration = 2000
          interval = animationDuration / (Math.abs(endPoint.x - startPoint.x) + Math.abs(endPoint.y - startPoint.y))
          currentPoint = { x: startPoint.x, y: startPoint.y }
        }
      }
  
      // Request the next frame
      requestAnimationFrame(updatePosition)
    }
  
    // Start the animation
    requestAnimationFrame(updatePosition)
  })